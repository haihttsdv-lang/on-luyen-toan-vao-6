import { CURRICULUM_CONFIG } from '../../config/thresholds';

/**
 * Gợi ý bỏ qua Giai đoạn 1 khi bài kiểm tra đầu vào đạt đủ ngưỡng (Mục 7 URD v2.0).
 * Chỉ hiển thị gợi ý, không tự động nhảy — nơi gọi (UI) chịu trách nhiệm đó.
 */
export function shouldSuggestSkipPhase1(diagnosticScore: number | undefined): boolean {
  if (diagnosticScore === undefined) return false;
  return diagnosticScore >= CURRICULUM_CONFIG.skipPhase1Threshold;
}
