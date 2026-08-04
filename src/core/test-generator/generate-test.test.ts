import { describe, expect, it } from 'vitest';
import { generateTest } from './generate-test';
import type { AnswerType, Exercise, TestConfig, TopicGroup } from '../../types';

const DETERMINISTIC_RNG = () => 0.5;

function makeExercises(group: TopicGroup, type: AnswerType, count: number): Exercise[] {
  return Array.from({ length: count }, (_, i) => {
    const base: Exercise = {
      id: `${group}-${type}-${i}`,
      topicIds: [`${group}-01`],
      level: 'basic',
      answerType: type,
      statement: 'x',
      solutionSteps: [{ order: 1, content: 'x' }],
    };
    if (type === 'mcq') base.mcq = { options: ['a', 'b', 'c', 'd'], answerIndex: 0 };
    if (type === 'numeric') base.numeric = { kind: 'single', acceptedValues: ['1'], tolerance: 0 };
    if (type === 'essay') base.essay = { modelSolution: 'x', rubric: [{ criterion: 'x', points: 1 }] };
    return base;
  });
}

const EQUAL_WEIGHTS: Partial<Record<TopicGroup, number>> = { SH: 1, PS: 1, DH: 1, HH: 1, DL: 1, TD: 1 };

describe('generateTest (FR-T01, FR-T02)', () => {
  it('đủ nội dung -> sinh đúng tổng số câu, shortfall = 0', () => {
    const pool = ['SH', 'PS', 'DH', 'HH', 'DL', 'TD'].flatMap((g) => makeExercises(g as TopicGroup, 'numeric', 10));
    const config: TestConfig = {
      id: 'STANDARD',
      label: 'test',
      totalQuestions: 20,
      durationMinutes: 60,
      topicWeights: EQUAL_WEIGHTS,
      answerTypeRatio: { numeric: 1 },
    };
    const result = generateTest(config, pool, DETERMINISTIC_RNG);
    expect(result.exercises.length).toBe(20);
    expect(result.shortfall).toBe(0);
    expect(result.exercises.every((e) => e.answerType === 'numeric')).toBe(true);
  });

  it('đúng tỷ lệ loại đáp án (MIXED: 10 numeric + 2 essay)', () => {
    const pool = [
      ...makeExercises('DH', 'numeric', 20),
      ...makeExercises('DH', 'essay', 10),
    ];
    const config: TestConfig = {
      id: 'MIXED',
      label: 'test',
      totalQuestions: 12,
      durationMinutes: 60,
      topicWeights: { DH: 1 },
      answerTypeRatio: { numeric: 10 / 12, essay: 2 / 12 },
    };
    const result = generateTest(config, pool, DETERMINISTIC_RNG);
    const numericCount = result.exercises.filter((e) => e.answerType === 'numeric').length;
    const essayCount = result.exercises.filter((e) => e.answerType === 'essay').length;
    expect(numericCount).toBe(10);
    expect(essayCount).toBe(2);
    expect(result.shortfall).toBe(0);
  });

  it('thiếu nội dung ở một nhóm -> bù từ nhóm khác, vẫn đủ tổng số câu', () => {
    const pool = [
      ...makeExercises('SH', 'numeric', 0),
      ...makeExercises('PS', 'numeric', 20),
      ...makeExercises('DH', 'numeric', 20),
      ...makeExercises('HH', 'numeric', 20),
      ...makeExercises('DL', 'numeric', 20),
      ...makeExercises('TD', 'numeric', 20),
    ];
    const config: TestConfig = {
      id: 'STANDARD',
      label: 'test',
      totalQuestions: 20,
      durationMinutes: 60,
      topicWeights: EQUAL_WEIGHTS,
      answerTypeRatio: { numeric: 1 },
    };
    const result = generateTest(config, pool, DETERMINISTIC_RNG);
    expect(result.exercises.length).toBe(20);
    expect(result.shortfall).toBe(0);
  });

  it('ngân hàng nội dung chỉ có vài chuyên đề mẫu -> trả về đề ngắn hơn kèm shortfall, không lỗi', () => {
    const pool = [...makeExercises('DH', 'numeric', 5), ...makeExercises('PS', 'numeric', 5)];
    const config: TestConfig = {
      id: 'STANDARD',
      label: 'test',
      totalQuestions: 20,
      durationMinutes: 60,
      topicWeights: EQUAL_WEIGHTS,
      answerTypeRatio: { numeric: 1 },
    };
    const result = generateTest(config, pool, DETERMINISTIC_RNG);
    expect(result.exercises.length).toBe(10);
    expect(result.shortfall).toBe(10);
    expect(result.requestedTotal).toBe(20);
  });

  it('không chọn trùng một bài tập hai lần', () => {
    const pool = makeExercises('DH', 'numeric', 15);
    const config: TestConfig = {
      id: 'STANDARD',
      label: 'test',
      totalQuestions: 15,
      durationMinutes: 60,
      topicWeights: { DH: 1 },
      answerTypeRatio: { numeric: 1 },
    };
    const result = generateTest(config, pool, DETERMINISTIC_RNG);
    const ids = result.exercises.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('pool rỗng -> trả về đề rỗng, shortfall bằng đúng số câu yêu cầu', () => {
    const config: TestConfig = {
      id: 'STANDARD',
      label: 'test',
      totalQuestions: 20,
      durationMinutes: 60,
      topicWeights: EQUAL_WEIGHTS,
      answerTypeRatio: { numeric: 1 },
    };
    const result = generateTest(config, [], DETERMINISTIC_RNG);
    expect(result.exercises).toEqual([]);
    expect(result.shortfall).toBe(20);
  });
});
