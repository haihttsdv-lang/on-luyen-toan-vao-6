import type { TopicProgressStatus } from '../../types';

/** Quiz dưới ngưỡng này luôn được phép sai đúng 1 câu, dù chưa đạt % ngưỡng (FR-L04). */
const SHORT_QUIZ_MAX_LENGTH = 5;

/**
 * Cập nhật trạng thái chuyên đề sau bài kiểm tra nhanh cuối bài lý thuyết (FR-L04).
 * Hàm thuần, không I/O. Đạt >= threshold thì đánh dấu "Đã nắm"; bài dưới 5 câu luôn
 * được phép sai 1 câu (đúng đặc tả URD, tránh quiz 3 câu bắt đúng tuyệt đối); không đạt
 * thì chuyển về "Đang học" trừ khi đã từng "Đã nắm" trước đó (không hạ cấp đột ngột chỉ
 * vì một lần làm lại kém — lựa chọn thận trọng khi URD không quy định rõ).
 */
export function applyQuizResult(
  currentStatus: TopicProgressStatus,
  correctCount: number,
  totalCount: number,
  threshold: number,
): TopicProgressStatus {
  const scoreRatio = totalCount > 0 ? correctCount / totalCount : 0;
  const allowedOneWrong = totalCount > 0 && totalCount < SHORT_QUIZ_MAX_LENGTH && correctCount >= totalCount - 1;

  if (scoreRatio >= threshold || allowedOneWrong) {
    return 'mastered';
  }
  if (currentStatus === 'mastered') {
    return 'mastered';
  }
  return 'learning';
}
