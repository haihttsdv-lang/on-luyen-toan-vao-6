import { useEffect, useState } from 'react';
import { MathRenderer } from './MathRenderer';
import type { SolutionStep } from '../types';

interface SolutionStepsProps {
  steps: SolutionStep[];
  /** Mở dần từng bước một thay vì hiện hết cùng lúc, để học sinh thử tự làm tiếp (UX-08). Mặc định true. */
  progressive?: boolean;
}

/** Lời giải từng bước có đánh số, mỗi bước có câu diễn giải lý do (FR-L03, FR-P04). */
export function SolutionSteps({ steps, progressive = true }: SolutionStepsProps) {
  const sorted = [...steps].sort((a, b) => a.order - b.order);
  const [revealedCount, setRevealedCount] = useState(progressive ? Math.min(1, sorted.length) : sorted.length);

  useEffect(() => {
    setRevealedCount(progressive ? Math.min(1, sorted.length) : sorted.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, progressive]);

  const visible = sorted.slice(0, revealedCount);
  const hasMore = revealedCount < sorted.length;

  return (
    <div>
      <ol className="solution-steps">
        {visible.map((step, i) => (
          <li key={step.order} className={progressive && i === visible.length - 1 ? 'solution-step-enter' : undefined}>
            <MathRenderer content={step.content} />
            {step.rationale && (
              <div style={{ fontSize: '0.85em', opacity: 0.75 }}>
                <MathRenderer content={step.rationale} />
              </div>
            )}
          </li>
        ))}
      </ol>
      {hasMore && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={() => setRevealedCount((c) => c + 1)}>
            Xem bước tiếp theo ({revealedCount}/{sorted.length})
          </button>
          <button type="button" className="btn" onClick={() => setRevealedCount(sorted.length)}>
            Hiện tất cả
          </button>
        </div>
      )}
    </div>
  );
}
