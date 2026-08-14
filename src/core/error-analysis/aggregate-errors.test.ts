import { describe, expect, it } from 'vitest';
import { aggregateErrorsByTopic, aggregateErrorsByType } from './aggregate-errors';
import type { Attempt } from '../../types';

function makeAttempt(overrides: Partial<Attempt>): Attempt {
  return {
    exerciseId: 'ex-1',
    correct: false,
    userAnswer: '0',
    timeSpentMs: 0,
    timestamp: '2026-08-14T00:00:00.000Z',
    context: 'practice',
    ...overrides,
  };
}

describe('aggregateErrorsByTopic (FR-P08)', () => {
  it('đếm đúng số lượt sai theo chuyên đề, bỏ qua lượt đúng', () => {
    const attempts = [
      makeAttempt({ exerciseId: 'ex-1', correct: false }),
      makeAttempt({ exerciseId: 'ex-1', correct: false }),
      makeAttempt({ exerciseId: 'ex-2', correct: true }),
      makeAttempt({ exerciseId: 'ex-3', correct: false }),
    ];
    const topicIdsByExercise = new Map([
      ['ex-1', ['SH-01']],
      ['ex-2', ['SH-01']],
      ['ex-3', ['PS-01']],
    ]);
    const result = aggregateErrorsByTopic(attempts, topicIdsByExercise);
    expect(result).toEqual([
      { topicId: 'SH-01', count: 2 },
      { topicId: 'PS-01', count: 1 },
    ]);
  });

  it('tính vào cả 2 chuyên đề nếu bài gắn nhiều topicIds', () => {
    const attempts = [makeAttempt({ exerciseId: 'ex-1', correct: false })];
    const topicIdsByExercise = new Map([['ex-1', ['SH-01', 'PS-01']]]);
    const result = aggregateErrorsByTopic(attempts, topicIdsByExercise);
    expect(result).toEqual(
      expect.arrayContaining([
        { topicId: 'SH-01', count: 1 },
        { topicId: 'PS-01', count: 1 },
      ]),
    );
  });

  it('trả về mảng rỗng khi không có lượt sai nào', () => {
    const attempts = [makeAttempt({ correct: true })];
    expect(aggregateErrorsByTopic(attempts, new Map())).toEqual([]);
  });
});

describe('aggregateErrorsByType (FR-P08)', () => {
  it('đếm đúng theo errorType, gom nhóm chưa phân loại', () => {
    const attempts = [
      makeAttempt({ correct: false, errorType: 'sai_don_vi' }),
      makeAttempt({ correct: false, errorType: 'sai_don_vi' }),
      makeAttempt({ correct: false, errorType: 'tinh_toan_sai' }),
      makeAttempt({ correct: false }),
      makeAttempt({ correct: true, errorType: undefined }),
    ];
    const result = aggregateErrorsByType(attempts);
    expect(result).toEqual([
      { errorType: 'sai_don_vi', count: 2 },
      { errorType: 'tinh_toan_sai', count: 1 },
      { errorType: 'chua_phan_loai', count: 1 },
    ]);
  });
});
