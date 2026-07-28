export type TopicGroup = 'SH' | 'PS' | 'DH' | 'HH' | 'DL' | 'TD';

export type DifficultyLevel = 'basic' | 'advanced';

export type AnswerType = 'mcq' | 'numeric' | 'essay';

export interface SolutionStep {
  order: number;
  /** Hỗ trợ LaTeX inline qua $...$, render bằng MathRenderer */
  content: string;
  /** Câu diễn giải lý do của bước này (FR-L03) */
  rationale?: string;
}
