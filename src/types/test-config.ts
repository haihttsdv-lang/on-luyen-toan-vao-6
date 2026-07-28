import type { AnswerType, TopicGroup } from './common';

/** Cấu hình đề thi thử — khai báo bằng dữ liệu, không hard-code (FR-T01) */
export interface TestConfig {
  id: string; // 'SPRINT' | 'STANDARD' | 'MIXED' | tùy chỉnh sau này
  label: string;
  totalQuestions: number;
  durationMinutes: number;
  topicWeights: Partial<Record<TopicGroup, number>>;
  answerTypeRatio: Partial<Record<AnswerType, number>>;
}
