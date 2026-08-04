import { describe, expect, it } from 'vitest';
import { allocateByWeight } from './allocate';

describe('allocateByWeight', () => {
  it('chia đều tổng đúng bằng total', () => {
    const result = allocateByWeight([1, 1, 1, 1, 1, 1], 20);
    expect(result.reduce((a, b) => a + b, 0)).toBe(20);
  });

  it('trọng số bằng nhau -> phân bổ gần bằng nhau', () => {
    const result = allocateByWeight([1, 1, 1, 1, 1, 1], 12);
    expect(result).toEqual([2, 2, 2, 2, 2, 2]);
  });

  it('trọng số lệch -> phần lớn hơn nhận nhiều suất hơn', () => {
    const result = allocateByWeight([3, 1], 8);
    expect(result[0]).toBeGreaterThan(result[1]);
    expect(result.reduce((a, b) => a + b, 0)).toBe(8);
  });

  it('total = 0 trả về toàn số 0', () => {
    expect(allocateByWeight([1, 1, 1], 0)).toEqual([0, 0, 0]);
  });

  it('mảng trọng số rỗng trả về mảng rỗng', () => {
    expect(allocateByWeight([], 10)).toEqual([]);
  });

  it('tổng trọng số bằng 0 trả về toàn số 0', () => {
    expect(allocateByWeight([0, 0], 5)).toEqual([0, 0]);
  });

  it('số dư được phân bổ đúng theo phần lẻ lớn nhất', () => {
    // 10 chia cho 3 phần bằng nhau: mỗi phần 3.33 -> floor 3,3,3 = 9, dư 1 -> phần đầu tiên (cùng phần lẻ) nhận thêm
    const result = allocateByWeight([1, 1, 1], 10);
    expect(result.reduce((a, b) => a + b, 0)).toBe(10);
    expect(Math.max(...result) - Math.min(...result)).toBeLessThanOrEqual(1);
  });
});
