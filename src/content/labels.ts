import type { DifficultyLevel, ScheduledSessionStatus, SessionFocus, SessionOutcome, TopicGroup, TopicProgressStatus } from '../types';

export const GROUP_LABELS: Record<TopicGroup, string> = {
  SH: 'Số học và cấu tạo số',
  PS: 'Phân số, số thập phân, tỉ số phần trăm',
  DH: 'Dạng toán điển hình',
  HH: 'Hình học',
  DL: 'Đại lượng và đo lường',
  TD: 'Toán tư duy và suy luận logic',
};

export const GROUP_ORDER: TopicGroup[] = ['SH', 'PS', 'DH', 'HH', 'DL', 'TD'];

export const GROUP_ICONS: Record<TopicGroup, string> = {
  SH: '🔢',
  PS: '🍕',
  DH: '🧩',
  HH: '📐',
  DL: '📏',
  TD: '🧠',
};

export const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  basic: 'Cơ bản',
  advanced: 'Nâng cao',
};

export const STATUS_LABELS: Record<TopicProgressStatus, string> = {
  'not-started': 'Chưa học',
  learning: 'Đang học',
  mastered: 'Đã nắm',
};

export const STATUS_ICONS: Record<TopicProgressStatus, string> = {
  'not-started': '🔒',
  learning: '⚡',
  mastered: '⭐',
};

export const SESSION_STATUS_LABELS: Record<ScheduledSessionStatus, string> = {
  completed: 'Đã hoàn thành',
  today: 'Buổi học hôm nay',
  overdue: 'Bạn đang trễ lịch',
  upcoming: 'Buổi học tiếp theo',
};

export const SESSION_FOCUS_ICONS: Record<SessionFocus, string> = {
  theory: '📖',
  practice: '✏️',
  'mock-test': '🏆',
  review: '🔁',
  'periodic-test': '📊',
};

export const SESSION_OUTCOME_LABELS: Record<SessionOutcome, string> = {
  excellent: 'Xuất sắc',
  ok: 'Ổn',
  'needs-review': 'Cần ôn lại',
};
