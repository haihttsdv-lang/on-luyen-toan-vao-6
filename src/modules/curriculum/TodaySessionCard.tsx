import { useNavigate } from 'react-router-dom';
import { SESSION_FOCUS_ICONS, SESSION_STATUS_LABELS } from '../../content/labels';
import type { ScheduleData } from './useSchedule';
import { getInProgressTemplateId } from './in-progress-session';

/**
 * Thẻ "Buổi học hôm nay" tái dùng ở cả trang chủ và trang Lộ trình (UX-11) — luôn nhận
 * dữ liệu từ `useSchedule()` của nơi gọi, không tự tính riêng, để hai màn hình không lệch nhau.
 */
export function TodaySessionCard({ schedule }: { schedule: ScheduleData }) {
  const navigate = useNavigate();

  if (schedule.loading) {
    return <div className="card">Đang tải lộ trình học...</div>;
  }

  if (!schedule.profile) {
    return (
      <div className="card">
        <h3>Lộ trình học</h3>
        <p>Đặt biệt danh ở trang Hồ sơ để bắt đầu lộ trình học 4 giai đoạn theo ngày.</p>
        <button className="btn" onClick={() => navigate('/ho-so')}>
          Tới trang Hồ sơ
        </button>
      </div>
    );
  }

  const session = schedule.todaySession;
  if (!session) {
    return <div className="card">Đang tính lịch học...</div>;
  }

  const inProgressTemplateId = getInProgressTemplateId();
  const isResuming = inProgressTemplateId === session.template.id;
  const topicLabel = session.template.blocks[0]?.label ?? '';

  return (
    <div className="card">
      {isResuming && (
        <p style={{ color: 'var(--accent-orange)', fontWeight: 700, marginBottom: 6 }}>
          ⏸ Quay lại buổi học đang dở
        </p>
      )}
      <h3>
        {SESSION_FOCUS_ICONS[session.template.focus]} {SESSION_STATUS_LABELS[session.status]}
      </h3>
      <p>{topicLabel}</p>
      <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-panel-soft)', overflow: 'hidden', margin: '10px 0' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round(schedule.phaseProgress * 100)}%`,
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-orange))',
          }}
        />
      </div>
      <p style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>
        Tiến độ Giai đoạn 1–3: {Math.round(schedule.phaseProgress * 100)}%
      </p>
      {schedule.canSkipPhase1 && session.template.phase === 1 && (
        <p style={{ fontSize: '0.85em', color: 'var(--accent-green-deep)' }}>
          Bạn đạt điểm cao ở bài kiểm tra đầu vào — có thể cân nhắc bỏ qua Giai đoạn 1, xem chi tiết ở trang Lộ trình.
        </p>
      )}
      <button
        className="btn btn-primary"
        style={{ marginTop: 8 }}
        onClick={() => navigate(`/lo-trinh/buoi-hoc/${session.template.id}`)}
      >
        {isResuming ? 'Tiếp tục buổi học' : 'Vào buổi học'}
      </button>
    </div>
  );
}
