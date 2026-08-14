# Nhật ký kiểm chứng nội dung (Mục 13 URD, Giai đoạn 7)

Ghi lại kết quả từng lớp kiểm chứng nội dung theo đúng quy trình bắt buộc ở Mục 13 URD. Mỗi lần rà soát lại toàn bộ (ví dụ sau khi bổ sung chuyên đề mới) cần thêm một mục mới bên dưới, không ghi đè mục cũ.

## 2026-08-05 — Lớp 1 (tự động) + Lớp 2 (giải lại độc lập)

**Phạm vi**: toàn bộ 193 bài tập, 57/57 chuyên đề (thời điểm này).

### Lớp 1 — Kiểm tra cấu trúc tự động

Công cụ: `src/content/content.test.ts` (chạy cùng `npm run test`). Kiểm tra: mọi chuyên đề có công thức + ≥2 ví dụ + 3–5 câu kiểm tra nhanh; mọi bài tập gắn đúng chuyên đề tồn tại và có lời giải từng bước; mọi bài `mcq` có đúng 4 lựa chọn và chỉ số đáp án hợp lệ; mọi bài `numeric` có `acceptedValues` parse được bằng `core/answer-checker`; mọi bài `essay` có lời giải mẫu và rubric.

Kết quả: **đạt**, 0 lỗi cấu trúc.

### Lớp 2 — Giải lại độc lập ở phiên không mang lịch sử soạn đề

**Phương pháp**: xuất toàn bộ đề bài (không kèm đáp án đã lưu) ra một file trung gian, sau đó giao cho 6 agent con độc lập (mỗi agent một phiên hoàn toàn mới, không có bất kỳ ký ức nào về quá trình soạn đề gốc) — mỗi agent phụ trách một nhóm chuyên đề (SH/PS/DH/HH/DL/TD), tự giải lại từ đầu từng bài một cách độc lập. Đây là cách triển khai đúng tinh thần "mở một phiên làm việc mới không mang theo lịch sử soạn đề" mà URD yêu cầu — dùng một tiến trình AI tách biệt hoàn toàn thay vì cùng một phiên hội thoại.

Sau khi cả 6 agent hoàn thành, đối chiếu tự động kết quả độc lập với đáp án đã lưu:
- Bài `numeric`/`mcq` (188 bài): đối chiếu bằng chính bộ chấm `core/answer-checker` (cùng logic dùng để chấm bài cho học sinh thật — đảm bảo phép so sánh nhất quán, có xét tương đương phân số/thập phân, sai số...).
- Bài `essay` (5 bài, thuộc HH-02 và TD-06): đối chiếu thủ công giữa tóm tắt lập luận độc lập và lời giải mẫu đã lưu.

**Kết quả: 193/193 bài khớp hoàn toàn — 0 điểm lệch, 0 bài "không giải được", 0 bài bị bỏ sót.** Cả 6 agent đều báo `confidence: "high"` cho toàn bộ bài của mình; không agent nào nghi ngờ đề bài mơ hồ, sai, hoặc thiếu dữ kiện.

Vài điểm được các agent tự ghi chú khi giải (không phải lỗi, chỉ là điểm cần cẩn thận, đã xác nhận đúng):
- SH-04-EX2/EX4 (tìm số 2 chữ số): chỉ có đúng một nghiệm hợp lệ trong miền chữ số 0–9, đã kiểm tra không có nghiệm khác.
- DH-04 (hai tỉ số): kiểm chứng chéo bằng phương pháp chuẩn hóa, khớp cả hai cách tính.
- DH-10-EX1/EX3 (đường thẳng, cộng thêm 1 cây) vs DH-10-EX2 (đường khép kín, không cộng thêm 1) — phân biệt đúng.
- HH-06, HH-10 (liên quan số Pi): dùng đúng quy ước π=3,14 như đề đã ghi rõ.
- PS-04-EX2/EX3 (làm tròn số): áp dụng đúng quy ước làm tròn 0,5 lên chuẩn tiểu học VN.

### Lớp 3 — Rà soát bởi giáo viên Toán tiểu học

**Chưa thực hiện.** Đây là bước bắt buộc cuối cùng theo Mục 13 URD ("không bỏ qua bước này ngay cả khi hai lớp trên đã sạch") và cần một giáo viên Toán tiểu học thật — không thể thực hiện bằng AI. **Bắt buộc hoàn thành lớp này trước khi đưa nội dung vào sử dụng thật với học sinh.**

