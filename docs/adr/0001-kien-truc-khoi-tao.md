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

## Bổ sung 10 chuyên đề mới của URD v2.0 (theo yêu cầu trực tiếp của người dùng, 2026-08-14)

Người dùng yêu cầu "tiếp tục bổ sung các nội dung còn thiếu theo URD v2" — hiểu là bổ sung **nội dung** (chuyên đề/bài tập), khác với các hạng mục **tính năng** khác còn thiếu (Gamification, Đồng bộ, UI/UX Mục 11) vốn không phải "nội dung". Đã viết đầy đủ lý thuyết + bài tập cho 10 chuyên đề mới của v2.0 (Mục 4.2, 67 → đủ 67/67 chuyên đề): SH-11 (chữ số tận cùng), SH-12 (dãy chữ, đánh số trang sách), PS-11 (trộn dung dịch, tươi–khô), DH-15 (tỉ lệ kép), DH-16 (phương pháp khử), DH-17 (chuyển động đặc biệt: tàu hỏa, vòng tròn), HH-12 (sơn màu hình khối), DL-07 (đọc bảng số liệu), DL-08 (lịch và đồng hồ), TD-07 (biểu đồ Ven).

- **Quyết định**: giữ nguyên schema 2 mức `basic`/`advanced` cho các chuyên đề mới này (gán `advanced`, đúng vai trò "chủ điểm nâng cao" GĐ3 mà Mục 7 URD mô tả) — **không** làm luôn việc migrate sang thang 4 mức M1–M4 trong cùng lượt này, vì đó là một thay đổi schema riêng biệt ảnh hưởng tới toàn bộ 470 bài tập cũ, tách bạch khỏi việc bổ sung nội dung thuần túy. Nhờ vậy, các chuyên đề mới **tự động** được `content/curriculum/phase3-templates.ts` đưa vào đúng Giai đoạn 3 của Lộ trình học mà không cần sửa code (đã xác nhận bằng script: cả 10 chuyên đề mới đều xuất hiện trong `phase3Templates`, tổng 37 buổi).
- Mỗi chuyên đề: 1 bài lý thuyết đầy đủ (công thức trọng tâm, 2 ví dụ giải từng bước, lỗi thường gặp, 3 câu kiểm tra nhanh) + 6–8 bài luyện tập (theo đúng mức trung gian 6–8 bài/chuyên đề đã áp dụng cho 43 chuyên đề mở rộng trước đó) — tổng 65 bài tập mới (466+60+9=535 bài tập trên toàn bộ 67 chuyên đề).
- Với DL-07 (đọc bảng số liệu), thay vì dựng biểu đồ SVG (phức tạp, rủi ro lỗi hiển thị cao hơn), chọn trình bày số liệu dạng bảng văn bản trực tiếp trong `statement` — đơn giản hóa có chủ đích, vẫn đúng kỹ năng "đọc và rút thông tin từ bảng" mà Mục 5.5 yêu cầu, để dành việc dựng biểu đồ trực quan cho lượt UI/UX sau nếu cần.
- **GĐ7 lớp 2**: 3 agent con độc lập (nhóm SH-11/12+PS-11; nhóm DH-15/16/17; nhóm HH-12+DL-07/08+TD-07), tự giải lại toàn bộ 65 bài từ đầu. Đối chiếu bằng `core/answer-checker` sau khi chuẩn hóa câu trả lời tự nhiên của agent (agent viết kèm đơn vị bằng chữ như "72m", "2 chữ số 0" khiến 16/65 lần đối chiếu tự động đầu tiên báo `format_error` — đã kiểm tra thủ công xác nhận toàn bộ giá trị số đều khớp, không phải lỗi nội dung). **Kết quả: 65/65 khớp, 0 điểm lệch đáp số.**
- Phát hiện và sửa 1 lỗi thực tế: **DL-08-EX2** dùng ngày thật (3/3/2024) nhưng gán sai thứ trong ngày ("thứ Sáu" — thực tế 3/3/2024 là Chủ Nhật, agent đối chiếu lịch dương thực tế phát hiện ra). Đã sửa lại giả thiết đúng thực tế (Chủ Nhật) và tính lại đáp án (20/3/2024 → Thứ Tư), xác minh lại bằng `Date` của JavaScript. Bài học: khi đề bài dùng ngày tháng thật kèm dữ kiện thứ trong tuần, cần đối chiếu lịch dương thực tế thay vì chỉ tự đặt thứ tùy ý — tránh gây hiểu lầm hoặc mất niềm tin nếu học sinh tra lịch đối chiếu.
- Tổng ngân hàng nội dung sau đợt này: **535 bài tập** (466 `numeric`, 60 `mcq`, 9 `essay`) trên **67/67 chuyên đề** — đã qua GĐ7 lớp 1+2 toàn bộ (535/535, 0 điểm lệch). Lớp 3 (giáo viên thật) vẫn chưa thực hiện. Còn thiếu để đạt đầy đủ Mục 5.9 URD v2.0: nâng 53 chuyên đề (43 cũ + 10 mới) từ 6–8 lên 12–15 bài/chuyên đề, và thang 4 mức độ M1–M4.
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

