import { describe, expect, it } from 'vitest';
import { buildAdaptiveSchedule, computePhaseProgress, pickTodaySession } from './build-schedule';
import type { SessionOutcomeRecord, SessionTemplate } from '../../types';

const PHASE4_CONFIG = { id: 'STANDARD', label: 'STANDARD', durationMinutes: 60 };

function makeTemplates(count: number, phase: 1 | 2 | 3 = 1): SessionTemplate[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `T${i + 1}`,
    phase,
    focus: 'theory' as const,
    topicIds: [`TOPIC-${i + 1}`],
    blocks: [{ label: 'x', estimatedMinutes: 10, to: '/x' }],
  }));
}

// Thứ 3 = 2, dùng làm ngày học duy nhất cho dễ tính tay (2024-01-02 là Thứ 3)
const TUE_ONLY = [2];

describe('buildAdaptiveSchedule (FR-C01, FR-C02)', () => {
  it('chưa có outcome nào -> buổi đầu tiên xếp đúng ngày học hợp lệ đầu tiên kể từ startDate', () => {
    const templates = makeTemplates(3);
    const { sessions } = buildAdaptiveSchedule({
      templates,
      outcomes: [],
      startDate: '2024-01-02T00:00:00.000Z', // Thứ 3
      weeklyDays: TUE_ONLY,
      phase4TestConfig: PHASE4_CONFIG,
      today: new Date(2024, 0, 2),
    });
    expect(sessions[0].template.id).toBe('T1');
    expect(sessions[0].date).toBe('2024-01-02');
    expect(sessions[0].status).toBe('today');
  });

  it('buổi trước hoàn thành trễ -> buổi tiếp theo neo theo NGÀY HOÀN THÀNH, không nhảy cóc theo hôm nay', () => {
    const templates = makeTemplates(3);
    const outcomes: SessionOutcomeRecord[] = [{ templateId: 'T1', outcome: 'ok', completedAt: '2024-02-20T00:00:00.000Z' }]; // hoàn thành rất trễ
    const { sessions } = buildAdaptiveSchedule({
      templates,
      outcomes,
      startDate: '2024-01-02T00:00:00.000Z',
      weeklyDays: TUE_ONLY,
      phase4TestConfig: PHASE4_CONFIG,
      today: new Date(2024, 5, 1), // hôm nay đã rất xa (tháng 6)
    });
    const t2 = sessions.find((s) => s.template.id === 'T2')!;
    // Neo theo ngày hoàn thành T1 (20/2, Thứ 3) chứ không phải theo "hôm nay" tháng 6
    expect(t2.date).toBe('2024-02-27');
    expect(t2.status).toBe('overdue');
  });

  it('không nhảy cóc bỏ qua buổi chưa hoàn thành dù đã hoàn thành các buổi neo lịch trễ hơn', () => {
    const templates = makeTemplates(3);
    // T1 hoàn thành, T2 CHƯA hoàn thành -> buổi tiếp theo phải là T2, không phải T3
    const outcomes: SessionOutcomeRecord[] = [{ templateId: 'T1', outcome: 'excellent', completedAt: '2024-01-02T00:00:00.000Z' }];
    const { sessions } = buildAdaptiveSchedule({
      templates,
      outcomes,
      startDate: '2024-01-02T00:00:00.000Z',
      weeklyDays: TUE_ONLY,
      phase4TestConfig: PHASE4_CONFIG,
      today: new Date(2024, 0, 9),
    });
    const next = pickTodaySession(sessions);
    expect(next?.template.id).toBe('T2');
  });

  it('chèn đúng vị trí buổi kiểm tra định kỳ sau mỗi 3 buổi thường', () => {
    const templates = makeTemplates(6);
    const { sessions } = buildAdaptiveSchedule({
      templates,
      outcomes: [],
      startDate: '2024-01-02T00:00:00.000Z',
      weeklyDays: TUE_ONLY,
      phase4TestConfig: PHASE4_CONFIG,
      today: new Date(2024, 0, 2),
      futureWindow: 6,
    });
    // 3 buổi thường (T1,T2,T3) rồi mới tới 1 buổi kiểm tra định kỳ
    const ids = sessions.map((s) => s.template.id);
    const periodicIndex = ids.findIndex((id) => id.startsWith('P2-PERIODIC'));
    expect(periodicIndex).toBe(3);
  });

  it('hết Giai đoạn 1-3 -> tự sinh buổi Giai đoạn 4 (mock-test/practice xen kẽ)', () => {
    const templates = makeTemplates(2);
    const outcomes: SessionOutcomeRecord[] = templates.map((t, i) => ({
      templateId: t.id,
      outcome: 'ok',
      completedAt: `2024-01-0${2 + i * 7}T00:00:00.000Z`,
    }));
    const { sessions } = buildAdaptiveSchedule({
      templates,
      outcomes,
      startDate: '2024-01-02T00:00:00.000Z',
      weeklyDays: TUE_ONLY,
      phase4TestConfig: PHASE4_CONFIG,
      weakestTopicId: 'DH-01',
      weakestTopicTitle: 'Test topic',
      today: new Date(2024, 0, 16),
      futureWindow: 2,
    });
    const phase4 = sessions.filter((s) => s.template.phase === 4);
    expect(phase4.length).toBeGreaterThan(0);
    expect(phase4[0].template.focus === 'mock-test' || phase4[0].template.focus === 'practice').toBe(true);
  });

  it('ngày thi dự kiến quá gần so với số buổi còn lại -> insufficientTime = true', () => {
    const templates = makeTemplates(30);
    const { insufficientTime } = buildAdaptiveSchedule({
      templates,
      outcomes: [],
      startDate: '2024-01-02T00:00:00.000Z',
      weeklyDays: TUE_ONLY,
      examDate: '2024-01-16T00:00:00.000Z', // chỉ còn 2 tuần cho 30 buổi
      phase4TestConfig: PHASE4_CONFIG,
      today: new Date(2024, 0, 2),
    });
    expect(insufficientTime).toBe(true);
  });

  it('ngày thi dự kiến đủ xa -> insufficientTime = false', () => {
    const templates = makeTemplates(3);
    const { insufficientTime } = buildAdaptiveSchedule({
      templates,
      outcomes: [],
      startDate: '2024-01-02T00:00:00.000Z',
      weeklyDays: TUE_ONLY,
      examDate: '2025-01-01T00:00:00.000Z',
      phase4TestConfig: PHASE4_CONFIG,
      today: new Date(2024, 0, 2),
    });
    expect(insufficientTime).toBe(false);
  });
});

