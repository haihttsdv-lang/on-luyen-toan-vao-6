import { allTopics } from '../topics';
import { buildTopicSessions } from './build-topic-sessions';

/**
 * Giai đoạn 1 — Nền tảng: toàn bộ chuyên đề `basic` hiện có (Mục 7 URD v2.0). Khi 10 chuyên đề
 * mới (SH-11/12, PS-11...) được viết ở lượt sau, một số có thể cần chuyển vào đây tùy độ khó.
 */
export const phase1Templates = buildTopicSessions(
  allTopics.filter((t) => t.level === 'basic'),
  1,
);
