import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MathRenderer } from '../../components/MathRenderer';
import { SolutionSteps } from '../../components/SolutionSteps';
import { QUIZ_MASTERY_THRESHOLD } from '../../config/thresholds';
import { LEVEL_LABELS, STATUS_LABELS } from '../../content/labels';
import { applyQuizResult } from '../../core/topic-progress/apply-quiz-result';
import { localContentStore } from '../../data-access/local/content-store';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { Topic, TopicProgressStatus } from '../../types';
import { QuickCheckQuiz } from './QuickCheckQuiz';

/** Trang bài học lý thuyết của một chuyên đề (FR-L02, FR-L03) + kiểm tra nhanh (FR-L04). */
export function TopicLesson() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null | undefined>(undefined);
  const [status, setStatus] = useState<TopicProgressStatus>('not-started');
  const [quizResultMsg, setQuizResultMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!topicId) return;
      const [t, progress] = await Promise.all([
        localContentStore.getTopic(topicId),
        localProgressStore.getTopicProgress(topicId),
      ]);
      if (cancelled) return;
      setTopic(t ?? null);
      const currentStatus = progress?.status ?? 'not-started';
      setStatus(currentStatus);
      if (t && currentStatus === 'not-started') {
        await localProgressStore.saveTopicProgress({
          topicId,
          status: 'learning',
          updatedAt: new Date().toISOString(),
        });
        if (!cancelled) setStatus('learning');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  async function handleQuizFinish(scoreRatio: number) {
    if (!topicId) return;
    const nextStatus = applyQuizResult(status, scoreRatio, QUIZ_MASTERY_THRESHOLD);
    await localProgressStore.saveTopicProgress({
      topicId,
      status: nextStatus,
      lastQuizScore: scoreRatio,
      updatedAt: new Date().toISOString(),
    });
    setStatus(nextStatus);
    const percent = Math.round(scoreRatio * 100);
    const thresholdPercent = Math.round(QUIZ_MASTERY_THRESHOLD * 100);
    setQuizResultMsg(
      nextStatus === 'mastered'
        ? `Bạn đạt ${percent}% — chuyên đề đã chuyển sang "Đã nắm"!`
        : `Bạn đạt ${percent}% — cần từ ${thresholdPercent}% trở lên để đánh dấu "Đã nắm". Hãy ôn lại lý thuyết và thử lại.`,
    );
  }

  if (topic === undefined) {
    return <div className="card">Đang tải...</div>;
  }
  if (topic === null) {
    return (
      <div className="card">
        <p>Không tìm thấy chuyên đề.</p>
        <button className="btn" onClick={() => navigate('/ly-thuyet')}>
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <button className="btn" onClick={() => navigate('/ly-thuyet')} style={{ marginBottom: 12 }}>
          ← Danh sách chuyên đề
        </button>
        <h2>
          <span className="topic-pill">{topic.id}</span> {topic.title}
        </h2>
        <p>
          Mức độ: {LEVEL_LABELS[topic.level]} — Trạng thái: <strong>{STATUS_LABELS[status]}</strong>
        </p>

        <p>
          <MathRenderer content={topic.lesson} />
        </p>

        <h3>Công thức trọng tâm</h3>
        {topic.formulas.map((f, i) => (
          <div key={i} className="formula-box">
            <MathRenderer content={f} display />
          </div>
        ))}

        <h3>Ví dụ mẫu</h3>
        {topic.examples.map((ex, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <p>
              <strong>Ví dụ {i + 1}:</strong> <MathRenderer content={ex.statement} />
            </p>
            <SolutionSteps steps={ex.steps} />
          </div>
        ))}

        <h3>Lỗi thường gặp</h3>
        <ul>
          {topic.commonMistakes.map((m, i) => (
            <li key={i}>
              <MathRenderer content={m} />
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Kiểm tra nhanh</h3>
        <p>Đạt từ {Math.round(QUIZ_MASTERY_THRESHOLD * 100)}% trở lên để đánh dấu chuyên đề "Đã nắm" (FR-L04).</p>
        <QuickCheckQuiz questions={topic.quickCheck} onFinish={handleQuizFinish} />
        {quizResultMsg && <p style={{ marginTop: 12, fontWeight: 600 }}>{quizResultMsg}</p>}
      </div>
    </div>
  );
}
