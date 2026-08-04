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

## Trạng thái hiện tại (GĐ0–GĐ5 hoàn thành, nội dung đủ 57 chuyên đề, giao diện phong cách gaming)

- Đã xây đủ 4 trụ cột: **Lý thuyết** (danh sách theo nhóm, trang bài học, kiểm tra nhanh, trạng thái Chưa học/Đang học/Đã nắm), **Luyện tập** (chọn chuyên đề, lời giải từng bước, sổ lỗi), **Thi thử** (SPRINT/STANDARD/MIXED, đồng hồ đếm ngược, chấm tự động, lịch sử + biểu đồ xu hướng), **Hồ sơ & Lộ trình** (bản đồ năng lực theo mức thành thạo, gợi ý tối đa 3 việc nên làm kèm lý do, kiểm tra đầu vào, trang tổng quan phụ huynh).
- Lõi thuật toán (`core/`): `answer-checker` (chấm đáp số, FR-M05→M14), `error-log`, `topic-progress`, `test-generator` (sinh đề theo tỷ trọng), `mastery-engine` (tính mức thành thạo có trọng số + gợi ý lộ trình) — toàn bộ là hàm thuần, không I/O, có unit test riêng.
- Nội dung: đủ **57/57 chuyên đề** (6 nhóm SH/PS/DH/HH/DL/TD theo đúng Mục 4 URD) với lý thuyết + ví dụ + kiểm tra nhanh, và **193 bài tập** (170 điền đáp số, 18 trắc nghiệm, 5 tự luận — ưu tiên số lượng bài tập cho nhóm DH và các chuyên đề trọng điểm theo Mục 4.7 URD).
- Giao diện: phong cách gaming — nền tối, viền phát sáng neon (cyan/tím), nút bấm hiệu ứng 3D, icon theo từng nhóm chuyên đề/trạng thái/mức thành thạo, HUD đồng hồ đếm ngược khi thi thử.
- **Chưa làm — quan trọng trước khi dùng thật với học sinh**: rà soát nội dung lớp 2 (giải lại độc lập) và lớp 3 (giáo viên Toán tiểu học) theo quy trình bắt buộc ở Mục 13 URD; hiện mới chỉ qua lớp 1 (kiểm tra cấu trúc tự động). Xem `docs/adr/0001-kien-truc-khoi-tao.md`.
