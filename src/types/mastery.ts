export type MasteryLevel = 'needs-review' | 'improving' | 'mastered';

/** Tính từ Attempt; nên cache nếu tính toán nặng (Mục 11) */
export interface MasterySnapshot {
  topicId: string;
  masteryScore: number; // 0..1
  level: MasteryLevel;
  lastUpdated: string; // ISO 8601
}

export interface LearnerProfile {
  /** Biệt danh, KHÔNG phải tên thật (NFR-03) */
  alias: string;
  targetSchoolConfig?: string;
  createdAt: string;
}
