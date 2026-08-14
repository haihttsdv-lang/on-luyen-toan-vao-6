import { useState } from 'react';
import { MathRenderer } from '../../components/MathRenderer';
import { checkNumericAnswer } from '../../core/answer-checker/check-numeric';
import type { QuickCheckQuestion } from '../../types';

interface QuickCheckQuizProps {
  questions: QuickCheckQuestion[];
  onFinish: (correctCount: number, totalCount: number) => void;
}

type AnswerValue = number | string;

/** Bài kiểm tra nhanh cuối bài lý thuyết — trả lời hết rồi nộp một lần (FR-L04). */
export function QuickCheckQuiz({ questions, onFinish }: QuickCheckQuizProps) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = useState(false);
  const [correctness, setCorrectness] = useState<Record<string, boolean>>({});

  function submit() {
    const results: Record<string, boolean> = {};
    let correctCount = 0;
    for (const q of questions) {
      const ans = answers[q.id];
      let correct = false;
      if (q.answerType === 'mcq' && q.mcq) {
        correct = typeof ans === 'number' && ans === q.mcq.answerIndex;
      } else if (q.answerType === 'numeric' && q.numeric) {
        correct = typeof ans === 'string' && checkNumericAnswer(q.numeric, ans).status === 'correct';
      }
      results[q.id] = correct;
      if (correct) correctCount += 1;
    }
    setCorrectness(results);
    setSubmitted(true);
    onFinish(correctCount, questions.length);
  }

  return (
    <div>
      {questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 16 }}>
          <p>
            <strong>Câu {i + 1}.</strong> <MathRenderer content={q.statement} />
          </p>
          {q.answerType === 'mcq' && q.mcq && (
            <div>
              {q.mcq.options.map((opt, oi) => (
                <label key={oi} style={{ display: 'block', marginBottom: 4 }}>
                  <input
                    type="radio"
                    name={q.id}
                    disabled={submitted}
                    checked={answers[q.id] === oi}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                  />{' '}
                  <MathRenderer content={opt} />
                </label>
              ))}
            </div>
          )}
          {q.answerType === 'numeric' && (
            <input
              type="text"
              inputMode="decimal"
              disabled={submitted}
              value={(answers[q.id] as string) ?? ''}
              onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
              placeholder="Nhập đáp số..."
              style={{ padding: 6 }}
            />
          )}
          {submitted && (
            <p className={correctness[q.id] ? 'result-correct' : 'result-incorrect'}>
              {correctness[q.id] ? 'Đúng' : 'Sai'}
            </p>
          )}
        </div>
      ))}
      {!submitted && (
        <button className="btn btn-primary" onClick={submit}>
          Nộp bài kiểm tra nhanh
        </button>
      )}
    </div>
  );
}
