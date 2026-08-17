import { useRef, useState } from 'react';
import { isValidBackupData } from '../../core/backup/validate-backup';
import { isSoundEnabled, setSoundEnabled } from '../../core/sound/sound-effects';
import { localProgressStore } from '../../data-access/local/progress-store';

/** Cài đặt: âm thanh phản hồi (GM-07) + sao lưu/khôi phục tiến độ (FR-H11). */
export function SettingsCard() {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  }

  async function handleExport() {
    const data = await localProgressStore.exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `on-luyen-toan-sao-luu-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage('Đã tải file sao lưu về máy.');
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!window.confirm('Khôi phục sẽ GHI ĐÈ toàn bộ tiến độ hiện có trên máy này bằng dữ liệu trong file. Tiếp tục?')) {
      return;
    }
    try {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);
      if (!isValidBackupData(parsed)) {
        setMessage('File không đúng định dạng sao lưu của ứng dụng — đã hủy khôi phục.');
        return;
      }
      await localProgressStore.importAll(parsed);
      setMessage('Khôi phục thành công! Tải lại trang để thấy dữ liệu mới.');
    } catch {
      setMessage('Không đọc được file — hãy chọn đúng file JSON đã xuất từ ứng dụng.');
    }
  }

  return (
    <div className="card">
      <h3>Cài đặt</h3>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
          <input type="checkbox" checked={soundOn} onChange={toggleSound} />
          🔊 Âm thanh phản hồi khi làm bài
        </label>
      </div>

      <div>
        <p style={{ marginBottom: 8 }}>
          <strong>Sao lưu &amp; khôi phục</strong> — xuất/nhập toàn bộ tiến độ dạng file JSON, dùng để chuyển dữ liệu
          sang máy khác hoặc phòng khi mất dữ liệu trình duyệt.
        </p>
        <button className="btn" onClick={handleExport} style={{ marginRight: 8 }}>
          ⬇️ Xuất file sao lưu
        </button>
        <button className="btn" onClick={handleImportClick}>
          ⬆️ Khôi phục từ file
        </button>
        <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleFileChosen} />
        {message && <p style={{ marginTop: 8 }}>{message}</p>}
      </div>
    </div>
  );
}