## 2026-08-05 (tiếp) — Lớp 2 cho 111 bài tập mới bổ sung

**Phạm vi**: 111 bài tập mới thêm vào 12 chuyên đề ưu tiên theo Mục 4.7 URD (DH-01→03, DH-06→09, PS-09, HH-03/04/09, SH-04/05/09), đưa các chuyên đề này lên 12 bài/chuyên đề.

**Phương pháp**: giống hệt lần trước — 2 agent con độc lập (một phiên riêng cho 54 bài nhóm DH, một phiên riêng cho 57 bài còn lại PS/HH/SH), tự giải lại từ đầu, đối chiếu tự động qua `core/answer-checker`.

**Kết quả: 111/111 bài khớp hoàn toàn — 0 điểm lệch.** Cả hai agent đều `confidence: "high"` toàn bộ.

Điểm được agent tự ghi chú khi giải (đã xác nhận đúng, không phải lỗi):
- DH-06-EX11/EX12 (toán tuổi có lập phương trình theo thời gian): kiểm tra lại bằng cách thay ngược đáp số vào đề, khớp.
- SH-04-EX7/EX8/EX11/EX12 (tìm số 2 chữ số qua phương trình $9t+d=k$): kiểm tra miền hợp lệ $1\\le t\\le9$, $0\\le d\\le9$, đều đúng một nghiệm duy nhất.
- SH-04-EX11: đề hỏi riêng "chữ số hàng đơn vị" (đáp số 2) chứ không phải cả số — đã trả lời đúng theo đúng câu hỏi.
- SH-05 (nhiều bài): xác nhận các ràng buộc "khác 0"/"lớn nhất"/"nhỏ nhất" trong đề loại trừ đúng các nghiệm thừa, mỗi bài chỉ còn một đáp số hợp lệ.

**Tổng số bài đã qua lớp 2 tính đến thời điểm này: 304/304 (193 bài đợt đầu + 111 bài đợt này) — 0 điểm lệch trên toàn bộ ngân hàng nội dung hiện có.**

## 2026-08-05 (tiếp) — Lớp 2 cho 166 bài tập mở rộng 43 chuyên đề còn lại (nâng lên 6–8 bài/chuyên đề)

**Phạm vi**: 166 bài tập mới (SH-expand 28, PS-expand 34, DH-expand 28, HH-expand 28, DL-expand 24, TD-expand 24) thêm vào 43 chuyên đề không thuộc nhóm ưu tiên Mục 4.7, đưa các chuyên đề này từ 3 lên 6–8 bài/chuyên đề (bước trung gian trước khi đạt mục tiêu 12–15 bài/chuyên đề của URD).

**Phương pháp**: 6 agent con độc lập, mỗi agent một phiên hoàn toàn mới không mang lịch sử soạn đề, phụ trách một nhóm chuyên đề (SH/PS/DH/HH/DL/TD), tự giải lại từ đầu. Đối chiếu tự động 162 bài `numeric`/`mcq` qua `core/answer-checker`; đối chiếu thủ công 4 bài `essay` (TD-06-EX4→EX7).

**Kết quả: 162/162 bài numeric/mcq khớp hoàn toàn qua bộ chấm tự động — 0 điểm lệch.** 4/4 bài essay: kết luận cuối cùng của agent khớp với lời giải mẫu.

Phát hiện và đã xử lý trong lần rà soát này:
- **TD-06-EX5** (dấu hiệu chia hết cho 3, số 2145): agent chỉ ra `solutionSteps` gốc chỉ *nhắc lại* quy tắc như điều đã biết rồi kiểm tra ví dụ, chưa thực sự *chứng minh* vì sao quy tắc đúng — không khớp yêu cầu đề bài ("giải thích vì sao"). Kết luận cuối (2145 chia hết cho 3) vẫn đúng, không phải lỗi đáp số. **Đã sửa**: viết lại `solutionSteps`/`modelSolution` bằng lập luận đầy đủ dựa trên $10\equiv1\pmod3$ (phân tích $1000=999+1$, $100=99+1$, $10=9+1$, các số $999,99,9$ đều chia hết cho 3).
- **TD-06-EX6** (2 số tự nhiên liên tiếp luôn có 1 chẵn 1 lẻ): agent nhận xét lập luận gốc ("xen kẽ nhau") không giải thích cơ chế. **Đã sửa**: viết lại bằng chứng minh 2 trường hợp ($n=2k$ và $n=2k+1$), nhất quán với độ chặt chẽ của TD-06-EX4/EX7.

