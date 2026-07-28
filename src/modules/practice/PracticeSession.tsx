import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MathRenderer } from '../../components/MathRenderer';
import { SolutionSteps } from '../../components/SolutionSteps';
import { checkNumericAnswer } from '../../core/answer-checker/check-numeric';
import type { CheckResult } from '../../core/answer-checker/types';
import { localContentStore } from '../../data-access/local/content-store';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { DifficultyLevel, Exercise } from '../../types';
import { McqQuestion } from './McqQuestion';
import { NumericQuestion } from './NumericQuestion';
import { EssayQuestion } from './EssayQuestion';

interface PracticeSessionProps {
  mode: 'topics' | 'error-log';
}

interface TopicsFilterState {
  topicIds?: string[];
  level?: DifficultyLevel;
}

export function PracticeSession({ mode }: PracticeSessionProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [essayRevealed, setEssayRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      let list: Exercise[];
      if (mode === 'error-log') {
        const log = await localProgressStore.getErrorLog();
        const found = await Promise.all(log.map((e) => localContentStore.getExercise(e.exerciseId)));
        list = found.filter((e): e is Exercise => e !== undefined);
      } else {
        const state = (location.state as TopicsFilterState | null) ?? {};
        list = await localContentStore.listExercises({
          topicIds: state.topicIds && state.topicIds.length > 0 ? state.topicIds : undefined,
          level: state.level,
        });
      }
      if (!cancelled) {
        setExercises(shuffle(list));
        setIndex(0);
        setResult(null);
        setEssayRevealed(false);
        setScore({ correct: 0, total: 0 });
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const current = exercises[index];

  async function recordAttempt(correct: boolean, userAnswer: string) {
    if (!current) return;
    await localProgressStore.addAttempt({
      exerciseId: current.id,
      correct,
      userAnswer,
      timeSpentMs: 0,
      timestamp: new Date().toISOString(),
      context: 'practice',
    });
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
  }

  function handleMcqSubmit(selectedIndex: number) {
    if (!current?.mcq) return;
    const correct = selectedIndex === current.mcq.answerIndex;
    const r: CheckResult = { status: correct ? 'correct' : 'incorrect' };
    setResult(r);
    void recordAttempt(correct, String(selectedIndex));
  }

  function handleNumericSubmit(raw: string) {
    if (!current?.numeric) return;
    const checkResult = checkNumericAnswer(current.numeric, raw);
    setResult(checkResult);
    if (checkResult.status === 'format_error') {
      // FR-M14: lỗi định dạng không tính là làm sai — cho phép nhập lại, không ghi nhận lượt làm
      return;
    }
    void recordAttempt(checkResult.status === 'correct', raw);
  }

  function next() {
    setResult(null);
    setEssayRevealed(false);
    setIndex((i) => i + 1);
  }

  if (loading) {
    return <div className="card">Đang tải bài tập...</div>;
  }

  if (exercises.length === 0) {
    return (
      <div className="card">
        <p>Không có bài tập nào phù hợp.</p>
        <button className="btn" onClick={() => navigate('/luyen-tap')}>
          Quay lại
        </button>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="card">
        <h3>Hoàn thành!</h3>
        <p>
          Bạn đã làm đúng {score.correct}/{score.total} câu.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/luyen-tap')}>
          Quay lại Luyện tập
        </button>
      </div>
    );
  }

  const locked = result !== null && result.status !== 'format_error';
  const showSolution = locked || (current.answerType === 'essay' && essayRevealed);

  return (
    <div className="card">
      <p>
        Câu {index + 1} / {exercises.length} — điểm hiện tại: {score.correct}/{score.total}
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
        <McqQuestion mcq={current.mcq} disabled={locked} onSubmit={handleMcqSubmit} />
      )}
      {current.answerType === 'numeric' && current.numeric && (
        <NumericQuestion disabled={locked} onSubmit={handleNumericSubmit} />
      )}
      {current.answerType === 'essay' && current.essay && (
        <EssayQuestion essay={current.essay} revealed={essayRevealed} onReveal={() => setEssayRevealed(true)} />
      )}

      {result && (
        <p className={result.status === 'correct' ? 'result-correct' : 'result-incorrect'}>{resultMessage(result)}</p>
      )}

      {result && result.status !== 'correct' && result.status !== 'format_error' && (
        <p>
          Xem lại lý thuyết:{' '}
          {current.topicIds.map((tid) => (
            <a key={tid} href={`/ly-thuyet/${tid}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
              {tid}
            </a>
          ))}
        </p>
      )}

      {showSolution && (
        <div>
          <h4>Lời giải chi tiết</h4>
          <SolutionSteps steps={current.solutionSteps} />
          <button className="btn btn-primary" onClick={next}>
            Câu tiếp theo
          </button>
        </div>
      )}
    </div>
  );
}

function resultMessage(result: CheckResult): string {
  switch (result.status) {
    case 'correct':
      return 'Chính xác!';
    case 'incorrect':
      return 'Chưa đúng, xem lời giải bên dưới.';
    case 'wrong_unit':
      return result.message;
    case 'format_error':
      return result.message;
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
