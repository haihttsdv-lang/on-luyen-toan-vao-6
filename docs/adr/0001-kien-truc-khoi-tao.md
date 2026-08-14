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
- **GĐ7 (rà soát nội dung 3 lớp) — cập nhật 2026-08-05: đã hoàn thành lớp 1 và lớp 2, còn lớp 3.** Chi tiết đầy đủ ở [`docs/content-review-log.md`](../content-review-log.md).
  - Lớp 1 (tự động): `content/content.test.ts` — đạt, 0 lỗi cấu trúc.
  - Lớp 2 (giải lại độc lập): triển khai bằng 6 agent con chạy trong phiên hoàn toàn tách biệt (không mang lịch sử soạn đề), mỗi agent giải lại độc lập một nhóm chuyên đề, đối chiếu tự động qua `core/answer-checker` (bài numeric/mcq) và thủ công (bài essay). **Kết quả: 193/193 bài khớp, 0 điểm lệch.**
  - Lớp 3 (giáo viên Toán tiểu học rà soát): **chưa làm — cần con người thật, không thể thay thế bằng AI.** Đây vẫn là điều kiện bắt buộc trước khi dùng thật với học sinh theo đúng Mục 13 URD ("không bỏ qua bước này ngay cả khi hai lớp trên đã sạch").

## Thiết kế lại giao diện theo phong cách gaming (theo yêu cầu trực tiếp của người dùng)

- Cam kết một giao diện tối (dark theme) cố định làm bản sắc riêng của ứng dụng, không chuyển theo `prefers-color-scheme` của hệ điều hành nữa (`color-scheme: dark` ở `:root`) — quyết định thiết kế có chủ đích, phù hợp thẩm mỹ game hơn là hỗ trợ cả hai chế độ sáng/tối.
- Bảng màu: nền xanh đen sâu, viền/nút phát sáng neon cyan (`#00e5ff`) và tím (`#a855f7`), trạng thái đúng/sai dùng xanh lá/đỏ neon có `text-shadow` phát sáng.

## Đổi từ dark-neon sang giao diện tươi sáng (theo yêu cầu trực tiếp của người dùng, 2026-08-05)

- Người dùng yêu cầu chuyển hẳn sang giao diện **tươi sáng, hấp dẫn học sinh nam** — thay `color-scheme: dark` bằng `color-scheme: light` ở `:root`, nền trang đổi từ xanh đen sâu sang xanh nhạt gần trắng (`#eef4ff`), card nền trắng.
- Vẫn giữ tinh thần "gaming" đã chọn trước đó (icon theo module, nút bấm hiệu ứng 3D nổi khối, HUD nav dính đầu trang) nhưng đổi cơ chế nhấn mạnh từ "glow neon trên nền tối" sang "màu rực rỡ bão hòa cao trên nền sáng" kiểu thể thao/siêu anh hùng: xanh dương rực (`#0ea5e9`), cam (`#ff7a1a` — màu CTA chính `.btn-primary`, thay cho cyan trước đó), tím (`#7c3aed`), vàng hổ phách (`#f59e0b`), xanh lá (`#16a34a`), đỏ (`#e11d48`).
- Bỏ toàn bộ `text-shadow`/`box-shadow` kiểu "glow" (phát sáng mờ ảo) vì không phù hợp nền sáng — thay bằng bóng đổ có hướng, ngắn, giống hiệu ứng "sticker/comic" (`box-shadow: 0 Npx 0 màu-đậm-hơn` cho nút, `0 Npx Mpx rgba(15,23,42,...)` cho card).
- Rà soát và sửa toàn bộ màu hex hardcode giả định nền tối còn sót lại ở tầng component (không dùng CSS variable): `ScoreTrendChart.tsx` (trục/lưới biểu đồ), `CompetencyMap.tsx` (màu chip mức thành thạo + màu "chưa có dữ liệu"), `QuestionPalette.tsx` (màu ô số thứ tự câu hỏi thi thử) — đổi từ `color-scheme: dark` cục bộ và các mã màu neon sang bộ màu tương ứng ở trên.
- Đã xác nhận trực quan qua Playwright (chụp màn hình các trang: trang chủ, danh sách lý thuyết, trang bài học có công thức, thiết lập luyện tập, thiết lập thi thử, hồ sơ, và một phiên luyện tập có trạng thái làm sai) — không còn màu neon/nền tối sót lại, chữ đọc rõ trên nền trắng ở mọi trạng thái (đúng/sai/đã làm/đánh dấu xem lại).

