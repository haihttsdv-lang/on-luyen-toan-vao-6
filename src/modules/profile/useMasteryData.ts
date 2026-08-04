import { useEffect, useState } from 'react';
import { MASTERY_CONFIG } from '../../config/thresholds';
import { computeTopicMastery, type TopicMastery } from '../../core/mastery-engine/calculate-mastery';
import { localContentStore } from '../../data-access/local/content-store';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { Topic, TopicProgressStatus } from '../../types';

export interface MasteryData {
  loading: boolean;
  topics: Topic[];
  attemptsByTopic: Map<string, { correct: boolean }[]>;
  masteryByTopic: Map<string, TopicMastery | null>;
  topicStatus: Map<string, TopicProgressStatus>;
  errorLogCount: number;
  reload: () => void;
}

/** Ghép dữ liệu từ ContentStore/ProgressStore để tính mức thành thạo từng chuyên đề (FR-H03). */
export function useMasteryData(): MasteryData {
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [attemptsByTopic, setAttemptsByTopic] = useState<Map<string, { correct: boolean }[]>>(new Map());
  const [masteryByTopic, setMasteryByTopic] = useState<Map<string, TopicMastery | null>>(new Map());
  const [topicStatus, setTopicStatus] = useState<Map<string, TopicProgressStatus>>(new Map());
  const [errorLogCount, setErrorLogCount] = useState(0);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const [allTopics, allExercises, allAttempts, errorLog, progressRecords] = await Promise.all([
        localContentStore.listTopics(),
        localContentStore.listExercises(),
        localProgressStore.getAttempts(),
        localProgressStore.getErrorLog(),
        localProgressStore.listTopicProgress(),
      ]);
      if (cancelled) return;

      const topicIdsByExercise = new Map(allExercises.map((e) => [e.id, e.topicIds]));
      const sortedAttempts = [...allAttempts].sort((a, b) => a.timestamp.localeCompare(b.timestamp));

      const byTopic = new Map<string, { correct: boolean }[]>();
      for (const attempt of sortedAttempts) {
        const topicIds = topicIdsByExercise.get(attempt.exerciseId) ?? [];
        for (const topicId of topicIds) {
          const list = byTopic.get(topicId) ?? [];
          list.push({ correct: attempt.correct });
          byTopic.set(topicId, list);
        }
      }

      const mastery = new Map<string, TopicMastery | null>();
      for (const topic of allTopics) {
        mastery.set(topic.id, computeTopicMastery(byTopic.get(topic.id) ?? [], MASTERY_CONFIG));
      }

      const statusMap = new Map(progressRecords.map((r) => [r.topicId, r.status]));

      setTopics(allTopics);
      setAttemptsByTopic(byTopic);
      setMasteryByTopic(mastery);
      setTopicStatus(statusMap);
      setErrorLogCount(errorLog.length);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [reloadTick]);

  return {
    loading,
    topics,
    attemptsByTopic,
    masteryByTopic,
    topicStatus,
    errorLogCount,
    reload: () => setReloadTick((t) => t + 1),
  };
}
