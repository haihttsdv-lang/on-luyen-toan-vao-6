import { rationalWithinTolerance } from './rational';
import type { ParsedNumber } from './parse';

export interface MatchOptions {
  tolerance: number;
  requireExactForm?: boolean;
}

/**
 * So khớp một đáp số học sinh đã parse với một giá trị chấp nhận đã parse.
 * requireExactForm: không cho quy đổi phân số <-> thập phân (FR-M06 override).
 */
export function matchesAccepted(student: ParsedNumber, accepted: ParsedNumber, opts: MatchOptions): boolean {
  if (opts.requireExactForm) {
    const studentIsFraction = student.shape === 'fraction';
    const acceptedIsFraction = accepted.shape === 'fraction';
    if (studentIsFraction !== acceptedIsFraction) {
      return false;
    }
  }
  return rationalWithinTolerance(student.value, accepted.value, opts.tolerance);
}