## Thêm chức năng tạo đề thi thử tùy chỉnh (theo yêu cầu trực tiếp của người dùng, 2026-08-05)

- Bên cạnh 3 cấu hình đề cố định SPRINT/STANDARD/MIXED (Mục 5.2 URD), người dùng yêu cầu thêm khả năng **tự sinh một đề thi thử mới trực tiếp từ ngân hàng bài luyện tập** theo chuyên đề tự chọn.
- **Quyết định kiến trúc**: không mở rộng `ContentStore`/`content/test-configs` (vốn là dữ liệu tĩnh khai báo sẵn, không I/O — nguyên tắc đã chốt từ đầu dự án) để "ghi" cấu hình đề tùy chỉnh do người dùng tạo ra lúc chạy. Thay vào đó, đề tùy chỉnh được sinh hoàn toàn ở phía client (`TestCustomSetup.tsx`), đóng gói thành một `TestConfig` tạm thời (`id: custom-<timestamp>`) và ghi kèm danh sách bài đã chọn vào `sessionStorage` (không phải IndexedDB — dữ liệu chỉ cần tồn tại trong phiên làm bài hiện tại, không cần lưu vĩnh viễn).
- `TestSession.tsx` được sửa để nhận diện `configId` bắt đầu bằng `custom-`: đọc thẳng cấu hình + danh sách bài đã sinh sẵn từ `sessionStorage` thay vì gọi `generateTest` lại — toàn bộ phần còn lại (đếm giờ, chấm bài, bảng số câu hỏi, trang kết quả, lưu lịch sử) dùng chung không đổi với luồng 3 cấu hình có sẵn, không cần nhánh logic riêng.
- **Cập nhật theo yêu cầu tiếp theo của người dùng**: đề tùy chỉnh phải theo đúng **định dạng đề thi thật của trường chất lượng cao**, không tự đặt số câu/thời gian tùy tiện. Thay vì để học sinh gõ tay "số câu"/"thời gian", màn hình tạo đề tùy chỉnh cho **chọn 1 trong 3 định dạng SPRINT/STANDARD/MIXED có sẵn** (vốn đã mô phỏng đúng cấu trúc đề thật theo khảo sát Mục 5.2 URD — ví dụ MIXED = 10 điền đáp số + 2 tự luận / 60 phút, giống cấu trúc Ngôi Sao Hà Nội) — chỉ thay đổi phạm vi chuyên đề lấy đề, giữ nguyên số câu/thời gian/tỉ lệ loại đáp án của định dạng đã chọn. Nhờ vậy tái dùng thẳng `core/test-generator/generateTest` (đã có sẵn cơ chế phân bổ theo `answerTypeRatio` + xử lý `shortfall` khi ngân hàng nội dung của các chuyên đề đã chọn chưa đủ câu) thay vì phải viết logic random riêng.
- **Thêm nút "🎲 Chọn ngẫu nhiên chuyên đề"**: xáo trộn (`core/test-generator/shuffle`) danh sách chuyên đề đang khớp bộ lọc mức độ, lấy ngẫu nhiên N chuyên đề (N tự nhập, mặc định 6) làm lựa chọn — giúp học sinh không phải tự tick từng chuyên đề nếu chỉ muốn luyện tổng hợp ngẫu nhiên nhanh.
- Đã xác nhận qua Playwright: bấm chọn ngẫu nhiên 6 chuyên đề → chọn định dạng MIXED → sinh đề đúng nhãn "6 chuyên đề đã chọn · MIXED — 10 điền đáp số + 2 tự luận / 60 phút", đếm giờ 60:00 đúng, tự động báo thiếu câu (10/12) khi 6 chuyên đề đó chưa đủ bài essay/numeric theo đúng tỉ lệ yêu cầu — không có lỗi console.

## Đóng gói bản chạy độc lập 1 file HTML (theo yêu cầu trực tiếp của người dùng, 2026-08-05)

