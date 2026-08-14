/** Phần bị cắt/không tô đậm bên trong hình lớn (HH-10). */
export type CutoutShape =
  | { kind: 'triangle'; base: number; height: number; label: string }
  | { kind: 'circle'; radius: number; label: string }
  | { kind: 'square'; side: number; label: string }
  | { kind: 'strip'; width: number; label: string };

const PAD_X = 40;
const PAD_TOP = 24;
const PAD_BOTTOM = 34;
const MAX_W = 220;
const MAX_H = 150;

/**
 * SVG hình chữ nhật/hình vuông lớn có một phần bị cắt (không tô đậm) ở giữa, phần còn lại
 * tô đậm bằng màu nền nhạt — dùng cho các bài "tính diện tích phần tô đậm" (HH-10, FR-M04).
 * Chỉ dùng `currentColor` để tự khớp theme sáng/tối, giống quy ước của `rectangleFigure`.
 */
export function shadedRegionFigure(outerWidth: number, outerHeight: number, cutout: CutoutShape, unit = 'cm'): string {
  const scale = Math.min(MAX_W / outerWidth, MAX_H / outerHeight);
  const w = outerWidth * scale;
  const h = outerHeight * scale;
  const x0 = PAD_X;
  const y0 = PAD_TOP;

  let inner = '';
  if (cutout.kind === 'triangle') {
    const bw = cutout.base * scale;
    const bh = cutout.height * scale;
    const tx = x0 + (w - bw) / 2;
    const ty = y0 + h - bh;
    inner = `<polygon points="${tx},${ty + bh} ${tx + bw},${ty + bh} ${tx + bw / 2},${ty}" fill="var(--bg-page, #fff)" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />
    <text x="${tx + bw / 2}" y="${ty + bh + 14}" text-anchor="middle" font-size="10">${cutout.label}</text>`;
  } else if (cutout.kind === 'circle') {
    const r = Math.min(w, h) / 2 - 4;
    const cx = x0 + w / 2;
    const cy = y0 + h / 2;
    inner = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--bg-page, #fff)" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />
    <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="10">${cutout.label}</text>`;
  } else if (cutout.kind === 'square') {
    const s = cutout.side * scale;
    const sx = x0 + (w - s) / 2;
    const sy = y0 + (h - s) / 2;
    inner = `<rect x="${sx}" y="${sy}" width="${s}" height="${s}" fill="var(--bg-page, #fff)" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />
    <text x="${sx + s / 2}" y="${sy + s / 2 + 4}" text-anchor="middle" font-size="10">${cutout.label}</text>`;
  } else {
    const sh = cutout.width * scale;
    const sy = y0 + (h - sh) / 2;
    inner = `<rect x="${x0}" y="${sy}" width="${w}" height="${sh}" fill="var(--bg-page, #fff)" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />
    <text x="${x0 + w / 2}" y="${sy + sh / 2 + 4}" text-anchor="middle" font-size="10">${cutout.label}</text>`;
  }

  return `
<svg viewBox="0 0 ${w + PAD_X * 2} ${h + PAD_TOP + PAD_BOTTOM}" role="img" aria-label="Hình lớn kích thước ${outerWidth}${unit} x ${outerHeight}${unit}, phần tô đậm là diện tích còn lại sau khi cắt bỏ ${cutout.label}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="2" />
  ${inner}
  <text x="${x0 - 6}" y="${y0 + h / 2}" text-anchor="end" font-size="10" transform="rotate(-90 ${x0 - 6} ${y0 + h / 2})">${outerHeight}${unit}</text>
  <text x="${x0 + w / 2}" y="${y0 + h + 18}" text-anchor="middle" font-size="10">${outerWidth}${unit}</text>
</svg>`.trim();
}
