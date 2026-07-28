import type { DifficultyLevel, SolutionStep, TopicGroup } from './common';
import type { McqAnswer } from './exercise';
import type { NumericAnswerSpec } from '../core/answer-checker/types';

export type TopicProgressStatus = 'not-started' | 'learning' | 'mastered';

/** Trạng thái học lý thuyết của một chuyên đề (FR-L01, FR-L04) — khác với
 * MasterySnapshot (mức thành thạo tính từ lịch sử luyện tập, GĐ5). */
export interface TopicProgressRecord {
  topicId: string;
  status: TopicProgressStatus;
  /** Điểm số lần làm quiz gần nhất, 0..1 */
  lastQuizScore?: number;
  updatedAt: string;
}

export interface WorkedExample {
  statement: string;
  steps: SolutionStep[];
}

/** Câu kiểm tra nhanh cuối bài lý thuyết (FR-L04), tối giản hơn Exercise đầy đủ */
export interface QuickCheckQuestion {
  id: string;
  statement: string;
  answerType: 'mcq' | 'numeric';
  mcq?: McqAnswer;
  numeric?: NumericAnswerSpec;
}

export interface Topic {
  id: string; // "DH-01", "PS-01", ...
  group: TopicGroup;
  title: string;
  level: DifficultyLevel;
  /** Giải thích phương pháp giải bằng tiếng Việt, hỗ trợ LaTeX inline */
  lesson: string;
  /** Công thức/quy tắc trọng tâm, dạng LaTeX */
  formulas: string[];
  /** 2-3 ví dụ mẫu có lời giải từng bước */
  examples: WorkedExample[];
  /** Lỗi thường gặp */
  commonMistakes: string[];
  /** 3-5 câu kiểm tra nhanh, đạt >=80% mới đánh dấu "Đã nắm" (FR-L04) */
  quickCheck: QuickCheckQuestion[];
}