Điểm khác được agent tự ghi chú (đã xác nhận đúng, không phải lỗi):
- DL-04-EX7 ("Đổi 150 phút sang giờ và phút. Nhập số giờ."): agent lưu ý đề chỉ hỏi riêng phần giờ (đáp số 2, không phải 2,5 hay 150) — khớp đúng với `acceptedValues` đã lưu, chỉ là điểm cần rõ ràng về định dạng nhập liệu.
- SH-01-EX6, PS-08-EX5/EX7, PS-04-EX6, PS-07-EX5, DH-11-EX5/DH-14-EX5, HH (dùng π=3,14): agent tự kiểm chứng chéo, đều khớp lời giải mẫu, không có vấn đề.

**Tổng số bài đã qua lớp 2 tính đến thời điểm này: 470/470 (304 bài các đợt trước + 166 bài đợt này) — 0 điểm lệch trên toàn bộ ngân hàng nội dung hiện có.**

## 2026-08-14 — Lớp 2 cho 65 bài tập của 10 chuyên đề mới theo URD v2.0

**Phạm vi**: 65 bài tập mới (SH-11: 8, SH-12: 6, PS-11: 7, DH-15: 6, DH-16: 6, DH-17: 6, HH-12: 6, DL-07: 6, DL-08: 7, TD-07: 7) cho 10 chuyên đề hoàn toàn mới bổ sung theo URD v2.0 Mục 4.2/5 (chưa từng có trong ngân hàng nội dung trước đây — không phải mở rộng chuyên đề cũ).

**Phương pháp**: 3 agent con độc lập, mỗi agent một phiên hoàn toàn mới không mang lịch sử soạn đề, phụ trách một nhóm chuyên đề (nhóm 1: SH-11/12, PS-11; nhóm 2: DH-15/16/17; nhóm 3: HH-12, DL-07/08, TD-07), tự giải lại từ đầu bằng kiến thức toán tiểu học. Đối chiếu bổ sung bằng `core/answer-checker` (sau khi làm sạch đơn vị/chữ mô tả agent tự thêm vào câu trả lời, vì bộ chấm yêu cầu đúng định dạng số — 16/65 lần đối chiếu tự động ban đầu báo `format_error` chỉ vì lý do này, không phải lệch đáp số: kiểm tra thủ công xác nhận toàn bộ giá trị số đều khớp `acceptedValues` đã lưu).

**Kết quả: 65/65 bài khớp hoàn toàn — 0 điểm lệch đáp số.** 64/65 bài `confidence: "high"`.

Phát hiện và đã xử lý trong lần rà soát này:
- **DL-08-EX2** (bài toán lịch): agent đối chiếu với lịch dương thực tế phát hiện đề bài ghi "Ngày 3/3/2024 là thứ Sáu" nhưng ngày 3/3/2024 trong thực tế là **Chủ Nhật** — tính toán nội tại của đề vẫn tự nhất quán (không phải lỗi công thức/đáp số theo đúng giả thiết đề cho), nhưng dùng ngày thật kèm thứ sai lệch với lịch thực tế có thể gây hiểu lầm hoặc mất niềm tin nếu học sinh tra lịch đối chiếu. **Đã sửa**: đổi giả thiết đề thành đúng thứ thực tế (Chủ Nhật), tính lại đáp án (20/3/2024 → Thứ Tư, đã xác minh lại bằng lịch JS thật). Đã kiểm tra chéo 2 bài lịch còn lại (DL-08-EX1: 1/6/2024, DL-08-EX3: 25/4/2024) đều khớp đúng lịch thực tế, không cần sửa.

Điểm khác được agent tự ghi chú (đã xác nhận đúng, không phải lỗi):
- SH-12-EX4 (dãy số viết liền, tìm chữ số thứ 15): agent nhận xét lời giải gốc trình bày hơi khó theo dõi nhưng khi tự liệt kê trực tiếp dãy số vẫn ra đúng kết quả.
- DH-16-EX6 (giá 1 quả cam = 6.200 đồng, không tròn nghìn như các bài khác): đã kiểm tra chéo cả 2 phương trình gốc đều thỏa mãn, xác nhận đây là đặc điểm bộ số liệu, không phải lỗi.

**Tổng số bài đã qua lớp 2 tính đến thời điểm này: 535/535 (470 bài các đợt trước + 65 bài đợt này) — 0 điểm lệch trên toàn bộ ngân hàng nội dung hiện có.**
