import type { ErrorLogEntry } from '../../types';

/**
 * Cập nhật sổ lỗi sau một lượt làm bài (FR-P05, FR-P06). Hàm thuần, không I/O.
 * - Làm sai và chưa có trong sổ lỗi -> thêm mới.
 * - Làm sai và đã có trong sổ lỗi -> reset chuỗi đúng liên tiếp về 0.
 * - Làm đúng và có trong sổ lỗi -> tăng chuỗi đúng liên tiếp; đạt 2 thì xóa khỏi sổ lỗi.
 * - Làm đúng và không có trong sổ lỗi -> không đổi gì.
 */
export function applyAttemptToErrorLog(
  errorLog: ErrorLogEntry[],
  exerciseId: string,
  correct: boolean,
  now: string,
): ErrorLogEntry[] {
  const idx = errorLog.findIndex((e) => e.exerciseId === exerciseId);

  if (!correct) {
    if (idx === -1) {
      return [...errorLog, { exerciseId, addedAt: now, consecutiveCorrect: 0 }];
    }
    return errorLog.map((e, i) => (i === idx ? { ...e, consecutiveCorrect: 0 } : e));
  }

  if (idx === -1) {
    return errorLog;
  }

  const nextCount = errorLog[idx].consecutiveCorrect + 1;
  if (nextCount >= 2) {
    return errorLog.filter((_, i) => i !== idx);
  }
  return errorLog.map((e, i) => (i === idx ? { ...e, consecutiveCorrect: nextCount } : e));
}
