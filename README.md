# Ôn luyện Toán vào lớp 6

Ứng dụng tự học Toán cho học sinh lớp 5 ôn thi vào lớp 6 chất lượng cao. Đặc tả đầy đủ: [`URD-ung-dung-on-luyen-toan-vao-6.md`](./URD-ung-dung-on-luyen-toan-vao-6.md). Quyết định kiến trúc: [`docs/adr/0001-kien-truc-khoi-tao.md`](./docs/adr/0001-kien-truc-khoi-tao.md).

Kiến trúc: client-side thuần (React + TypeScript + Vite + KaTeX + Dexie/IndexedDB), không backend.

## Chạy dự án

```bash
npm install
npm run dev        # http://localhost:5173
npm run test       # chạy toàn bộ unit test (vitest)
npm run test:watch # chế độ theo dõi
npm run build       # build production
npm run lint        # kiểm tra ESLint
```

## Trạng thái hiện tại (GĐ0–GĐ3)

- Đã xây: `core/answer-checker` (chấm đáp số, phủ FR-M05→M14), `core/error-log`, `core/topic-progress`, `data-access` (Dexie), 3 chuyên đề mẫu (DH-01, PS-01, HH-02) với 20 bài tập, module Luyện tập đầy đủ (chọn chuyên đề, làm bài, lời giải từng bước, sổ lỗi), module Lý thuyết đầy đủ (danh sách chuyên đề theo nhóm, trang bài học, kiểm tra nhanh cuối bài, chuyển trạng thái Chưa học/Đang học/Đã nắm, liên kết "xem lại lý thuyết" từ màn hình Luyện tập).
- Chưa xây (các lượt sau): Thi thử (GĐ4), Hồ sơ & Lộ trình (GĐ5), mở rộng nội dung đủ 57 chuyên đề (GĐ6), rà soát nội dung 3 lớp (GĐ7).
