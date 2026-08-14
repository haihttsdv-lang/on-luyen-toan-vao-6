import type { SessionOutcomeRecord } from '../../types';

/**
 * Chuỗi buổi học liên tiếp gần đây có kết quả tốt (GM-04) — đếm ngược từ buổi hoàn
 * thành gần nhất, dừng lại ngay khi gặp một buổi "Cần ôn lại". Đơn giản hóa có chủ đích:
 * không đối chiếu lại xem buổi đó có bị trễ lịch tại thời điểm hoàn thành hay không (lịch
 * luôn được tính lại động nên không tái dựng chính xác trạng thái quá khứ), chỉ đo tính
 * liên tục về CHẤT LƯỢNG (không có buổi nào phải ôn lại xen giữa).
 */
export function calculateStreak(outcomes: SessionOutcomeRecord[]): number {
  const sorted = [...outcomes].sort((a, b) => a.completedAt.localeCompare(b.completedAt));
  let streak = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].outcome === 'needs-review') break;
    streak++;
  }
  return streak;
}