## Đợt 1 sửa lỗi từ rà soát chuyên môn (theo yêu cầu trực tiếp của người dùng, 2026-08-14)

Sau khi triển khai đủ URD v2.0 (67 chuyên đề, Lộ trình học, đóng gói GitHub Pages), người dùng yêu cầu rà soát ứng dụng dưới góc nhìn giáo viên luyện thi lớp 6 CLC + BA, đo trực tiếp trên dữ liệu (không cảm tính). Kết quả rà soát công bố dưới dạng artifact, xếp lộ trình 8 đợt theo tác động/công sức. Đợt 1 (công sức thấp, tác động cao) đã triển khai ngay:

- **Sửa lỗi thật: quiz cuối bài lý thuyết bắt đúng tuyệt đối mới công nhận "Đã nắm"** — vi phạm trực tiếp FR-L04 URD ("bài dưới 5 câu luôn được phép sai 1 câu"). Do cả 67/67 chuyên đề đều có đúng 3 câu quiz, lỗi này khiến đúng 2/3 (66,7%) vẫn bị đánh trượt so với ngưỡng 80% đặt cứng — không đúng đặc tả và có hại cho động lực học của trẻ 10 tuổi. Đã sửa `core/topic-progress/apply-quiz-result.ts`: đổi tham số từ `scoreRatio` sang `(correctCount, totalCount)` để có đủ dữ liệu áp luật "quiz dưới 5 câu được phép sai đúng 1 câu" (đạt ngưỡng % HOẶC đúng từ `totalCount - 1` câu trở lên khi `totalCount < 5`). Đồng thời sửa `QuickCheckQuiz.onFinish` truyền `(correctCount, totalCount)` thay vì tỉ lệ đã tính sẵn, để logic ngưỡng nằm trọn trong hàm thuần có test, không rải trong component. 4 unit test mới phủ đúng biên: 2/3 đạt, 1/3 không đạt, 3/4 đạt, và xác nhận luật không áp dụng khi quiz đủ 5 câu.
- **Lời giải mở dần từng bước (UX-08)** — trước đó `SolutionSteps` đổ hết toàn bộ bước ra cùng lúc, không đúng đặc tả "để học sinh thử tự làm tiếp sau mỗi gợi ý". Thêm prop `progressive` (mặc định `true`): hiện bước 1, có nút "Xem bước tiếp theo (n/tổng)" lộ dần và nút "Hiện tất cả" cho học sinh muốn xem ngay. Trạng thái reset đúng khi chuyển sang bài khác (dựa vào tham chiếu mảng `steps` đổi trong `useEffect`, không cần truyền `key` thủ công ở nơi gọi). Tắt progressive (`progressive={false}`) riêng cho **ví dụ mẫu trong bài lý thuyết** (`TopicLesson.tsx`) — đây là tài liệu học có cấu trúc để đọc trọn vẹn trước khi luyện tập, khác với khoảnh khắc "làm sai rồi xem vì sao" ở Luyện tập/Thi thử nơi progressive thực sự phát huy tác dụng. Thêm animation `fade-in-up` tôn trọng `prefers-reduced-motion` (cùng pattern với `pop-in` đã có).
- Đã xác nhận bằng Playwright: làm quiz DH-01 đúng 2/3 câu → hiện đúng "Đã nắm" và thông báo đúng số câu; làm sai 1 câu luyện tập → chỉ hiện 1 bước đầu, bấm "Xem bước tiếp theo" → hiện đúng bước 2. Không lỗi console. 89/89 test xanh.
## Đợt 2: Gamification tối thiểu — xu, chuỗi ngày, tủ huy hiệu (theo yêu cầu trực tiếp của người dùng, 2026-08-14)

