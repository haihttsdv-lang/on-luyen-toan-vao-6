import { useState } from 'react';
import { generateSyncCode, isValidSyncCodeFormat, normalizeSyncCode } from '../../core/sync/sync-code';
import { isSyncAvailable } from '../../core/sync/is-sync-available';
import { clearSyncState, getStoredSyncCode, setLastSyncedAt, setStoredSyncCode } from '../../data-access/sync/sync-state';
import { localProgressStore } from '../../data-access/local/progress-store';

type Status = { kind: 'idle' } | { kind: 'busy'; label: string } | { kind: 'message'; text: string };

/** Đồng bộ đa thiết bị qua Firebase (Mục 13 URD). Tự ẩn phần thao tác nếu chưa cấu hình (SY-14). */
export function SyncCard() {
  const available = isSyncAvailable();
  const [syncCode, setSyncCode] = useState<string | null>(() => getStoredSyncCode());
  const [linkInput, setLinkInput] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleCreateCode() {
    const code = generateSyncCode();
    setStatus({ kind: 'busy', label: 'Đang tạo mã và tải dữ liệu lên...' });
    try {
      const { pushToCloud } = await import('../../data-access/sync/firebase-client');
      const data = await localProgressStore.exportAll();
      const updatedAt = await pushToCloud(code, data);
      setStoredSyncCode(code);
      setLastSyncedAt(updatedAt);
      setSyncCode(code);
      setStatus({ kind: 'message', text: 'Đã tạo mã đồng bộ! Nhập đúng mã này ở máy còn lại để liên kết.' });
    } catch (e) {
      setStatus({ kind: 'message', text: `Không tạo được mã: ${e instanceof Error ? e.message : String(e)}` });
    }
  }

  async function handleLink() {
    const code = normalizeSyncCode(linkInput);
    if (!isValidSyncCodeFormat(code)) {
      setStatus({ kind: 'message', text: 'Mã không đúng định dạng — mã gồm đúng 8 ký tự do ứng dụng sinh ra.' });
      return;
    }
    if (
      !window.confirm(
        'Liên kết vào mã có sẵn sẽ GHI ĐÈ toàn bộ tiến độ hiện có trên máy này bằng dữ liệu đã lưu trên cloud với mã đó. Tiếp tục?',
      )
    ) {
      return;
    }
    setStatus({ kind: 'busy', label: 'Đang liên kết và tải dữ liệu về...' });
    try {
      setStoredSyncCode(code);
      const { syncOnOpen } = await import('../../data-access/sync/run-sync');
      const result = await syncOnOpen();
      if (result.status === 'error') {
        clearSyncState();
        setStatus({ kind: 'message', text: `Không liên kết được: ${result.message}` });
        return;
      }
      setSyncCode(code);
      setStatus({
        kind: 'message',
        text: result.status === 'pulled' ? 'Đã tải dữ liệu từ cloud về máy này!' : 'Đã liên kết — mã này chưa có dữ liệu nên đã đẩy dữ liệu máy này lên.',
      });
    } catch (e) {
      clearSyncState();
      setStatus({ kind: 'message', text: `Không liên kết được: ${e instanceof Error ? e.message : String(e)}` });
    }
  }

  async function handleSyncNow() {
    setStatus({ kind: 'busy', label: 'Đang đồng bộ...' });
    try {
      const { syncOnOpen } = await import('../../data-access/sync/run-sync');
      const result = await syncOnOpen();
      const text =
        result.status === 'pulled'
          ? 'Đã tải dữ liệu mới từ cloud về.'
          : result.status === 'pushed'
            ? 'Đã đẩy dữ liệu máy này lên cloud.'
            : result.status === 'error'
              ? `Lỗi: ${result.message}`
              : 'Chưa liên kết mã đồng bộ.';
      setStatus({ kind: 'message', text });
    } catch (e) {
      setStatus({ kind: 'message', text: `Lỗi: ${e instanceof Error ? e.message : String(e)}` });
    }
  }

  function handleDisconnect() {
    if (!window.confirm('Ngắt kết nối đồng bộ trên máy này? Dữ liệu trên cloud và trên máy này đều được giữ nguyên, chỉ máy này thôi tự động đồng bộ.')) {
      return;
    }
    clearSyncState();
    setSyncCode(null);
    setStatus({ kind: 'message', text: 'Đã ngắt kết nối đồng bộ trên máy này.' });
  }

  return (
    <div className="card">
      <h3>Đồng bộ đa thiết bị</h3>

      {!available && (
        <p>
          Chưa được cấu hình. Đây là tính năng hoàn toàn tùy chọn — xem hướng dẫn tự thiết lập Firebase (miễn phí,
          từng bước) trong <code>README.md</code>. Không cấu hình thì mọi tính năng khác của ứng dụng vẫn hoạt động
          bình thường.
        </p>
      )}

      {available && !syncCode && (
        <>
          <p>Liên kết 2 thiết bị (ví dụ máy tính và điện thoại) để dùng chung một tiến độ học tập.</p>
          <button className="btn btn-primary" onClick={handleCreateCode} disabled={status.kind === 'busy'}>
            Tạo mã đồng bộ mới
          </button>
          <div style={{ marginTop: 12 }}>
            <input
              type="text"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="Nhập mã 8 ký tự từ máy kia..."
              style={{ padding: 8, marginRight: 8, minWidth: 180 }}
            />
            <button className="btn" onClick={handleLink} disabled={status.kind === 'busy' || linkInput.trim().length === 0}>
              Liên kết với mã có sẵn
            </button>
          </div>
        </>
      )}

      {available && syncCode && (
        <>
          <p>
            Mã đồng bộ của bạn: <strong style={{ fontSize: '1.2em', letterSpacing: '0.1em' }}>{syncCode}</strong>
          </p>
          <p>Nhập đúng mã này ở máy còn lại (mục "Liên kết với mã có sẵn") để dùng chung tiến độ.</p>
          <button className="btn btn-primary" onClick={handleSyncNow} disabled={status.kind === 'busy'} style={{ marginRight: 8 }}>
            Đồng bộ ngay
          </button>
          <button className="btn" onClick={handleDisconnect} disabled={status.kind === 'busy'}>
            Ngắt kết nối
          </button>
        </>
      )}

      {status.kind === 'busy' && <p style={{ marginTop: 8 }}>{status.label}</p>}
      {status.kind === 'message' && <p style={{ marginTop: 8 }}>{status.text}</p>}

      {available && (
        <p style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 12 }}>
          Mức bảo mật chấp nhận được cho dữ liệu học tập không nhạy cảm — mã đồng bộ vừa là khóa vừa là mật khẩu,
          không tương đương hệ thống tài khoản thật. Không chia sẻ mã cho người lạ.
        </p>
      )}
    </div>
  );
}
