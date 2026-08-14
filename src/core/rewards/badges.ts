import type { SessionOutcomeRecord, SessionTemplate, TestResult } from '../../types';
import { BADGE_DEFS, type BadgeDef } from '../../content/badges';
import { calculateStreak } from './streak';

export interface BadgeStatus extends BadgeDef {
  earned: boolean;
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const WEEK_ACTIVE_MIN_SESSIONS = 3;
const STREAK_BADGE_MIN = 5;
const TEST_SCORE_BADGE_MIN = 0.8;

export interface ComputeBadgesInput {
  /** Toàn bộ khuôn mẫu buổi học tĩnh (Giai đoạn 1–3) — dùng để biết một giai đoạn có bao nhiêu buổi. */
  templates: SessionTemplate[];
  outcomes: SessionOutcomeRecord[];
  testResults: TestResult[];
  today: Date;
}

function isPhaseComplete(templates: SessionTemplate[], outcomes: SessionOutcomeRecord[], phase: 1 | 2 | 3): boolean {
  const phaseTemplates = templates.filter((t) => t.phase === phase);
  if (phaseTemplates.length === 0) return false;
  const completedIds = new Set(outcomes.map((o) => o.templateId));
  return phaseTemplates.every((t) => completedIds.has(t.id));
}

function hasHighTestScore(testResults: TestResult[]): boolean {
  return testResults.some((r) => r.total > 0 && r.autoScore / r.total >= TEST_SCORE_BADGE_MIN);
}

function isWeekActive(outcomes: SessionOutcomeRecord[], today: Date): boolean {
  const cutoff = today.getTime() - WEEK_MS;
  const recentCount = outcomes.filter((o) => new Date(o.completedAt).getTime() >= cutoff).length;
  return recentCount >= WEEK_ACTIVE_MIN_SESSIONS;
}

/** Trạng thái đạt/chưa đạt của toàn bộ huy hiệu (GM-04, GM-05) — hàm thuần, tính lại mỗi lần. */
export function computeBadges(input: ComputeBadgesInput): BadgeStatus[] {
  const { templates, outcomes, testResults, today } = input;
  const streak = calculateStreak(outcomes);

  const earnedById: Record<string, boolean> = {
    'phase-1-complete': isPhaseComplete(templates, outcomes, 1),
    'phase-2-complete': isPhaseComplete(templates, outcomes, 2),
    'phase-3-complete': isPhaseComplete(templates, outcomes, 3),
    'streak-5': streak >= STREAK_BADGE_MIN,
    'test-80': hasHighTestScore(testResults),
    'week-active': isWeekActive(outcomes, today),
  };

  return BADGE_DEFS.map((def) => ({ ...def, earned: earnedById[def.id] ?? false }));
}