Triển khai Mục 12 URD (GM-01→GM-06) ở mức "tối thiểu cho phiên bản đầu" đã đề xuất trong artifact rà soát. Bỏ qua GM-07 (âm thanh) và GM-08 (thử thách tốc độ) — để lượt sau.

- **Quyết định kiến trúc quan trọng nhất**: dữ liệu mẫu `LearnerProfile` trong URD v2.0 Mục 16 liệt kê `coins` và `badges[]` là trường lưu trữ trực tiếp trên hồ sơ. Đã **chủ động lệch khỏi đặc tả này**: xu và huy hiệu đều được **tính lại (computed live)** từ `SessionOutcomeRecord[]`/`TestResult[]` đã có sẵn, không lưu số dư/danh sách huy hiệu riêng. Lý do: nhất quán với nguyên tắc đã áp dụng xuyên suốt dự án cho `mastery-engine` ("không có bảng `MasterySnapshot`, tính trực tiếp từ `Attempt`") — tránh rủi ro số liệu lệch sổ sách giữa giá trị lưu và lịch sử thật, và không cần thêm bảng Dexie hay migration nào.
- `core/rewards/coins.ts`: `calculateSessionCoins(focus, outcome)` — xu gốc theo độ nặng buổi (theory/practice/review = 10, mock-test = 20, periodic-test = 25, đúng GM-03), nhân theo kết quả tự đánh giá (GM-02): Xuất sắc = đủ, Ổn = nửa, **Cần ôn lại = TRỪ nửa** (giữ đúng thiết kế cố ý chống bấm bừa mức cao để lấy xu). `calculateTotalCoins` cộng dồn toàn bộ lịch sử.
- `core/rewards/streak.ts`: chuỗi buổi liên tiếp **không** bị "Cần ôn lại", đếm ngược từ buổi hoàn thành gần nhất. Đơn giản hóa có chủ đích: không đối chiếu lại buổi đó có bị trễ lịch tại thời điểm hoàn thành hay không (lịch luôn tính động, không tái dựng chính xác trạng thái quá khứ) — chỉ đo tính liên tục về CHẤT LƯỢNG.
- `core/rewards/badges.ts` + `content/badges.ts`: 6 huy hiệu — hoàn thành GĐ1/GĐ2/GĐ3 (đối chiếu toàn bộ template tĩnh của giai đoạn với `outcomes`, không dùng mảng `sessions` đã cắt bớt của `useSchedule` vì có thể thiếu buổi nếu `futureWindow` nhỏ hơn số buổi còn lại), chuỗi 5 buổi, thi thử ≥80%, học đều ≥3 buổi/7 ngày gần nhất. 12 unit test phủ đủ các điều kiện biên.
- `modules/curriculum/useRewards.ts`: hook dùng chung, ghép `staticSessionTemplates` với outcome đã lưu để suy ra `focus` cho từng buổi (tính xu cần biết độ nặng buổi, không có sẵn trong `SessionOutcomeRecord`).
- `CoinsBadge.tsx`: hiện xu ở góc phải thanh điều hướng (GM-01), tải lại theo `location.pathname` — vì thanh nav không bị unmount giữa các trang, cần cơ chế refresh riêng thay vì chỉ tải 1 lần lúc mount (đúng lúc học sinh vừa hoàn thành buổi học và được điều hướng về `/lo-trinh`).
- `BadgeCabinet.tsx` (đặt trong `ProfileHome`): hiện đủ cả huy hiệu đã đạt và chưa đạt, huy hiệu chưa đạt hiện mờ kèm điều kiện cụ thể (đúng GM-05).
- Đã xác nhận bằng Playwright: hoàn thành 1 buổi "Xuất sắc" (theory) → header hiện đúng "🪙 10"; trang Hồ sơ hiện đúng "Chuỗi 1 buổi liên tiếp" và tủ 6 huy hiệu đều ở trạng thái mờ kèm điều kiện (chưa đủ dữ kiện để đạt bất kỳ huy hiệu nào). Không lỗi console. 107/107 test xanh (18 test mới cho `core/rewards`).

