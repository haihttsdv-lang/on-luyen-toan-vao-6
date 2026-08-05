interface QuestionPaletteProps {
  count: number;
  currentIndex: number;
  answered: boolean[];
  markedForReview: boolean[];
  onJump: (index: number) => void;
}

/** Bảng số thứ tự câu hỏi để di chuyển tự do (FR-T04). */
export function QuestionPalette({ count, currentIndex, answered, markedForReview, onJump }: QuestionPaletteProps) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {Array.from({ length: count }, (_, i) => {
          const isCurrent = i === currentIndex;
          let background = '#ffffff';
          let shadow = 'none';
          if (markedForReview[i]) {
            background = '#f59e0b';
            shadow = '0 2px 6px rgba(245,158,11,0.45)';
          } else if (answered[i]) {
            background = '#16a34a';
            shadow = '0 2px 6px rgba(22,163,74,0.4)';
          }
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: isCurrent ? '2px solid #0ea5e9' : '1px solid rgba(37,99,235,0.25)',
                background,
                boxShadow: isCurrent ? '0 0 0 3px rgba(14,165,233,0.3)' : shadow,
                color: background === '#ffffff' ? '#0f172a' : '#fff',
                fontWeight: isCurrent ? 800 : 600,
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <p style={{ fontSize: '0.8em', color: '#64748b' }}>
        <span style={{ color: '#16a34a' }}>■</span> Đã làm &nbsp;
        <span style={{ color: '#f59e0b' }}>■</span> Đánh dấu xem lại &nbsp;
        <span>□</span> Chưa làm
      </p>
    </div>
  );
}
