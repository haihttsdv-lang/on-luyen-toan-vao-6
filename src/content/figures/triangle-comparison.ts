/** Hai hình minh họa dùng chung cho HH-09 (tỉ số diện tích tam giác chung đáy/chung chiều cao). */

const W = 240;
const H = 170;
const BASE_Y = 130;
const BASE_X1 = 40;
const BASE_X2 = 200;

/**
 * Hai tam giác chung đáy, chiều cao khác nhau — vẽ chung một đoạn đáy, hai đỉnh ở hai độ
 * cao khác nhau để so sánh trực quan (không cần đúng vị trí đỉnh, chỉ minh họa chiều cao).
 */
export function sharedBaseTriangleFigure(height1: number, height2: number, label1 = 'Tam giác 1', label2 = 'Tam giác 2'): string {
  const scale = 90 / Math.max(height1, height2);
  const h1 = height1 * scale;
  const h2 = height2 * scale;
  const apex1X = BASE_X1 + (BASE_X2 - BASE_X1) * 0.32;
  const apex2X = BASE_X1 + (BASE_X2 - BASE_X1) * 0.68;

  return `
<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Hai tam giác chung đáy, ${label1} cao ${height1}, ${label2} cao ${height2}" xmlns="http://www.w3.org/2000/svg">
  <line x1="${BASE_X1}" y1="${BASE_Y}" x2="${BASE_X2}" y2="${BASE_Y}" stroke="currentColor" stroke-width="2" />
  <polygon points="${BASE_X1},${BASE_Y} ${BASE_X2},${BASE_Y} ${apex1X},${BASE_Y - h1}" fill="none" stroke="currentColor" stroke-width="2" />
  <polygon points="${BASE_X1},${BASE_Y} ${BASE_X2},${BASE_Y} ${apex2X},${BASE_Y - h2}" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 3" />
  <line x1="${apex1X}" y1="${BASE_Y - h1}" x2="${apex1X}" y2="${BASE_Y}" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" />
  <line x1="${apex2X}" y1="${BASE_Y - h2}" x2="${apex2X}" y2="${BASE_Y + 14}" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" />
  <text x="${apex1X + 6}" y="${BASE_Y - h1 / 2}" font-size="10">${label1}: ${height1}</text>
  <text x="${apex2X + 6}" y="${BASE_Y + 12}" font-size="10">${label2}: ${height2}</text>
  <text x="${(BASE_X1 + BASE_X2) / 2}" y="${BASE_Y + 20}" text-anchor="middle" font-size="10">đáy chung</text>
</svg>`.trim();
}

/**
 * Một tam giác có điểm chia đáy — chung chiều cao từ đỉnh, dùng cho bài so sánh diện tích
 * hai tam giác con theo tỉ lệ đoạn đáy (HH-09).
 */
export function sharedHeightTriangleFigure(apexLabel: string, pointLabel: string, leftBaseLabel: string, rightLaseLabel: string): string {
  const apexX = (BASE_X1 + BASE_X2) / 2;
  const divideX = BASE_X1 + (BASE_X2 - BASE_X1) * 0.4;

  return `
<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Tam giác đỉnh ${apexLabel}, điểm ${pointLabel} chia đáy thành ${leftBaseLabel} và ${rightLaseLabel}" xmlns="http://www.w3.org/2000/svg">
  <line x1="${BASE_X1}" y1="${BASE_Y}" x2="${BASE_X2}" y2="${BASE_Y}" stroke="currentColor" stroke-width="2" />
  <polygon points="${BASE_X1},${BASE_Y} ${BASE_X2},${BASE_Y} ${apexX},20" fill="none" stroke="currentColor" stroke-width="2" />
  <line x1="${apexX}" y1="20" x2="${divideX}" y2="${BASE_Y}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />
  <circle cx="${divideX}" cy="${BASE_Y}" r="2.5" fill="currentColor" />
  <text x="${apexX}" y="14" text-anchor="middle" font-size="11">${apexLabel}</text>
  <text x="${divideX}" y="${BASE_Y + 16}" text-anchor="middle" font-size="10">${pointLabel}</text>
  <text x="${(BASE_X1 + divideX) / 2}" y="${BASE_Y + 28}" text-anchor="middle" font-size="10">${leftBaseLabel}</text>
  <text x="${(divideX + BASE_X2) / 2}" y="${BASE_Y + 28}" text-anchor="middle" font-size="10">${rightLaseLabel}</text>
</svg>`.trim();
}