## Đợt 3: hình vẽ SVG cho nhóm Hình học phụ thuộc hình nặng nhất (theo yêu cầu trực tiếp của người dùng, 2026-08-14)

Rà soát trước đó phát hiện chỉ 5/98 bài Hình học có hình (toàn bộ ở HH-02). Thay vì vẽ tay từng bài (không khả thi ở quy mô 93 bài), xây 2 hàm sinh SVG dùng lại được, theo đúng định hướng đã ghi trong ADR khi thiết kế Lộ trình học ("dựng vài component hình dùng lại được thay vì vẽ riêng từng bài"), và ưu tiên đúng 2 chuyên đề "phụ thuộc hình nặng nhất" mà rà soát đã chỉ ra: **HH-09** (tỉ số diện tích tam giác chung đáy/chung chiều cao, 12 bài) và **HH-10** (diện tích phần tô đậm, 7 bài) — 19/19 bài của 2 chuyên đề này nay đã có hình, giữ nguyên quy ước `stroke="currentColor"` không hard-code màu của `rectangleFigure`/`squareFigure` có sẵn để tự khớp theme sáng/tối.

- `content/figures/triangle-comparison.ts`: `sharedBaseTriangleFigure(height1, height2, label1, label2)` — hai tam giác chung đáy vẽ chồng (nét liền/nét đứt) với hai chiều cao khác nhau, có đường gióng chiều cao; `sharedHeightTriangleFigure(apexLabel, pointLabel, leftLabel, rightLabel)` — một tam giác có điểm chia đáy, đường nối đỉnh–điểm chia thể hiện đường cao chung. Cả hai chỉ minh họa đúng **quan hệ** (chung đáy/chung chiều cao) chứ không vẽ đúng tỉ lệ hình học chính xác — đủ dùng cho mục đích sư phạm ở tiểu học, tránh sa vào bài toán dựng hình chính xác không cần thiết.
- `content/figures/shaded-region.ts`: `shadedRegionFigure(outerWidth, outerHeight, cutout, unit)` — hình chữ nhật/vuông lớn tô nền nhạt (`fill-opacity="0.14"`), phần cắt bỏ (`cutout`: tam giác/hình tròn/hình vuông/dải hình chữ nhật) vẽ nét đứt không tô màu ở giữa — đúng ngữ nghĩa "phần tô đậm còn lại" của đề bài. Tự co giãn theo tỉ lệ thật của từng bài (không làm méo hình vuông thành chữ nhật hay ngược lại).
- Đã xác nhận bằng Playwright: luyện tập 19 câu HH-09+HH-10 liên tiếp, cả 19/19 câu đều hiện đúng hình (rectangle-cutout hiện rõ vùng tô đậm/không tô đậm; triangle chung đáy hiện 2 tam giác phân biệt nét liền/đứt; triangle chung chiều cao hiện đúng điểm chia đáy). Không lỗi console. Typecheck sạch, 107/107 test xanh (không cần test riêng cho hàm sinh SVG vì là hàm trình bày thuần túy, không có logic tính toán cần kiểm chứng).
- Còn lại 74 bài Hình học khác (HH-01, HH-03→HH-08, HH-11, HH-12) vẫn chưa có hình — HH-12 (sơn màu khối) và HH-08 (thay đổi kích thước) đã được đánh giá là ít phụ thuộc hình hơn (đề bài mô tả đủ bằng số liệu văn bản) nên xếp sau; HH-03/04/05/06/07/11 là các bài diện tích/thể tích cơ bản có thể hưởng lợi từ hình nhưng không phải rào cản "không làm được nếu thiếu hình" như HH-09/HH-10.

## Đợt 4: gợi ý sau khi làm sai (FR-P07) + chuẩn hóa lời giải nhóm DH-11/DH-12 (theo yêu cầu trực tiếp của người dùng, 2026-08-14)

Rà soát trước đó phát hiện 62% bài tập (330/535) có lời giải chỉ 1 bước, và 0 bài có `hint` (FR-P07 chưa có dữ liệu để chạy). Thay vì cố chuẩn hóa cơ học cả 330 bài trong một lượt, chọn phạm vi có chủ đích: **DH-11 (giả thiết tạm)** và **DH-12 (tính ngược từ cuối)** — 2 trong số các "phương pháp giải đặc biệt" mà chính URD liệt kê riêng (Mục 4.3), nơi việc gộp cả suy luận vào 1 dòng công thức che mất đúng phần khó nhất (nhận ra cần dùng phương pháp nào và áp dụng đúng thứ tự).

