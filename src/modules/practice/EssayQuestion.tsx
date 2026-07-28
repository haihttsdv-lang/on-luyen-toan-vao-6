import { useState } from 'react';
import { MathRenderer } from '../../components/MathRenderer';
import type { EssayAnswer } from '../../types';

interface EssayQuestionProps {
  essay: EssayAnswer;
  revealed: boolean;
  onReveal: () => void;
}

/** Bài tự luận: khung nhập/ghi chú, sau đó lời giải mẫu + tiêu chí tự chấm (Mục 8.3, FR-M15→M18). */
export function EssayQuestion({ essay, revealed, onReveal }: EssayQuestionProps) {
  const [note, setNote] = useState('');

  return (
    <div>
      <textarea
        rows={5}
        style={{ width: '100%', padding: 8 }}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Trình bày lời giải hoặc ghi chú tóm tắt của bạn (có thể làm ra giấy nháp)..."
        disabled={revealed}
      />
      {!revealed && (
        <button className="btn btn-primary" onClick={onReveal} style={{ marginTop: 8 }}>
          Tôi đã làm xong — Xem lời giải mẫu
        </button>
      )}
      {revealed && (
        <div style={{ marginTop: 12 }}>
          <h4>Lời giải mẫu</h4>
          <p>
            <MathRenderer content={essay.modelSolution} />
          </p>
          <h4>Tiêu chí tự chấm</h4>
          <ul>
            {essay.rubric.map((r, i) => (
              <li key={i}>
                <MathRenderer content={r.criterion} /> — {r.points} điểm
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '0.85em', opacity: 0.75 }}>
            Đây là điểm tự đánh giá, không dùng để tính mức độ thành thạo tự động (FR-M18).
          </p>
        </div>
      )}
    </div>
  );
}
