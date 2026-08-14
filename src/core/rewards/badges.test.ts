import { describe, expect, it } from 'vitest';
import { computeBadges } from './badges';
import type { SessionOutcomeRecord, SessionTemplate, TestResult } from '../../types';

function template(id: string, phase: 1 | 2 | 3): SessionTemplate {
  return { id, phase, focus: 'theory', topicIds: [], blocks: [{ label: 'x', estimatedMinutes: 10, to: '/x' }] };
}

function outcome(templateId: string, result: SessionOutcomeRecord['outcome'], completedAt: string): SessionOutcomeRecord {
  return { templateId, outcome: result, completedAt };
}

const TODAY = new Date('2026-06-15');

describe('computeBadges (GM-04, GM-05)', () => {
  it('chưa hoàn thành gì -> không huy hiệu nào đạt được', () => {
    const badges = computeBadges({ templates: [template('P1-A', 1)], outcomes: [], testResults: [], today: TODAY });
    expect(badges.every((b) => !b.earned)).toBe(true);
    expect(badges.length).toBeGreaterThan(0);
  });

  it('hoàn thành đủ toàn bộ buổi Giai đoạn 1 -> đạt huy hiệu phase-1-complete, KHÔNG đạt phase-2', () => {
    const templates = [template('P1-A', 1), template('P1-B', 1), template('P2-A', 2)];
    const outcomes = [outcome('P1-A', 'ok', '2026-06-01'), outcome('P1-B', 'ok', '2026-06-02')];
    const badges = computeBadges({ templates, outcomes, testResults: [], today: TODAY });
    expect(badges.find((b) => b.id === 'phase-1-complete')?.earned).toBe(true);
    expect(badges.find((b) => b.id === 'phase-2-complete')?.earned).toBe(false);
  });

  it('hoàn thành 5 buổi liên tiếp tốt -> đạt huy hiệu streak-5', () => {
    const templates = Array.from({ length: 5 }, (_, i) => template(`P1-${i}`, 1));
    const outcomes = templates.map((t, i) => outcome(t.id, 'excellent', `2026-06-0${i + 1}`));
    const badges = computeBadges({ templates, outcomes, testResults: [], today: TODAY });
    expect(badges.find((b) => b.id === 'streak-5')?.earned).toBe(true);
  });

  it('thi thử đạt đúng 80% -> đạt huy hiệu test-80', () => {
    const testResults: TestResult[] = [
      { configId: 'STANDARD', date: '2026-06-01', autoScore: 16, total: 20, byTopicGroup: {}, durationUsedSeconds: 100 },
    ];
    const badges = computeBadges({ templates: [], outcomes: [], testResults, today: TODAY });
    expect(badges.find((b) => b.id === 'test-80')?.earned).toBe(true);
  });

  it('thi thử dưới 80% -> KHÔNG đạt huy hiệu test-80', () => {
    const testResults: TestResult[] = [
      { configId: 'STANDARD', date: '2026-06-01', autoScore: 10, total: 20, byTopicGroup: {}, durationUsedSeconds: 100 },
    ];
    const badges = computeBadges({ templates: [], outcomes: [], testResults, today: TODAY });
    expect(badges.find((b) => b.id === 'test-80')?.earned).toBe(false);
  });

  it('có từ 3 buổi hoàn thành trong 7 ngày gần nhất -> đạt huy hiệu week-active', () => {
    const templates = [template('T1', 1), template('T2', 1), template('T3', 1)];
    const outcomes = [
      outcome('T1', 'ok', '2026-06-12'),
      outcome('T2', 'ok', '2026-06-13'),
      outcome('T3', 'ok', '2026-06-14'),
    ];
    const badges = computeBadges({ templates, outcomes, testResults: [], today: TODAY });
    expect(badges.find((b) => b.id === 'week-active')?.earned).toBe(true);
  });

  it('buổi hoàn thành đã lâu (ngoài 7 ngày) -> KHÔNG tính vào week-active', () => {
    const templates = [template('T1', 1), template('T2', 1), template('T3', 1)];
    const outcomes = [
      outcome('T1', 'ok', '2026-05-01'),
      outcome('T2', 'ok', '2026-05-02'),
      outcome('T3', 'ok', '2026-05-03'),
    ];
    const badges = computeBadges({ templates, outcomes, testResults: [], today: TODAY });
    expect(badges.find((b) => b.id === 'week-active')?.earned).toBe(false);
  });
});
