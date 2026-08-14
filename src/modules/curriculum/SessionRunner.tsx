import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SESSION_OUTCOME_LABELS } from '../../content/labels';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { SessionOutcome } from '../../types';
import { clearSessionInProgress, markSessionInProgress } from './in-progress-session';
import { useSchedule } from './useSchedule';

const OUTCOME_ORDER: SessionOutcome[] = ['excellent', 'ok', 'needs-review'];

/** Chi tiết một buổi học: các khối bấm được đi thẳng tới nội dung (FR-C03), tự đánh giá cuối buổi (FR-C04). */
export function SessionRunner() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const schedule = useSchedule();

  const session = schedule.sessions.find((s) => s.template.id === templateId);

  useEffect(() => {
    if (templateId) markSessionInProgress(templateId);
  }, [templateId]);

  async function finishSession(outcome: SessionOutcome) {
    if (!templateId) return;
    await localProgressStore.saveSessionOutcome({ templateId, outcome, completedAt: new Date().toISOString() });
    clearSessionInProgress();
    schedule.reload();
    navigate('/lo-trinh');
  }

  if (schedule.loading) {
    return <div className="card">Đang tải...</div>;
  }

  if (!session) {
    return (
      <div className="card">
        <p>Không tìm thấy buổi học này (có thể lịch đã thay đổi).</p>
        <button className="btn" onClick={() => navigate('/lo-trinh')}>
          Quay lại Lộ trình
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h2>Buổi học</h2>
        {session.template.topicIds.map((tid) => (
          <span key={tid} className="topic-pill">
            {tid}
          </span>
        ))}
        <p style={{ marginTop: 8 }}>Bấm vào từng khối bên dưới để đi thẳng tới đúng nội dung.</p>
      </div>

      {session.template.blocks.map((block, i) => (
        <div key={i} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(block.to, block.navState ? { state: block.navState } : undefined)}>
          <h3>
            {i + 1}. {block.label}
          </h3>
          <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>~{block.estimatedMinutes} phút</p>
        </div>
      ))}

      <div className="card">
        <h3>Tổng kết buổi học</h3>
        <p>Sau khi làm xong các khối trên, hãy tự đánh giá kết quả buổi học hôm nay:</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {OUTCOME_ORDER.map((outcome) => (
            <button key={outcome} className="btn btn-primary" onClick={() => finishSession(outcome)}>
              {SESSION_OUTCOME_LABELS[outcome]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
