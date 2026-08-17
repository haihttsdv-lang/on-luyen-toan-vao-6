import type { BackupData } from '../../types';

/** Kiểm tra cấu trúc tối thiểu của file JSON khôi phục trước khi ghi đè dữ liệu (FR-H11). Hàm thuần. */
export function isValidBackupData(value: unknown): value is BackupData {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    v.version === 1 &&
    typeof v.exportedAt === 'string' &&
    Array.isArray(v.attempts) &&
    Array.isArray(v.errorLog) &&
    Array.isArray(v.testResults) &&
    Array.isArray(v.topicProgress) &&
    Array.isArray(v.sessionOutcomes)
  );
}
