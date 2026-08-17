import { describe, expect, it } from 'vitest';
import { isNewBestScore } from './best-score';

describe('isNewBestScore (GM-08)', () => {
  it('luôn đúng khi chưa có kỷ lục trước đó', () => {
    expect(isNewBestScore(0, null)).toBe(true);
    expect(isNewBestScore(5, null)).toBe(true);
  });

  it('đúng khi điểm mới cao hơn kỷ lục cũ', () => {
    expect(isNewBestScore(8, 5)).toBe(true);
  });

  it('sai khi điểm mới bằng hoặc thấp hơn kỷ lục cũ', () => {
    expect(isNewBestScore(5, 5)).toBe(false);
    expect(isNewBestScore(3, 5)).toBe(false);
  });
});
