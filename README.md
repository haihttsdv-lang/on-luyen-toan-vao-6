# Ôn luyện Toán vào lớp 6

Ứng dụng tự học Toán cho học sinh lớp 5 ôn thi vào lớp 6 chất lượng cao. Đặc tả đầy đủ (v2.0, thay thế v1.0): [`URD-ung-dung-on-luyen-toan-vao-6-v2.md`](./URD-ung-dung-on-luyen-toan-vao-6-v2.md). Quyết định kiến trúc: [`docs/adr/0001-kien-truc-khoi-tao.md`](./docs/adr/0001-kien-truc-khoi-tao.md).

Kiến trúc: client-side thuần (React + TypeScript + Vite + KaTeX + Dexie/IndexedDB), không backend.

## Chạy dự án

```bash
npm install
npm run dev        # http://localhost:5588
npm run test       # chạy toàn bộ unit test (vitest)
npm run test:watch # chế độ theo dõi
npm run build       # build production (nhiều file, cần host bằng server tĩnh)
npm run lint        # kiểm tra ESLint
```

## Đóng gói bản chạy độc lập (1 file HTML)

```bash
npm run build:standalone   # xuất ra dist-standalone/index.html
```

Kết quả là **đúng một file `index.html`** (đã nhúng sẵn toàn bộ JS/CSS/font, không còn tham chiếu file ngoài) — có thể copy sang máy khác hoặc USB, **mở trực tiếp bằng trình duyệt (double-click, không cần cài đặt hay chạy server)**. Ứng dụng dùng `HashRouter` (URL dạng `#/thi-thu` thay vì `/thi-thu`) để điều hướng hoạt động đúng khi mở qua `file://`. Dữ liệu học tập (IndexedDB) lưu riêng theo từng trình duyệt/máy đang mở file, không đồng bộ giữa các máy.

## Trạng thái hiện tại

