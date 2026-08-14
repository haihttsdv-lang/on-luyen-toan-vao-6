import type {
  Attempt,
  DifficultyLevel,
  ErrorLogEntry,
  ErrorType,
  Exercise,
  LearnerProfile,
  SessionOutcomeRecord,
  TestConfig,
  TestResult,
  Topic,
  TopicProgressRecord,
} from '../types';

export interface ExerciseFilter {
  topicIds?: string[];
  level?: DifficultyLevel;
}

/** Nguồn nội dung: chuyên đề, bài tập, cấu hình đề (Mục 10.5) */
export interface ContentStore {
  listTopics(): Promise<Topic[]>;
  getTopic(id: string): Promise<Topic | undefined>;
  listExercises(filter?: ExerciseFilter): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  listTestConfigs(): Promise<TestConfig[]>;
  getTestConfig(id: string): Promise<TestConfig | undefined>;
}

export interface AttemptFilter {
  exerciseId?: string;
  context?: Attempt['context'];
}

/** Tiến trình học sinh: lượt làm bài, sổ lỗi, kết quả thi thử, hồ sơ (Mục 10.5) */
export interface ProgressStore {
  addAttempt(attempt: Attempt): Promise<void>;
  getAttempts(filter?: AttemptFilter): Promise<Attempt[]>;
  /** Gán/sửa loại lỗi cho lượt làm bài sai gần nhất khớp exerciseId+timestamp (FR-P08). */
  updateAttemptErrorType(exerciseId: string, timestamp: string, errorType: ErrorType): Promise<void>;

  getErrorLog(): Promise<ErrorLogEntry[]>;

  saveTestResult(result: TestResult): Promise<void>;
  getTestResults(): Promise<TestResult[]>;

  getProfile(): Promise<LearnerProfile | undefined>;
  saveProfile(profile: LearnerProfile): Promise<void>;

  getTopicProgress(topicId: string): Promise<TopicProgressRecord | undefined>;
  listTopicProgress(): Promise<TopicProgressRecord[]>;
  saveTopicProgress(record: TopicProgressRecord): Promise<void>;

  /** Tự đánh giá cuối buổi học lộ trình (FR-C04) — nguồn sự thật duy nhất để tính lịch. */
  saveSessionOutcome(record: SessionOutcomeRecord): Promise<void>;
  listSessionOutcomes(): Promise<SessionOutcomeRecord[]>;
}
