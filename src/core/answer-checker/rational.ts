/** Số hữu tỉ chính xác dùng BigInt — tránh sai số float khi so khớp đáp số. */
export interface Rational {
  num: bigint;
  den: bigint; // luôn dương
}

function bigAbs(x: bigint): bigint {
  return x < 0n ? -x : x;
}

function gcdBig(a: bigint, b: bigint): bigint {
  a = bigAbs(a);
  b = bigAbs(b);
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a === 0n ? 1n : a;
}

export function makeRational(num: bigint, den: bigint): Rational {
  if (den === 0n) {
    throw new Error('Mẫu số không được bằng 0');
  }
  if (den < 0n) {
    num = -num;
    den = -den;
  }
  return { num, den };
}

/** Rút gọn về dạng tối giản (mẫu số dương, gcd(num,den) = 1). */
export function reduceRational(r: Rational): Rational {
  if (r.num === 0n) return { num: 0n, den: 1n };
  const g = gcdBig(r.num, r.den);
  return { num: r.num / g, den: r.den / g };
}

/** true nếu phân số r đưa vào KHÔNG ở dạng tối giản (FR-M07). */
export function isUnsimplified(r: Rational): boolean {
  if (r.num === 0n) return r.den !== 1n;
  return gcdBig(r.num, r.den) !== 1n;
}

export function rationalEquals(a: Rational, b: Rational): boolean {
  const ra = reduceRational(a);
  const rb = reduceRational(b);
  return ra.num === rb.num && ra.den === rb.den;
}

export function toFloat(r: Rational): number {
  return Number(r.num) / Number(r.den);
}

export function rationalWithinTolerance(a: Rational, b: Rational, tolerance: number): boolean {
  if (tolerance <= 0) return rationalEquals(a, b);
  return Math.abs(toFloat(a) - toFloat(b)) <= tolerance;
}
