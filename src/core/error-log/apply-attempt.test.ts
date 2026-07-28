import { describe, expect, it } from 'vitest';
import { applyAttemptToErrorLog } from './apply-attempt';
import type { ErrorLogEntry } from '../../types';

const NOW = '2026-07-28T00:00:00.000Z';

describe('applyAttemptToErrorLog (FR-P05, FR-P06)', () => {
  it('thêm câu vào sổ lỗi khi làm sai lần đầu', () => {
    const result = applyAttemptToErrorLog([], 'ex-1', false, NOW);
    expect(result).toEqual([{ exerciseId: 'ex-1', addedAt: NOW, consecutiveCorrect: 0 }]);
  });

  it('không thay đổi sổ lỗi khi làm đúng câu chưa từng sai', () => {
    const result = applyAttemptToErrorLog([], 'ex-1', true, NOW);
    expect(result).toEqual([]);
  });

  it('tăng chuỗi đúng liên tiếp khi làm đúng câu đang trong sổ lỗi', () => {
    const log: ErrorLogEntry[] = [{ exerciseId: 'ex-1', addedAt: NOW, consecutiveCorrect: 0 }];
    const result = applyAttemptToErrorLog(log, 'ex-1', true, NOW);
    expect(result).toEqual([{ exerciseId: 'ex-1', addedAt: NOW, consecutiveCorrect: 1 }]);
  });

  it('xóa khỏi sổ lỗi sau đúng 2 lần liên tiếp', () => {
    const log: ErrorLogEntry[] = [{ exerciseId: 'ex-1', addedAt: NOW, consecutiveCorrect: 1 }];
    const result = applyAttemptToErrorLog(log, 'ex-1', true, NOW);
    expect(result).toEqual([]);
  });

  it('reset chuỗi đúng liên tiếp về 0 nếu làm sai lại giữa chừng', () => {
    const log: ErrorLogEntry[] = [{ exerciseId: 'ex-1', addedAt: NOW, consecutiveCorrect: 1 }];
    const result = applyAttemptToErrorLog(log, 'ex-1', false, NOW);
    expect(result).toEqual([{ exerciseId: 'ex-1', addedAt: NOW, consecutiveCorrect: 0 }]);
  });

  it('không ảnh hưởng tới các câu khác trong sổ lỗi', () => {
    const log: ErrorLogEntry[] = [
      { exerciseId: 'ex-1', addedAt: NOW, consecutiveCorrect: 1 },
      { exerciseId: 'ex-2', addedAt: NOW, consecutiveCorrect: 0 },
    ];
    const result = applyAttemptToErrorLog(log, 'ex-1', true, NOW);
    expect(result).toEqual([{ exerciseId: 'ex-2', addedAt: NOW, consecutiveCorrect: 0 }]);
  });
});
