import { useNavigate } from 'react-router-dom';
import { MathRenderer } from '../components/MathRenderer';
import { TodaySessionCard } from '../modules/curriculum/TodaySessionCard';
import { useSchedule } from '../modules/curriculum/useSchedule';

const QUESTS = [
  { to: '/ly-thuyet', icon: '📚', title: 'Lý thuyết', desc: 'Học phương pháp giải theo từng chuyên đề' },
  { to: '/luyen-tap', icon: '⚔️', title: 'Luyện tập', desc: 'Đấu với ngân hàng bài tập, nhận điểm ngay' },
  { to: '/thi-thu', icon: '🏆', title: 'Thi thử', desc: 'Thử thách tính giờ như phòng thi thật' },
];

export function HomePage() {
  const navigate = useNavigate();
  const schedule = useSchedule();

  return (
    <div>
      <div className="card" style={{ textAlign: 'center' }}>
        <h1 className="brand-title">🎮 Ôn Luyện Toán Vào Lớp 6</h1>
        <p>
          Chinh phục 57 chuyên đề, đánh bại ngân hàng bài tập, và thử sức trong các trận thi thử tính giờ để sẵn sàng
          cho kỳ thi vào lớp 6 chất lượng cao!
        </p>
        <p>
          Ví dụ công thức: <MathRenderer content="$\dfrac{a}{b} = \dfrac{a \times k}{b \times k}$" />
        </p>
      </div>

      <TodaySessionCard schedule={schedule} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
        {QUESTS.map((q) => (
          <div
            key={q.to}
            className="card"
            onClick={() => navigate(q.to)}
            style={{ cursor: 'pointer', textAlign: 'center', marginBottom: 0 }}
          >
            <div style={{ fontSize: '2.2em' }}>{q.icon}</div>
            <h3 style={{ marginBottom: 4 }}>{q.title}</h3>
            <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>{q.desc}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>
          Toàn bộ bài học và bài tập là nội dung tự biên soạn, không sao chép đề thi chính thức của bất kỳ trường nào.
        </p>
      </div>
    </div>
  );
}
