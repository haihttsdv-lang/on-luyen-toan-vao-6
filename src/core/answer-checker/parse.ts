import { makeRational, type Rational } from './rational';

export interface ParsedNumber {
  value: Rational;
  /** Tử/mẫu như học sinh đã viết (trước khi rút gọn), chỉ có khi nhập dạng phân số/hỗn số.
   *  Dùng để kiểm tra "chưa tối giản" (FR-M07). null nếu nhập dạng thập phân/nguyên. */
  rawFraction: { num: bigint; den: bigint } | null;
  /** Dạng trình bày học sinh đã nhập, dùng cho requireExactForm (FR-M06). */
  shape: 'fraction' | 'decimal' | 'integer';
}

export interface ParseError {
  error: true;
  message: string;
}

export function isParseError(x: unknown): x is ParseError {
  return typeof x === 'object' && x !== null && (x as ParseError).error === true;
}

const FRACTION_RE = /^(-?\d+)\/(\d+)$/;
const MIXED_RE = /^(-?\d+)\s+(\d+)\/(\d+)$/;
const DECIMAL_RE = /^-?\d+([.,]\d+)?$/;

/**
 * Phân tích một chuỗi số học sinh nhập (không kèm đơn vị) thành ParsedNumber.
 * isIntegerHint: gợi ý đáp án là số nguyên -> khoảng trắng/dấu chấm là phân cách nghìn (FR-M09).
 */
export function parseNumericToken(raw: string, isIntegerHint = false): ParsedNumber | ParseError {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return { error: true, message: 'Vui lòng nhập đáp số.' };
  }

  // Hỗn số: "1 1/2" (FR-M08)
  const mixedMatch = trimmed.match(MIXED_RE);
  if (mixedMatch) {
    const [, intPartStr, fracNumStr, fracDenStr] = mixedMatch;
    const intPart = BigInt(intPartStr);
    const fracNum = BigInt(fracNumStr);
    const fracDen = BigInt(fracDenStr);
    if (fracDen === 0n) {
      return { error: true, message: 'Mẫu số không được bằng 0.' };
    }
    const sign = intPart < 0n ? -1n : 1n;
    const combinedNum = sign * (bigAbs(intPart) * fracDen + fracNum);
    return {
      value: makeRational(combinedNum, fracDen),
      rawFraction: { num: fracNum, den: fracDen },
      shape: 'fraction',
    };
  }

  // Phân số đơn: "1/2", "2/4" (FR-M06, FR-M07)
  const fracMatch = trimmed.match(FRACTION_RE);
  if (fracMatch) {
    const [, numStr, denStr] = fracMatch;
    const num = BigInt(numStr);
    const den = BigInt(denStr);
    if (den === 0n) {
      return { error: true, message: 'Mẫu số không được bằng 0.' };
    }
    return {
      value: makeRational(num, den),
      rawFraction: { num, den },
      shape: 'fraction',
    };
  }

  // Không phải phân số: số nguyên hoặc thập phân
  if (isIntegerHint) {
    // Khoảng trắng và dấu chấm là phân cách nghìn khi đáp án là số nguyên (FR-M09)
    const stripped = trimmed.replace(/[\s.]/g, '');
    if (!/^-?\d+$/.test(stripped)) {
      return { error: true, message: 'Đáp số phải là số nguyên hợp lệ.' };
    }
    return {
      value: makeRational(BigInt(stripped), 1n),
      rawFraction: null,
      shape: 'integer',
    };
  }

  // Số thập phân: dấu phẩy hoặc dấu chấm đều là dấu thập phân (FR-M05)
  if (!DECIMAL_RE.test(trimmed)) {
    return { error: true, message: 'Đáp số không đúng định dạng số.' };
  }
  const normalized = trimmed.replace(',', '.');
  const negative = normalized.startsWith('-');
  const unsigned = negative ? normalized.slice(1) : normalized;
  const [intPart, fracPart = ''] = unsigned.split('.');
  const den = 10n ** BigInt(fracPart.length);
  const num = BigInt((intPart || '0') + fracPart || '0') * (negative ? -1n : 1n);
  return {
    value: makeRational(num, den),
    rawFraction: null,
    shape: fracPart.length > 0 ? 'decimal' : 'integer',
  };
}

function bigAbs(x: bigint): bigint {
  return x < 0n ? -x : x;
}

export interface UnitStripResult {
  numericPart: string;
  status: 'no-unit' | 'matched' | 'mismatched' | 'unexpected';
  foundUnit?: string;
}

/**
 * Tách phần số ra khỏi đơn vị đo (FR-M10). Đơn vị được viết dính hoặc cách một khoảng
 * trắng ở cuối chuỗi, ví dụ "5 cm", "5cm".
 */
export function stripUnit(raw: string, expectedUnit?: string): UnitStripResult {
  const trimmed = raw.trim();
  // Khớp phần số (nguyên/thập phân/phân số/hỗn số) ở đầu, phần còn lại là đơn vị (nếu có)
  const match = trimmed.match(/^(-?\d+(?:[.,]\d+)?(?:\s+\d+\/\d+)?|-?\d+\/\d+)\s*([a-zA-ZÀ-ỹ²³%]+)?$/);
  if (!match) {
    return { numericPart: trimmed, status: 'no-unit' };
  }
  const [, numericPart, unitPart] = match;
  if (!unitPart) {
    return { numericPart, status: 'no-unit' };
  }
  if (!expectedUnit) {
    return { numericPart, status: 'unexpected', foundUnit: unitPart };
  }
  const normalize = (s: string) => s.trim().toLowerCase();
  if (normalize(unitPart) === normalize(expectedUnit)) {
    return { numericPart, status: 'matched', foundUnit: unitPart };
  }
  return { numericPart, status: 'mismatched', foundUnit: unitPart };
}

export function splitListTokens(raw: string): string[] {
  return raw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
