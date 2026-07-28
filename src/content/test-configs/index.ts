import type { TestConfig } from '../../types';

/**
 * Ba cấu hình đề thi thử — khai báo bằng dữ liệu, không hard-code (FR-T01, Mục 5.2).
 * `test-generator` (GĐ4) sẽ tiêu thụ dữ liệu này; chưa xây trong lượt này.
 * Không nhắm một trường cụ thể (Mục 17, câu hỏi mở #4) nên topicWeights chia đều 6 nhóm.
 */
const EQUAL_TOPIC_WEIGHTS = { SH: 1, PS: 1, DH: 1, HH: 1, DL: 1, TD: 1 };

export const sprintConfig: TestConfig = {
  id: 'SPRINT',
  label: 'SPRINT — 50 câu / 60 phút (rèn tốc độ)',
  totalQuestions: 50,
  durationMinutes: 60,
  topicWeights: EQUAL_TOPIC_WEIGHTS,
  answerTypeRatio: { mcq: 0.5, numeric: 0.5 },
};

export const standardConfig: TestConfig = {
  id: 'STANDARD',
  label: 'STANDARD — 20 câu điền đáp số / 60 phút',
  totalQuestions: 20,
  durationMinutes: 60,
  topicWeights: EQUAL_TOPIC_WEIGHTS,
  answerTypeRatio: { numeric: 1 },
};

export const mixedConfig: TestConfig = {
  id: 'MIXED',
  label: 'MIXED — 10 điền đáp số + 2 tự luận / 60 phút',
  totalQuestions: 12,
  durationMinutes: 60,
  topicWeights: EQUAL_TOPIC_WEIGHTS,
  answerTypeRatio: { numeric: 10 / 12, essay: 2 / 12 },
};

export const allTestConfigs: TestConfig[] = [sprintConfig, standardConfig, mixedConfig];
