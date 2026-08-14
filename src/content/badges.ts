export interface BadgeDef {
  id: string;
  label: string;
  icon: string;
  /** Điều kiện đạt được, hiển thị khi huy hiệu chưa đạt (GM-05). */
  description: string;
}

/** Danh mục huy hiệu (GM-04) — dữ liệu tĩnh, không hardcode điều kiện trong UI. */
export const BADGE_DEFS: BadgeDef[] = [
  { id: 'phase-1-complete', label: 'Vượt Nền tảng', icon: '🧱', description: 'Hoàn thành toàn bộ buổi học Giai đoạn 1' },
  { id: 'phase-2-complete', label: 'Vượt Làm đề', icon: '📝', description: 'Hoàn thành toàn bộ buổi học Giai đoạn 2' },
  { id: 'phase-3-complete', label: 'Vượt Nâng cao', icon: '🚀', description: 'Hoàn thành toàn bộ buổi học Giai đoạn 3' },
  { id: 'streak-5', label: 'Chuỗi 5 buổi', icon: '🔥', description: 'Hoàn thành 5 buổi liên tiếp không cần ôn lại' },
  { id: 'test-80', label: 'Thi thử trên 80%', icon: '🏆', description: 'Đạt từ 80% trở lên trong một lần thi thử' },
  { id: 'week-active', label: 'Học đều 1 tuần', icon: '📅', description: 'Hoàn thành từ 3 buổi học trong 7 ngày gần nhất' },
];
