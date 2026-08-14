import { useEffect, useState } from 'react';
import { staticSessionTemplates } from '../../content/curriculum';
import { calculateStreak, calculateTotalCoins, computeBadges } from '../../core/rewards';
import type { BadgeStatus } from '../../core/rewards';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { SessionOutcomeRecord, TestResult } from '../../types';

export interface RewardsData {
  loading: boolean;
  coins: number;
  streak: number;
  badges: BadgeStatus[];
  reload: () => void;
}

const templatesById = new Map(staticSessionTemplates.map((t) => [t.id, t]));

/** Xu, chuỗi ngày, tủ huy hiệu (GM-01→GM-06) — luôn tính lại từ lịch sử buổi học, không lưu số dư riêng. */
export function useRewards(): RewardsData {
  const [loading, setLoading] = useState(true);
  const [outcomes, setOutcomes] = useState<SessionOutcomeRecord[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [o, t] = await Promise.all([localProgressStore.listSessionOutcomes(), localProgressStore.getTestResults()]);
      if (cancelled) return;
      setOutcomes(o);
      setTestResults(t);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reloadTick]);

  const sessionsForCoins = outcomes
    .map((o) => {
      const template = templatesById.get(o.templateId);
      return template ? { focus: template.focus, outcome: o.outcome } : null;
    })
    .filter((s): s is { focus: NonNullable<typeof s>['focus']; outcome: SessionOutcomeRecord['outcome'] } => s !== null);

  return {
    loading,
    coins: calculateTotalCoins(sessionsForCoins),
    streak: calculateStreak(outcomes),
    badges: computeBadges({ templates: staticSessionTemplates, outcomes, testResults, today: new Date() }),
    reload: () => setReloadTick((t) => t + 1),
  };
}
