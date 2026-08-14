import { useEffect, useMemo, useState } from 'react';
import { ERROR_LOG_PRIORITY_THRESHOLD, MASTERY_CONFIG, MAX_RECOMMENDATIONS, TARGET_SCHOOL_TEST_CONFIG } from '../../config/thresholds';
import { buildAdaptiveSchedule, computePhaseProgress, pickTodaySession, shouldSuggestSkipPhase1 } from '../../core/schedule';
import { buildRecommendations } from '../../core/mastery-engine/recommend';
import { staticSessionTemplates } from '../../content/curriculum';
import { allTestConfigs } from '../../content/test-configs';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { LearnerProfile, ScheduledSession, SessionOutcomeRecord } from '../../types';
import { useMasteryData } from '../profile/useMasteryData';

export interface ScheduleData {
  loading: boolean;
  profile: LearnerProfile | null;
  sessions: ScheduledSession[];
  todaySession: ScheduledSession | undefined;
  phaseProgress: number;
  insufficientTime: boolean;
  canSkipPhase1: boolean;
  reload: () => void;
}

/** Nguồn TÍNH lịch duy nhất — dùng chung ở HomePage và CurriculumHome (UX-11, tránh lệch). */
export function useSchedule(): ScheduleData {
  const mastery = useMasteryData();
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [outcomes, setOutcomes] = useState<SessionOutcomeRecord[]>([]);
  const [diagnosticScore, setDiagnosticScore] = useState<number | undefined>(undefined);
  const [profileLoading, setProfileLoading] = useState(true);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setProfileLoading(true);
      const [p, o, diagnosticAttempts] = await Promise.all([
        localProgressStore.getProfile(),
        localProgressStore.listSessionOutcomes(),
        localProgressStore.getAttempts({ context: 'diagnostic' }),
      ]);
      if (cancelled) return;
      setProfile(p ?? null);
      setOutcomes(o);
      setDiagnosticScore(diagnosticAttempts.length > 0 ? diagnosticAttempts.filter((a) => a.correct).length / diagnosticAttempts.length : undefined);
      setProfileLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reloadTick]);

  const recommendations = useMemo(
    () =>
      buildRecommendations({
        topics: mastery.topics,
        attemptsByTopic: mastery.attemptsByTopic,
        topicStatus: mastery.topicStatus,
        errorLogCount: mastery.errorLogCount,
        config: {
          windowSize: MASTERY_CONFIG.windowSize,
          errorLogPriorityThreshold: ERROR_LOG_PRIORITY_THRESHOLD,
          maxRecommendations: MAX_RECOMMENDATIONS,
        },
      }),
    [mastery.topics, mastery.attemptsByTopic, mastery.topicStatus, mastery.errorLogCount],
  );

  const weakest = recommendations.find((r) => mastery.topics.some((t) => t.id === r.id));
  const weakestTopic = weakest ? mastery.topics.find((t) => t.id === weakest.id) : undefined;

  const scheduleResult = useMemo(() => {
    if (!profile) return null;
    const targetConfigId = profile.targetSchool ? TARGET_SCHOOL_TEST_CONFIG[profile.targetSchool] : 'STANDARD';
    const testConfig = allTestConfigs.find((c) => c.id === targetConfigId) ?? allTestConfigs[0];
    return buildAdaptiveSchedule({
      templates: staticSessionTemplates,
      outcomes,
      startDate: profile.createdAt,
      weeklyDays: profile.weeklyDays ?? [],
      examDate: profile.examDate,
      weakestTopicId: weakestTopic?.id,
      weakestTopicTitle: weakestTopic?.title,
      phase4TestConfig: { id: testConfig.id, label: testConfig.label, durationMinutes: testConfig.durationMinutes },
      today: new Date(),
    });
  }, [profile, outcomes, weakestTopic]);

  const sessions = scheduleResult?.sessions ?? [];

  return {
    loading: profileLoading || mastery.loading,
    profile,
    sessions,
    todaySession: pickTodaySession(sessions),
    phaseProgress: computePhaseProgress(sessions, staticSessionTemplates.length),
    insufficientTime: scheduleResult?.insufficientTime ?? false,
    canSkipPhase1: shouldSuggestSkipPhase1(diagnosticScore),
    reload: () => {
      setReloadTick((t) => t + 1);
      mastery.reload();
    },
  };
}
