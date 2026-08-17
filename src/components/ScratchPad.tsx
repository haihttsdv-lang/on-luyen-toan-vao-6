import { useState } from 'react';

/** Khu vực nháp (UX-09) — không lưu vào tiến độ, chỉ tồn tại trong phiên làm bài hiện tại. */
export function ScratchPad() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="scratch-pad">
      <button type="button" className="btn scratch-pad-toggle" onClick={() => setOpen((o) => !o)}>
        ✏️ {open ? 'Ẩn nháp' : 'Mở nháp'}
      </button>
      {open && (
        <textarea
          className="scratch-pad-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ghi chú, tính nháp ở đây..."
          rows={4}
          aria-label="Ô nháp"
        />
      )}
    </div>
  );
}
