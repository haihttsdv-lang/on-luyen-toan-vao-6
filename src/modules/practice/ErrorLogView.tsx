import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MathRenderer } from '../../components/MathRenderer';
import { localContentStore } from '../../data-access/local/content-store';
import type { Exercise } from '../../types';
import { useErrorLog } from './useErrorLog';

export function ErrorLogView() {
  const navigate = useNavigate();
  const { entries, loading } = useErrorLog();
  const [exercisesById, setExercisesById] = useState<Record<string, Exercise>>({});

  useEffect(() => {
    async function load() {
      const pairs = await Promise.all(
        entries.map(async (e) => [e.exerciseId, await localContentStore.getExercise(e.exerciseId)] as const),
      );
      const map: Record<string, Exercise> = {};
      for (const [id, ex] of pairs) {
        if (ex) map[id] = ex;
      }
      setExercisesById(map);
    }
    if (entries.length > 0) {
      void load();
    }
  }, [entries]);

  if (loading) {
    return <div className="card">Đang tải sổ lỗi...</div>;
  }

  return (
    <div className="card">
      <h2>Sổ lỗi</h2>
      {entries.length === 0 ? (
        <p>Sổ lỗi trống — bạn chưa có câu nào cần luyện lại.</p>
      ) : (
        <>
          <ul>
            {entries.map((e) => (
              <li key={e.exerciseId}>
                {exercisesById[e.exerciseId] ? (
                  <MathRenderer content={exercisesById[e.exerciseId].statement} />
                ) : (
                  e.exerciseId
                )}{' '}
                — đúng liên tiếp: {e.consecutiveCorrect}/2
              </li>
            ))}
          </ul>
          <button className="btn btn-primary" onClick={() => navigate('/luyen-tap/luyen-lai')}>
            Luyện lại các câu sai
          </button>
        </>
      )}
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => navigate('/luyen-tap/phan-tich-loi')}>
          📊 Xem phân tích lỗi sai
        </button>
      </div>
    </div>
  );
}
