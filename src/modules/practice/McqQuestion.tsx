import { useState } from 'react';
import { MathRenderer } from '../../components/MathRenderer';
import type { McqAnswer } from '../../types';

interface McqQuestionProps {
  mcq: McqAnswer;
  disabled: boolean;
  onSubmit: (selectedIndex: number) => void;
}

export function McqQuestion({ mcq, disabled, onSubmit }: McqQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      {mcq.options.map((opt, i) => (
        <label key={i} style={{ display: 'block', marginBottom: 6 }}>
          <input
            type="radio"
            name="mcq-option"
            checked={selected === i}
            disabled={disabled}
            onChange={() => setSelected(i)}
          />{' '}
          <MathRenderer content={opt} />
        </label>
      ))}
      <button
        className="btn btn-primary"
        disabled={disabled || selected === null}
        onClick={() => selected !== null && onSubmit(selected)}
      >
        Nộp đáp án
      </button>
    </div>
  );
}
