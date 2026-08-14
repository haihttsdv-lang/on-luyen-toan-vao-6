import type { ScheduledSession, ScheduledSessionStatus, SessionOutcomeRecord, SessionTemplate } from '../../types';
import { CURRICULUM_CONFIG } from '../../config/thresholds';
import { diffDays, maxDate, nextValidDay, startOfDay, toDateStr } from './date-utils';

export interface Phase4TestConfigInfo {
  id: string;
  label: string;
  durationMinutes: number;
}

export interface BuildScheduleInput {
  /** Giai đoạn 1+2+3 gộp lại, đúng thứ tự chương trình — thứ tự mảng CHÍNH LÀ thứ tự neo lịch. */
  templates: SessionTemplate[];
  outcomes: SessionOutcomeRecord[];
  startDate: string;
  weeklyDays: number[];
  examDate?: string;
  weakestTopicId?: string;
  weakestTopicTitle?: string;
  phase4TestConfig: Phase4TestConfigInfo;
  today: Date;
  /** Số buổi tương lai cần sinh ra để hiển thị (mặc định đủ vài tuần tới). */
  futureWindow?: number;
}

export interface BuildScheduleResult {
  sessions: ScheduledSession[];
  /** Không đủ thời gian để hoàn thành GĐ1-3 trước ngày thi dự kiến dù đã nén tối đa buổi/tuần (Mục 7). */
  insufficientTime: boolean;
}

const DEFAULT_FUTURE_WINDOW = 12;

function classifyStatus(date: Date, today: Date): ScheduledSessionStatus {
  const diff = diffDays(date, today);
  if (diff === 0) return 'today';
  if (diff < 0) return 'overdue';
  return 'upcoming';
}

function buildPeriodicTestTemplate(index: number, isMonthly: boolean, coveredTopicIds: string[]): SessionTemplate {
  const kind = isMonthly ? 'Kiểm tra tháng' : 'Kiểm tra tuần';
  return {
    id: `P2-PERIODIC-${index}`,
    phase: 2,
    focus: 'periodic-test',
    topicIds: coveredTopicIds,
    blocks: [
      {
        label: `${kind}: các chuyên đề đã học`,
        estimatedMinutes: 30,
        to: '/thi-thu/tao-de',
        navState: { presetTopicIds: coveredTopicIds },
      },
    ],
  };
}

function buildPhase4Template(index: number, testConfig: Phase4TestConfigInfo, weakestTopicId?: string, weakestTopicTitle?: string): SessionTemplate {
  const isTestSession = index % 2 === 1;
  if (isTestSession) {
    return {
      id: `P4-TEST-${index}`,
      phase: 4,
      focus: 'mock-test',
      topicIds: [],
      blocks: [{ label: `Làm đề: ${testConfig.label}`, estimatedMinutes: testConfig.durationMinutes, to: `/thi-thu/lam-bai/${testConfig.id}` }],
    };
  }
  return {
    id: `P4-DRILL-${index}`,
    phase: 4,
    focus: 'practice',
    topicIds: weakestTopicId ? [weakestTopicId] : [],
    blocks: weakestTopicId
      ? [
          {
            label: `Luyện chuyên sâu: ${weakestTopicTitle ?? weakestTopicId}`,
            estimatedMinutes: 20,
            to: '/luyen-tap/lam-bai',
            navState: { topicIds: [weakestTopicId] },
          },
        ]
      : [{ label: 'Luyện tập tổng hợp', estimatedMinutes: 20, to: '/luyen-tap' }],
  };
}

/**
 * Sinh lịch học thích ứng (FR-C01, FR-C02): KHÔNG lưu lịch, tính lại mỗi lần từ danh sách
 * outcome đã hoàn thành. Buổi tiếp theo neo theo thứ tự chương trình của buổi hoàn thành gần
 * nhất — không neo theo giờ hệ thống — để tránh lịch "trôi" hoặc bị nhảy cóc khi bỏ buổi.
 */
