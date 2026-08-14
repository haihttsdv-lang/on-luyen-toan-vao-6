import type { SessionFocus, SessionOutcome } from '../../types';

/** Xu gốc theo độ nặng buổi học — buổi luyện đề/kiểm tra định kỳ nặng hơn nên xu cao hơn (GM-03). */
const BASE_COINS_BY_FOCUS: Record<SessionFocus, number> = {
  theory: 10,
  practice: 10,
  review: 10,
  'mock-test': 20,
  'periodic-test': 25,
};

/**
 * Xu cho một buổi học theo kết quả tự đánh giá (GM-02): "Xuất sắc" cộng đủ, "Ổn" cộng
 * một nửa, "Cần ôn lại" TRỪ một nửa — cố ý để khuyến khích tự đánh giá trung thực thay
 * vì luôn bấm mức cao nhất để lấy xu.
 */
export function calculateSessionCoins(focus: SessionFocus, outcome: SessionOutcome): number {
  const base = BASE_COINS_BY_FOCUS[focus];
  if (outcome === 'excellent') return base;
  if (outcome === 'ok') return Math.round(base / 2);
  return -Math.round(base / 2);
}

/**
 * Tổng xu hiện có — luôn TÍNH LẠI từ toàn bộ lịch sử buổi học đã hoàn thành, không lưu
 * số dư riêng, để tránh lệch sổ sách (đúng nguyên tắc "computed live" đã áp dụng cho
 * mastery-engine).
 */
export function calculateTotalCoins(sessions: { focus: SessionFocus; outcome: SessionOutcome }[]): number {
  return sessions.reduce((sum, s) => sum + calculateSessionCoins(s.focus, s.outcome), 0);
}
