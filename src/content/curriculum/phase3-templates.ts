import { allTopics } from '../topics';
import { buildTopicSessions } from './build-topic-sessions';

/**
 * Giai đoạn 3 — Nâng cao: toàn bộ chuyên đề `advanced` hiện có (Mục 7 URD v2.0).
 * **Chưa đầy đủ**: nhiều chuyên đề nâng cao mà Mục 7 liệt kê (tỉ lệ kép, phương pháp khử,
 * chuyển động đặc biệt, sơn màu hình khối, Dirichlet nâng cao, Ven, dãy chữ, chữ số tận cùng,
 * dung dịch–tươi khô) thuộc đúng 10 chuyên đề mới của v2.0 (SH-11/12, PS-11, DH-15/16/17, HH-12,
 * DL-07/08, TD-07) — CHƯA có nội dung, sẽ bổ sung vào mảng này ở lượt biên soạn nội dung sau.
 */
export const phase3Templates = buildTopicSessions(
  allTopics.filter((t) => t.level === 'advanced'),
  3,
);
