import type { TopicProgressStatus } from '../../types';

/**
 * Cập nhật trạng thái chuyên đề sau bài kiểm tra nhanh cuối bài lý thuyết (FR-L04).
 * Hàm thuần, không I/O. Đạt >= threshold thì đánh dấu "Đã nắm"; không đạt thì chuyển
 * về "Đang học" trừ khi đã từng "Đã nắm" trước đó (không hạ cấp một cách đột ngột
 * chỉ vì một lần làm lại kém — lựa chọn thận trọng khi URD không quy định rõ).
 */
export function applyQuizResult(
  currentStatus: TopicProgressStatus,
  scoreRatio: number,
  threshold: number,
): TopicProgressStatus {
  if (scoreRatio >= threshold) {
    return 'mastered';
  }
  if (currentStatus === 'mastered') {
    return 'mastered';
  }
  return 'learning';
}
