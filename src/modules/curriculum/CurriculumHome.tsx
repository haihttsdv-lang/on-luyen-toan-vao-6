import { useEffect, useState } from 'react';
import { curriculumPhases } from '../../content/curriculum';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { TargetSchool } from '../../types';
import { TodaySessionCard } from './TodaySessionCard';
import { useSchedule } from './useSchedule';

const WEEKDAY_LABELS = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

const TARGET_SCHOOL_LABELS: Record<TargetSchool, string> = {
  archimedes: 'Archimedes',
  'luong-the-vinh': 'Lương Thế Vinh',
  'ngoi-sao-ha-noi': 'Ngôi Sao Hà Nội',
  'cau-giay': 'Cầu Giấy',
  khac: 'Khác / Chưa xác định',
};

/** Bản đồ hành trình 4 giai đoạn + cài đặt lộ trình (FR-C06, FR-C07). */
export function CurriculumHome() {
  const schedule = useSchedule();
  const [targetSchool, setTargetSchool] = useState<TargetSchool | ''>('');
  const [examDate, setExamDate] = useState('');
  const [weeklyDays, setWeeklyDays] = useState<number[]>([]);
  const [settingsSynced, setSettingsSynced] = useState(false);

  useEffect(() => {
    if (!schedule.profile || settingsSynced) return;
    setTargetSchool(schedule.profile.targetSchool ?? '');
    setExamDate(schedule.profile.examDate ?? '');
    setWeeklyDays(schedule.profile.weeklyDays ?? []);
    setSettingsSynced(true);
  }, [schedule.profile, settingsSynced]);

  function toggleWeekday(day: number) {
    setWeeklyDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()));
  }

  async function saveSettings() {
    if (!schedule.profile) return;
    await localProgressStore.saveProfile({
      ...schedule.profile,
      targetSchool: targetSchool || undefined,
      examDate: examDate || undefined,
      weeklyDays: weeklyDays.length > 0 ? weeklyDays : undefined,
    });
    schedule.reload();
  }

  if (schedule.loading) {
    return <div className="card">Đang tải...</div>;
  }

  const currentPhase = schedule.todaySession?.template.phase;

  return (
    <div>
      <div className="card">
        <h2>Lộ trình học</h2>
        <p>Lịch học 4 giai đoạn, tự tính lại theo tiến độ thực tế — không bị lệch giữa các buổi.</p>
      </div>

      <TodaySessionCard schedule={schedule} />

      <div className="card">
        <h3>Bản đồ hành trình</h3>
        {curriculumPhases.map((phase) => (
          <div
            key={phase.id}
            style={{
              padding: '10px 12px',
              marginBottom: 6,
              borderRadius: 10,
              border: '1px solid var(--border-glow)',
              background: currentPhase === phase.id ? 'rgba(255, 122, 26, 0.1)' : 'transparent',
            }}
          >
            <strong>{phase.label}</strong>
            {currentPhase === phase.id && <span className="topic-pill" style={{ marginLeft: 8 }}>Đang ở đây</span>}
            <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{phase.description}</p>
          </div>
        ))}
      </div>

      {schedule.canSkipPhase1 && (
        <div className="card">
          <p>
            Bạn đạt từ 85% trở lên ở bài kiểm tra đầu vào — có thể cân nhắc <strong>bỏ qua Giai đoạn 1</strong> và bắt
            đầu ngay từ Giai đoạn 2. Đây chỉ là gợi ý, lộ trình sẽ không tự động nhảy giai đoạn.
          </p>
        </div>
      )}

      {schedule.insufficientTime && (
        <div className="card">
          <p style={{ color: 'var(--accent-red)' }}>
            ⚠ Với ngày thi dự kiến hiện tại, số buổi còn lại của Giai đoạn 1–3 có thể không đủ thời gian dù đã học tối
            đa 5 buổi/tuần. Cân nhắc tăng số buổi học mỗi tuần hoặc điều chỉnh lại ngày thi dự kiến.
          </p>
        </div>
      )}

      <div className="card">
        <h3>Cài đặt lộ trình</h3>
        <div style={{ marginBottom: 12 }}>
          <label>
            Trường mục tiêu:{' '}
            <select value={targetSchool} onChange={(e) => setTargetSchool(e.target.value as TargetSchool)}>
              <option value="">Chưa chọn</option>
              {(Object.keys(TARGET_SCHOOL_LABELS) as TargetSchool[]).map((s) => (
                <option key={s} value={s}>
                  {TARGET_SCHOOL_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Ngày thi dự kiến:{' '}
            <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={{ marginBottom: 4 }}>Ngày học trong tuần (mặc định Thứ 3/5/7 nếu bỏ trống):</p>
          {WEEKDAY_LABELS.map((label, day) => (
            <label key={day} style={{ marginRight: 12 }}>
              <input type="checkbox" checked={weeklyDays.includes(day)} onChange={() => toggleWeekday(day)} /> {label}
            </label>
          ))}
        </div>
        <button className="btn btn-primary" onClick={saveSettings}>
          Lưu cài đặt
        </button>
      </div>
    </div>
  );
}