- Người dùng muốn có **một file duy nhất** chạy được ngay trên trình duyệt, không cần server/npm — ví dụ để copy sang máy khác hoặc gửi qua USB.
- Thêm `vite-plugin-singlefile` và một cấu hình build riêng `vite.config.standalone.ts` (script `npm run build:standalone`, output `dist-standalone/index.html`) — **tách riêng khỏi** `vite.config.ts`/`npm run build` mặc định, để không ảnh hưởng luồng build/deploy thông thường (nếu sau này host bằng server tĩnh thật, bản build nhiều-file thông thường vẫn hiệu quả hơn — không cần nhúng hết vào 1 file).
- **Đổi `BrowserRouter` → `HashRouter`** ở `main.tsx` (áp dụng cho toàn bộ app, không chỉ bản standalone) — bắt buộc vì `file://` không có server xử lý pushState/history API, điều hướng qua path thường (`/thi-thu`) sẽ không hoạt động khi mở file trực tiếp; `HashRouter` (`#/thi-thu`) hoạt động đúng trong mọi trường hợp (dev server, static host, và cả `file://`) nên chọn dùng thống nhất một loại router thay vì phân nhánh theo môi trường build.
- Rủi ro kỹ thuật lớn nhất đã lường trước: IndexedDB có thể bị chặn dưới origin `file://` ở một số trình duyệt. **Đã kiểm chứng bằng Playwright mở trực tiếp `dist-standalone/index.html` qua `file://`**: đặt biệt danh ở Hồ sơ, tải lại trang (reload) — biệt danh vẫn còn, xác nhận Dexie/IndexedDB hoạt động và lưu bền dưới `file://` trên Chromium. Không có lỗi console trong toàn bộ luồng kiểm thử.
- `dist-standalone/` thêm vào `.gitignore` (giống `dist/`) — là sản phẩm build, không commit vào repo.

## URD v2.0 thay thế v1.0 — Module Lộ trình học 4 giai đoạn (theo yêu cầu trực tiếp của người dùng, 2026-08-05)

Người dùng cung cấp `URD-ung-dung-on-luyen-toan-vao-6-v2.md` (thay thế hoàn toàn v1.0), yêu cầu bổ sung tính năng. So với v1.0, v2.0 thêm: 67 chuyên đề (10 mới), thang 4 mức độ M1–M4, **module Lộ trình học 4 giai đoạn**, Gamification, Đồng bộ đa thiết bị qua Firebase, đặc tả UI/UX chi tiết — tất cả tham chiếu bắt buộc tới app `on-luyen-tieng-anh-vao-6` (repo GitHub công khai cùng tác giả, đã chạy thực tế). Đã đọc ADR 0004 (lộ trình) và ADR 0005 (đồng bộ) của repo tham chiếu qua GitHub trước khi thiết kế, đúng yêu cầu Mục 0 của URD v2.0.

**Quyết định đã hỏi và chốt với người dùng (qua AskUserQuestion, không tự suy đoán):**
- **Giữ nguyên stack hiện tại** (React 18 + CSS thuần + Dexie/IndexedDB + ESLint) — **không** nâng cấp theo "chốt" của URD v2.0 (React 19, Tailwind CSS v4, localStorage, oxlint). Lý do người dùng chọn: giảm rủi ro hồi quy cho phần đã làm và đã kiểm chứng kỹ (470 bài tập, giao diện vừa redesign).
- **Đồng bộ Cloud (Mục 13, Firebase)**: hoãn sang lượt khác, chưa làm trong lượt này. Khi làm, hướng đã thống nhất trước: xây đủ luồng code nhưng chưa cấu hình Firebase thật (SY-14 — tự báo "chưa khả dụng" cho tới khi có config).
- **Ưu tiên lượt này**: module Lộ trình học 4 giai đoạn, trước 10 chuyên đề mới/thang 4 mức độ và trước UI/UX Mục 11 + Gamification Mục 12.
- QĐ-1 của v2.0 (repo độc lập hay gộp app Tiếng Anh) coi như đã được trả lời từ lúc khởi tạo dự án ở v1.0 (Hướng A — độc lập hoàn toàn), không hỏi lại.

### Thiết kế `core/schedule` — thuật toán lấy từ bài học thực tế của ADR 0004 app Tiếng Anh

Điểm mấu chốt (đọc được từ ADR 0004): ứng dụng tham chiếu ban đầu lưu "ngày bắt đầu lộ trình" cố định rồi tính lịch một lần — gây lệch giữa trang chủ và trang lộ trình, và bị "trôi" khi học sinh học nhanh/chậm hơn dự kiến. Đã sửa bằng cách bỏ hẳn mốc lưu riêng, tính lại từ `completedAt` của các buổi đã hoàn thành. Áp dụng nguyên xi nguyên tắc đó cho môn Toán:

