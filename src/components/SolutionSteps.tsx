import { MathRenderer } from './MathRenderer';
import type { SolutionStep } from '../types';

interface SolutionStepsProps {
  steps: SolutionStep[];
}

/** Lời giải từng bước có đánh số, mỗi bước có câu diễn giải lý do (FR-L03, FR-P04). */
export function SolutionSteps({ steps }: SolutionStepsProps) {
  return (
    <ol className="solution-steps">
      {[...steps]
        .sort((a, b) => a.order - b.order)
        .map((step) => (
          <li key={step.order}>
            <MathRenderer content={step.content} />
            {step.rationale && (
              <div style={{ fontSize: '0.85em', opacity: 0.75 }}>
                <MathRenderer content={step.rationale} />
              </div>
            )}
          </li>
        ))}
    </ol>
  );
}
