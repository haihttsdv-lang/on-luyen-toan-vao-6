import { describe, expect, it } from 'vitest';
import { calculateMasteryScore, classifyMasteryLevel, computeTopicMastery } from './calculate-mastery';

const CONFIG = { windowSize: 10, minAttempts: 3, needsReviewMax: 0.5, masteredMin: 0.8 };

function outcomes(...values: boolean[]) {
  return values.map((correct) => ({ correct }));
}

describe('calculateMasteryScore', () => {
  it('trả về null khi không có lượt làm nào', () => {
    expect(calculateMasteryScore([], 10)).toBeNull();
  });

  it('tất cả đúng -> điểm 1', () => {
    expect(calculateMasteryScore(outcomes(true, true, true), 10)).toBe(1);
  });

  it('tất cả sai -> điểm 0', () => {
    expect(calculateMasteryScore(outcomes(false, false, false), 10)).toBe(0);
  });

  it('lượt gần đây có trọng số cao hơn lượt cũ', () => {
    // cũ nhất sai, gần nhất đúng: điểm phải > 0.5 vì lượt đúng có trọng số lớn hơn
    const scoreRecentCorrect = calculateMasteryScore(outcomes(false, true), 10)!;
    const scoreRecentWrong = calculateMasteryScore(outcomes(true, false), 10)!;
    expect(scoreRecentCorrect).toBeGreaterThan(0.5);
    expect(scoreRecentWrong).toBeLessThan(0.5);
    expect(scoreRecentCorrect).toBeCloseTo(1 - scoreRecentWrong, 10);
  });

  it('chỉ lấy tối đa windowSize lượt gần nhất', () => {
    // 15 lượt sai rồi 5 lượt đúng gần nhất, windowSize=5 -> chỉ tính 5 lượt đúng -> điểm 1
    const attempts = [...Array(15).fill({ correct: false }), ...Array(5).fill({ correct: true })];
    expect(calculateMasteryScore(attempts, 5)).toBe(1);
  });
});

describe('classifyMasteryLevel', () => {
  it('dưới needsReviewMax -> needs-review', () => {
    expect(classifyMasteryLevel(0.3, CONFIG)).toBe('needs-review');
    expect(classifyMasteryLevel(0.49, CONFIG)).toBe('needs-review');
  });

  it('từ masteredMin trở lên -> mastered', () => {
    expect(classifyMasteryLevel(0.8, CONFIG)).toBe('mastered');
    expect(classifyMasteryLevel(1, CONFIG)).toBe('mastered');
  });

  it('ở giữa -> improving', () => {
    expect(classifyMasteryLevel(0.5, CONFIG)).toBe('improving');
    expect(classifyMasteryLevel(0.79, CONFIG)).toBe('improving');
  });
});

describe('computeTopicMastery', () => {
  it('chưa đủ minAttempts -> null (chưa có dữ liệu, không phải yếu)', () => {
    expect(computeTopicMastery(outcomes(false, false), CONFIG)).toBeNull();
  });

  it('đủ minAttempts -> tính điểm và phân loại', () => {
    const result = computeTopicMastery(outcomes(true, true, true), CONFIG);
    expect(result).toEqual({ score: 1, level: 'mastered' });
  });

  it('đủ lượt nhưng điểm thấp -> needs-review', () => {
    const result = computeTopicMastery(outcomes(false, false, false, false), CONFIG);
    expect(result).toEqual({ score: 0, level: 'needs-review' });
  });
});
