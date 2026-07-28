import type { AnswerType, DifficultyLevel, SolutionStep } from './common';
import type { NumericAnswerSpec } from '../core/answer-checker/types';

export interface McqAnswer {
  options: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
}

export interface RubricItem {
  criterion: string;
  points: number;
}

export interface EssayAnswer {
  modelSolution: string;
  rubric: RubricItem[];
}

export interface Exercise {
  id: string;
  /** Ít nhất 1 mã chuyên đề */
  topicIds: string[];
  level: DifficultyLevel;
  answerType: AnswerType;
  /** Đề bài, hỗ trợ LaTeX inline qua $...$ */
  statement: string;
  /** Hình vẽ SVG nội tuyến, tùy chọn */
  figure?: string;
  /** Lời giải từng bước — bắt buộc với mọi loại đáp án */
  solutionSteps: SolutionStep[];
  mcq?: McqAnswer;
  numeric?: NumericAnswerSpec;
  essay?: EssayAnswer;
}