describe('pickTodaySession (FR-C02)', () => {
  it('tất cả đã hoàn thành -> trả về undefined (sẽ rơi vào nhánh Giai đoạn 4)', () => {
    const templates = makeTemplates(1);
    const outcomes: SessionOutcomeRecord[] = [{ templateId: 'T1', outcome: 'ok', completedAt: '2024-01-02T00:00:00.000Z' }];
    const { sessions } = buildAdaptiveSchedule({
      templates,
      outcomes,
      startDate: '2024-01-02T00:00:00.000Z',
      weeklyDays: TUE_ONLY,
      phase4TestConfig: PHASE4_CONFIG,
      today: new Date(2024, 0, 2),
      futureWindow: 1,
    });
    // buổi chưa hoàn thành đầu tiên giờ là 1 buổi Giai đoạn 4 (không phải undefined vì đã sinh động)
    const next = pickTodaySession(sessions);
    expect(next?.template.phase).toBe(4);
  });
});

describe('computePhaseProgress', () => {
  it('tính đúng % hoàn thành GĐ1-3, không tính buổi Giai đoạn 4', () => {
    const templates = makeTemplates(4);
    const outcomes: SessionOutcomeRecord[] = [
      { templateId: 'T1', outcome: 'ok', completedAt: '2024-01-02T00:00:00.000Z' },
      { templateId: 'T2', outcome: 'ok', completedAt: '2024-01-09T00:00:00.000Z' },
    ];
    const { sessions } = buildAdaptiveSchedule({
      templates,
      outcomes,
      startDate: '2024-01-02T00:00:00.000Z',
      weeklyDays: TUE_ONLY,
      phase4TestConfig: PHASE4_CONFIG,
      today: new Date(2024, 0, 16),
      futureWindow: 2,
    });
    expect(computePhaseProgress(sessions, 4)).toBe(0.5);
  });
});
