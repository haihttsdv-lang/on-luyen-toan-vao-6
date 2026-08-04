import type { MasteryLevel } from '../../types';

export interface AttemptOutcome {
  correct: boolean;
}

export interface MasteryConfig {
  windowSize: number;
  minAttempts: number;
  needsReviewMax: number;
  masteredMin: number;
}

/**
 * Tính điểm thành thạo (0..1) — trung bình có trọng số của tối đa `windowSize` lượt
 * làm gần nhất, lượt gần đây có trọng số cao hơn (FR-H03). `attempts` phải được sắp
 * xếp theo thời gian tăng dần (cũ nhất trước). Hàm thuần, không I/O.
 */
export function calculateMasteryScore(attempts: AttemptOutcome[], windowSize: number): number | null {
  if (attempts.length === 0) return null;
  const recent = attempts.slice(-windowSize);
  let weightedSum = 0;
  let weightTotal = 0;
  recent.forEach((a, i) => {
    const weight = i + 1; // cũ nhất trong cửa sổ = 1, gần nhất = recent.length
    weightedSum += (a.correct ? 1 : 0) * weight;
    weightTotal += weight;
  });
  return weightedSum / weightTotal;
}

/** Phân loại 3 mức thành thạo theo ngưỡng cấu hình (FR-H04). */
export function classifyMasteryLevel(score: number, config: Pick<MasteryConfig, 'needsReviewMax' | 'masteredMin'>): MasteryLevel {
  if (score < config.needsReviewMax) return 'needs-review';
  if (score >= config.masteredMin) return 'mastered';
  return 'improving';
}

export interface TopicMastery {
  score: number;
  level: MasteryLevel;
}

/**
 * Tính mức thành thạo đầy đủ cho một chuyên đề. Trả về null nếu chưa đủ số lượt
 * làm tối thiểu để tính chính thức (FR-H03) — khi đó chuyên đề ở trạng thái
 * "chưa có dữ liệu" (FR-H02), không phải "yếu".
 */
export function computeTopicMastery(attempts: AttemptOutcome[], config: MasteryConfig): TopicMastery | null {
  if (attempts.length < config.minAttempts) return null;
  const score = calculateMasteryScore(attempts, config.windowSize);
  if (score === null) return null;
  return { score, level: classifyMasteryLevel(score, config) };
}