- **Không lưu ngày bắt đầu lộ trình riêng** — dùng thẳng `LearnerProfile.createdAt` (đã có sẵn từ GĐ0-2, đúng nghĩa "ngày mở app lần đầu").
- **Không tính lịch một lần rồi lưu cố định** — `buildAdaptiveSchedule()` (`core/schedule/build-schedule.ts`) là hàm thuần, tính lại mỗi lần từ toàn bộ `SessionOutcomeRecord` đã lưu (bảng Dexie mới `sessionOutcomes`, version 2, additive — không phá dữ liệu người dùng cũ).
- **Buổi tiếp theo neo theo thứ tự chương trình của buổi hoàn thành gần nhất** (`templates.findIndex` buổi đầu tiên chưa có outcome), không neo theo giờ hệ thống thực — học sinh bỏ buổi rồi quay lại không bị "nhảy cóc" bỏ qua buổi đã lỡ (chống gian lận nén lịch), học nhanh hơn dự kiến thì buổi tiếp theo cũng sớm hơn tương ứng.
- **`HomePage` và `CurriculumHome` dùng chung một hook `useSchedule()`** (`modules/curriculum/useSchedule.ts`) — không tính hai lần hai công thức khác nhau ở hai nơi (đúng UX-11 URD v2.0). Đã xác nhận bằng Playwright: thẻ "Buổi học hôm nay" ở hai trang trả về **chữ giống hệt nhau**.
- Engine hoàn toàn data-driven: danh sách chuyên đề mỗi giai đoạn là dữ liệu (`content/curriculum/phase1-templates.ts`, `phase3-templates.ts`) lọc theo `Topic.level` (`basic`→GĐ1, `advanced`→GĐ3) của 57 chuyên đề hiện có — **chưa đủ** so với Mục 7 URD v2.0 vì nhiều chuyên đề GĐ3 mô tả (tỉ lệ kép, phương pháp khử, chuyển động đặc biệt, sơn màu, Ven, dãy chữ, chữ số tận cùng, dung dịch–tươi khô) thuộc đúng 10 chuyên đề mới chưa viết. Đã ghi chú rõ trong code (`phase3-templates.ts`) để bổ sung khi biên soạn nội dung 10 chuyên đề mới ở lượt sau.
- Giai đoạn 2 (`phase2-templates.ts`): xen kẽ buổi luyện đề đầy đủ (luân phiên cả 3 cấu hình SPRINT/STANDARD/MIXED) và buổi phân tích lỗi (trỏ thẳng `/luyen-tap/luyen-lai` — sổ lỗi đã có sẵn từ GĐ2). Buổi kiểm tra định kỳ (FR-C05) được **chèn động** trong lúc sinh lịch (không phải dữ liệu tĩnh), route tới `/thi-thu/tao-de` kèm `presetTopicIds` = các chuyên đề đã học tính tới thời điểm đó — tận dụng lại tính năng "Tạo đề tùy chỉnh" đã xây trước đó thay vì viết luồng sinh đề riêng (đã mở rộng `TestCustomSetup.tsx` đọc `location.state.presetTopicIds` để pre-chọn chuyên đề).
- Giai đoạn 4 **không có dữ liệu tĩnh** — sinh động trong `build-schedule.ts`, xen kẽ buổi luyện đề (cấu hình mặc định theo trường mục tiêu, ánh xạ đúng Mục 6.1 URD: Archimedes→SPRINT, Lương Thế Vinh→STANDARD, Ngôi Sao/Cầu Giấy→MIXED) và buổi luyện chuyên sâu chuyên đề yếu nhất (tái dùng nguyên `buildRecommendations` đã có ở `core/mastery-engine`, không viết logic xếp hạng mới).
- "Quay lại buổi học đang dở" (FR-C08): không có bảng DB riêng — chỉ đánh dấu `templateId` đang mở vào `localStorage` (`modules/curriculum/in-progress-session.ts`) khi `SessionRunner` mount, xóa khi hoàn thành tự đánh giá. Đơn giản hóa có chủ đích, đủ dùng ở quy mô 1 học sinh/máy.
- 9 unit test mới cho `core/schedule` (`build-schedule.test.ts`): buổi đầu tiên khi chưa có outcome, neo theo ngày hoàn thành (không nhảy cóc theo "hôm nay" dù đã trễ rất lâu), không bỏ qua buổi chưa hoàn thành, vị trí chèn buổi kiểm tra định kỳ, tự sinh buổi Giai đoạn 4 khi hết GĐ1-3, cảnh báo `insufficientTime` đúng/sai theo ngày thi dự kiến.
- Đã xác nhận bằng Playwright (luồng đầy đủ): đặt biệt danh → trang chủ và trang Lộ trình hiển thị **cùng** buổi học đầu tiên (SH-01) → bấm khối "Học lý thuyết" điều hướng đúng `/ly-thuyet/SH-01` → hoàn thành tự đánh giá "Ổn" → quay về Lộ trình, buổi hiện tại chuyển đúng sang buổi kế tiếp (SH-02), tiến độ 0%→1% → đặt ngày thi dự kiến rất gần, xác nhận cảnh báo "không đủ thời gian" hiện đúng. Không có lỗi console trong toàn bộ luồng.
- Nút bấm kiểu game: hiệu ứng nổi khối 3D (box-shadow tạo cạnh, nhấn xuống khi `:active`), toàn bộ chữ hoa + tăng letter-spacing.
- Thanh điều hướng kiểu HUD: dính đầu trang, mục đang chọn phát sáng, icon riêng cho từng mục (📚 Lý thuyết, ⚔️ Luyện tập, 🏆 Thi thử...).
- Icon riêng cho 6 nhóm chuyên đề (🔢🍕🧩📐📏🧠) và 3 trạng thái học (🔒 Chưa học/⚡ Đang học/⭐ Đã nắm) — `content/labels.ts`.
- Trang chủ đổi thành dạng "menu game" với 3 thẻ nhiệm vụ dẫn thẳng tới 3 module chính.
- Đã kiểm tra: KaTeX kế thừa đúng màu chữ sáng trên nền tối (không cần cấu hình riêng, do KaTeX dùng `currentColor`), biểu đồ xu hướng điểm thi thử (`TestHistory`) chuyển từ theo dõi `prefers-color-scheme` sang dùng cố định bảng màu tối khớp giao diện chung, không còn console error.

