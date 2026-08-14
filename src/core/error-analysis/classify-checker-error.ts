import type { CheckResult } from '../answer-checker/types';
import type { ErrorType } from '../../types';

/**
 * Suy ra loại lỗi (FR-P08) trực tiếp từ kết quả bộ chấm, khi có thể suy ra một cách
 * khách quan mà không cần hỏi học sinh. Hiện chỉ 'wrong_unit' suy ra được chắc chắn
 * (sai đơn vị); các trạng thái còn lại ('incorrect') không đủ thông tin để phân biệt
 * "sai công thức" / "nhầm dữ kiện" / "tính toán sai" / "không nhận ra dạng bài" —
 * những loại đó cần học sinh tự chọn (xem SELF_REPORT_ERROR_TYPES).
 */
export function classifyCheckerError(result: CheckResult): ErrorType | undefined {
  if (result.status === 'wrong_unit') {
    return 'sai_don_vi';
  }
  return undefined;
}

export const ERROR_TYPE_LABELS: Record<ErrorType, string> = {
  sai_cong_thuc: 'Sai công thức',
  sai_don_vi: 'Sai đơn vị',
  nham_du_kien: 'Nhầm dữ kiện đề bài',
  tinh_toan_sai: 'Tính toán sai',
  khong_nhan_dang: 'Không nhận ra dạng bài',
};

/** 4 loại lỗi học sinh tự chọn sau khi xem lời giải của một câu làm sai (loại trừ 'sai_don_vi' vì đã tự động suy ra). */
export const SELF_REPORT_ERROR_TYPES: ErrorType[] = [
  'sai_cong_thuc',
  'nham_du_kien',
  'tinh_toan_sai',
  'khong_nhan_dang',
];
