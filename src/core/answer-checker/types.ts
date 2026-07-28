/**
 * Đặc tả chấm đáp số tự nhập — URD Mục 8.2, FR-M05 → FR-M14.
 * Hàm thuần, không I/O, không gọi mạng.
 */

export type NumericAnswerKind = 'single' | 'list';

export interface NumericAnswerSpec {
  /** 'single': một đáp số đúng (chấp nhận nhiều cách viết tương đương).
   *  'list': nhiều đáp số hợp lệ, học sinh phải liệt kê đủ và không thừa (FR-M12). */
  kind: NumericAnswerKind;
  /** Giá trị chuẩn được chấp nhận, dạng chuỗi: "1/2", "4.65", "-3", "1 1/2"... */
  acceptedValues: string[];
  /** Đơn vị kỳ vọng, nếu câu hỏi yêu cầu (FR-M10). */
  unit?: string;
  /** Sai số cho phép khi so sánh dạng thập phân (FR-M11). Mặc định 0 = khớp tuyệt đối. */
  tolerance: number;
  /** Nếu true: chỉ chấp nhận phân số đã tối giản (FR-M07 override). Mặc định false. */
  requireSimplified?: boolean;
  /** Nếu true: không quy đổi phân số ↔ thập phân, chỉ chấp nhận đúng dạng trình bày (FR-M06 override). */
  requireExactForm?: boolean;
  /** Gợi ý cho parser: đáp án là số nguyên → khoảng trắng/dấu chấm là phân cách nghìn (FR-M09). */
  isInteger?: boolean;
}

export type CheckResult =
  | { status: 'correct' }
  | { status: 'incorrect' }
  | { status: 'wrong_unit'; message: string }
  | { status: 'format_error'; message: string };
