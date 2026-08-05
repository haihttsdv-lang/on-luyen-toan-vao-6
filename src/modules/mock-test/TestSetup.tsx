import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localContentStore } from '../../data-access/local/content-store';
import type { TestConfig } from '../../types';

/** Chọn cấu hình đề thi thử (FR-T01) — cấu hình khai báo bằng dữ liệu, không hard-code. */
export function TestSetup() {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState<TestConfig[]>([]);

  useEffect(() => {
    localContentStore.listTestConfigs().then(setConfigs);
  }, []);

  return (
    <div>
      <div className="card">
        <h2>Thi thử</h2>
        <p>
          Chọn một cấu hình đề để bắt đầu thi thử có tính giờ. Trong lúc thi sẽ <strong>không</strong> hiển thị đáp
          án hay phản hồi đúng/sai (FR-T05) — chỉ chấm và xem lại sau khi nộp bài.
        </p>
        <p style={{ fontSize: '0.85em', opacity: 0.75 }}>
          Đề bài tự biên soạn, không phải đề thi chính thức của trường nào.
        </p>
      </div>
      {configs.map((c) => (
        <div key={c.id} className="card">
          <h3>{c.label}</h3>
          <p>
            {c.totalQuestions} câu — {c.durationMinutes} phút
          </p>
          <button className="btn btn-primary" onClick={() => navigate(`/thi-thu/lam-bai/${c.id}`)}>
            Bắt đầu thi
          </button>
        </div>
      ))}
      <div className="card">
        <h3>Tạo đề tùy chỉnh</h3>
        <p>Tự chọn chuyên đề, số câu và thời gian để tạo một đề thi thử mới ngay từ ngân hàng bài luyện tập.</p>
        <button className="btn btn-primary" onClick={() => navigate('/thi-thu/tao-de')}>
          Tạo đề mới
        </button>
      </div>
      <div className="card">
        <button className="btn" onClick={() => navigate('/thi-thu/lich-su')}>
          Xem lịch sử thi thử
        </button>
      </div>
    </div>
  );
}
