import type { Attempt, ErrorLogEntry } from './attempt';
import type { SessionOutcomeRecord } from './curriculum';
import type { LearnerProfile } from './mastery';
import type { TestResult } from './attempt';
import type { TopicProgressRecord } from './topic';

/**
 * Toàn bộ tiến độ học tập của một máy, dùng chung cho sao lưu/khôi phục JSON cục bộ
 * (FR-H11) và đồng bộ đa thiết bị qua Firebase (SY-02 — cùng một định dạng, chỉ khác
 * nơi lưu). Không bao gồm nội dung bài học (tĩnh, không phải dữ liệu người dùng).
 */
export interface BackupData {
  version: 1;
  exportedAt: string;
  attempts: Attempt[];
  errorLog: ErrorLogEntry[];
  testResults: TestResult[];
  profile?: LearnerProfile;
  topicProgress: TopicProgressRecord[];
  sessionOutcomes: SessionOutcomeRecord[];
}