## Phạm vi đã triển khai (GĐ5)

- `config/thresholds.ts`: thêm `MASTERY_CONFIG` (windowSize=10, minAttempts=3, needsReviewMax=0.5, masteredMin=0.8), `ERROR_LOG_PRIORITY_THRESHOLD=10`, `MAX_RECOMMENDATIONS=3`, `DIAGNOSTIC_TEST_SIZE=30` — đúng các giá trị mặc định đã ghi ở phần "Mục 17" phía trên, nay được đưa vào code thay vì chỉ nằm trên giấy.
- `core/mastery-engine/calculate-mastery.ts`: `calculateMasteryScore` (trung bình có trọng số tuyến tính, lượt gần nhất trọng số cao nhất — FR-H03), `classifyMasteryLevel` (3 mức theo ngưỡng — FR-H04), `computeTopicMastery` (trả `null` khi chưa đủ `minAttempts`, đúng tinh thần FR-H02/FR-H07 "chưa có dữ liệu" ≠ "yếu"). 11 unit test.
- `core/mastery-engine/recommend.ts`: `buildRecommendations` — hàm thuần ghép sổ lỗi + mức thành thạo + trạng thái chuyên đề thành tối đa 3 gợi ý kèm lý do (FR-H06, FR-H08, FR-H10). **Quan trọng**: dùng ngưỡng khác nhau có chủ đích — xếp hạng gợi ý chỉ cần ≥1 lượt làm (đúng FR-H06 "đã từng luyện ít nhất một lần"), trong khi bản đồ năng lực (`computeTopicMastery`) cần ≥3 lượt mới phân loại chính thức (FR-H03). 8 unit test.
- `modules/profile`: `useMasteryData` (hook ghép Attempt+Exercise+Topic+ErrorLog+TopicProgress từ hai store), `CompetencyMap` (FR-H05, lưới 6 nhóm màu theo 3 mức + "chưa có dữ liệu"), `RecommendationList` (FR-H06/H10), `ProfileHome` (thiết lập biệt danh lần đầu dùng — NFR-03, đề xuất kiểm tra đầu vào nếu chưa có lượt làm nào — FR-H01), `ParentOverview` (FR-H09: số buổi học 7 ngày qua, câu nhận xét xu hướng bằng ngôn ngữ thường không thuật ngữ kỹ thuật, 2–3 chuyên đề cần chú ý).
- Kiểm tra đầu vào (FR-H01): tái dùng `core/test-generator` với cấu hình `DIAGNOSTIC` cục bộ (30 câu, chia đều 6 nhóm, không có tự luận) chạy trong `PracticeSession` ở `mode="diagnostic"` (không có đồng hồ đếm giờ áp lực như Thi thử — phù hợp mục tiêu "khởi tạo bản đồ năng lực" hơn là mô phỏng phòng thi); lượt làm ghi `Attempt.context = 'diagnostic'`.
- Tách `ScoreTrendChart` thành component dùng chung (`src/components/`) cho cả `TestHistory` (GĐ4) và `ParentOverview` (GĐ5) — tránh trùng lặp.
- Xóa `PlaceholderPage.tsx` (không còn route nào dùng sau khi `/ho-so` có nội dung thật).
- Đã xác nhận bằng trình duyệt thật: luồng lần đầu (đặt biệt danh → làm kiểm tra đầu vào phủ đủ nhiều nhóm → quay lại hồ sơ) hoạt động đúng, gợi ý xếp đúng thứ tự theo điểm yếu nhất kèm lý do "đúng X/Y bài gần nhất", bản đồ năng lực đúng trạng thái "chưa có dữ liệu" khi dưới 3 lượt/chuyên đề, trang phụ huynh tính đúng số buổi học trong tuần, không có lỗi console.

