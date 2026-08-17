/**
 * Phần "nhẹ" của đồng bộ (SY-13) — chỉ đọc/ghi `localStorage`, không đụng tới SDK
 * Firebase. An toàn để gọi ở mọi nơi (kể cả khi chưa cấu hình đồng bộ).
 */

const SYNC_CODE_KEY = 'vnadvisor:sync-code';
const LAST_SYNCED_AT_KEY = 'vnadvisor:last-synced-at';

export function getStoredSyncCode(): string | null {
  return localStorage.getItem(SYNC_CODE_KEY);
}

export function setStoredSyncCode(code: string | null): void {
  if (code === null) {
    localStorage.removeItem(SYNC_CODE_KEY);
  } else {
    localStorage.setItem(SYNC_CODE_KEY, code);
  }
}

export function getLastSyncedAt(): number | null {
  const raw = localStorage.getItem(LAST_SYNCED_AT_KEY);
  return raw === null ? null : Number(raw);
}

export function setLastSyncedAt(epochMs: number): void {
  localStorage.setItem(LAST_SYNCED_AT_KEY, String(epochMs));
}

/** Ngắt kết nối đồng bộ trên máy này — không xóa dữ liệu trên cloud hay tiến độ cục bộ. */
export function clearSyncState(): void {
  localStorage.removeItem(SYNC_CODE_KEY);
  localStorage.removeItem(LAST_SYNCED_AT_KEY);
}
