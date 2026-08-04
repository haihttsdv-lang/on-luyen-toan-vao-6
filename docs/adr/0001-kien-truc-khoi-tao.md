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

## Phạm vi đã triển khai (GĐ3)

- `core/topic-progress`: logic thuần chuyển trạng thái chuyên đề sau quiz (FR-L04), ngưỡng đạt lấy từ `config/thresholds.ts` (`QUIZ_MASTERY_THRESHOLD = 0.8`) thay vì hardcode.
- `data-access`: thêm bảng `topicProgress` (Dexie) + phương thức `getTopicProgress`/`listTopicProgress`/`saveTopicProgress` trên `ProgressStore`.
- Module Lý thuyết (`modules/theory`): `TopicList` (FR-L01, nhóm theo 6 nhóm + nhãn mức độ/trạng thái), `TopicLesson` (FR-L02/L03, công thức nổi bật + ví dụ có lời giải từng bước + lỗi thường gặp), `QuickCheckQuiz` (FR-L04).
- FR-L05: từ màn hình Luyện tập, khi làm sai hiển thị liên kết "Xem lại lý thuyết" mở bài học tương ứng ở tab mới.
- Component dùng chung mới: `SolutionSteps` (tách từ `PracticeSession` để dùng lại ở `TopicLesson`), `MathRenderer` mở rộng thêm chế độ `display` cho khối công thức độc lập.
- Đã xác nhận bằng trình duyệt thật: trạng thái chuyển đúng Chưa học → Đang học (khi mở bài) → Đã nắm (khi đạt ≥80% quiz), công thức render đúng bằng KaTeX ở độ rộng 400px, không rò rỉ LaTeX thô.

## Phạm vi đã triển khai (GĐ4)

- `core/test-generator`: `allocate.ts` (phân bổ nguyên theo trọng số — phương pháp số dư lớn nhất) + `generate-test.ts` (sinh đề theo `topicWeights`/`answerTypeRatio` của `TestConfig`, FR-T01/T02). Khi ngân hàng nội dung chưa đủ (hiện chỉ có 3 chuyên đề mẫu), trả về đề ngắn hơn kèm `shortfall` thay vì lỗi — thiết kế đúng cho cả lúc nội dung đầy đủ (GĐ6) lẫn giai đoạn nội dung mẫu hiện tại.
- Module Thi thử (`modules/mock-test`): `TestSetup` (FR-T01), `TestSession` (sinh đề, đồng hồ đếm ngược tự nộp khi hết giờ + cảnh báo dưới 5 phút — FR-T03, bảng số thứ tự câu hỏi di chuyển tự do/đánh dấu xem lại — FR-T04, không hiện đáp án khi đang thi — FR-T05, chấm tự động `mcq`/`numeric` khi nộp — FR-T06), `TestResultView` (điểm tổng, điểm theo nhóm chuyên đề, xem lại từng câu kèm lời giải, tự luận hiện lời giải mẫu + tiêu chí tự chấm để đối chiếu — FR-T07), `TestHistory` (lưu lịch sử + biểu đồ xu hướng điểm — FR-T08).
- Mỗi câu `mcq`/`numeric` trong bài thi được ghi thành `Attempt` với `context: 'test'`, tái sử dụng được cho `mastery-engine` ở GĐ5.
- Đã xác nhận bằng trình duyệt thật: sinh đề đúng cấu hình (báo shortfall khi thiếu nội dung), không rò rỉ đáp án/phản hồi đúng-sai trong lúc thi, đồng hồ đếm ngược và bảng số thứ tự hoạt động đúng, nộp bài có xác nhận, trang kết quả và lịch sử hiển thị đúng.

## Mở rộng nội dung đủ 57 chuyên đề (GĐ6, ngoài thứ tự Mục 13 — theo yêu cầu trực tiếp của người dùng)

