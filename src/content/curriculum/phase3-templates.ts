import { allTopics } from '../topics';
import { buildTopicSessions } from './build-topic-sessions';

/**
 * Giai đoạn 3 — Nâng cao: toàn bộ chuyên đề `advanced` hiện có (Mục 7 URD v2.0), bao gồm cả
 * 10 chuyên đề mới của v2.0 (SH-11/12, PS-11, DH-15/16/17, HH-12, DL-07/08, TD-07) — đã bổ sung
 * nội dung đầy đủ, tự động được lọc vào đây vì đều khai báo `level: 'advanced'`.
 */
export const phase3Templates = buildTopicSessions(
  allTopics.filter((t) => t.level === 'advanced'),
  3,
);
