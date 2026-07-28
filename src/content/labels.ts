import type { DifficultyLevel, TopicGroup, TopicProgressStatus } from '../types';

export const GROUP_LABELS: Record<TopicGroup, string> = {
  SH: 'Số học và cấu tạo số',
  PS: 'Phân số, số thập phân, tỉ số phần trăm',
  DH: 'Dạng toán điển hình',
  HH: 'Hình học',
  DL: 'Đại lượng và đo lường',
  TD: 'Toán tư duy và suy luận logic',
};

export const GROUP_ORDER: TopicGroup[] = ['SH', 'PS', 'DH', 'HH', 'DL', 'TD'];

export const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  basic: 'Cơ bản',
  advanced: 'Nâng cao',
};

export const STATUS_LABELS: Record<TopicProgressStatus, string> = {
  'not-started': 'Chưa học',
  learning: 'Đang học',
  mastered: 'Đã nắm',
};
