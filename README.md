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

## Trạng thái hiện tại (GĐ0–GĐ4, nội dung đủ 57 chuyên đề, giao diện phong cách gaming)

- Đã xây: `core/answer-checker` (chấm đáp số, phủ FR-M05→M14), `core/error-log`, `core/topic-progress`, `core/test-generator` (sinh đề theo tỷ trọng, FR-T02), `data-access` (Dexie), module Luyện tập đầy đủ (chọn chuyên đề, làm bài, lời giải từng bước, sổ lỗi), module Lý thuyết đầy đủ (danh sách chuyên đề theo nhóm, trang bài học, kiểm tra nhanh cuối bài, chuyển trạng thái Chưa học/Đang học/Đã nắm), module Thi thử đầy đủ (chọn cấu hình SPRINT/STANDARD/MIXED, đồng hồ đếm ngược, bảng số thứ tự câu hỏi, không hiện đáp án khi thi, chấm tự động + trang kết quả, lịch sử thi thử kèm biểu đồ xu hướng).
- Nội dung: đủ **57/57 chuyên đề** (6 nhóm SH/PS/DH/HH/DL/TD theo đúng Mục 4 URD) với lý thuyết + ví dụ + kiểm tra nhanh, và **193 bài tập** (170 điền đáp số, 18 trắc nghiệm, 5 tự luận — ưu tiên số lượng bài tập cho nhóm DH và các chuyên đề trọng điểm theo Mục 4.7 URD).
- Giao diện: thiết kế lại theo phong cách gaming — nền tối, viền phát sáng neon (cyan/tím), nút bấm hiệu ứng 3D, icon theo từng nhóm chuyên đề và trạng thái học, HUD đồng hồ đếm ngược khi thi thử.
- Chưa xây (các lượt sau): Hồ sơ & Lộ trình (GĐ5), rà soát nội dung 3 lớp trước khi dùng thật (GĐ7 — xem Mục 13 URD, đặc biệt lớp 3 "rà soát bởi giáo viên Toán tiểu học").
