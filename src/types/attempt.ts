import type { TopicGroup } from './common';

export type AttemptContext = 'practice' | 'test' | 'diagnostic';

/** Lượt làm bài — nguồn tính mức thành thạo (FR-H03) */
export interface Attempt {
  exerciseId: string;
  correct: boolean;
  userAnswer: string;
  timeSpentMs: number;
  timestamp: string; // ISO 8601
  context: AttemptContext;
}

/** Sổ lỗi — FR-P05, FR-P06 */
export interface ErrorLogEntry {
  exerciseId: string;
  addedAt: string;
  /** Số lần đúng liên tiếp kể từ khi thêm vào sổ lỗi; xóa khi đạt 2 (FR-P06) */
  consecutiveCorrect: number;
}

export interface TestResult {
  configId: string;
  date: string;
  autoScore: number;
  /** Điểm tự chấm phần tự luận — tách riêng khỏi autoScore (FR-M18) */
  selfScore?: number;
  total: number;
  byTopicGroup: Partial<Record<TopicGroup, { correct: number; total: number }>>;
  durationUsedSeconds: number;
}
