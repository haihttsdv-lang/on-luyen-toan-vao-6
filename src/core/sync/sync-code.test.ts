import { describe, expect, it } from 'vitest';
import { generateSyncCode, isValidSyncCodeFormat, normalizeSyncCode } from './sync-code';

describe('generateSyncCode (SY-04)', () => {
  it('sinh mã đúng 8 ký tự', () => {
    expect(generateSyncCode()).toHaveLength(8);
  });

  it('không chứa ký tự dễ nhầm 0/O, 1/I/L', () => {
    // Ép random trả về đủ mọi vị trí trong bảng chữ cái qua nhiều lần gọi
    for (let i = 0; i < 50; i++) {
      const code = generateSyncCode(Math.random);
      expect(code).not.toMatch(/[01OIL]/);
    }
  });

  it('xác định với nguồn ngẫu nhiên cố định', () => {
    const alwaysZero = () => 0;
    expect(generateSyncCode(alwaysZero)).toBe('22222222');
  });
});

describe('normalizeSyncCode', () => {
  it('bỏ khoảng trắng và viết hoa', () => {
    expect(normalizeSyncCode(' ab cd ef gh ')).toBe('ABCDEFGH');
  });
});

describe('isValidSyncCodeFormat', () => {
  it('chấp nhận mã đúng bảng chữ cái và độ dài', () => {
    expect(isValidSyncCodeFormat('23456789')).toBe(true);
  });

  it('từ chối sai độ dài', () => {
    expect(isValidSyncCodeFormat('2345')).toBe(false);
  });

  it('từ chối ký tự dễ nhầm', () => {
    expect(isValidSyncCodeFormat('2345678O')).toBe(false);
    expect(isValidSyncCodeFormat('23456781')).toBe(false);
  });
});
