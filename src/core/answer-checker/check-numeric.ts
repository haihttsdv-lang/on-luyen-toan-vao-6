import { isParseError, parseNumericToken, splitListTokens, stripUnit, type ParsedNumber } from './parse';
import { matchesAccepted } from './compare';
import { isUnsimplified } from './rational';
import type { CheckResult, NumericAnswerSpec } from './types';

/**
 * Chấm một đáp số học sinh nhập theo đặc tả URD Mục 8.2 (FR-M05 → FR-M14).
 * Hàm thuần, không I/O.
 */
export function checkNumericAnswer(spec: NumericAnswerSpec, studentInput: string): CheckResult {
  const tolerance = spec.tolerance ?? 0;
  return spec.kind === 'list'
    ? checkListAnswer(spec, studentInput, tolerance)
    : checkSingleAnswer(spec, studentInput, tolerance);
}

function checkSingleAnswer(spec: NumericAnswerSpec, studentInput: string, tolerance: number): CheckResult {
  const stripped = stripUnit(studentInput, spec.unit);

  if (stripped.status === 'mismatched') {
    return {
      status: 'wrong_unit',
      message: `Sai đơn vị: bài yêu cầu "${spec.unit}", bạn nhập "${stripped.foundUnit}".`,
    };
  }
  if (stripped.status === 'unexpected') {
    return { status: 'format_error', message: 'Bài này không yêu cầu đơn vị, hãy chỉ nhập số.' };
  }

  const student = parseNumericToken(stripped.numericPart, spec.isInteger);
  if (isParseError(student)) {
    return { status: 'format_error', message: student.message };
  }

  if (spec.requireSimplified && student.rawFraction && isUnsimplified(student.rawFraction)) {
    return { status: 'incorrect' };
  }

  for (const acceptedRaw of spec.acceptedValues) {
    const accepted = parseNumericToken(acceptedRaw, spec.isInteger);
    if (isParseError(accepted)) continue; // dữ liệu đề sai định dạng — bỏ qua, không phải lỗi học sinh
    if (matchesAccepted(student, accepted, { tolerance, requireExactForm: spec.requireExactForm })) {
      return { status: 'correct' };
    }
  }
  return { status: 'incorrect' };
}

function checkListAnswer(spec: NumericAnswerSpec, studentInput: string, tolerance: number): CheckResult {
  const tokens = splitListTokens(studentInput);
  if (tokens.length === 0) {
    return { status: 'format_error', message: 'Vui lòng nhập danh sách đáp số, phân tách bằng dấu phẩy.' };
  }

  const parsedStudent: ParsedNumber[] = [];
  for (const token of tokens) {
    const parsed = parseNumericToken(token, spec.isInteger);
    if (isParseError(parsed)) {
      return { status: 'format_error', message: `"${token}": ${parsed.message}` };
    }
    parsedStudent.push(parsed);
  }

  const parsedAccepted = spec.acceptedValues
    .map((v) => parseNumericToken(v, spec.isInteger))
    .filter((v): v is ParsedNumber => !isParseError(v));

  if (parsedStudent.length !== parsedAccepted.length) {
    return { status: 'incorrect' }; // thiếu hoặc thừa đáp số (FR-M12)
  }

  const usedAccepted = new Set<number>();
  for (const s of parsedStudent) {
    const matchIndex = parsedAccepted.findIndex(
      (a, i) => !usedAccepted.has(i) && matchesAccepted(s, a, { tolerance, requireExactForm: spec.requireExactForm }),
    );
    if (matchIndex === -1) {
      return { status: 'incorrect' };
    }
    usedAccepted.add(matchIndex);
  }
  return { status: 'correct' };
}
