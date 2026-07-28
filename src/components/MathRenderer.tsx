import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useMemo } from 'react';

interface MathRendererProps {
  /** Văn bản có thể chứa LaTeX inline đặt trong cặp dấu $...$ */
  content: string;
  className?: string;
  /** true: toàn bộ content là một công thức LaTeX (không cần bọc $...$), render displayMode */
  display?: boolean;
}

/** Render công thức toán (KaTeX) xen giữa văn bản thường — FR-M01 → FR-M04, NFR-01. */
export function MathRenderer({ content, className, display = false }: MathRendererProps) {
  const html = useMemo(() => {
    if (display) {
      try {
        return katex.renderToString(content, { throwOnError: false, displayMode: true });
      } catch {
        return escapeHtml(content);
      }
    }
    return renderMixedContent(content);
  }, [content, display]);
  // eslint-disable-next-line react/no-danger -- nội dung do KaTeX render từ dữ liệu tự biên soạn, không phải input người dùng
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderMixedContent(content: string): string {
  const parts = content.split(/(\$[^$]+\$)/g);
  return parts
    .map((part) => {
      if (part.length > 1 && part.startsWith('$') && part.endsWith('$')) {
        const expr = part.slice(1, -1);
        try {
          return katex.renderToString(expr, { throwOnError: false, displayMode: false });
        } catch {
          return escapeHtml(part);
        }
      }
      return escapeHtml(part);
    })
    .join('');
}