- Đã xây đủ 4 trụ cột gốc: **Lý thuyết** (danh sách theo nhóm, trang bài học, kiểm tra nhanh, trạng thái Chưa học/Đang học/Đã nắm), **Luyện tập** (chọn chuyên đề, lời giải từng bước, sổ lỗi), **Thi thử** (SPRINT/STANDARD/MIXED có sẵn, **+ tạo đề tùy chỉnh** tự chọn chuyên đề/số câu/thời gian rồi sinh ngẫu nhiên từ ngân hàng bài luyện tập, đồng hồ đếm ngược, chấm tự động, lịch sử + biểu đồ xu hướng), **Hồ sơ** (bản đồ năng lực theo mức thành thạo, gợi ý tối đa 3 việc nên làm kèm lý do, kiểm tra đầu vào, trang tổng quan phụ huynh).
- **Lộ trình học 4 giai đoạn (URD v2.0 Mục 7, FR-C01→C08)**: lịch học tự tính lại theo tiến độ thực tế (không lưu cố định, không lệch giữa thẻ "buổi học hôm nay" ở trang chủ và trang Lộ trình — dùng chung 1 hook `useSchedule`), bản đồ hành trình 4 giai đoạn, buổi học có khối bấm thẳng tới nội dung, tự đánh giá cuối buổi, cài đặt trường mục tiêu/ngày thi dự kiến/ngày học trong tuần, cảnh báo khi không đủ thời gian tới ngày thi, gợi ý bỏ qua Giai đoạn 1 nếu kiểm tra đầu vào ≥ 85%, tự chèn buổi kiểm tra định kỳ tuần/tháng.
- **Gamification tối thiểu (URD v2.0 Mục 12, GM-01→GM-06)**: xu tích lũy theo kết quả tự đánh giá cuối buổi (hiện ở header), chuỗi ngày học liên tiếp, tủ huy hiệu (6 huy hiệu — hoàn thành từng giai đoạn, chuỗi 5 buổi, thi thử ≥80%, học đều trong tuần) hiện cả huy hiệu chưa đạt kèm điều kiện. Toàn bộ tính lại trực tiếp từ lịch sử buổi học, không lưu số dư riêng.
- Hình vẽ SVG cho các bài hình học phụ thuộc hình nặng nhất: 19/19 bài HH-09 (tỉ số diện tích tam giác chung đáy/chiều cao) và HH-10 (diện tích phần tô đậm) nay có hình minh họa, dùng 2 hàm sinh SVG dùng lại được (`content/figures/`) thay vì vẽ tay từng bài. Toàn bộ ứng dụng hiện có 28/641 bài có hình (còn lại phần lớn bài Hình học khác chưa có).
- Gợi ý sau khi làm sai (FR-P07): bài `numeric`/`mcq` làm sai có `hint` sẽ hiện gợi ý hướng làm trước, chỉ hiện lời giải đầy đủ khi bấm nút — đã áp dụng cho 18 bài DH-11 (giả thiết tạm) + DH-12 (tính ngược), 2 chuyên đề "phương pháp giải đặc biệt" URD liệt kê riêng.
- Lõi thuật toán (`core/`): `answer-checker` (chấm đáp số, FR-M05→M14), `error-log`, `topic-progress`, `test-generator` (sinh đề theo tỷ trọng), `mastery-engine` (tính mức thành thạo có trọng số + gợi ý lộ trình), `schedule` (sinh lịch học thích ứng), `rewards` (xu, chuỗi ngày, huy hiệu) — toàn bộ là hàm thuần, không I/O, có unit test riêng.
- Nội dung: đủ **67/67 chuyên đề** theo URD v2.0 (6 nhóm SH/PS/DH/HH/DL/TD, bao gồm cả 10 chuyên đề mới SH-11/12, PS-11, DH-15/16/17, HH-12, DL-07/08, TD-07) với lý thuyết + ví dụ + kiểm tra nhanh, và **641 bài tập** (561 điền đáp số, 69 trắc nghiệm, 11 tự luận). 14 chuyên đề trọng điểm có 12 bài/chuyên đề; 53 chuyên đề còn lại nay có 8–10 bài/chuyên đề (tăng từ 6–8) — vẫn thấp hơn mục tiêu 12–15 bài/chuyên đề của URD, cần bổ sung thêm ở các lượt sau.
- Giao diện: phong cách gaming tươi sáng — nền trắng/xanh nhạt, màu rực rỡ (cam/xanh dương/tím/vàng) kiểu thể thao hấp dẫn học sinh nam, nút bấm hiệu ứng 3D, icon theo từng nhóm chuyên đề/trạng thái/mức thành thạo, HUD đồng hồ đếm ngược khi thi thử.
- Kiểm chứng nội dung (Mục 18 URD v2.0): đã qua **lớp 1** (kiểm tra cấu trúc tự động) và **lớp 2** (giải lại độc lập bằng agent con tách biệt, đối chiếu tự động — 641/641 bài khớp, 0 điểm lệch đáp số thực). Chi tiết: [`docs/content-review-log.md`](./docs/content-review-log.md).
- **Chưa làm — bắt buộc trước khi dùng thật với học sinh**: lớp 3 (rà soát bởi giáo viên Toán tiểu học) — cần con người thật, không thể thay thế bằng AI.

### Còn thiếu so với URD v2.0 (chưa làm, để lượt sau — xem ADR)

Thang 4 mức độ M1–M4 (hiện vẫn dùng `basic`/`advanced` — kể cả 10 chuyên đề mới vừa thêm), âm thanh phản hồi + chế độ Thử thách tốc độ (GM-07/GM-08), Đồng bộ đa thiết bị qua Firebase, UI/UX Mục 11 còn lại (thanh tab đáy di động, phím tắt, đọc đề bằng giọng nói, bản in phụ huynh, layout 2 cột cho bài có hình/bảng), gợi ý sau khi làm sai (hint) và trang phân tích lỗi theo loại lỗi, hình vẽ SVG cho 74 bài Hình học còn lại (HH-01, HH-03→HH-08, HH-11, HH-12), mở rộng bài tập lên mục tiêu đầy đủ 12–15 bài/chuyên đề và ngân hàng tự luận. Stack công nghệ **giữ nguyên** React 18 + CSS thuần + Dexie/IndexedDB (không nâng cấp Tailwind v4/React 19/localStorage như URD v2.0 "chốt" — quyết định có chủ đích, xem ADR).
