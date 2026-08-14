import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRewards } from './useRewards';

/** Hiển thị số xu ở header (GM-01) — tải lại mỗi khi đổi trang để cập nhật sau khi hoàn thành buổi học. */
export function CoinsBadge() {
  const location = useLocation();
  const { loading, coins, reload } = useRewards();

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (loading && coins === 0) return null;

  return (
    <span
      style={{
        marginLeft: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '6px 12px',
        borderRadius: 999,
        background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-orange))',
        color: '#fff',
        fontWeight: 800,
        fontSize: '0.82em',
      }}
      title="Xu tích lũy từ các buổi học đã hoàn thành"
    >
      🪙 {coins}
    </span>
  );
}
