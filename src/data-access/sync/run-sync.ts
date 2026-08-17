import { shouldPullFromCloud } from '../../core/sync/should-pull';
import { localProgressStore } from '../local/progress-store';
import { pullFromCloud, pushToCloud } from './firebase-client';
import { getLastSyncedAt, getStoredSyncCode, setLastSyncedAt } from './sync-state';

export type SyncResult =
  | { status: 'no-code' }
  | { status: 'pulled' }
  | { status: 'pushed' }
  | { status: 'error'; message: string };

/**
 * SY-07: gọi khi mở app (và khi bấm "Đồng bộ ngay", SY-09) — nếu cloud mới hơn mốc
 * đồng bộ gần nhất của máy này thì kéo về; ngược lại đẩy dữ liệu hiện tại lên (bù cho
 * phiên trước chưa kịp đẩy). Không làm gì nếu máy này chưa liên kết mã đồng bộ.
 */
export async function syncOnOpen(): Promise<SyncResult> {
  const syncCode = getStoredSyncCode();
  if (!syncCode) return { status: 'no-code' };
  try {
    const cloud = await pullFromCloud(syncCode);
    const lastSyncedAt = getLastSyncedAt();
    if (cloud && shouldPullFromCloud(cloud.updatedAt, lastSyncedAt)) {
      await localProgressStore.importAll(cloud.data);
      setLastSyncedAt(cloud.updatedAt);
      return { status: 'pulled' };
    }
    const data = await localProgressStore.exportAll();
    const updatedAt = await pushToCloud(syncCode, data);
    setLastSyncedAt(updatedAt);
    return { status: 'pushed' };
  } catch (e) {
    return { status: 'error', message: e instanceof Error ? e.message : String(e) };
  }
}

/** SY-08: gọi khi rời ứng dụng (`visibilitychange` → `hidden`, `pagehide`) — chỉ đẩy lên, không đọc. */
export async function pushOnce(): Promise<SyncResult> {
  const syncCode = getStoredSyncCode();
  if (!syncCode) return { status: 'no-code' };
  try {
    const data = await localProgressStore.exportAll();
    const updatedAt = await pushToCloud(syncCode, data);
    setLastSyncedAt(updatedAt);
    return { status: 'pushed' };
  } catch (e) {
    return { status: 'error', message: e instanceof Error ? e.message : String(e) };
  }
}
