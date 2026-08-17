import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MathRenderer } from '../../components/MathRenderer';
import { checkNumericAnswer } from '../../core/answer-checker/check-numeric';
import { isNewBestScore } from '../../core/speed-challenge/best-score';
import { selectSpeedChallengePool } from '../../core/speed-challenge/select-pool';
import { playCorrectSound, playIncorrectSound } from '../../core/sound/sound-effects';
import { localContentStore } from '../../data-access/local/content-store';
import type { Exercise } from '../../types';
import { McqQuestion } from './McqQuestion';
import { NumericQuestion } from './NumericQuestion';

const BEST_SCORE_KEY = 'vnadvisor:speed-challenge-best';
const DURATIONS = [30, 60, 90] as const;

type Phase = 'setup' | 'running' | 'result';

function loadBestScore(): number | null {
  const raw = localStorage.getItem(BEST_SCORE_KEY);
  return raw === null ? null : Number(raw);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Thử thách tốc độ (GM-08) — trả lời nhiều câu mức cơ bản trong thời gian giới hạn để rèn phản xạ. */
export function SpeedChallenge() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('setup');
  const [duration, setDuration] = useState<number>(60);
  const [pool, setPool] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [flash, setFlash] = useState<'correct' | 'incorrect' | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(loadBestScore);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localContentStore.listExercises().then((all) => {
      setPool(selectSpeedChallengePool(all));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;
    if (remaining <= 0) {
      setPhase('result');
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, remaining]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (phase === 'result') {
      if (isNewBestScore(score, bestScore)) {
        localStorage.setItem(BEST_SCORE_KEY, String(score));
        setBestScore(score);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function start() {
    setPool((p) => shuffle(p));
    setIndex(0);
    setScore(0);
    setFlash(null);
    setRemaining(duration);
    setPhase('running');
  }

  function handleAnswer(correct: boolean) {
    if (flash !== null) return;
    setFlash(correct ? 'correct' : 'incorrect');
    (correct ? playCorrectSound : playIncorrectSound)();
    if (correct) setScore((s) => s + 1);
    advanceTimer.current = setTimeout(() => {
      setFlash(null);
      setIndex((i) => (pool.length > 0 ? (i + 1) % pool.length : 0));
    }, 500);
  }

  if (loading) {
    return <div className="card">Đang tải...</div>;
  }

  if (pool.length === 0) {
    return (
      <div className="card">
        <p>Chưa có đủ bài mức cơ bản để tạo thử thách. Hãy quay lại sau.</p>
        <button className="btn" onClick={() => navigate('/luyen-tap')}>
          ← Quay lại
        </button>
      </div>
    );
  }

  if (phase === 'setup') {
    return (
      <div className="card">
        <h2>⚡ Thử thách tốc độ</h2>
        <p>Trả lời càng nhiều câu mức cơ bản càng tốt trước khi hết giờ — không có gợi ý hay lời giải, chỉ có phản xạ!</p>
        {bestScore !== null && (
          <p>
            🏆 Kỷ lục của bạn: <strong>{bestScore} câu đúng</strong>
          </p>
        )}
        <div style={{ margin: '12px 0' }}>
          {DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              className="chip-btn"
              style={{
                marginRight: 8,
                ...(duration === d ? { background: 'var(--accent-orange)', color: '#fff' } : {}),
              }}
              onClick={() => setDuration(d)}
            >
              {d} giây
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={start}>
          Bắt đầu
        </button>
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => navigate('/luyen-tap')}>
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="card">
        <h2>Hết giờ!</h2>
        <p>
          Bạn trả lời đúng <strong>{score}</strong> câu.
        </p>
        {bestScore !== null && score >= bestScore && <p>🎉 Kỷ lục mới!</p>}
        <button className="btn btn-primary" onClick={start} style={{ marginRight: 8 }}>
          Chơi lại
        </button>
        <button className="btn" onClick={() => navigate('/luyen-tap')}>
          Quay lại Luyện tập
        </button>
      </div>
    );
  }

  const current = pool[index];

  return (
    <div className="card">
      <p>
        ⏱️ Còn {remaining}s — Điểm: {score}
      </p>
      <p>
        <MathRenderer content={current.statement} />
      </p>
      {flash === null && current.answerType === 'mcq' && current.mcq && (
        <McqQuestion mcq={current.mcq} disabled={false} onSubmit={(i) => handleAnswer(i === current.mcq!.answerIndex)} />
      )}
      {flash === null && current.answerType === 'numeric' && current.numeric && (
        <NumericQuestion
          disabled={false}
          onSubmit={(raw) => {
            const result = checkNumericAnswer(current.numeric!, raw);
            if (result.status === 'format_error') return;
            handleAnswer(result.status === 'correct');
          }}
        />
      )}
      {flash === 'correct' && <p className="result-correct">✅ Chính xác!</p>}
      {flash === 'incorrect' && <p className="result-incorrect">❌ Chưa đúng, câu tiếp theo...</p>}
    </div>
  );
}
