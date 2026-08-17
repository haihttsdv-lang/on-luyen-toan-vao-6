import type { Exercise } from '../../types';

/**
 * Chọn ngân hàng câu hỏi cho Thử thách tốc độ (GM-08) — chỉ mức cơ bản, loại `essay`
 * (cần lập luận dài, không hợp chế độ trả lời nhanh). Dự án chưa migrate sang thang
 * M1–M4 (xem ADR "Đợt 5"), nên dùng `level === 'basic'` làm ngưỡng gần đúng cho "M1–M2".
 */
export function selectSpeedChallengePool(exercises: Exercise[]): Exercise[] {
  return exercises.filter((e) => e.level === 'basic' && e.answerType !== 'essay');
}
