import { describe, expect, it } from 'vitest';
import { selectSpeedChallengePool } from './select-pool';
import type { Exercise } from '../../types';

function makeExercise(overrides: Partial<Exercise>): Exercise {
  return {
    id: 'ex-1',
    topicIds: ['SH-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: '1+1',
    solutionSteps: [],
    numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true },
    ...overrides,
  };
}

describe('selectSpeedChallengePool (GM-08)', () => {
  it('giữ lại bài mức cơ bản, loại essay', () => {
    const exercises = [
      makeExercise({ id: 'a', level: 'basic', answerType: 'numeric' }),
      makeExercise({ id: 'b', level: 'advanced', answerType: 'numeric' }),
      makeExercise({ id: 'c', level: 'basic', answerType: 'essay', essay: { modelSolution: '', rubric: [] } }),
      makeExercise({ id: 'd', level: 'basic', answerType: 'mcq', mcq: { options: ['1', '2', '3', '4'], answerIndex: 0 } }),
    ];
    const result = selectSpeedChallengePool(exercises).map((e) => e.id);
    expect(result).toEqual(['a', 'd']);
  });

  it('trả về mảng rỗng nếu không có bài cơ bản nào', () => {
    const exercises = [makeExercise({ level: 'advanced' })];
    expect(selectSpeedChallengePool(exercises)).toEqual([]);
  });
});
