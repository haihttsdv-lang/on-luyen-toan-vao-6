import { useEffect } from 'react';
import { isSyncAvailable } from '../../core/sync/is-sync-available';
import { getStoredSyncCode } from '../../data-access/sync/sync-state';

/**
 * Gắn ở gốc ứng dụng (App.tsx). Chỉ động tới SDK Firebase khi cả hai điều kiện đều
 * đúng: đã cấu hình biến môi trường (SY-14) VÀ máy này đã liên kết mã đồng bộ —
 * cả hai điều kiện đều kiểm tra được mà không cần import SDK (SY-13).
 */
export function useSyncLifecycle(): void {
  useEffect(() => {
    if (!isSyncAvailable() || !getStoredSyncCode()) return;

    // SY-07: đồng bộ 1 lần khi mở app.
    void import('../../data-access/sync/run-sync').then(({ syncOnOpen }) => syncOnOpen());

    // SY-08: đẩy 1 lần khi rời app — dùng visibilitychange/pagehide, KHÔNG dùng
    // beforeunload/unload vì nhiều trình duyệt di động bỏ qua các sự kiện đó.
    function pushOnHide() {
      void import('../../data-access/sync/run-sync').then(({ pushOnce }) => pushOnce());
    }
    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') pushOnHide();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', pushOnHide);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', pushOnHide);
    };
  }, []);
}
