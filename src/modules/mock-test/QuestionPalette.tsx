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
          let background = '#0b1120';
          let glow = 'none';
          if (markedForReview[i]) {
            background = '#ffb020';
            glow = '0 0 8px rgba(255,176,32,0.6)';
          } else if (answered[i]) {
            background = '#39ff88';
            glow = '0 0 8px rgba(57,255,136,0.6)';
          }
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: isCurrent ? '2px solid #00e5ff' : '1px solid rgba(0,229,255,0.28)',
                background,
                boxShadow: isCurrent ? '0 0 12px rgba(0,229,255,0.6)' : glow,
                color: background === '#0b1120' ? '#f1f5f9' : '#001014',
                fontWeight: isCurrent ? 800 : 600,
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <p style={{ fontSize: '0.8em', color: '#a6b1c9' }}>
        <span style={{ color: '#39ff88' }}>■</span> Đã làm &nbsp;
        <span style={{ color: '#ffb020' }}>■</span> Đánh dấu xem lại &nbsp;
        <span>□</span> Chưa làm
      </p>
    </div>
  );
}
