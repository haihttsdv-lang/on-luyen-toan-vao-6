const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Cắt về đầu ngày (00:00 giờ địa phương) để so sánh ngày không lệch do giờ/phút. */
export function startOfDay(iso: string): Date {
  const d = new Date(iso);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(d: Date, days: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}

export function maxDate(a: Date, b: Date): Date {
  return a.getTime() >= b.getTime() ? a : b;
}

export function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / MS_PER_DAY);
}

/**
 * Ngày học hợp lệ (theo `weeklyDays`, 0=CN..6=T7) gần nhất từ `from` trở đi.
 * `strictlyAfter=true` bắt buộc phải sau `from` (dùng khi `from` chính là một buổi đã xếp lịch).
 */
export function nextValidDay(from: Date, weeklyDays: number[], strictlyAfter = false): Date {
  const days = weeklyDays.length > 0 ? weeklyDays : [1, 2, 3, 4, 5, 6, 0];
  let candidate = strictlyAfter ? addDays(from, 1) : from;
  for (let i = 0; i < 8; i++) {
    if (days.includes(candidate.getDay())) return candidate;
    candidate = addDays(candidate, 1);
  }
  return candidate;
}
