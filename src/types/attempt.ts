import type { TopicGroup } from './common';

export type AttemptContext = 'practice' | 'test' | 'diagnostic';

/**
 * Loại lỗi sai (FR-P08) — 'sai_don_vi' được hệ thống tự gán khi bộ chấm phát hiện
 * (`CheckResult.status === 'wrong_unit'`); 4 loại còn lại do học sinh tự chọn
 * (không bắt buộc) ngay sau khi xem lời giải của một câu làm sai.
 */
export type ErrorType = 'sai_cong_thuc' | 'sai_don_vi' | 'nham_du_kien' | 'tinh_toan_sai' | 'khong_nhan_dang';

/** Lượt làm bài — nguồn tính mức thành thạo (FR-H03) */
export interface Attempt {
  exerciseId: string;
  correct: boolean;
  userAnswer: string;
  timeSpentMs: number;
  timestamp: string; // ISO 8601
  context: AttemptContext;
  /** Chỉ có khi làm sai, gán tự động hoặc tự chọn (FR-P08) */
  errorType?: ErrorType;
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
