import { useEffect, useState } from 'react';

interface ReadAloudButtonProps {
  text: string;
}

/** Bỏ bớt cú pháp LaTeX thô để giọng đọc tiếng Việt không đọc ký hiệu ($, \times...). */
function toSpeakableText(text: string): string {
  return text
    .replace(/\$/g, '')
    .replace(/\\times/g, ' nhân ')
    .replace(/\\div/g, ' chia ')
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1 phần $2')
    .replace(/\\[a-zA-Z]+/g, ' ');
}

/** Nút đọc đề bằng giọng nói (UX-15). Tự ẩn khi trình duyệt không hỗ trợ Web Speech API. */
export function ReadAloudButton({ text }: ReadAloudButtonProps) {
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const [speaking, setSpeaking] = useState(false);

  // UX-16: tự hủy giọng đọc khi đổi câu hoặc rời trang, tránh chạy tiếp ở màn hình khác.
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [text, supported]);

  if (!supported) return null;

  function toggle() {
    window.speechSynthesis.cancel();
    if (speaking) {
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(toSpeakableText(text));
    utterance.lang = 'vi-VN';
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  return (
    <button
      type="button"
      className="btn read-aloud-btn"
      onClick={toggle}
      aria-label={speaking ? 'Dừng đọc đề' : 'Đọc đề bài'}
    >
      {speaking ? '🔇 Dừng đọc' : '🔊 Đọc đề'}
    </button>
  );
}
