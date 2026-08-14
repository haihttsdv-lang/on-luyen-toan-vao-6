export type CurriculumPhaseId = 1 | 2 | 3 | 4;

export type SessionFocus = 'theory' | 'practice' | 'mock-test' | 'review' | 'periodic-test';

/** Xuất sắc / Ổn / Cần ôn lại (FR-C04) */
export type SessionOutcome = 'excellent' | 'ok' | 'needs-review';

export interface CurriculumPhase {
  id: CurriculumPhaseId;
  label: string;
  description: string;
}

/** Một khối trong buổi học (FR-C03) — bấm vào là điều hướng thẳng tới nội dung. */
export interface SessionBlock {
  label: string;
  estimatedMinutes: number;
  to: string;
  /** State truyền kèm khi điều hướng (vd. topicIds cho Luyện tập) — giống cách PracticeSetup dùng. */
  navState?: Record<string, unknown>;
}

/** Khuôn mẫu một buổi học — dữ liệu tĩnh hoặc sinh động, không gắn ngày cụ thể. */
export interface SessionTemplate {
  id: string;
  phase: CurriculumPhaseId;
  focus: SessionFocus;
  topicIds: string[];
  blocks: SessionBlock[];
}

export type ScheduledSessionStatus = 'completed' | 'today' | 'overdue' | 'upcoming';

/** Một buổi học đã gắn ngày cụ thể — luôn được TÍNH lại, không lưu trữ (FR-C01, FR-C02). */
export interface ScheduledSession {
  template: SessionTemplate;
  order: number;
  date: string; // ISO date (yyyy-mm-dd)
  status: ScheduledSessionStatus;
  outcome?: SessionOutcome;
}

/** Nguồn sự thật duy nhất cho việc tính lịch — lưu trữ, không lưu ngày lịch đã tính (FR-C04). */
export interface SessionOutcomeRecord {
  templateId: string;
  outcome: SessionOutcome;
  completedAt: string; // ISO 8601
}
