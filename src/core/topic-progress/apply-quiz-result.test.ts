import { describe, expect, it } from 'vitest';
import { applyQuizResult } from './apply-quiz-result';

const THRESHOLD = 0.8;

describe('applyQuizResult (FR-L04)', () => {
  it('đạt >= ngưỡng từ trạng thái chưa học -> Đã nắm', () => {
    expect(applyQuizResult('not-started', 4, 5, THRESHOLD)).toBe('mastered');
  });

  it('đạt tuyệt đối 100% -> Đã nắm', () => {
    expect(applyQuizResult('learning', 5, 5, THRESHOLD)).toBe('mastered');
  });

  it('không đạt ngưỡng, quiz đủ dài (>=5 câu) -> Đang học', () => {
    expect(applyQuizResult('not-started', 3, 5, THRESHOLD)).toBe('learning');
  });

  it('đã Đã nắm trước đó, làm lại kém hơn -> không hạ cấp', () => {
    expect(applyQuizResult('mastered', 1, 5, THRESHOLD)).toBe('mastered');
  });

  describe('quiz dưới 5 câu luôn được phép sai 1 câu', () => {
    it('quiz 3 câu, đúng 2/3 (66,7% < 80%) -> vẫn Đã nắm nhờ luật sai-1-câu', () => {
      expect(applyQuizResult('not-started', 2, 3, THRESHOLD)).toBe('mastered');
    });

    it('quiz 3 câu, đúng 3/3 -> Đã nắm', () => {
      expect(applyQuizResult('learning', 3, 3, THRESHOLD)).toBe('mastered');
    });

    it('quiz 3 câu, đúng 1/3 (sai 2 câu) -> không đủ điều kiện, Đang học', () => {
      expect(applyQuizResult('not-started', 1, 3, THRESHOLD)).toBe('learning');
    });

    it('quiz 4 câu, đúng 3/4 (75% < 80%) -> vẫn Đã nắm nhờ luật sai-1-câu', () => {
      expect(applyQuizResult('not-started', 3, 4, THRESHOLD)).toBe('mastered');
    });

    it('quiz đúng 5 câu (không phải "dưới 5") -> luật sai-1-câu KHÔNG áp dụng', () => {
      // 4/5 = 80% => đạt ngưỡng bình thường, không cần luật đặc biệt
      expect(applyQuizResult('not-started', 4, 5, THRESHOLD)).toBe('mastered');
      // 3/5 = 60% => luật sai-1-câu không áp dụng vì quiz đủ 5 câu, không "dưới 5"
      expect(applyQuizResult('not-started', 3, 5, THRESHOLD)).toBe('learning');
    });
  });
});
