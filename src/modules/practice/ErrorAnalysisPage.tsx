import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aggregateErrorsByTopic, aggregateErrorsByType, type ErrorTypeStat, type TopicErrorStat } from '../../core/error-analysis/aggregate-errors';
import { ERROR_TYPE_LABELS } from '../../core/error-analysis/classify-checker-error';
import { localContentStore } from '../../data-access/local/content-store';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { Topic } from '../../types';

/** Trang phân tích lỗi sai theo chuyên đề và theo loại lỗi (FR-P08). */
export function ErrorAnalysisPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [byTopic, setByTopic] = useState<TopicErrorStat[]>([]);
  const [byType, setByType] = useState<ErrorTypeStat[]>([]);
  const [topicsById, setTopicsById] = useState<Map<string, Topic>>(new Map());

  useEffect(() => {
    async function load() {
      const [attempts, exercises, topics] = await Promise.all([
        localProgressStore.getAttempts(),
        localContentStore.listExercises(),
        localContentStore.listTopics(),
      ]);
      const topicIdsByExercise = new Map(exercises.map((e) => [e.id, e.topicIds] as const));
      setByTopic(aggregateErrorsByTopic(attempts, topicIdsByExercise));
      setByType(aggregateErrorsByType(attempts));
      setTopicsById(new Map(topics.map((t) => [t.id, t] as const)));
      setLoading(false);
    }
    void load();
  }, []);

  if (loading) {
    return <div className="card">Đang tải...</div>;
  }

  const totalWrong = byType.reduce((sum, s) => sum + s.count, 0);
  const maxTopicCount = Math.max(1, ...byTopic.map((s) => s.count));

  return (
    <div>
      <div className="card">
        <h2>Phân tích lỗi sai</h2>
        {totalWrong === 0 ? (
          <p>Chưa có lượt làm sai nào được ghi nhận — chưa đủ dữ liệu để phân tích.</p>
        ) : (
          <p>Tổng cộng {totalWrong} lượt làm sai được ghi nhận.</p>
        )}
      </div>

      {byTopic.length > 0 && (
        <div className="card">
          <h3>Theo chuyên đề</h3>
          {byTopic.slice(0, 10).map((s) => (
            <div
              key={s.topicId}
              className="error-bar-row error-bar-clickable"
              onClick={() => navigate(`/ly-thuyet/${s.topicId}`)}
            >
              <span className="error-bar-label">{topicsById.get(s.topicId)?.title ?? s.topicId}</span>
              <div className="error-bar-track">
                <div className="error-bar-fill" style={{ width: `${(s.count / maxTopicCount) * 100}%` }} />
              </div>
              <span className="error-bar-count">{s.count}</span>
            </div>
          ))}
        </div>
      )}

      {byType.length > 0 && (
        <div className="card">
          <h3>Theo loại lỗi</h3>
          {byType.map((s) => (
            <div key={s.errorType} className="error-bar-row">
              <span className="error-bar-label">
                {s.errorType === 'chua_phan_loai' ? 'Chưa phân loại' : ERROR_TYPE_LABELS[s.errorType]}
              </span>
              <div className="error-bar-track">
                <div className="error-bar-fill" style={{ width: `${(s.count / totalWrong) * 100}%` }} />
              </div>
              <span className="error-bar-count">{s.count}</span>
            </div>
          ))}
          <p className="text-muted" style={{ fontSize: '0.82em', marginTop: 10 }}>
            "Sai đơn vị" được hệ thống tự nhận biết; các loại còn lại do bạn tự chọn sau mỗi câu làm sai (không bắt
            buộc) — chọn càng nhiều lần, biểu đồ này càng chính xác.
          </p>
        </div>
      )}

      <div className="card">
        <button className="btn" onClick={() => navigate('/luyen-tap/so-loi')}>
          ← Quay lại sổ lỗi
        </button>
      </div>
    </div>
  );
}
