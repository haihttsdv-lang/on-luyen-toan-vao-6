# ADR-0001: Kiến trúc khởi tạo dự án

**Ngày**: 2026-07-28
**Trạng thái**: Đã chốt

## Bối cảnh

URD (`URD-ung-dung-on-luyen-toan-vao-6.md`, Mục 10) nêu hai quyết định kiến trúc chưa chốt phải xác nhận với người dùng trước khi khởi tạo dự án, và Mục 17 nêu một số ngưỡng số liệu cần xác nhận hoặc dùng giá trị mặc định đề xuất.

## QĐ-1: Độc lập hay dùng chung nền tảng với ứng dụng Tiếng Anh?

**Quyết định: Độc lập hoàn toàn.**

Ứng dụng Tiếng Anh hiện chỉ tồn tại dưới dạng một file HTML đơn giản (`on-luyen-tieng-anh-vao-6-offline.html`), chưa có kiến trúc hay URD riêng để dùng chung nền tảng. Xây độc lập giúp ra bản dùng thử nhanh nhất, không phụ thuộc tiến độ ứng dụng kia.

## QĐ-2: Client-side thuần hay có backend?

**Quyết định: Phương án A — client-side thuần.**

Stack: React + TypeScript + Vite, lưu trữ bằng IndexedDB (qua Dexie). Không có vai trò Giáo viên (FR-H11) trong v1. Lớp truy cập dữ liệu trừu tượng (`ContentStore`/`ProgressStore` trong `src/data-access/types.ts`) tách biệt khỏi implementation cụ thể, để có thể thêm implementation `remote/` sau này nếu chuyển sang có backend mà không phải viết lại các module tiêu thụ dữ liệu.

## Mục 17: Các ngưỡng số liệu — áp dụng giá trị mặc định đề xuất trong URD

Chưa có chỉ định khác từ chủ dự án nên áp dụng đúng đề xuất mặc định của URD:

| Tham số | Giá trị áp dụng | Ghi chú |
|---|---|---|
| Công thức mức thành thạo (FR-H03) | Trung bình có trọng số N=10 lượt gần nhất, tối thiểu 3 lượt mới tính | Sẽ cài đặt ở `core/mastery-engine` (GĐ5) |
| Ngưỡng 3 mức (FR-H04) | <50% Cần ôn lại / 50–80% Đang tiến bộ / >80% Thành thạo | Sẽ đưa vào config, không hardcode |
| Ngưỡng ưu tiên sổ lỗi (FR-H08) | 10 câu | Sẽ đưa vào config khi xây `profile` module (GĐ5) |
| Trường mục tiêu cụ thể (câu hỏi mở #4) | Không chọn trường riêng — xây tổng quát theo 3 cấu hình đề (Mục 5.2), `topicWeights` chia đều 6 nhóm chuyên đề | Xem `src/content/test-configs/index.ts` |
| Ưu tiên tốc độ vs nội dung (câu hỏi mở #5) | Ưu tiên đủ 4 module chạy với nội dung mẫu trước khi mở rộng nội dung đầy đủ | Theo đúng trình tự Mục 13 |

Các giá trị này cần chủ dự án xác nhận lại trước khi coi là chính thức cho bản v1.0 đầy đủ; hiện đang dùng làm giá trị vận hành cho các giai đoạn xây dựng.

## Phạm vi đã triển khai (GĐ0–GĐ2)

- `core/answer-checker`: chấm đáp số tự nhập, phủ đầy đủ FR-M05 → FR-M14, 28 unit test.
- `core/error-log`: logic sổ lỗi thuần (FR-P05, FR-P06), có unit test riêng.
- `data-access`: interface `ContentStore`/`ProgressStore` + implementation local (Dexie).
- Nội dung mẫu: 3 chuyên đề (DH-01, PS-01, HH-02), 20 bài tập đủ cả 3 loại đáp án (`mcq`/`numeric`/`essay`).
- Module Luyện tập: chọn chuyên đề, làm bài, chấm, xem lời giải từng bước, sổ lỗi.
- Kiểm tra cấu trúc nội dung tự động (`content/content.test.ts`) — lớp kiểm chứng thứ nhất của Mục 13 GĐ7 cho phần đã xây; giáo án đầy đủ (GĐ6) và rà soát 3 lớp (GĐ7) còn lại cho các lượt sau.

Còn lại: GĐ3 (Lý thuyết), GĐ4 (Thi thử/`test-generator`), GĐ5 (Hồ sơ/`mastery-engine`), GĐ6 (mở rộng nội dung đủ 57 chuyên đề), GĐ7 (rà soát nội dung 3 lớp đầy đủ).
