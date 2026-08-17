/**
 * Hiệu ứng âm thanh phản hồi khi làm bài (GM-07). Sinh bằng Web Audio API, không thêm
 * file âm thanh nào. Đây là lớp duy nhất trong dự án được phép chạm trực tiếp vào
 * `window`/`AudioContext` cho mục đích này — tách khỏi phần logic thuần còn lại.
 */

const STORAGE_KEY = 'vnadvisor:sound-enabled';

export function isSoundEnabled(): boolean {
  if (typeof localStorage === 'undefined') return true;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === null ? true : v === '1';
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
}

type AudioContextCtor = typeof AudioContext;

function getAudioContextCtor(): AudioContextCtor | undefined {
  if (typeof window === 'undefined') return undefined;
  return window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
}

let sharedContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  const Ctor = getAudioContextCtor();
  if (!Ctor) return null;
  if (!sharedContext) {
    sharedContext = new Ctor();
  }
  return sharedContext;
}

function playTone(freq: number, durationMs: number, gainPeak: number, startDelayMs = 0): void {
  const ctx = getContext();
  if (!ctx) return;
  const startAt = ctx.currentTime + startDelayMs / 1000;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(gainPeak, startAt + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + durationMs / 1000);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startAt);
  osc.stop(startAt + durationMs / 1000 + 0.02);
}

/** Chuông 2 nốt đi lên, vui tai — dùng khi làm đúng. */
export function playCorrectSound(): void {
  if (!isSoundEnabled()) return;
  playTone(660, 120, 0.15);
  playTone(880, 160, 0.15, 90);
}

/** Trầm và ngắn, không chói tai (yêu cầu rõ trong GM-07) — dùng khi làm sai. */
export function playIncorrectSound(): void {
  if (!isSoundEnabled()) return;
  playTone(180, 180, 0.12);
}
