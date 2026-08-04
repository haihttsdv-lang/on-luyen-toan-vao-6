/**
 * Phân bổ `total` suất nguyên theo trọng số, tổng các phần đúng bằng `total`
 * (phương pháp số dư lớn nhất — largest remainder method). Hàm thuần.
 */
export function allocateByWeight(weights: number[], total: number): number[] {
  if (weights.length === 0 || total <= 0) {
    return weights.map(() => 0);
  }
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  if (sumWeights <= 0) {
    return weights.map(() => 0);
  }

  const raw = weights.map((w) => (w / sumWeights) * total);
  const floors = raw.map(Math.floor);
  const allocated = floors.reduce((a, b) => a + b, 0);
  const remaining = total - allocated;

  const remainders = raw
    .map((r, i) => ({ i, frac: r - floors[i] }))
    .sort((a, b) => b.frac - a.frac);

  const result = [...floors];
  for (let k = 0; k < remaining; k++) {
    result[remainders[k].i] += 1;
  }
  return result;
}