- Thêm trường `Exercise.hint?: string` — gợi ý hướng làm, chỉ hiện SAU khi trả lời sai, không phải đáp số hay bước tính cụ thể (đúng FR-P07, không lộ đáp án qua gợi ý).
- `PracticeSession.tsx`: khi trả lời sai một bài có `hint` (áp dụng cho `numeric`/`mcq`, không áp dụng `essay` vì đã có luồng tự tiết lộ riêng), hiện gợi ý trước kèm nút "Xem lời giải đầy đủ" — chỉ khi bấm nút mới hiện `SolutionSteps` đầy đủ. Bài không có `hint` giữ nguyên hành vi cũ (hiện lời giải ngay), không phá luồng hiện có.
- Đã thêm `hint` cho toàn bộ 14 bài DH-11+DH-12. Đồng thời sửa 5 bài DH-12 (EX2/3/5/6/7) trước đó gộp cả 2 bước "tính ngược" vào 1 công thức duy nhất (ví dụ `(56-6):5=10`) thành 2 bước tường minh (tính ngược phép cộng trước, rồi tính ngược phép nhân) — khớp đúng phong cách đã có sẵn ở DH-12-EX1/EX4, không đổi đáp số nào.
- Đã xác nhận bằng Playwright: làm sai bài DH-11-EX4 → hiện đúng gợi ý phương pháp (không lộ đáp số), lời giải đầy đủ chỉ hiện sau khi bấm "Xem lời giải đầy đủ". Không lỗi console. Typecheck sạch, 107/107 test xanh.
- Còn lại: DH-08, DH-16 (đã có bước rõ ràng sẵn), TD-06 và phần lớn 330 bài 1-bước khác (chủ yếu SH/PS/DL/HH áp dụng công thức trực tiếp — 1 bước vẫn hợp lý sư phạm ở nhiều bài, không phải toàn bộ đều cần chuẩn hóa) — để lượt sau, cuốn chiếu theo nhóm chuyên đề khi cần.

Còn lại của lộ trình rà soát (mở rộng nội dung 12–15 bài/chuyên đề kèm thang M1–M4 và hạn mức bối cảnh 40%, ngân hàng tự luận, hình vẽ cho 74 bài Hình học còn lại, trang phân tích lỗi theo loại lỗi FR-P08, âm thanh + thử thách tốc độ, và nhóm tiện ích UI/UX+đồng bộ) — xem chi tiết trong artifact rà soát, chưa triển khai.

## Đợt 5: mở rộng khối lượng nội dung — thử migrate M1–M4, bỏ qua vì không khả thi tự động, chuyển sang +2 bài/chuyên đề (theo yêu cầu trực tiếp của người dùng, 2026-08-14)

**Thử migrate thang M1–M4 (URD v2.0 Mục 5.8) — bỏ qua sau khi đo thực tế.** Viết thử một script phân loại heuristic dựa trên `level` (`basic`/`advanced`) + số bước `solutionSteps` (`basic`+≤1 bước→M1, `basic`+2+ bước→M2, `advanced`+≤2 bước→M3, `advanced`+3+ bước→M4) và chạy trên toàn bộ 535 bài lúc đó. Kết quả: phân bố M1=36,8%/M2=5,8%/M3=46,2%/M4=11,2% — lệch xa mục tiêu URD (25/35/30/10%), và **0/67 chuyên đề** đạt yêu cầu tối thiểu "≥1 bài M4 + ≥2 bài mỗi mức M1–M3". Nguyên nhân: M1–M4 của URD đo *độ khó nhận dạng dạng bài* ("có cần nhận ra đây là dạng bài ẩn không"), không tương đương với *số bước giải* — heuristic không nắm bắt được tín hiệu này. Đã trình bày phát hiện này cho người dùng qua `AskUserQuestion` (3 lựa chọn: bỏ qua / áp dụng heuristic kèm ghi chú hạn chế / để giáo viên phân loại thủ công sau) — người dùng chọn **bỏ qua**, giữ nguyên thang `basic`/`advanced` hiện có, không ép migrate chất lượng thấp.

