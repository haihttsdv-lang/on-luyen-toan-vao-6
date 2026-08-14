/**
 * Ngưỡng số liệu dùng trong logic sản phẩm — tập trung ở đây thay vì hardcode rải rác
 * (NFR-06). Xem docs/adr/0001-kien-truc-khoi-tao.md cho các ngưỡng còn lại (Mục 17 URD).
 */

/** Đạt từ ngưỡng này trở lên trong bài kiểm tra nhanh cuối bài lý thuyết mới được
 * đánh dấu chuyên đề là "Đã nắm" (FR-L04). */
export const QUIZ_MASTERY_THRESHOLD = 0.8;

/**
 * Cấu hình công thức mức độ thành thạo (FR-H03, FR-H04) — giá trị mặc định đề xuất
 * trong URD Mục 17, chưa được chủ dự án xác nhận chính thức (xem ADR-0001).
 */
export const MASTERY_CONFIG = {
  /** Số lượt làm gần nhất tối đa được tính vào trung bình có trọng số. */
  windowSize: 10,
  /** Cần tối thiểu bấy nhiêu lượt làm mới bắt đầu tính mức thành thạo chính thức. */
  minAttempts: 3,
  /** Dưới ngưỡng này (điểm 0..1) -> "Cần ôn lại". */
  needsReviewMax: 0.5,
  /** Từ ngưỡng này trở lên (điểm 0..1) -> "Thành thạo"; ở giữa là "Đang tiến bộ". */
  masteredMin: 0.8,
};

/** Sổ lỗi có từ ngưỡng này trở lên câu thì ưu tiên đề xuất "luyện lại câu sai" lên đầu (FR-H08). */
export const ERROR_LOG_PRIORITY_THRESHOLD = 10;

/** Số hành động tiếp theo tối đa hiển thị trên trang chủ/hồ sơ (FR-H06). */
export const MAX_RECOMMENDATIONS = 3;

/** Số câu của bài kiểm tra đầu vào, phủ đều 6 nhóm chuyên đề (FR-H01). */
export const DIAGNOSTIC_TEST_SIZE = 30;

/**
 * Cấu hình Lộ trình học 4 giai đoạn (URD v2.0 Mục 7, FR-C01→C08).
 */
export const CURRICULUM_CONFIG = {
  /** Mặc định Thứ 3/5/7 (0 = Chủ nhật .. 6 = Thứ 7), đổi được ở trang Lộ trình. */
  defaultWeeklyDays: [2, 4, 6],
  /** Số buổi tối đa/tuần khi nén lịch theo ngày thi dự kiến (Mục 7). */
  maxWeeklyDays: 5,
  /** Đạt từ ngưỡng này trong bài kiểm tra đầu vào mới gợi ý bỏ qua Giai đoạn 1 (Mục 7). */
  skipPhase1Threshold: 0.85,
  /** Chèn 1 buổi kiểm tra định kỳ cuối mỗi N buổi đã lên lịch (xấp xỉ cuối tuần) (FR-C05). */
  weeklyTestEveryNSessions: 3,
  /** Chèn 1 buổi kiểm tra tháng cuối mỗi N buổi kiểm tra tuần (FR-C05). */
  monthlyTestEveryNWeeklyTests: 4,
} as const;

/** Ánh xạ trường mục tiêu -> cấu hình đề mặc định cho Giai đoạn 4 (Mục 6.1, FR-C06). */
export const TARGET_SCHOOL_TEST_CONFIG: Record<string, string> = {
  archimedes: 'SPRINT',
  'luong-the-vinh': 'STANDARD',
  'ngoi-sao-ha-noi': 'MIXED',
  'cau-giay': 'MIXED',
  khac: 'STANDARD',
};
