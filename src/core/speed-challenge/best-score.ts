/** So sánh điểm vừa đạt với kỷ lục cũ (GM-08). Hàm thuần. */
export function isNewBestScore(current: number, previousBest: number | null): boolean {
  return previousBest === null || current > previousBest;
}
