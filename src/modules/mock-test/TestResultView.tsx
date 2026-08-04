import { MathRenderer } from '../../components/MathRenderer';
import { SolutionSteps } from '../../components/SolutionSteps';
import { checkNumericAnswer } from '../../core/answer-checker/check-numeric';
import { GROUP_LABELS, GROUP_ORDER } from '../../content/labels';
import type { Exercise, TestConfig, TopicGroup } from '../../types';

interface TestResultViewProps {
  config: TestConfig;
  exercises: Exercise[];
  answers: Record<string, string | number>;
  autoScore: number;
  autoGradableCount: number;
  byTopicGroup: Partial<Record<TopicGroup, { correct: number; total: number }>>;
  durationUsedSeconds: number;
  shortfall: number;
  onRestart: () => void;
}

/** Trang kết quả thi thử: điểm tổng, thời gian, điểm theo nhóm, xem lại từng câu (FR-T06, FR-T07). */
export function TestResultView({
  config,
  exercises,
  answers,
  autoScore,
  autoGradableCount,
  byTopicGroup,
  durationUsedSeconds,
  shortfall,
  onRestart,
}: TestResultViewProps) {
  const minutesUsed = Math.floor(durationUsedSeconds / 60);
  const secondsUsed = durationUsedSeconds % 60;

  return (
    <div>
      <div className="card">
        <h2>Kết quả thi thử — {config.label}</h2>
        {shortfall > 0 && (
          <p style={{ opacity: 0.75 }}>
            Lưu ý: ngân hàng nội dung hiện chỉ đủ sinh {exercises.length}/{config.totalQuestions} câu (đang trong giai
            đoạn xây dựng nội dung mẫu).
          </p>
        )}
        <p>
          Điểm: <strong>{autoScore}/{autoGradableCount}</strong> câu trắc nghiệm/điền đáp số đúng
        </p>
        <p>Tổng số câu: {exercises.length}</p>
        <p>
          Thời gian đã dùng: {minutesUsed} phút {secondsUsed} giây
        </p>
        <h3>Điểm theo nhóm chuyên đề</h3>
        <ul>
          {GROUP_ORDER.filter((g) => byTopicGroup[g] && byTopicGroup[g]!.total > 0).map((g) => (
            <li key={g}>
              {GROUP_LABELS[g]}: {byTopicGroup[g]!.correct}/{byTopicGroup[g]!.total}
            </li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={onRestart}>
          Làm đề khác
        </button>
      </div>

      <h3 style={{ padding: '0 4px' }}>Xem lại từng câu</h3>
      {exercises.map((ex, i) => {
        const userAnswer = answers[ex.id];
        let correct: boolean | null = null;
        let correctAnswerDisplay: string | null = null;

        if (ex.answerType === 'mcq' && ex.mcq) {
          correct = userAnswer === ex.mcq.answerIndex;
          correctAnswerDisplay = ex.mcq.options[ex.mcq.answerIndex];
        } else if (ex.answerType === 'numeric' && ex.numeric) {
          correct = typeof userAnswer === 'string' && checkNumericAnswer(ex.numeric, userAnswer).status === 'correct';
          correctAnswerDisplay = ex.numeric.acceptedValues.join(' hoặc ');
        }

        return (
          <div key={ex.id} className="card">
            <p>
              <strong>Câu {i + 1}</strong>{' '}
              {correct !== null &&
                (correct ? <span className="result-correct">Đúng</span> : <span className="result-incorrect">Sai</span>)}
            </p>
            <p>
              <MathRenderer content={ex.statement} />
            </p>
            {ex.figure && <div className="figure-box" dangerouslySetInnerHTML={{ __html: ex.figure }} />}

            {ex.answerType === 'mcq' && ex.mcq && (
              <p>
                Bạn chọn:{' '}
                {typeof userAnswer === 'number' ? <MathRenderer content={ex.mcq.options[userAnswer]} /> : '(chưa chọn)'}
                {' — '}Đáp án đúng: <MathRenderer content={correctAnswerDisplay ?? ''} />
              </p>
            )}
            {ex.answerType === 'numeric' && (
              <p>
                Bạn nhập: {typeof userAnswer === 'string' && userAnswer.length > 0 ? userAnswer : '(chưa nhập)'}
                {' — '}Đáp án đúng: {correctAnswerDisplay}
              </p>
            )}
            {ex.answerType === 'essay' && ex.essay && (
              <div>
                <p>Ghi chú của bạn: {typeof userAnswer === 'string' && userAnswer.length > 0 ? userAnswer : '(chưa ghi)'}</p>
                <h4>Lời giải mẫu</h4>
                <p>
                  <MathRenderer content={ex.essay.modelSolution} />
                </p>
                <h4>Tiêu chí tự chấm</h4>
                <ul>
                  {ex.essay.rubric.map((r, ri) => (
                    <li key={ri}>
                      <MathRenderer content={r.criterion} /> — {r.points} điểm
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: '0.85em', opacity: 0.75 }}>
                  Bài tự luận chưa được chấm tự động ở phiên bản này — hãy tự đối chiếu với lời giải mẫu (FR-M19).
                </p>
              </div>
            )}

            <h4>Lời giải chi tiết</h4>
            <SolutionSteps steps={ex.solutionSteps} />
          </div>
        );
      })}
    </div>
  );
}
