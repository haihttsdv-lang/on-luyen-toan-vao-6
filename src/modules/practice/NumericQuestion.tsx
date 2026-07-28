import { useState } from 'react';

interface NumericQuestionProps {
  disabled: boolean;
  onSubmit: (raw: string) => void;
}

/** Ô nhập đáp số — hỗ trợ bàn phím số trên di động (NFR-04). */
export function NumericQuestion({ disabled, onSubmit }: NumericQuestionProps) {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập đáp số..."
        style={{ padding: 8, marginRight: 8, minWidth: 160 }}
      />
      <button className="btn btn-primary" disabled={disabled || value.trim().length === 0} onClick={() => onSubmit(value)}>
        Nộp đáp án
      </button>
    </div>
  );
}