export function buildAdaptiveSchedule(input: BuildScheduleInput): BuildScheduleResult {
  const { templates, outcomes, startDate, examDate, weakestTopicId, weakestTopicTitle, phase4TestConfig, today } = input;
  const weeklyDays = input.weeklyDays.length > 0 ? input.weeklyDays : [...CURRICULUM_CONFIG.defaultWeeklyDays];
  const futureWindow = input.futureWindow ?? DEFAULT_FUTURE_WINDOW;

  const outcomeByTemplateId = new Map(outcomes.map((o) => [o.templateId, o]));
  const firstIncompleteIndex = templates.findIndex((t) => !outcomeByTemplateId.has(t.id));
  const splitIndex = firstIncompleteIndex === -1 ? templates.length : firstIncompleteIndex;

  let cursorDate = startOfDay(startDate);
  for (let i = 0; i < splitIndex; i++) {
    const outcome = outcomeByTemplateId.get(templates[i].id);
    if (outcome) cursorDate = maxDate(cursorDate, startOfDay(outcome.completedAt));
  }

  const sessions: ScheduledSession[] = [];
  const coveredTopicIds: string[] = [];

  for (let i = 0; i < splitIndex; i++) {
    const template = templates[i];
    const outcome = outcomeByTemplateId.get(template.id)!;
    sessions.push({ template, order: i, date: toDateStr(startOfDay(outcome.completedAt)), status: 'completed', outcome: outcome.outcome });
    coveredTopicIds.push(...template.topicIds);
  }

  let nextDate = nextValidDay(cursorDate, weeklyDays, splitIndex > 0);
  let staticIdx = splitIndex;
  let phase4Counter = 0;
  let periodicCounter = 0;
  let weeklyTestCounter = 0;

  while (sessions.length < splitIndex + futureWindow) {
    let template: SessionTemplate;
    if (staticIdx < templates.length) {
      template = templates[staticIdx];
      staticIdx++;
    } else {
      phase4Counter++;
      template = buildPhase4Template(phase4Counter, phase4TestConfig, weakestTopicId, weakestTopicTitle);
    }

    sessions.push({ template, order: sessions.length, date: toDateStr(nextDate), status: classifyStatus(nextDate, today) });
    coveredTopicIds.push(...template.topicIds);
    weeklyTestCounter++;
    nextDate = nextValidDay(nextDate, weeklyDays, true);

    if (weeklyTestCounter % CURRICULUM_CONFIG.weeklyTestEveryNSessions === 0) {
      periodicCounter++;
      const isMonthly = periodicCounter % CURRICULUM_CONFIG.monthlyTestEveryNWeeklyTests === 0;
      const periodicTemplate = buildPeriodicTestTemplate(periodicCounter, isMonthly, [...coveredTopicIds]);
      sessions.push({ template: periodicTemplate, order: sessions.length, date: toDateStr(nextDate), status: classifyStatus(nextDate, today) });
      nextDate = nextValidDay(nextDate, weeklyDays, true);
    }
  }

  let insufficientTime = false;
  if (examDate) {
    const remainingStatic = templates.length - splitIndex;
    const daysLeft = diffDays(startOfDay(examDate), today);
    const weeksLeft = Math.max(daysLeft / 7, 1 / CURRICULUM_CONFIG.maxWeeklyDays);
    const neededPerWeek = remainingStatic / weeksLeft;
    insufficientTime = daysLeft <= 0 ? remainingStatic > 0 : neededPerWeek > CURRICULUM_CONFIG.maxWeeklyDays;
  }

  return { sessions, insufficientTime };
}

/** Buổi "hôm nay/trễ lịch/tiếp theo" — buổi đầu tiên trong lịch chưa hoàn thành (FR-C02). */
export function pickTodaySession(sessions: ScheduledSession[]): ScheduledSession | undefined {
  return sessions.find((s) => s.status !== 'completed');
}

/** Tiến độ toàn khóa GĐ1-3 (không tính GĐ4 vì GĐ4 chạy liên tục tới ngày thi, không có "xong"). */
export function computePhaseProgress(sessions: ScheduledSession[], totalStaticSessions: number): number {
  if (totalStaticSessions === 0) return 0;
  const completed = sessions.filter((s) => s.status === 'completed' && s.template.phase !== 4).length;
  return Math.min(1, completed / totalStaticSessions);
}
