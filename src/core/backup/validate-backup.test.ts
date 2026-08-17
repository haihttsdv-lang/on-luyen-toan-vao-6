import { describe, expect, it } from 'vitest';
import { isValidBackupData } from './validate-backup';
import type { BackupData } from '../../types';

const VALID: BackupData = {
  version: 1,
  exportedAt: '2026-08-14T00:00:00.000Z',
  attempts: [],
  errorLog: [],
  testResults: [],
  topicProgress: [],
  sessionOutcomes: [],
};

describe('isValidBackupData (FR-H11)', () => {
  it('chấp nhận cấu trúc hợp lệ', () => {
    expect(isValidBackupData(VALID)).toBe(true);
  });

  it('từ chối null/undefined/không phải object', () => {
    expect(isValidBackupData(null)).toBe(false);
    expect(isValidBackupData(undefined)).toBe(false);
    expect(isValidBackupData('không phải json')).toBe(false);
    expect(isValidBackupData(42)).toBe(false);
  });

  it('từ chối khi thiếu version hoặc sai version', () => {
    const { version: _version, ...rest } = VALID;
    expect(isValidBackupData(rest)).toBe(false);
    expect(isValidBackupData({ ...VALID, version: 2 })).toBe(false);
  });

  it('từ chối khi thiếu một trong các mảng bắt buộc', () => {
    const { attempts: _attempts, ...rest } = VALID;
    expect(isValidBackupData(rest)).toBe(false);
  });

  it('chấp nhận khi có profile tùy chọn', () => {
    const withProfile: BackupData = { ...VALID, profile: { alias: 'Bi', createdAt: VALID.exportedAt } };
    expect(isValidBackupData(withProfile)).toBe(true);
  });
});
