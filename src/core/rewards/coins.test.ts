import { describe, expect, it } from 'vitest';
import { calculateSessionCoins, calculateTotalCoins } from './coins';

describe('calculateSessionCoins (GM-02, GM-03)', () => {
  it('Xuất sắc buổi nhẹ (theory/practice/review) -> cộng đủ 10 xu', () => {
    expect(calculateSessionCoins('theory', 'excellent')).toBe(10);
    expect(calculateSessionCoins('practice', 'excellent')).toBe(10);
    expect(calculateSessionCoins('review', 'excellent')).toBe(10);
  });

  it('Ổn -> cộng một nửa', () => {
    expect(calculateSessionCoins('theory', 'ok')).toBe(5);
  });

  it('Cần ôn lại -> TRỪ một nửa (không phải 0)', () => {
    expect(calculateSessionCoins('theory', 'needs-review')).toBe(-5);
  });

  it('Buổi nặng hơn (mock-test, periodic-test) có xu gốc cao hơn buổi nhẹ', () => {
    expect(calculateSessionCoins('mock-test', 'excellent')).toBe(20);
    expect(calculateSessionCoins('periodic-test', 'excellent')).toBe(25);
    expect(calculateSessionCoins('mock-test', 'excellent')).toBeGreaterThan(calculateSessionCoins('theory', 'excellent'));
  });
});

describe('calculateTotalCoins', () => {
  it('cộng dồn đúng nhiều buổi, kể cả buổi bị trừ xu', () => {
    const sessions = [
      { focus: 'theory' as const, outcome: 'excellent' as const }, // +10
      { focus: 'practice' as const, outcome: 'ok' as const }, // +5
      { focus: 'theory' as const, outcome: 'needs-review' as const }, // -5
    ];
    expect(calculateTotalCoins(sessions)).toBe(10);
  });

  it('mảng rỗng -> 0 xu', () => {
    expect(calculateTotalCoins([])).toBe(0);
  });
});
