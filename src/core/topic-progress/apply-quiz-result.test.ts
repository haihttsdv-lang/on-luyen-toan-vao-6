import { describe, expect, it } from 'vitest';
import { applyQuizResult } from './apply-quiz-result';

const THRESHOLD = 0.8;

describe('applyQuizResult (FR-L04)', () => {
  it('đạt >= ngưỡng từ trạng thái chưa học -> Đã nắm', () => {
    expect(applyQuizResult('not-started', 0.8, THRESHOLD)).toBe('mastered');
  });

  it('đạt tuyệt đối 100% -> Đã nắm', () => {
    expect(applyQuizResult('learning', 1, THRESHOLD)).toBe('mastered');
  });

  it('không đạt ngưỡng từ trạng thái chưa học -> Đang học', () => {
    expect(applyQuizResult('not-started', 0.6, THRESHOLD)).toBe('learning');
  });

  it('không đạt ngưỡng từ trạng thái đang học -> vẫn Đang học', () => {
    expect(applyQuizResult('learning', 0.79, THRESHOLD)).toBe('learning');
  });

  it('đã Đã nắm trước đó, làm lại kém hơn -> không hạ cấp', () => {
    expect(applyQuizResult('mastered', 0.2, THRESHOLD)).toBe('mastered');
  });
});
