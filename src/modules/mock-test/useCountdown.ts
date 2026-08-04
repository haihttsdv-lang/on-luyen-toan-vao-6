import { useEffect, useRef, useState } from 'react';

/** Đồng hồ đếm ngược; gọi onExpire đúng một lần khi hết giờ (FR-T03). */
export function useCountdown(endTime: number, onExpire: () => void): number {
  const [remainingMs, setRemainingMs] = useState(() => Math.max(0, endTime - Date.now()));
  const firedRef = useRef(false);

  useEffect(() => {
    firedRef.current = false;
    const tick = () => {
      const remaining = Math.max(0, endTime - Date.now());
      setRemainingMs(remaining);
      if (remaining <= 0 && !firedRef.current) {
        firedRef.current = true;
        onExpire();
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);

  return remainingMs;
}

export function formatCountdown(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
