import type { SessionTemplate } from '../../types';
import { allTestConfigs } from '../test-configs';

/** Số cặp (luyện đề + phân tích lỗi) — ước lượng khớp "4–6 tuần" ở nhịp 3 buổi/tuần (Mục 7). */
const PAIR_COUNT = 7;

/**
 * Giai đoạn 2 — Làm đề các năm trước: xen kẽ 1 buổi luyện đề đầy đủ + 1 buổi phân tích lỗi sai
 * (Mục 7 URD v2.0). Luân phiên cả 3 cấu hình đề có sẵn để đa dạng định dạng, không chỉ 1 cấu hình.
 */
export const phase2Templates: SessionTemplate[] = Array.from({ length: PAIR_COUNT }, (_, i) => {
  const config = allTestConfigs[i % allTestConfigs.length];
  const testSession: SessionTemplate = {
    id: `P2-TEST-${i + 1}`,
    phase: 2,
    focus: 'mock-test',
    topicIds: [],
    blocks: [{ label: `Làm đề: ${config.label}`, estimatedMinutes: config.durationMinutes, to: `/thi-thu/lam-bai/${config.id}` }],
  };
  const reviewSession: SessionTemplate = {
    id: `P2-REVIEW-${i + 1}`,
    phase: 2,
    focus: 'review',
    topicIds: [],
    blocks: [{ label: 'Phân tích lỗi sai & luyện lại', estimatedMinutes: 15, to: '/luyen-tap/luyen-lai' }],
  };
  return [testSession, reviewSession];
}).flat();
