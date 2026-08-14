import type { Attempt, ErrorType } from '../../types';

export interface TopicErrorStat {
  topicId: string;
  count: number;
}

/** 'chua_phan_loai' = lượt làm sai chưa có errorType (học sinh bỏ qua bước tự chọn). */
export interface ErrorTypeStat {
  errorType: ErrorType | 'chua_phan_loai';
  count: number;
}

/**
 * Thống kê số lượt làm sai theo chuyên đề (FR-P08). Hàm thuần, không I/O.
 * topicIdsByExercise: map exerciseId -> danh sách mã chuyên đề của bài đó (Exercise.topicIds).
 * Một lượt sai gắn nhiều chuyên đề sẽ được tính vào từng chuyên đề đó.
 */
export function aggregateErrorsByTopic(
  attempts: Attempt[],
  topicIdsByExercise: Map<string, string[]>,
): TopicErrorStat[] {
  const counts = new Map<string, number>();
  for (const a of attempts) {
    if (a.correct) continue;
    const topicIds = topicIdsByExercise.get(a.exerciseId) ?? [];
    for (const topicId of topicIds) {
      counts.set(topicId, (counts.get(topicId) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([topicId, count]) => ({ topicId, count }))
    .sort((a, b) => b.count - a.count);
}

/** Thống kê số lượt làm sai theo loại lỗi (FR-P08). Hàm thuần, không I/O. */
export function aggregateErrorsByType(attempts: Attempt[]): ErrorTypeStat[] {
  const counts = new Map<ErrorType | 'chua_phan_loai', number>();
  for (const a of attempts) {
    if (a.correct) continue;
    const key = a.errorType ?? 'chua_phan_loai';
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([errorType, count]) => ({ errorType, count }))
    .sort((a, b) => b.count - a.count);
}
