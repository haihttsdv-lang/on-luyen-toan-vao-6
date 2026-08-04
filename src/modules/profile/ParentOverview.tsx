import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScoreTrendChart } from '../../components/ScoreTrendChart';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { TestResult } from '../../types';
import { useMasteryData } from './useMasteryData';

/** Trang tổng quan dành cho phụ huynh, diễn đạt bằng ngôn ngữ dễ hiểu (FR-H09). */
export function ParentOverview() {
  const navigate = useNavigate();
  const data = useMasteryData();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [studyDaysThisWeek, setStudyDaysThisWeek] = useState(0);
  const [loadingExtra, setLoadingExtra] = useState(true);

  useEffect(() => {
    async function load() {
      const [results, attempts] = await Promise.all([
        localProgressStore.getTestResults(),
        localProgressStore.getAttempts(),
      ]);
      setTestResults([...results].sort((a, b) => a.date.localeCompare(b.date)));

      const sevenDaysAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const days = new Set<string>();
      for (const a of attempts) {
        if (new Date(a.timestamp).getTime() >= sevenDaysAgoMs) {
          days.add(a.timestamp.slice(0, 10));
        }
      }
      setStudyDaysThisWeek(days.size);
      setLoadingExtra(false);
    }
    load();
  }, []);

  if (data.loading || loadingExtra) {
    return <div className="card">Đang tải...</div>;
  }

  const weakTopics = data.topics
    .map((t) => ({ topic: t, mastery: data.masteryByTopic.get(t.id) }))
    .filter((x): x is { topic: (typeof data.topics)[number]; mastery: NonNullable<typeof x.mastery> } =>
      x.mastery !== undefined && x.mastery !== null && x.mastery.level === 'needs-review',
    )
    .sort((a, b) => a.mastery.score - b.mastery.score)
    .slice(0, 3);

  let trendSentence = 'Chưa có đủ dữ liệu để nhận xét xu hướng — con cần thi thử ít nhất 2 lần.';
  if (testResults.length >= 2) {
    const first = testResults[0];
    const last = testResults[testResults.length - 1];
    const firstPct = first.total > 0 ? first.autoScore / first.total : 0;
    const lastPct = last.total > 0 ? last.autoScore / last.total : 0;
    if (lastPct > firstPct + 0.05) {
      trendSentence = 'Điểm thi thử đang có xu hướng tăng dần — con đang tiến bộ tốt!';
    } else if (lastPct < firstPct - 0.05) {
      trendSentence = 'Điểm thi thử gần đây có phần giảm — có thể con cần ôn lại một số chuyên đề.';
    } else {
      trendSentence = 'Điểm thi thử khá ổn định qua các lần thi gần đây.';
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Tổng quan dành cho phụ huynh</h2>
        <p>
          Số buổi học trong 7 ngày qua: <strong>{studyDaysThisWeek}</strong> buổi
        </p>
        <p>{trendSentence}</p>
        {testResults.length > 0 && (
          <ScoreTrendChart
            points={testResults.map((r) => (r.total > 0 ? r.autoScore / r.total : 0))}
            ariaLabel="Xu hướng điểm thi thử theo thời gian"
          />
        )}
      </div>

      <div className="card">
        <h3>Chuyên đề con cần chú ý</h3>
        {weakTopics.length === 0 ? (
          <p>Hiện chưa có chuyên đề nào cần chú ý đặc biệt — con đang học tốt!</p>
        ) : (
          weakTopics.map(({ topic }) => (
            <div key={topic.id} className="topic-row" onClick={() => navigate(`/ly-thuyet/${topic.id}`)}>
              {topic.title}
            </div>
          ))
        )}
      </div>

      <div className="card">
        <button className="btn" onClick={() => navigate('/ho-so')}>
          ← Quay lại hồ sơ
        </button>
      </div>
    </div>
  );
}
