import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MathRenderer } from '../../components/MathRenderer';
import { SolutionSteps } from '../../components/SolutionSteps';
import { checkNumericAnswer } from '../../core/answer-checker/check-numeric';
import type { CheckResult } from '../../core/answer-checker/types';
import { DIAGNOSTIC_TEST_SIZE } from '../../config/thresholds';
import { generateTest } from '../../core/test-generator/generate-test';
import { classifyCheckerError, ERROR_TYPE_LABELS, SELF_REPORT_ERROR_TYPES } from '../../core/error-analysis/classify-checker-error';
import { localContentStore } from '../../data-access/local/content-store';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { AttemptContext, DifficultyLevel, ErrorType, Exercise, TestConfig } from '../../types';
import { McqQuestion } from './McqQuestion';
import { NumericQuestion } from './NumericQuestion';
import { EssayQuestion } from './EssayQuestion';

interface PracticeSessionProps {
  mode: 'topics' | 'error-log' | 'diagnostic';
}

interface TopicsFilterState {
  topicIds?: string[];
  level?: DifficultyLevel;
}

/** Cấu hình bài kiểm tra đầu vào: ~30 câu phủ đều 6 nhóm chuyên đề (FR-H01). */
const DIAGNOSTIC_CONFIG: TestConfig = {
  id: 'DIAGNOSTIC',
  label: 'Kiểm tra đầu vào',
  totalQuestions: DIAGNOSTIC_TEST_SIZE,
  durationMinutes: 40,
  topicWeights: { SH: 1, PS: 1, DH: 1, HH: 1, DL: 1, TD: 1 },
  answerTypeRatio: { mcq: 0.3, numeric: 0.7 },
};

const BACK_ROUTE: Record<PracticeSessionProps['mode'], string> = {
  topics: '/luyen-tap',
  'error-log': '/luyen-tap',
  diagnostic: '/ho-so',
};

export function PracticeSession({ mode }: PracticeSessionProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [essayRevealed, setEssayRevealed] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [lastWrongAttempt, setLastWrongAttempt] = useState<{ exerciseId: string; timestamp: string } | null>(null);
  const [errorTypeChosen, setErrorTypeChosen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      let list: Exercise[];
      if (mode === 'error-log') {
        const log = await localProgressStore.getErrorLog();
        const found = await Promise.all(log.map((e) => localContentStore.getExercise(e.exerciseId)));
        list = found.filter((e): e is Exercise => e !== undefined);
      } else if (mode === 'diagnostic') {
        const pool = await localContentStore.listExercises();
        list = generateTest(DIAGNOSTIC_CONFIG, pool).exercises;
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
  const attemptContext: AttemptContext = mode === 'diagnostic' ? 'diagnostic' : 'practice';

  async function recordAttempt(correct: boolean, userAnswer: string, autoErrorType?: ErrorType) {
    if (!current) return;
    const timestamp = new Date().toISOString();
    await localProgressStore.addAttempt({
      exerciseId: current.id,
      correct,
      userAnswer,
      timeSpentMs: 0,
      timestamp,
      context: attemptContext,
      errorType: autoErrorType,
    });
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    if (!correct) {
      setLastWrongAttempt({ exerciseId: current.id, timestamp });
      setErrorTypeChosen(autoErrorType !== undefined);
    }
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
    // FR-P08: 'sai_don_vi' suy ra tự động từ bộ chấm, không cần hỏi lại học sinh
    void recordAttempt(checkResult.status === 'correct', raw, classifyCheckerError(checkResult));
  }

  function handleSelectErrorType(type: ErrorType) {
    if (!lastWrongAttempt) return;
    setErrorTypeChosen(true);
    void localProgressStore.updateAttemptErrorType(lastWrongAttempt.exerciseId, lastWrongAttempt.timestamp, type);
  }

  function next() {
    setResult(null);
    setEssayRevealed(false);
    setSolutionRevealed(false);
    setLastWrongAttempt(null);
    setErrorTypeChosen(false);
    setIndex((i) => i + 1);
  }

  if (loading) {
    return <div className="card">Đang tải bài tập...</div>;
  }

  if (exercises.length === 0) {
    return (
      <div className="card">
        <p>Không có bài tập nào phù hợp.</p>
        <button className="btn" onClick={() => navigate(BACK_ROUTE[mode])}>
          Quay lại
        </button>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="card">
        <h3>{mode === 'diagnostic' ? 'Đã hoàn thành bài kiểm tra đầu vào!' : 'Hoàn thành!'}</h3>
        <p>
          Bạn đã làm đúng {score.correct}/{score.total} câu.
        </p>
        {mode === 'diagnostic' && <p>Hồ sơ của bạn đã được cập nhật với bản đồ năng lực ban đầu.</p>}
        <button className="btn btn-primary" onClick={() => navigate(BACK_ROUTE[mode])}>
          {mode === 'diagnostic' ? 'Xem hồ sơ' : 'Quay lại Luyện tập'}
        </button>
      </div>
    );
  }

  const locked = result !== null && result.status !== 'format_error';
  const isWrong = locked && result?.status !== 'correct';
  // FR-P07: bài numeric/mcq làm sai có gợi ý -> hiện gợi ý trước, hiện lời giải đầy đủ khi bấm nút
  const showHintGate = isWrong && current.answerType !== 'essay' && !!current.hint && !solutionRevealed;
  const showSolution = (locked && !showHintGate) || (current.answerType === 'essay' && essayRevealed);

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

      {showHintGate && (
        <div className="formula-box">
          <strong>💡 Gợi ý:</strong> <MathRenderer content={current.hint!} />
          <div style={{ marginTop: 8 }}>
            <button className="btn btn-primary" onClick={() => setSolutionRevealed(true)}>
              Xem lời giải đầy đủ
            </button>
          </div>
        </div>
      )}

      {showSolution && (
        <div>
          <h4>Lời giải chi tiết</h4>
          <SolutionSteps steps={current.solutionSteps} />

          {isWrong && current.answerType !== 'essay' && !errorTypeChosen && (
            <div className="error-type-picker">
              <p>Vì sao bạn nghĩ mình đã sai? (không bắt buộc)</p>
              <div className="chip-row">
                {SELF_REPORT_ERROR_TYPES.map((type) => (
                  <button key={type} type="button" className="chip-btn" onClick={() => handleSelectErrorType(type)}>
                    {ERROR_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>
          )}

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
