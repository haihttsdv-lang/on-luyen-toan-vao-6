import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localContentStore } from '../../data-access/local/content-store';
import { GROUP_LABELS } from '../../content/labels';
import type { DifficultyLevel, Topic } from '../../types';
import { useErrorLog } from './useErrorLog';

export function PracticeSetup() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [level, setLevel] = useState<DifficultyLevel | 'all'>('all');
  const { entries: errorLog, loading: errorLogLoading } = useErrorLog();

  useEffect(() => {
    localContentStore.listTopics().then(setTopics);
  }, []);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function start() {
    navigate('/luyen-tap/lam-bai', {
      state: {
        topicIds: Array.from(selected),
        level: level === 'all' ? undefined : level,
      },
    });
  }

  return (
    <div>
      <div className="card">
        <h2>Luyện tập</h2>
        <p>Chọn một hoặc nhiều chuyên đề để luyện tập (FR-P03). Bỏ trống để luyện hỗn hợp tất cả chuyên đề.</p>
        <div style={{ marginBottom: 12 }}>
          <label>
            Mức độ:{' '}
            <select value={level} onChange={(e) => setLevel(e.target.value as DifficultyLevel | 'all')}>
              <option value="all">Tất cả</option>
              <option value="basic">Cơ bản</option>
              <option value="advanced">Nâng cao</option>
            </select>
          </label>
        </div>
        <div>
          {topics.map((t) => (
            <label key={t.id} style={{ display: 'block', marginBottom: 6 }}>
              <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggle(t.id)} />{' '}
              <span className="topic-pill">{t.id}</span> {t.title} ({GROUP_LABELS[t.group]})
            </label>
          ))}
        </div>
        <button className="btn btn-primary" onClick={start} style={{ marginTop: 12 }}>
          Bắt đầu luyện tập
        </button>
      </div>

      <div className="card">
        <h3>Sổ lỗi {!errorLogLoading && `(${errorLog.length} câu)`}</h3>
        <p>
          Luyện lại những câu bạn từng làm sai (FR-P05). Câu tự động xóa khỏi sổ lỗi sau khi làm đúng 2 lần liên tiếp
          (FR-P06).
        </p>
        <button className="btn" onClick={() => navigate('/luyen-tap/so-loi')} disabled={errorLog.length === 0}>
          Xem sổ lỗi
        </button>
      </div>
    </div>
  );
}
