import type { DifficultyLevel, TopicGroup, TopicProgressStatus } from '../../types';
import { calculateMasteryScore } from './calculate-mastery';

export interface TopicSummary {
  id: string;
  title: string;
  group: TopicGroup;
  level: DifficultyLevel;
}

export interface RecommendConfig {
  windowSize: number;
  errorLogPriorityThreshold: number;
  maxRecommendations: number;
}

export interface Recommendation {
  id: string;
  title: string;
  reason: string;
  route: string;
}

const LEVEL_ORDER: DifficultyLevel[] = ['basic', 'advanced'];
const GROUP_ORDER: TopicGroup[] = ['SH', 'PS', 'DH', 'HH', 'DL', 'TD'];

/**
 * Xây danh sách tối đa `maxRecommendations` hành động tiếp theo, kèm lý do (FR-H06,
 * FR-H07, FR-H08, FR-H10). Hàm thuần, không I/O — nơi gọi chịu trách nhiệm ghép dữ
 * liệu từ ContentStore/ProgressStore trước khi truyền vào.
 */
export function buildRecommendations(input: {
  topics: TopicSummary[];
  attemptsByTopic: Map<string, { correct: boolean }[]>;
  topicStatus: Map<string, TopicProgressStatus>;
  errorLogCount: number;
  config: RecommendConfig;
}): Recommendation[] {
  const { topics, attemptsByTopic, topicStatus, errorLogCount, config } = input;
  const recs: Recommendation[] = [];
  const usedTopicIds = new Set<string>();

  if (errorLogCount >= config.errorLogPriorityThreshold) {
    recs.push({
      id: 'error-log',
      title: 'Luyện lại câu sai',
      reason: `Sổ lỗi hiện có ${errorLogCount} câu cần luyện lại`,
      route: '/luyen-tap/so-loi',
    });
  }

  // Chuyên đề đã từng luyện ít nhất 1 lần, xếp theo mức thành thạo thấp nhất trước (FR-H06)
  const attempted = topics
    .map((t) => ({ topic: t, attempts: attemptsByTopic.get(t.id) ?? [] }))
    .filter((x) => x.attempts.length > 0)
    .map((x) => ({
      ...x,
      score: calculateMasteryScore(x.attempts, config.windowSize) ?? 0,
      recentTotal: Math.min(x.attempts.length, config.windowSize),
      recentCorrect: x.attempts.slice(-config.windowSize).filter((a) => a.correct).length,
    }))
    .sort((a, b) => a.score - b.score);

  for (const candidate of attempted) {
    if (recs.length >= config.maxRecommendations) break;
    recs.push({
      id: candidate.topic.id,
      title: `Luyện tập ${candidate.topic.id} — ${candidate.topic.title}`,
      reason: `Vì con đúng ${candidate.recentCorrect}/${candidate.recentTotal} bài gần nhất ở chuyên đề này`,
      route: `/ly-thuyet/${candidate.topic.id}`,
    });
    usedTopicIds.add(candidate.topic.id);
  }

  // Còn chỗ trống -> đề xuất lộ trình nền tảng mặc định: chưa học, Cơ bản trước Nâng cao (FR-H02, FR-H07)
  if (recs.length < config.maxRecommendations) {
    const foundational = topics
      .filter((t) => !usedTopicIds.has(t.id) && (topicStatus.get(t.id) ?? 'not-started') === 'not-started')
      .sort((a, b) => {
        const levelDiff = LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level);
        if (levelDiff !== 0) return levelDiff;
        const groupDiff = GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group);
        if (groupDiff !== 0) return groupDiff;
        return a.id.localeCompare(b.id);
      });

    for (const topic of foundational) {
      if (recs.length >= config.maxRecommendations) break;
      recs.push({
        id: topic.id,
        title: `Học lý thuyết ${topic.id} — ${topic.title}`,
        reason: 'Chuyên đề nền tảng chưa học, nên học trước theo lộ trình đề xuất',
        route: `/ly-thuyet/${topic.id}`,
      });
    }
  }

  return recs;
}
