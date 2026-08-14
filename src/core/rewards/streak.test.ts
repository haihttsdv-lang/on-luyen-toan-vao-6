import { describe, expect, it } from 'vitest';
import { calculateStreak } from './streak';
import type { SessionOutcomeRecord } from '../../types';

function outcome(templateId: string, outcome: SessionOutcomeRecord['outcome'], completedAt: string): SessionOutcomeRecord {
  return { templateId, outcome, completedAt };
}

describe('calculateStreak (GM-04)', () => {
  it('không có buổi nào -> chuỗi 0', () => {
    expect(calculateStreak([])).toBe(0);
  });

  it('toàn bộ buổi đều tốt -> chuỗi bằng tổng số buổi', () => {
    const outcomes = [
      outcome('T1', 'excellent', '2026-01-01'),
      outcome('T2', 'ok', '2026-01-02'),
      outcome('T3', 'excellent', '2026-01-03'),
    ];
    expect(calculateStreak(outcomes)).toBe(3);
  });

  it('có 1 buổi "Cần ôn lại" ở giữa -> chuỗi chỉ tính từ SAU buổi đó trở đi', () => {
    const outcomes = [
      outcome('T1', 'excellent', '2026-01-01'),
      outcome('T2', 'needs-review', '2026-01-02'),
      outcome('T3', 'excellent', '2026-01-03'),
      outcome('T4', 'ok', '2026-01-04'),
    ];
    expect(calculateStreak(outcomes)).toBe(2);
  });

  it('buổi gần nhất là "Cần ôn lại" -> chuỗi = 0 dù các buổi trước đó tốt', () => {
    const outcomes = [
      outcome('T1', 'excellent', '2026-01-01'),
      outcome('T2', 'excellent', '2026-01-02'),
      outcome('T3', 'needs-review', '2026-01-03'),
    ];
    expect(calculateStreak(outcomes)).toBe(0);
  });

  it('không phụ thuộc thứ tự mảng đầu vào, luôn tự sắp theo completedAt', () => {
    const outcomes = [
      outcome('T3', 'excellent', '2026-01-03'),
      outcome('T1', 'excellent', '2026-01-01'),
      outcome('T2', 'needs-review', '2026-01-02'),
    ];
    expect(calculateStreak(outcomes)).toBe(1);
  });
});