- Bổ sung 54 chuyên đề còn thiếu, tổ chức theo **nhóm** (đúng cấu trúc thư mục đề xuất ở Mục 12 URD: `content/topics/{sh,ps-more,dh-more,hh-more,dl,td}.ts`, tương tự cho `exercises/`) thay vì mỗi chuyên đề một file như 3 chuyên đề mẫu ban đầu — hiệu quả hơn ở quy mô 57 chuyên đề.
- Khối lượng: 57/57 chuyên đề có đủ lý thuyết (giải thích + công thức + 2 ví dụ có lời giải từng bước + lỗi thường gặp + 3 câu kiểm tra nhanh); 193 bài tập (170 `numeric`, 18 `mcq`, 5 `essay`). Ưu tiên số lượng bài tập cao hơn (4/chuyên đề) cho nhóm DH và các mã được URD Mục 4.7 liệt kê ưu tiên (DH-01→03, DH-06→09, PS-09, HH-03/04/09, SH-04/05/09); các chuyên đề còn lại 3/chuyên đề. Đây là mức "đủ rộng, chưa đủ sâu" — thấp hơn mục tiêu 12–15 bài/chuyên đề của Mục 4.7, cần bổ sung thêm bài tập dần ở các lượt sau.
- **Chưa hoàn thành GĐ7 (rà soát nội dung 3 lớp) cho nội dung mới này.** Đã làm: lớp 1 — kiểm tra cấu trúc tự động (`content/content.test.ts`: đủ công thức/ví dụ/quickCheck, mcq đủ 4 lựa chọn, numeric parse được, essay có rubric) và tự kiểm tra thủ công từng phép tính khi soạn. **Chưa làm**: lớp 2 (giải lại độc lập ở phiên không mang lịch sử soạn đề) và lớp 3 (rà soát bởi giáo viên Toán tiểu học) — đây là rủi ro cao nhất của cả dự án theo Mục 16 URD, bắt buộc thực hiện trước khi đưa nội dung này vào sử dụng thật với học sinh.

## Thiết kế lại giao diện theo phong cách gaming (theo yêu cầu trực tiếp của người dùng)

- Cam kết một giao diện tối (dark theme) cố định làm bản sắc riêng của ứng dụng, không chuyển theo `prefers-color-scheme` của hệ điều hành nữa (`color-scheme: dark` ở `:root`) — quyết định thiết kế có chủ đích, phù hợp thẩm mỹ game hơn là hỗ trợ cả hai chế độ sáng/tối.
- Bảng màu: nền xanh đen sâu, viền/nút phát sáng neon cyan (`#00e5ff`) và tím (`#a855f7`), trạng thái đúng/sai dùng xanh lá/đỏ neon có `text-shadow` phát sáng.
- Nút bấm kiểu game: hiệu ứng nổi khối 3D (box-shadow tạo cạnh, nhấn xuống khi `:active`), toàn bộ chữ hoa + tăng letter-spacing.
- Thanh điều hướng kiểu HUD: dính đầu trang, mục đang chọn phát sáng, icon riêng cho từng mục (📚 Lý thuyết, ⚔️ Luyện tập, 🏆 Thi thử...).
- Icon riêng cho 6 nhóm chuyên đề (🔢🍕🧩📐📏🧠) và 3 trạng thái học (🔒 Chưa học/⚡ Đang học/⭐ Đã nắm) — `content/labels.ts`.
- Trang chủ đổi thành dạng "menu game" với 3 thẻ nhiệm vụ dẫn thẳng tới 3 module chính.
- Đã kiểm tra: KaTeX kế thừa đúng màu chữ sáng trên nền tối (không cần cấu hình riêng, do KaTeX dùng `currentColor`), biểu đồ xu hướng điểm thi thử (`TestHistory`) chuyển từ theo dõi `prefers-color-scheme` sang dùng cố định bảng màu tối khớp giao diện chung, không còn console error.

Còn lại: GĐ5 (Hồ sơ/`mastery-engine`), GĐ7 lớp 2+3 cho nội dung mới (rà soát độc lập + giáo viên), mở rộng bài tập lên 12–15/chuyên đề theo mục tiêu đầy đủ Mục 4.7.
