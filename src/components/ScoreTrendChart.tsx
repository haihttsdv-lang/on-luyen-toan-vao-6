interface ScoreTrendChartProps {
  points: number[]; // tỉ lệ điểm 0..1, theo thứ tự thời gian tăng dần
  ariaLabel: string;
}

/** Biểu đồ đường xu hướng điểm số theo thời gian, tính theo phần trăm (FR-T08). */
export function ScoreTrendChart({ points, ariaLabel }: ScoreTrendChartProps) {
  const width = 360;
  const height = 140;
  const pad = 28;
  const maxIndex = Math.max(1, points.length - 1);
  const coords = points.map((p, i) => {
    const x = pad + (i / maxIndex) * (width - 2 * pad);
    const y = height - pad - p * (height - 2 * pad);
    return { x, y, percent: Math.round(p * 100) };
  });
  const linePoints = coords.map((c) => `${c.x},${c.y}`).join(' ');

  return (
    <div className="viz-root figure-box">
      <style>{`
        .viz-root {
          color-scheme: dark;
          --viz-grid: #2c3350;
          --viz-axis: #3f4870;
          --viz-muted: #a6b1c9;
          --viz-series-1: #00e5ff;
        }
      `}</style>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}>
        {[0, 50, 100].map((pct) => {
          const y = height - pad - (pct / 100) * (height - 2 * pad);
          return (
            <g key={pct}>
              <line x1={pad} y1={y} x2={width - pad} y2={y} stroke="var(--viz-grid)" strokeWidth={1} />
              <text x={pad - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--viz-muted)">
                {pct}%
              </text>
            </g>
          );
        })}
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="var(--viz-axis)" strokeWidth={1} />
        <polyline
          points={linePoints}
          fill="none"
          stroke="var(--viz-series-1)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={4} fill="var(--viz-series-1)">
            <title>
              Lần {i + 1}: {c.percent}%
            </title>
          </circle>
        ))}
      </svg>
    </div>
  );
}
