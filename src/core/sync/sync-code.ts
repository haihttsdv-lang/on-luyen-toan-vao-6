/** Bỏ ký tự dễ nhầm khi đọc bằng mắt/gõ tay: 0/O, 1/I/L (SY-04). */
const SYNC_CODE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const SYNC_CODE_LENGTH = 8;

/**
 * Sinh mã đồng bộ 8 ký tự (SY-04). `randomFn` mặc định `Math.random`, có thể truyền
 * nguồn ngẫu nhiên khác để test xác định.
 */
export function generateSyncCode(randomFn: () => number = Math.random): string {
  let code = '';
  for (let i = 0; i < SYNC_CODE_LENGTH; i++) {
    const idx = Math.floor(randomFn() * SYNC_CODE_ALPHABET.length);
    code += SYNC_CODE_ALPHABET[idx];
  }
  return code;
}

/** Chuẩn hóa mã người dùng gõ tay: bỏ khoảng trắng, viết hoa (khớp bảng chữ cái sinh mã). */
export function normalizeSyncCode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, '');
}

export function isValidSyncCodeFormat(code: string): boolean {
  if (code.length !== SYNC_CODE_LENGTH) return false;
  return [...code].every((ch) => SYNC_CODE_ALPHABET.includes(ch));
}
