/** SVG hình chữ nhật nội tuyến dùng chung, có nhãn chiều dài/chiều rộng (Mục 8.1, FR-M04). */
export function rectangleFigure(lengthLabel: string, widthLabel: string): string {
  return `
<svg viewBox="0 0 220 140" role="img" aria-label="Hình chữ nhật có chiều dài ${lengthLabel}, chiều rộng ${widthLabel}" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="20" width="160" height="90" fill="none" stroke="currentColor" stroke-width="2" />
  <text x="110" y="14" text-anchor="middle" font-size="14">${lengthLabel}</text>
  <text x="14" y="70" text-anchor="middle" font-size="14" transform="rotate(-90 14 70)">${widthLabel}</text>
</svg>`.trim();
}

/** SVG hình vuông nội tuyến dùng chung, có nhãn cạnh. */
export function squareFigure(sideLabel: string): string {
  return `
<svg viewBox="0 0 140 140" role="img" aria-label="Hình vuông có cạnh ${sideLabel}" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="20" width="90" height="90" fill="none" stroke="currentColor" stroke-width="2" />
  <text x="70" y="14" text-anchor="middle" font-size="14">${sideLabel}</text>
  <text x="14" y="65" text-anchor="middle" font-size="14" transform="rotate(-90 14 65)">${sideLabel}</text>
</svg>`.trim();
}
