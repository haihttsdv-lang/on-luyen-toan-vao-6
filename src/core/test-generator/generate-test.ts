import type { AnswerType, Exercise, TestConfig, TopicGroup } from '../../types';
import { allocateByWeight } from './allocate';
import { shuffle } from './shuffle';

export interface GeneratedTest {
  exercises: Exercise[];
  requestedTotal: number;
  /** Số câu còn thiếu so với yêu cầu do ngân hàng nội dung chưa đủ (0 nếu đủ). */
  shortfall: number;
}

const GROUP_ORDER: TopicGroup[] = ['SH', 'PS', 'DH', 'HH', 'DL', 'TD'];
const ANSWER_TYPES: AnswerType[] = ['mcq', 'numeric', 'essay'];

function groupOfExercise(ex: Exercise): TopicGroup | undefined {
  const primaryTopicId = ex.topicIds[0];
  if (!primaryTopicId) return undefined;
  const prefix = primaryTopicId.split('-')[0];
  return (GROUP_ORDER as string[]).includes(prefix) ? (prefix as TopicGroup) : undefined;
}

function selectForAnswerType(
  pool: Exercise[],
  groupWeights: Partial<Record<TopicGroup, number>>,
  targetTotal: number,
  rng: () => number,
): Exercise[] {
  if (targetTotal <= 0) return [];

  const poolByGroup = new Map<TopicGroup, Exercise[]>(
    GROUP_ORDER.map((group) => [group, shuffle(pool.filter((ex) => groupOfExercise(ex) === group), rng)]),
  );

  const weights = GROUP_ORDER.map((g) => groupWeights[g] ?? 0);
  const desired = allocateByWeight(weights, targetTotal);

  const selected: Exercise[] = [];
  let shortfall = 0;
  GROUP_ORDER.forEach((group, i) => {
    const available = poolByGroup.get(group)!;
    const take = Math.min(desired[i], available.length);
    selected.push(...available.splice(0, take));
    shortfall += desired[i] - take;
  });

  // Ngân hàng nội dung chưa đủ ở một số nhóm (GĐ6 sẽ bổ sung) -> bù từ nhóm còn dư
  if (shortfall > 0) {
    for (const group of GROUP_ORDER) {
      if (shortfall <= 0) break;
      const available = poolByGroup.get(group)!;
      const take = Math.min(shortfall, available.length);
      if (take > 0) {
        selected.push(...available.splice(0, take));
        shortfall -= take;
      }
    }
  }

  return selected;
}

/**
 * Sinh đề thi thử theo cấu hình (FR-T01, FR-T02): đúng tổng số câu và đúng tỷ lệ loại
 * đáp án khi ngân hàng nội dung đủ. Nếu chưa đủ nội dung (ví dụ khi mới chỉ có vài
 * chuyên đề mẫu), trả về đề ngắn hơn kèm `shortfall` thay vì báo lỗi hay đứng yên.
 */
export function generateTest(config: TestConfig, pool: Exercise[], rng: () => number = Math.random): GeneratedTest {
  const typeWeights = ANSWER_TYPES.map((t) => config.answerTypeRatio[t] ?? 0);
  const typeTargets = allocateByWeight(typeWeights, config.totalQuestions);

  let exercises: Exercise[] = [];
  ANSWER_TYPES.forEach((type, i) => {
    const target = typeTargets[i];
    if (target <= 0) return;
    const poolForType = pool.filter((ex) => ex.answerType === type);
    exercises = exercises.concat(selectForAnswerType(poolForType, config.topicWeights, target, rng));
  });

  exercises = shuffle(exercises, rng);

  return {
    exercises,
    requestedTotal: config.totalQuestions,
    shortfall: config.totalQuestions - exercises.length,
  };
}