**Phạm vi thực hiện thay thế**: +2 bài tập cho mỗi trong 53 chuyên đề không ưu tiên (43 chuyên đề cũ + 10 chuyên đề mới của v2.0, loại trừ 14 chuyên đề trọng điểm Mục 4.7 đã đạt 12 bài) = **106 bài mới**, đưa các chuyên đề này từ 6–8 lên 8–10 bài/chuyên đề. Kết hợp lồng bối cảnh thể thao/xây dựng/vũ trụ vào các bài mới khi hợp lý, giải quyết đồng thời phát hiện "70% đề bài thuần số, thể thao chỉ 1%" của đợt rà soát BA/giáo viên trước đó.

- 6 file mới: `sh-expand2.ts` (18), `ps-expand2.ts` (20), `dh-expand2.ts` (20), `hh-expand2.ts` (18), `dl-expand2.ts` (16), `td-expand2.ts` (14) — nối vào `content/exercises/index.ts`. Tổng ngân hàng: 535→**641 bài** (561 numeric, 69 mcq, 11 essay).
- **Lỗi phát hiện và sửa khi viết**: `sh-expand2.ts` ban đầu viết cả 18 bài với `level: 'advanced'` mà chưa kiểm tra `level` thực tế của các bài đã có trong từng chuyên đề — phát hiện qua grep trước khi sang file tiếp theo (SH-01/02/03/06/07/08/10 thực chất đều `'basic'`, chỉ SH-11/12 mới là `'advanced'`). Đã sửa bằng sed hàng loạt rồi revert tay 4 bài SH-11/SH-12. Rút kinh nghiệm: kiểm tra `level` hiện có của từng chuyên đề bằng grep **trước khi viết**, áp dụng đúng cho 5 file còn lại, không lặp lại lỗi.
- Rà soát lớp 2 (3 agent con độc lập, đối chiếu qua `core/answer-checker`): **106/106 bài khớp hoàn toàn, 0 điểm lệch đáp số thực.** Đối chiếu tự động ban đầu báo 55 lệch nhưng toàn bộ là lệch định dạng (agent viết đáp án kèm chữ mô tả, hoặc dùng ký tự mũ Unicode `cm²`/`cm³` thay vì chuỗi chữ số `cm2`/`cm3` đã lưu) — không phải lỗi toán. Chi tiết đầy đủ: [`docs/content-review-log.md`](../content-review-log.md).
- **Sửa theo phát hiện phụ**: phần lệch `wrong_unit` cho thấy đặt `unit: 'cm2'/'cm3'` cho đáp án diện tích/thể tích có rủi ro chấm sai một học sinh thật gõ đúng `cm²` (vì `stripUnit()` so khớp chuỗi tuyệt đối, không coi `²`≡`2`). Toàn bộ 535 bài trước đó chưa từng đặt `unit` cho diện tích/thể tích (chỉ dùng cho chiều dài/khối lượng/thời gian/tiền). Đã bỏ `unit` khỏi 11 bài trong `hh-expand2.ts` và 3 bài trong `dl-expand2.ts` để nhất quán với quy ước sẵn có của dự án — không ảnh hưởng học sinh vì không nhập đơn vị vẫn luôn được chấp nhận (`stripUnit` trả `'no-unit'`), chỉ tránh trường hợp gõ đơn vị mũ đúng mà vẫn bị báo sai.
- `npx tsc -b --noEmit` sạch, `npx vitest run` 107/107 xanh (không tăng vì đây là mở rộng nội dung thuần, không thêm logic mới cần unit test riêng — `content.test.ts` đã tự động kiểm tra cấu trúc 106 bài mới).

Còn lại sau đợt này: 53 chuyên đề vẫn ở 8–10 bài, chưa đạt mục tiêu 12–15 bài/chuyên đề của URD; thang M1–M4 vẫn chưa migrate; ngân hàng tự luận (Đợt 6), thanh tab đáy di động + trang phân tích lỗi FR-P08 + bản in phụ huynh (Đợt 7), đồng bộ Firebase + ô nháp + đọc đề giọng nói + âm thanh + thử thách tốc độ (Đợt 8) — chưa bắt đầu, chờ xác nhận tiếp tục.
