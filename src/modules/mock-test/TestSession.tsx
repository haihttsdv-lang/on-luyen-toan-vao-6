import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MathRenderer } from '../../components/MathRenderer';
import { checkNumericAnswer } from '../../core/answer-checker/check-numeric';
import { generateTest } from '../../core/test-generator/generate-test';
import { localContentStore } from '../../data-access/local/content-store';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { Exercise, TestConfig, TopicGroup } from '../../types';
import { QuestionPalette } from './QuestionPalette';
import { TestResultView } from './TestResultView';
import { formatCountdown, useCountdown } from './useCountdown';

type Phase = 'loading' | 'no-content' | 'in-progress' | 'submitted';

interface SubmittedResult {
  autoScore: number;
  autoGradableCount: number;
  byTopicGroup: Partial<Record<TopicGroup, { correct: number; total: number }>>;
  durationUsedSeconds: number;
}

function groupOfExercise(ex: Exercise): TopicGroup | undefined {
  const prefix = ex.topicIds[0]?.split('-')[0];
  return (['SH', 'PS', 'DH', 'HH', 'DL', 'TD'] as TopicGroup[]).includes(prefix as TopicGroup)
    ? (prefix as TopicGroup)
    : undefined;
}

export function TestSession() {
  const { configId } = useParams<{ configId: string }>();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>('loading');
  const [config, setConfig] = useState<TestConfig | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [shortfall, setShortfall] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [examEndTime, setExamEndTime] = useState(0);
  const [result, setResult] = useState<SubmittedResult | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!configId) return;
      const cfg = await localContentStore.getTestConfig(configId);
      if (!cfg) {
        if (!cancelled) setPhase('no-content');
        return;
      }
      const pool = await localContentStore.listExercises();
      const generated = generateTest(cfg, pool);
      if (cancelled) return;
      if (generated.exercises.length === 0) {
        setPhase('no-content');
        return;
      }
      setConfig(cfg);
      setExercises(generated.exercises);
      setShortfall(generated.shortfall);
      const now = Date.now();
      setStartTime(now);
      setExamEndTime(now + cfg.durationMinutes * 60_000);
      setPhase('in-progress');
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [configId]);

  const current = exercises[currentIndex];

  async function handleSubmit() {
    if (!config || phase !== 'in-progress') return;
    setPhase('submitted'); // khóa ngay để tránh gọi nộp bài hai lần (vd. auto-submit trùng lúc bấm tay)

    const autoGradable = exercises.filter((ex) => ex.answerType !== 'essay');
    const byTopicGroup: Partial<Record<TopicGroup, { correct: number; total: number }>> = {};
    let autoScore = 0;

    const attemptPromises = autoGradable.map((ex) => {
      const userAnswer = answers[ex.id];
      let correct = false;
      if (ex.answerType === 'mcq' && ex.mcq) {
        correct = userAnswer === ex.mcq.answerIndex;
      } else if (ex.answerType === 'numeric' && ex.numeric) {
        correct = typeof userAnswer === 'string' && checkNumericAnswer(ex.numeric, userAnswer).status === 'correct';
      }
      if (correct) autoScore += 1;

      const group = groupOfExercise(ex);
      if (group) {
        const entry = byTopicGroup[group] ?? { correct: 0, total: 0 };
        entry.total += 1;
        if (correct) entry.correct += 1;
        byTopicGroup[group] = entry;
      }

      return localProgressStore.addAttempt({
        exerciseId: ex.id,
        correct,
        userAnswer: userAnswer === undefined ? '' : String(userAnswer),
        timeSpentMs: 0,
        timestamp: new Date().toISOString(),
        context: 'test',
      });
    });

    const durationUsedSeconds = Math.round((Date.now() - startTime) / 1000);

    await Promise.all(attemptPromises);
    await localProgressStore.saveTestResult({
      configId: config.id,
      date: new Date().toISOString(),
      autoScore,
      total: exercises.length,
      byTopicGroup,
      durationUsedSeconds,
    });

    setResult({ autoScore, autoGradableCount: autoGradable.length, byTopicGroup, durationUsedSeconds });
  }

  const remainingMs = useCountdown(examEndTime || Date.now(), () => {
    void handleSubmit();
  });

  function setAnswer(exerciseId: string, value: string | number) {
    setAnswers((a) => ({ ...a, [exerciseId]: value }));
  }

  function toggleMarked(exerciseId: string) {
    setMarked((m) => {
      const next = new Set(m);
      if (next.has(exerciseId)) next.delete(exerciseId);
      else next.add(exerciseId);
      return next;
    });
  }

  const answeredFlags = useMemo(
    () =>
      exercises.map((ex) => {
        const v = answers[ex.id];
        return v !== undefined && v !== '';
      }),
    [exercises, answers],
  );
  const markedFlags = useMemo(() => exercises.map((ex) => marked.has(ex.id)), [exercises, marked]);

  if (phase === 'loading') {
    return <div className="card">Đang sinh đề...</div>;
  }

  if (phase === 'no-content') {
    return (
      <div className="card">
        <p>Ngân hàng nội dung hiện chưa đủ bài tập phù hợp để sinh đề này.</p>
        <button className="btn" onClick={() => navigate('/thi-thu')}>
          Quay lại
        </button>
      </div>
    );
  }

  if (phase === 'submitted') {
    if (!result || !config) {
      return <div className="card">Đang chấm bài...</div>;
    }
    return (
      <TestResultView
        config={config}
        exercises={exercises}
        answers={answers}
        autoScore={result.autoScore}
        autoGradableCount={result.autoGradableCount}
        byTopicGroup={result.byTopicGroup}
        durationUsedSeconds={result.durationUsedSeconds}
        shortfall={shortfall}
        onRestart={() => navigate('/thi-thu')}
      />
    );
  }

  if (!config || !current) {
    return <div className="card">Đang tải...</div>;
  }

  const warnLowTime = remainingMs <= 5 * 60_000;

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <strong>{config.label}</strong>
          <span
            style={{
              fontSize: '1.3em',
              fontWeight: 700,
              color: warnLowTime ? '#b91c1c' : 'inherit',
            }}
          >
            ⏱ {formatCountdown(remainingMs)}
          </span>
        </div>
        {shortfall > 0 && (
          <p style={{ fontSize: '0.85em', opacity: 0.75 }}>
            Đề hiện có {exercises.length}/{config.totalQuestions} câu do ngân hàng nội dung đang trong giai đoạn xây
            dựng mẫu.
          </p>
        )}
      </div>

      <div className="card">
        <p>
          Câu {currentIndex + 1} / {exercises.length}
        </p>
        {current.topicIds.map((tid) => (
          <span key={tid} className="topic-pill">
            {tid}
          </span>
        ))}
        <p>
          <MathRenderer content={current.statement} />
        </p>
        {current.figure && <div className="figure-box" dangerouslySetInnerHTML={{ __html: current.figure }} />}

        {current.answerType === 'mcq' && current.mcq && (
          <div>
            {current.mcq.options.map((opt, i) => (
              <label key={i} style={{ display: 'block', marginBottom: 6 }}>
                <input
                  type="radio"
                  name={current.id}
                  checked={answers[current.id] === i}
                  onChange={() => setAnswer(current.id, i)}
                />{' '}
                <MathRenderer content={opt} />
              </label>
            ))}
          </div>
        )}
        {current.answerType === 'numeric' && (
          <input
            type="text"
            inputMode="decimal"
            value={(answers[current.id] as string) ?? ''}
            onChange={(e) => setAnswer(current.id, e.target.value)}
            placeholder="Nhập đáp số..."
            style={{ padding: 8, minWidth: 160 }}
          />
        )}
        {current.answerType === 'essay' && (
          <textarea
            rows={5}
            style={{ width: '100%', padding: 8 }}
            value={(answers[current.id] as string) ?? ''}
            onChange={(e) => setAnswer(current.id, e.target.value)}
            placeholder="Trình bày lời giải hoặc ghi chú tóm tắt..."
          />
        )}

        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            className="btn"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            ← Câu trước
          </button>
          <button
            className="btn"
            onClick={() => setCurrentIndex((i) => Math.min(exercises.length - 1, i + 1))}
            disabled={currentIndex === exercises.length - 1}
          >
            Câu sau →
          </button>
          <button className="btn" onClick={() => toggleMarked(current.id)}>
            {marked.has(current.id) ? 'Bỏ đánh dấu' : 'Đánh dấu xem lại'}
          </button>
        </div>
      </div>

      <div className="card">
        <QuestionPalette
          count={exercises.length}
          currentIndex={currentIndex}
          answered={answeredFlags}
          markedForReview={markedFlags}
          onJump={setCurrentIndex}
        />
        <button
          className="btn btn-primary"
          style={{ marginTop: 8 }}
          onClick={() => {
            if (window.confirm('Bạn có chắc muốn nộp bài? Sau khi nộp sẽ không thể sửa đáp án.')) {
              void handleSubmit();
            }
          }}
        >
          Nộp bài
        </button>
      </div>
    </div>
  );
}
