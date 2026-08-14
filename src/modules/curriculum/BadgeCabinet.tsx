import type { BadgeStatus } from '../../core/rewards';

/** Tủ huy hiệu: hiện cả huy hiệu đã đạt và chưa đạt, huy hiệu chưa đạt hiện mờ kèm điều kiện (GM-05). */
export function BadgeCabinet({ badges, streak }: { badges: BadgeStatus[]; streak: number }) {
  return (
    <div className="card">
      <h3>🔥 Chuỗi {streak} buổi liên tiếp</h3>
      <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>
        Số buổi học liên tiếp gần đây không phải "Cần ôn lại".
      </p>

      <h3 style={{ marginTop: 16 }}>Tủ huy hiệu</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {badges.map((b) => (
          <div
            key={b.id}
            title={b.earned ? b.label : `Chưa đạt: ${b.description}`}
            style={{
              padding: '12px 10px',
              borderRadius: 12,
              textAlign: 'center',
              border: '1px solid var(--border-glow)',
              background: b.earned ? 'linear-gradient(180deg, var(--bg-panel), var(--bg-panel-soft))' : 'var(--bg-panel-soft)',
              opacity: b.earned ? 1 : 0.45,
            }}
          >
            <div style={{ fontSize: '1.8em' }}>{b.icon}</div>
            <div style={{ fontSize: '0.78em', fontWeight: 700, marginTop: 4 }}>{b.label}</div>
            {!b.earned && (
              <div style={{ fontSize: '0.7em', color: 'var(--text-muted)', marginTop: 4 }}>{b.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