Còn lại: GĐ7 lớp 2+3 cho nội dung mới (rà soát độc lập + giáo viên — rủi ro cao nhất, xem cảnh báo ở phần GĐ6 phía trên), mở rộng bài tập lên 12–15/chuyên đề theo mục tiêu đầy đủ Mục 4.7, vai trò Giáo viên (FR-H11 — không khả thi với kiến trúc client-side đã chọn ở QĐ-2).

## Mở rộng nội dung tiếp theo: 14 chuyên đề ưu tiên lên 12 bài, 43 chuyên đề còn lại lên 6–8 bài

- **111 bài tập ưu tiên** (`dh/ps/hh/sh-priority-more.ts`): bổ sung cho 14 chuyên đề Mục 4.7 URD (DH-01→03, DH-06→09, PS-09, HH-03/04/09, SH-04/05/09), đưa các chuyên đề này từ 4 lên 12 bài/chuyên đề — đạt đúng mục tiêu tối thiểu của Mục 4.7. Đã qua GĐ7 lớp 2 (2 agent độc lập, 111/111 khớp, 0 điểm lệch — chi tiết `docs/content-review-log.md`).
- **166 bài tập mở rộng** (`sh/ps/dh/hh/dl/td-expand.ts`): người dùng chọn phương án nâng 43 chuyên đề còn lại từ 3 lên **6–8 bài/chuyên đề trước** (bước trung gian, chưa phải mục tiêu cuối 12–15 của URD, để cân bằng tốc độ ra nội dung với khối lượng kiểm chứng cần làm). Đã qua GĐ7 lớp 2 (6 agent độc lập theo nhóm SH/PS/DH/HH/DL/TD, 162/162 bài numeric/mcq khớp qua `core/answer-checker`, 4/4 bài essay khớp kết luận — chi tiết `docs/content-review-log.md`).
  - Qua lần rà soát này, agent độc lập phát hiện 2 bài essay (TD-06-EX5, TD-06-EX6) có lời giải mẫu gốc chỉ *nêu lại* quy tắc/hiện tượng mà chưa thực sự *chứng minh* — không khớp đúng yêu cầu đề "giải thích vì sao" dù kết luận số học vẫn đúng. Đã sửa cả hai bằng lập luận đầy đủ hơn (TD-06-EX5: dựa vào $10\equiv1\pmod3$; TD-06-EX6: chứng minh 2 trường hợp $n=2k$/$n=2k+1$). Đây là minh chứng cho giá trị của việc bắt buộc GĐ7 lớp 2 ngay cả khi Mục 13 URD nói lớp 1 tự động đã sạch — lớp 1 chỉ kiểm tra có tồn tại `modelSolution`/`rubric`, không đánh giá được chất lượng lập luận.
- Tổng ngân hàng nội dung sau hai đợt: **470 bài tập** (410 `numeric`, 51 `mcq`, 9 `essay`) trên 57/57 chuyên đề — đã qua GĐ7 lớp 1+2 toàn bộ (470/470, 0 điểm lệch). Lớp 3 (giáo viên thật) vẫn chưa thực hiện.
