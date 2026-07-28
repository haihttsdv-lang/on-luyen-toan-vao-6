/**
 * Ngưỡng số liệu dùng trong logic sản phẩm — tập trung ở đây thay vì hardcode rải rác
 * (NFR-06). Xem docs/adr/0001-kien-truc-khoi-tao.md cho các ngưỡng còn lại (Mục 17 URD).
 */

/** Đạt từ ngưỡng này trở lên trong bài kiểm tra nhanh cuối bài lý thuyết mới được
 * đánh dấu chuyên đề là "Đã nắm" (FR-L04). */
export const QUIZ_MASTERY_THRESHOLD = 0.8;
