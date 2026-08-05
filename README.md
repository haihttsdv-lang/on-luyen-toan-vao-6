# Ôn luyện Toán vào lớp 6

Ứng dụng tự học Toán cho học sinh lớp 5 ôn thi vào lớp 6 chất lượng cao. Đặc tả đầy đủ: [`URD-ung-dung-on-luyen-toan-vao-6.md`](./URD-ung-dung-on-luyen-toan-vao-6.md). Quyết định kiến trúc: [`docs/adr/0001-kien-truc-khoi-tao.md`](./docs/adr/0001-kien-truc-khoi-tao.md).

Kiến trúc: client-side thuần (React + TypeScript + Vite + KaTeX + Dexie/IndexedDB), không backend.

## Chạy dự án

```bash
npm install
npm run dev        # http://localhost:5588
npm run test       # chạy toàn bộ unit test (vitest)
npm run test:watch # chế độ theo dõi
npm run build       # build production
npm run lint        # kiểm tra ESLint
```

## Trạng thái hiện tại (GĐ0–GĐ5 hoàn thành, nội dung đủ 57 chuyên đề, giao diện phong cách gaming)

- Đã xây đủ 4 trụ cột: **Lý thuyết** (danh sách theo nhóm, trang bài học, kiểm tra nhanh, trạng thái Chưa học/Đang học/Đã nắm), **Luyện tập** (chọn chuyên đề, lời giải từng bước, sổ lỗi), **Thi thử** (SPRINT/STANDARD/MIXED, đồng hồ đếm ngược, chấm tự động, lịch sử + biểu đồ xu hướng), **Hồ sơ & Lộ trình** (bản đồ năng lực theo mức thành thạo, gợi ý tối đa 3 việc nên làm kèm lý do, kiểm tra đầu vào, trang tổng quan phụ huynh).
- Lõi thuật toán (`core/`): `answer-checker` (chấm đáp số, FR-M05→M14), `error-log`, `topic-progress`, `test-generator` (sinh đề theo tỷ trọng), `mastery-engine` (tính mức thành thạo có trọng số + gợi ý lộ trình) — toàn bộ là hàm thuần, không I/O, có unit test riêng.
- Nội dung: đủ **57/57 chuyên đề** (6 nhóm SH/PS/DH/HH/DL/TD theo đúng Mục 4 URD) với lý thuyết + ví dụ + kiểm tra nhanh, và **470 bài tập** (410 điền đáp số, 51 trắc nghiệm, 9 tự luận). 14 chuyên đề trọng điểm theo Mục 4.7 URD có 12 bài/chuyên đề; 43 chuyên đề còn lại hiện có 6–8 bài/chuyên đề (đang tiếp tục nâng dần lên mục tiêu 12–15 bài/chuyên đề của URD).
- Giao diện: phong cách gaming — nền tối, viền phát sáng neon (cyan/tím), nút bấm hiệu ứng 3D, icon theo từng nhóm chuyên đề/trạng thái/mức thành thạo, HUD đồng hồ đếm ngược khi thi thử.
- Kiểm chứng nội dung (Mục 13 URD, GĐ7): đã qua **lớp 1** (kiểm tra cấu trúc tự động) và **lớp 2** (giải lại độc lập bằng agent con tách biệt, đối chiếu tự động — 470/470 bài khớp, 0 điểm lệch). Chi tiết: [`docs/content-review-log.md`](./docs/content-review-log.md).
- **Chưa làm — bắt buộc trước khi dùng thật với học sinh**: lớp 3 (rà soát bởi giáo viên Toán tiểu học) — cần con người thật, không thể thay thế bằng AI.
