# URD — Ứng dụng Tổng hợp & Ôn luyện Toán vào lớp 6 Chất lượng cao

| | |
|---|---|
| **Loại tài liệu** | User Requirements Document (URD) — đặc tả để triển khai bằng Claude Code |
| **Sản phẩm** | Ứng dụng Lý thuyết + Luyện tập + Thi thử + Hồ sơ tiến trình, môn Toán, thi vào lớp 6 CLC (Hà Nội) |
| **Phiên bản** | 1.0 |
| **Ngày soạn** | 28/07/2026 |
| **Trạng thái** | Có **2 quyết định kiến trúc CHƯA CHỐT** — xem Mục 10 |
| **Tài liệu liên quan** | `URD-ung-dung-on-luyen-tieng-anh-vao-6.md` (ứng dụng Tiếng Anh — cùng hệ sinh thái, xem Mục 10.1) |

---

## 0. Hướng dẫn dành cho Claude Code — đọc trước khi viết mã

1. **Đọc toàn bộ tài liệu này trước khi tạo bất kỳ tệp mã nào.** Mục 4 (phạm vi kiến thức) dài vì cần liệt kê đủ 57 chủ điểm làm căn cứ xây dựng nội dung — không cần nạp lại toàn bộ vào ngữ cảnh ở mỗi lượt làm việc sau này.
2. **Mục 10 có hai quyết định chưa chốt** phải hỏi người dùng trước khi khởi tạo dự án:
   - **QĐ-1**: Ứng dụng Toán độc lập hay dùng chung nền tảng với ứng dụng Tiếng Anh?
   - **QĐ-2**: Kiến trúc client-side thuần hay có backend?
   Hai quyết định này ràng buộc lẫn nhau (xem Mục 10.4). Tài liệu có nêu khuyến nghị ở Mục 10.5 nhưng đó là gợi ý, **không phải quyết định cuối**.
3. **Mục 8 là phần đặc thù nhất của môn Toán** — cơ chế nhập/chấm đáp số và hiển thị công thức. Đây là nơi dễ cài đặt sai nhất và tốn kém nhất để sửa về sau. Đọc kỹ, và hỏi lại nếu có điểm chưa rõ trước khi viết bộ chấm điểm.
4. **Đề xuất kế hoạch trước khi sinh mã hàng loạt.** Trình bày cấu trúc thư mục và thứ tự xây dựng theo Mục 13, chờ xác nhận rồi mới viết.
5. **Xây dựng theo từng module độc lập, chạy và kiểm thử riêng được**: Lý thuyết → Luyện tập → Thi thử → Hồ sơ/Lộ trình. Không viết toàn bộ ứng dụng trong một lượt.
6. **Khi một yêu cầu chưa đủ rõ để cài đặt chính xác, hãy hỏi thay vì tự suy đoán** — đặc biệt với quy tắc so khớp đáp số (Mục 8.2), công thức tính mức độ thành thạo (FR-H03) và các ngưỡng số liệu (Mục 17).
7. **Toàn bộ nội dung bài học và câu hỏi phải là tài liệu biên soạn mới**, không sao chép nguyên văn đề thi thật của bất kỳ trường nào (xem Mục 16).
8. **Mọi lời giải trong ngân hàng nội dung phải được kiểm chứng tính đúng đắn về mặt toán học.** Với môn Toán, một lời giải sai gây hại trực tiếp cho học sinh. Xem yêu cầu kiểm thử ở Mục 13, Giai đoạn 7.

---

## 1. Bối cảnh và mục tiêu sản phẩm

Học sinh lớp 5 tại Hà Nội thi vào lớp 6 các trường chất lượng cao/có tổ chức thi tuyển (Archimedes, Lương Thế Vinh, Nguyễn Tất Thành, Ngôi Sao Hà Nội, Cầu Giấy, Thanh Xuân, Marie Curie, Hà Nội – Amsterdam...) phải đối mặt với đề Toán có đặc điểm rất khác bài kiểm tra trên lớp: **áp lực thời gian rất cao** (có trường 50 câu trong 60 phút), **định dạng điền đáp số chiếm chủ đạo** thay vì trắc nghiệm thuần, và **độ khó trải rộng từ cơ bản đến nâng cao** với nhiều dạng toán điển hình không có trong sách giáo khoa.

Mục tiêu của ứng dụng: một **công cụ tự học toàn diện** kết hợp bốn trụ cột — dạy lý thuyết theo chuyên đề, luyện tập có phản hồi tức thì kèm lời giải chi tiết, thi thử mô phỏng áp lực thời gian thật, và hồ sơ theo dõi tiến trình có khả năng chỉ ra chính xác học sinh đang yếu chuyên đề nào.

---

## 2. Đối tượng người dùng và vai trò

| Vai trò | Mô tả | Ghi chú |
|---|---|---|
| **Học sinh** | Người dùng chính, 10–11 tuổi, tự học trên máy tính hoặc điện thoại, lượt học 15–30 phút | Bắt buộc ở mọi phương án |
| **Phụ huynh** | Thiết lập ban đầu, xem tổng quan tiến trình, hỗ trợ đối chiếu bài tự luận | Bắt buộc ở mọi phương án |
| **Giáo viên/Trung tâm** | Giao chuyên đề theo lớp, xem tiến trình nhiều học sinh, chấm/nhận xét bài tự luận | **Chỉ khả thi nếu chọn kiến trúc có backend** — xem Mục 10 |

---

## 3. Phạm vi sản phẩm — bốn trụ cột bắt buộc

### 3.1. Lý thuyết
Bài học theo từng chuyên đề (Mục 4), gồm: phần giải thích phương pháp giải bằng tiếng Việt, công thức/quy tắc trọng tâm được trình bày nổi bật, 2–3 ví dụ mẫu có lời giải từng bước, và cảnh báo các lỗi sai thường gặp. Kết thúc mỗi bài có 3–5 câu kiểm tra nhanh để xác nhận đã hiểu.

### 3.2. Luyện tập
Ngân hàng bài tập phủ toàn bộ chuyên đề, hỗ trợ **cả ba dạng nhập đáp án** (Mục 8). Học sinh luyện theo chuyên đề cụ thể hoặc luyện hỗn hợp. Mọi bài đều có **lời giải chi tiết từng bước**, không chỉ đáp số. Có chế độ "luyện lại câu đã sai".

### 3.3. Thi thử
Mô phỏng đề thi thật có tính giờ, với **nhiều cấu hình đề tương ứng phong cách các trường khác nhau** (Mục 5.2). Sinh đề ngẫu nhiên theo tỷ trọng chuyên đề đã định. Sau khi nộp: chấm tự động phần trắc nghiệm và điền đáp số, hiển thị lời giải mẫu cho phần tự luận để học sinh tự đối chiếu.

### 3.4. Hồ sơ theo dõi tiến trình
Tính mức độ thành thạo theo từng chuyên đề, hiển thị bản đồ điểm mạnh/yếu trực quan, lưu lịch sử thi thử để thấy xu hướng tiến bộ theo thời gian, và **chủ động đề xuất nên ôn chuyên đề nào tiếp theo**. Có bài kiểm tra đầu vào để khởi tạo bản đồ năng lực.

---

## 4. Phạm vi kiến thức (Content Taxonomy) — 57 chuyên đề

Mỗi chuyên đề có mã để tham chiếu xuyên suốt tài liệu và trong dữ liệu ứng dụng. Mỗi bài tập bắt buộc gắn ít nhất một mã.

### 4.1. SH — Số học và cấu tạo số (10 chuyên đề)

| Mã | Chuyên đề | Mức độ |
|---|---|---|
| SH-01 | Đọc, viết, so sánh số tự nhiên; giá trị theo hàng | Cơ bản |
| SH-02 | Bốn phép tính với số tự nhiên; tính nhanh, tính bằng cách thuận tiện | Cơ bản |
| SH-03 | Thứ tự thực hiện phép tính; tính giá trị biểu thức | Cơ bản |
| SH-04 | Cấu tạo số: viết thêm/xóa bớt chữ số, đổi chỗ chữ số, quan hệ số mới – số cũ | Nâng cao |
| SH-05 | Dấu hiệu chia hết cho 2, 3, 5, 9 và bài toán kết hợp nhiều dấu hiệu | Nâng cao |
| SH-06 | Phép chia có dư; tìm số bị chia, số chia, số dư | Cơ bản |
| SH-07 | Tìm thành phần chưa biết của phép tính (tìm X) | Cơ bản |
| SH-08 | Trung bình cộng và các bài toán liên quan | Cơ bản |
| SH-09 | Dãy số viết theo quy luật: tìm số hạng, đếm số hạng, tính tổng dãy | Nâng cao |
| SH-10 | Số chẵn/lẻ, số nguyên tố, ước và bội ở mức tiểu học | Nâng cao |

### 4.2. PS — Phân số, số thập phân, tỉ số phần trăm (10 chuyên đề)

| Mã | Chuyên đề | Mức độ |
|---|---|---|
| PS-01 | Khái niệm phân số; rút gọn, quy đồng | Cơ bản |
| PS-02 | So sánh phân số bằng nhiều cách (quy đồng, phần bù, phân số trung gian) | Nâng cao |
| PS-03 | Bốn phép tính với phân số | Cơ bản |
| PS-04 | Số thập phân: đọc, viết, so sánh, làm tròn | Cơ bản |
| PS-05 | Bốn phép tính với số thập phân | Cơ bản |
| PS-06 | Chuyển đổi phân số ↔ số thập phân ↔ tỉ số phần trăm | Cơ bản |
| PS-07 | Dãy tính phân số có quy luật (rút gọn dây chuyền, tách phân số) | Nâng cao |
| PS-08 | Tỉ số của hai số; bài toán về tỉ số | Cơ bản |
| PS-09 | Ba bài toán cơ bản về tỉ số phần trăm | Cơ bản |
| PS-10 | Bài toán thực tế về phần trăm: lãi–lỗ, tăng–giảm giá, khuyến mãi | Nâng cao |

### 4.3. DH — Dạng toán điển hình có lời văn (14 chuyên đề)

| Mã | Chuyên đề | Mức độ |
|---|---|---|
| DH-01 | Tìm hai số khi biết tổng và hiệu | Cơ bản |
| DH-02 | Tìm hai số khi biết tổng và tỉ số | Cơ bản |
| DH-03 | Tìm hai số khi biết hiệu và tỉ số | Cơ bản |
| DH-04 | Bài toán hai tỉ số | Nâng cao |
| DH-05 | Bài toán hai hiệu số | Nâng cao |
| DH-06 | Toán tính tuổi (tương quan tuổi ở hai thời điểm khác nhau) | Nâng cao |
| DH-07 | Toán chuyển động cơ bản: cùng chiều, ngược chiều, gặp nhau, đuổi kịp | Nâng cao |
| DH-08 | Toán chuyển động nâng cao: trên dòng nước, có nghỉ giữa đường, nhiều chặng | Nâng cao |
| DH-09 | Toán công việc chung (làm chung – làm riêng, thay đổi số người) | Nâng cao |
| DH-10 | Toán trồng cây | Cơ bản |
| DH-11 | Bài toán giả thiết tạm | Nâng cao |
| DH-12 | Bài toán tính ngược từ cuối | Nâng cao |
| DH-13 | Tỉ lệ thuận, tỉ lệ nghịch; phương pháp rút về đơn vị | Cơ bản |
| DH-14 | Bài toán về năng suất, mật độ và đại lượng tỉ lệ trong thực tế | Nâng cao |

### 4.4. HH — Hình học (11 chuyên đề)

| Mã | Chuyên đề | Mức độ |
|---|---|---|
| HH-01 | Nhận biết hình và các yếu tố cơ bản; góc | Cơ bản |
| HH-02 | Chu vi, diện tích hình chữ nhật, hình vuông | Cơ bản |
| HH-03 | Diện tích hình tam giác | Cơ bản |
| HH-04 | Diện tích hình thang | Cơ bản |
| HH-05 | Hình bình hành, hình thoi | Cơ bản |
| HH-06 | Hình tròn: chu vi, diện tích | Cơ bản |
| HH-07 | Hình hộp chữ nhật, hình lập phương: diện tích xung quanh, toàn phần, thể tích | Cơ bản |
| HH-08 | Bài toán thay đổi kích thước dẫn tới thay đổi chu vi/diện tích | Nâng cao |
| HH-09 | Tỉ số diện tích tam giác chung đáy hoặc chung chiều cao | Nâng cao |
| HH-10 | Cắt ghép hình; tính diện tích phần tô đậm | Nâng cao |
| HH-11 | Bài toán thực tế về thể tích: mực nước dâng, xếp hộp, vật chìm | Nâng cao |

### 4.5. DL — Đại lượng và đo lường (6 chuyên đề)

| Mã | Chuyên đề | Mức độ |
|---|---|---|
| DL-01 | Đơn vị đo độ dài, khối lượng: đổi đơn vị và tính toán | Cơ bản |
| DL-02 | Đơn vị đo diện tích | Cơ bản |
| DL-03 | Đơn vị đo thể tích (cm³, dm³, m³, lít) và phép tính giữa các đơn vị | Cơ bản |
| DL-04 | Đơn vị đo thời gian; bốn phép tính với số đo thời gian | Cơ bản |
| DL-05 | Tỉ lệ bản đồ | Nâng cao |
| DL-06 | Bài toán thực tế về tiền tệ, hóa đơn, đơn giá | Cơ bản |

### 4.6. TD — Toán tư duy và suy luận logic (6 chuyên đề)

| Mã | Chuyên đề | Mức độ |
|---|---|---|
| TD-01 | Suy luận logic: lập bảng đúng/sai, phương pháp loại trừ | Nâng cao |
| TD-02 | Bài toán đếm: số cách chọn, đếm hình, đếm đoạn thẳng | Nâng cao |
| TD-03 | Nguyên lý Dirichlet ở mức tiểu học ("nguyên lý chuồng thỏ") | Nâng cao |
| TD-04 | Bài toán cân, đong, chia phần | Nâng cao |
| TD-05 | Quy luật hình, dãy hình, toán vui | Nâng cao |
| TD-06 | Bài toán yêu cầu lập luận/chứng minh — dành cho phần tự luận | Nâng cao |

### 4.7. Mục tiêu khối lượng nội dung

| Loại nội dung | Mục tiêu cho bản đầy đủ | Ưu tiên xây trước |
|---|---|---|
| Bài học lý thuyết | 1 bài/chuyên đề × 57 chuyên đề | Nhóm DH (dạng điển hình) — chiếm tỷ trọng lớn nhất trong đề |
| Bài tập luyện | 12–15 bài/chuyên đề (~700–850 bài) | DH-01→03, DH-06→09, PS-09, HH-03/04/09, SH-04/05/09 |
| Bài tự luận có lời giải mẫu | 3–5 bài/chuyên đề nâng cao (~120 bài) | TD-06, DH-08, DH-11, DH-12, HH-09, HH-10 |
| Đề thi thử hoàn chỉnh | Tối thiểu 6 đề (2 đề/mỗi cấu hình ở Mục 5.2) | Cấu hình "điền đáp số 20 câu/60 phút" trước |

---

## 5. Khảo sát cấu trúc đề thực tế (căn cứ thiết kế module Thi thử)

### 5.1. Ghi nhận từ khảo sát nguồn mở

| Trường | Cấu trúc ghi nhận |
|---|---|
| Archimedes | Khoảng 50 câu trắc nghiệm/điền đáp số trong 60 phút; năm 2025 thời gian môn Toán điều kiện tăng lên 75 phút. Độ khó trải từ cơ bản đến nâng cao |
| Lương Thế Vinh | Khoảng 20 câu điền đáp số trong 60 phút; cấu trúc ổn định qua các năm |
| Ngôi Sao Hà Nội | Khoảng 12 câu, trong đó ~10 câu điền đáp số và ~2 câu tự luận |
| Cầu Giấy | Gồm phần trắc nghiệm và phần tự luận; độ khó được đánh giá tương đương Nguyễn Tất Thành |

*Nguồn: tổng hợp từ các bài phân tích công khai của bên thứ ba (xem Phụ lục). Số liệu có thể thay đổi theo từng năm — cần đối chiếu lại trước mỗi mùa tuyển sinh.*

### 5.2. Ba cấu hình đề thi thử cần hỗ trợ

| Mã cấu hình | Mô tả | Thành phần |
|---|---|---|
| `SPRINT` | Nhiều câu, thời gian rất ngắn — rèn tốc độ | 50 câu / 60 phút, toàn bộ trắc nghiệm + điền đáp số |
| `STANDARD` | Cấu hình phổ biến nhất | 20 câu điền đáp số / 60 phút |
| `MIXED` | Có phần tự luận | 10 câu điền đáp số + 2 câu tự luận / 60 phút |

> **Lưu ý cho Claude Code:** cấu hình đề phải được khai báo bằng **dữ liệu cấu hình**, không hard-code trong logic, để thêm cấu hình mới (khi cấu trúc đề của trường thay đổi) chỉ cần sửa dữ liệu.

---

## 6. Yêu cầu người dùng (URD)

| Mã | Yêu cầu người dùng | Vai trò | Ưu tiên |
|---|---|---|---|
| YC-01 | Là học sinh, tôi muốn học phương pháp giải của từng chuyên đề trước khi làm bài, để hiểu cách làm chứ không mò đáp án | Học sinh | Cao |
| YC-02 | Là học sinh, tôi muốn xem lời giải chi tiết từng bước khi làm sai, không chỉ biết đáp số đúng là bao nhiêu | Học sinh | Cao |
| YC-03 | Là học sinh, tôi muốn luyện riêng một chuyên đề mà tôi đang yếu | Học sinh | Cao |
| YC-04 | Là học sinh, tôi muốn tự nhập đáp số như khi thi thật, chứ không chỉ chọn A/B/C/D | Học sinh | Cao |
| YC-05 | Là học sinh, tôi muốn làm bài tự luận và xem lời giải mẫu để tự đối chiếu cách trình bày | Học sinh | Cao |
| YC-06 | Là học sinh, tôi muốn thi thử đúng áp lực thời gian như đề thật của trường tôi nhắm tới | Học sinh | Cao |
| YC-07 | Là học sinh, tôi muốn làm lại những câu tôi từng làm sai | Học sinh | Cao |
| YC-08 | Là học sinh, tôi muốn biết mình mạnh/yếu ở chuyên đề nào một cách trực quan | Học sinh | Cao |
| YC-09 | Là học sinh, tôi muốn được gợi ý nên ôn gì tiếp theo thay vì tự chọn ngẫu nhiên | Học sinh | Cao |
| YC-10 | Là học sinh, tôi muốn làm bài kiểm tra đầu vào để ứng dụng biết trình độ hiện tại của tôi | Học sinh | Trung bình |
| YC-11 | Là học sinh, tôi muốn thấy điểm thi thử của mình tiến bộ dần theo thời gian | Học sinh | Trung bình |
| YC-12 | Là phụ huynh, tôi muốn xem tổng quan tiến trình của con, gồm cả chuyên đề con đang yếu | Phụ huynh | Cao |
| YC-13 | Là phụ huynh, tôi muốn chắc chắn ứng dụng không thu thập thông tin cá nhân của con | Phụ huynh | Cao |
| YC-14 | Là học sinh, tôi muốn công thức và phân số hiển thị đúng như trong sách, dễ đọc | Học sinh | Cao |
| YC-15 | *(Chỉ nếu chọn kiến trúc có backend)* Là giáo viên, tôi muốn giao chuyên đề cho lớp và xem ai yếu ở đâu | Giáo viên | Trung bình |

---

## 7. Yêu cầu chức năng theo module

### 7.1. Module Lý thuyết

| Mã | Yêu cầu chức năng | Truy vết |
|---|---|---|
| FR-L01 | Hiển thị danh sách 57 chuyên đề nhóm theo 6 nhóm (SH, PS, DH, HH, DL, TD), mỗi chuyên đề có nhãn mức độ (Cơ bản/Nâng cao) và trạng thái: Chưa học / Đang học / Đã nắm | YC-01, YC-08 |
| FR-L02 | Mỗi chuyên đề có trang bài học gồm: giải thích phương pháp, khối công thức/quy tắc trọng tâm hiển thị nổi bật, 2–3 ví dụ mẫu có lời giải từng bước, mục "lỗi thường gặp" | YC-01 |
| FR-L03 | Lời giải trong ví dụ mẫu hiển thị theo từng bước có đánh số, mỗi bước có một câu diễn giải lý do — không chỉ liệt kê phép tính | YC-01, YC-02 |
| FR-L04 | Cuối mỗi bài học có 3–5 câu kiểm tra nhanh; đạt từ 80% trở lên mới đánh dấu chuyên đề là "Đã nắm" | YC-01 |
| FR-L05 | Cho phép mở lại bài lý thuyết của chuyên đề tương ứng ngay từ màn hình làm bài tập, khi học sinh làm sai và muốn xem lại phương pháp | YC-01, YC-02 |

### 7.2. Module Luyện tập

| Mã | Yêu cầu chức năng | Truy vết |
|---|---|---|
| FR-P01 | Mỗi bài tập được gắn: mã chuyên đề (bắt buộc, ít nhất 1), mức độ (Cơ bản/Nâng cao), và loại đáp án (`mcq` / `numeric` / `essay`) | YC-03, YC-08 |
| FR-P02 | Hỗ trợ đầy đủ ba loại đáp án theo đặc tả Mục 8 | YC-04, YC-05 |
| FR-P03 | Cho phép chọn luyện theo một hoặc nhiều chuyên đề, có thể lọc thêm theo mức độ | YC-03 |
| FR-P04 | Sau mỗi câu, hiển thị kết quả đúng/sai và **lời giải chi tiết từng bước** (bắt buộc với mọi bài, không chỉ bài khó) | YC-02 |
| FR-P05 | Lưu lại mọi câu học sinh làm sai vào một "sổ lỗi"; cung cấp chế độ luyện lại riêng các câu trong sổ lỗi | YC-07 |
| FR-P06 | Một câu được xóa khỏi sổ lỗi khi học sinh làm đúng câu đó 2 lần liên tiếp ở các lần luyện lại sau đó | YC-07 |
| FR-P07 | Với bài tự luận: hiển thị khung nhập/ghi chú cho học sinh, sau đó hiển thị lời giải mẫu và bảng tiêu chí tự đánh giá (xem Mục 8.3) | YC-05 |

### 7.3. Module Thi thử

| Mã | Yêu cầu chức năng | Truy vết |
|---|---|---|
| FR-T01 | Cho phép chọn một trong ba cấu hình đề (`SPRINT`, `STANDARD`, `MIXED` — Mục 5.2); cấu hình khai báo bằng dữ liệu, không hard-code | YC-06 |
| FR-T02 | Sinh đề ngẫu nhiên theo tỷ trọng chuyên đề khai báo trong cấu hình, đảm bảo đúng tổng số câu và đúng tỷ lệ loại đáp án | YC-06 |
| FR-T03 | Hiển thị đồng hồ đếm ngược; cảnh báo trực quan khi còn dưới 5 phút; tự động nộp bài khi hết giờ | YC-06 |
| FR-T04 | Cho phép di chuyển tự do giữa các câu qua bảng số thứ tự, đánh dấu câu đã làm/chưa làm/đánh dấu xem lại | YC-06 |
| FR-T05 | Trong lúc thi, **không** hiển thị đáp án hay phản hồi đúng/sai (khác với module Luyện tập) | YC-06 |
| FR-T06 | Sau khi nộp: chấm tự động phần `mcq` và `numeric`; với phần `essay` hiển thị lời giải mẫu để học sinh tự đối chiếu và tự chấm theo thang điểm gợi ý | YC-05, YC-06 |
| FR-T07 | Trang kết quả hiển thị: điểm tổng, thời gian đã dùng, điểm theo từng nhóm chuyên đề, và bảng xem lại từng câu kèm lời giải | YC-06, YC-08 |
| FR-T08 | Lưu lịch sử mọi lần thi thử; hiển thị biểu đồ xu hướng điểm số theo thời gian | YC-11 |

### 7.4. Module Hồ sơ & Lộ trình

| Mã | Yêu cầu chức năng | Truy vết |
|---|---|---|
| FR-H01 | Khi dùng lần đầu, đề xuất bài kiểm tra đầu vào ~30 câu phủ đều 6 nhóm chuyên đề, để khởi tạo bản đồ năng lực | YC-10 |
| FR-H02 | Nếu học sinh bỏ qua kiểm tra đầu vào, đặt mọi chuyên đề ở trạng thái "chưa có dữ liệu" và đề xuất lộ trình mặc định theo thứ tự chuyên đề nền tảng trước (Cơ bản trước Nâng cao) | YC-10 |
| FR-H03 | Tính **mức độ thành thạo** cho từng chuyên đề dựa trên độ chính xác các lần làm gần nhất, có trọng số ưu tiên lần làm gần đây. **Công thức cụ thể cần xác nhận khi triển khai — xem Mục 17** | YC-08 |
| FR-H04 | Phân loại thành 3 mức hiển thị: **Cần ôn lại** / **Đang tiến bộ** / **Thành thạo**. Ngưỡng cụ thể cần xác nhận — xem Mục 17 | YC-08 |
| FR-H05 | Hiển thị bản đồ năng lực trực quan theo 6 nhóm chuyên đề, dùng màu thể hiện 3 mức thành thạo | YC-08 |
| FR-H06 | Trên trang chủ, đề xuất tối đa 3 hành động tiếp theo cụ thể (ví dụ: "Học lý thuyết DH-09 — Toán công việc chung" hoặc "Luyện 10 bài HH-09"), ưu tiên chuyên đề có mức thành thạo thấp nhất **trong số các chuyên đề đã từng luyện ít nhất một lần** | YC-09 |
| FR-H07 | Chuyên đề chưa từng luyện không bị coi là "yếu"; được đưa vào gợi ý theo lộ trình nền tảng mặc định (FR-H02) | YC-09 |
| FR-H08 | Nếu sổ lỗi (FR-P05) có trên một ngưỡng số câu, ưu tiên đề xuất "luyện lại câu sai" lên đầu danh sách gợi ý | YC-07, YC-09 |
| FR-H09 | Trang tổng quan cho phụ huynh: số buổi học trong tuần, xu hướng điểm thi thử, 2–3 chuyên đề yếu nhất, diễn đạt bằng ngôn ngữ dễ hiểu không dùng thuật ngữ kỹ thuật | YC-12 |
| FR-H10 | Hiển thị lý do của mỗi gợi ý (ví dụ: "vì con đúng 3/10 bài gần nhất ở chuyên đề này") | YC-09 |
| FR-H11 | *(Chỉ nếu có backend)* Giao diện giáo viên: tạo lớp, giao chuyên đề, xem bảng tổng hợp mức thành thạo cả lớp | YC-15 |

---

## 8. Yêu cầu đặc thù môn Toán — nhập đáp án và hiển thị công thức

> **Đây là phần quan trọng nhất về mặt kỹ thuật.** Sai sót ở đây gây hậu quả trực tiếp: học sinh làm đúng nhưng bị chấm sai sẽ mất niềm tin vào ứng dụng.

### 8.1. Hiển thị công thức toán học

| Mã | Yêu cầu |
|---|---|
| FR-M01 | Phân số, lũy thừa, căn, ký hiệu hình học phải hiển thị đúng chuẩn toán học (không viết `1/2` dạng văn bản thuần khi đang trình bày phân số trong công thức) |
| FR-M02 | Sử dụng một thư viện render công thức (khuyến nghị **KaTeX** vì nhẹ và render nhanh hơn MathJax — phù hợp NFR-01); nội dung lưu dưới dạng LaTeX trong dữ liệu |
| FR-M03 | Công thức phải hiển thị đúng trên màn hình hẹp 360px, không tràn ngang; công thức dài cho phép cuộn ngang trong khối riêng |
| FR-M04 | Hình vẽ hình học (nếu có) dùng SVG nội tuyến, không dùng ảnh bitmap, để hiển thị sắc nét ở mọi độ phân giải và nhẹ dung lượng |

### 8.2. Chấm đáp số tự nhập (`numeric`) — đặc tả chi tiết

Đây là loại câu chiếm tỷ trọng lớn nhất trong đề thi thật, nên bộ chấm phải xử lý đúng các trường hợp sau:

| Mã | Yêu cầu |
|---|---|
| FR-M05 | **Dấu thập phân**: chấp nhận cả dấu phẩy (chuẩn Việt Nam, ví dụ `4,65`) và dấu chấm (`4.65`) là tương đương |
| FR-M06 | **Phân số và số thập phân tương đương**: `1/2`, `0,5`, `0.5` phải được chấm là cùng một đáp án, trừ khi đề yêu cầu rõ dạng trình bày |
| FR-M07 | **Phân số chưa tối giản**: `2/4` được chấp nhận là đúng khi đáp án là `1/2`, trừ khi đề yêu cầu rõ "rút gọn tối giản" |
| FR-M08 | **Hỗn số**: chấp nhận dạng `1 1/2` và `3/2` là tương đương |
| FR-M09 | **Khoảng trắng và dấu phân cách hàng nghìn**: `1 000`, `1.000`, `1000` được coi là như nhau khi đáp án là số nguyên |
| FR-M10 | **Đơn vị đo**: mỗi câu khai báo đơn vị kỳ vọng; học sinh nhập kèm đơn vị đúng vẫn được chấp nhận (`5 cm` = `5` khi đơn vị đã ghi trong đề). Nếu nhập **sai** đơn vị thì tính là sai, kèm thông báo giải thích |
| FR-M11 | **Sai số cho phép**: mỗi câu khai báo `tolerance`; mặc định là 0 (khớp tuyệt đối). Với bài liên quan số pi hoặc phép chia không hết, đặt `tolerance` phù hợp và ghi rõ trong đề yêu cầu làm tròn đến đâu |
| FR-M12 | **Nhiều đáp án đúng**: hỗ trợ câu có nhiều đáp số hợp lệ (ví dụ "tìm các số palindrome thỏa mãn"), khai báo dạng danh sách; chấm đúng khi học sinh liệt kê đủ và không thừa |
| FR-M13 | **Đáp án âm và số 0**: xử lý đúng dấu âm; không nhầm chuỗi rỗng với số 0 |
| FR-M14 | Khi chấm sai do lỗi định dạng nhập (ví dụ nhập chữ vào ô số), hiển thị thông báo hướng dẫn thay vì tính là làm sai |

> **Yêu cầu kiểm thử bắt buộc:** bộ chấm `numeric` phải có bộ unit test phủ **toàn bộ** các trường hợp FR-M05 → FR-M14 trước khi module Luyện tập được coi là hoàn thành.

### 8.3. Bài tự luận (`essay`)

| Mã | Yêu cầu |
|---|---|
| FR-M15 | Cung cấp khung nhập văn bản để học sinh trình bày lời giải (hoặc ghi chú tóm tắt nếu làm ra giấy nháp) |
| FR-M16 | Sau khi học sinh xác nhận đã làm xong, hiển thị **lời giải mẫu đầy đủ từng bước** |
| FR-M17 | Hiển thị **bảng tiêu chí tự chấm** gồm các mốc chấm điểm cụ thể của bài đó (ví dụ: "Nêu đúng mối quan hệ giữa hai đại lượng — 1 điểm"; "Tính đúng đáp số — 1 điểm"), để học sinh/phụ huynh tự cho điểm |
| FR-M18 | Điểm tự chấm được lưu vào hồ sơ nhưng **đánh dấu rõ là điểm tự đánh giá**, và **không** dùng để tính mức độ thành thạo tự động (FR-H03) nhằm tránh làm sai lệch bản đồ năng lực |
| FR-M19 | Ứng dụng **không** chấm điểm tự luận tự động ở phiên bản v1.0 (xem Mục 15) |

---

## 9. Yêu cầu phi chức năng (NFR)

| Mã | Yêu cầu | Chỉ tiêu đo được |
|---|---|---|
| NFR-01 | Phản hồi giao diện nhanh | Chuyển màn hình và chấm câu trả lời dưới 150ms; render công thức không gây nhấp nháy bố cục |
| NFR-02 | Tương thích thiết bị | Bố cục đúng từ 360px đến 1440px; công thức và hình vẽ không tràn ngang |
| NFR-03 | Bảo vệ dữ liệu trẻ em | Không thu thập tên thật, số điện thoại, địa chỉ, hình ảnh cá nhân — kể cả khi có backend |
| NFR-04 | Khả năng tiếp cận | Thao tác được bằng bàn phím; ô nhập đáp số hỗ trợ bàn phím số trên di động (`inputmode="decimal"`); tôn trọng cài đặt giảm chuyển động |
| NFR-05 | Độ bền dữ liệu | Tiến trình, sổ lỗi và lịch sử thi thử không mất khi đóng/mở lại ứng dụng |
| NFR-06 | Khả năng mở rộng nội dung | Thêm chuyên đề/bài tập/đề thi mới chỉ cần thêm dữ liệu đúng schema, không sửa logic hiển thị |
| NFR-07 | Tính đúng đắn nội dung | 100% bài tập trong ngân hàng có lời giải đã qua kiểm chứng (xem Mục 13, Giai đoạn 7) |
| NFR-08 | Minh bạch thuật toán gợi ý | Học sinh/phụ huynh xem được lý do một chuyên đề được đề xuất (FR-H10) |
| NFR-09 | Tính đa dạng đề thi thử | Với cùng cấu hình, xác suất trùng đề hoàn toàn giữa hai lần sinh liên tiếp dưới 1% |

---

## 10. Kiến trúc kỹ thuật — HAI QUYẾT ĐỊNH CHƯA CHỐT

### 10.1. QĐ-1: Ứng dụng độc lập hay dùng chung nền tảng với ứng dụng Tiếng Anh?

Một URD cho ứng dụng Tiếng Anh cùng đối tượng học sinh đã được soạn trước đó. Hai hướng:

**Hướng 1 — Hai ứng dụng độc lập hoàn toàn**

| | |
|---|---|
| Ưu điểm | Triển khai nhanh nhất; không phụ thuộc tiến độ ứng dụng kia; mỗi ứng dụng tối ưu riêng cho đặc thù môn học (Toán cần render công thức, Tiếng Anh cần flashcard) |
| Nhược điểm | Học sinh phải mở hai ứng dụng riêng; phụ huynh xem tiến trình ở hai nơi; trùng lặp công sức xây dựng module Hồ sơ/Lộ trình và bộ engine tính mức thành thạo |

**Hướng 2 — Chung nền tảng (monorepo, dùng chung hồ sơ học sinh và engine lộ trình)**

| | |
|---|---|
| Ưu điểm | Một hồ sơ duy nhất cho học sinh; trang tổng quan phụ huynh thấy cả hai môn; engine tính mức thành thạo và giao diện chung viết một lần dùng cho cả hai; dễ mở rộng sang môn Tiếng Việt sau này |
| Nhược điểm | Thời gian thiết lập ban đầu lâu hơn; cần thiết kế lớp trừu tượng đủ tổng quát cho hai môn có bản chất rất khác nhau; nếu ứng dụng Tiếng Anh chưa xây thì phải quyết định kiến trúc chung cho cả hai ngay từ đầu |

### 10.2. QĐ-2: Client-side thuần hay có backend?

**Phương án A — Client-side thuần**

| | |
|---|---|
| Lưu trữ | IndexedDB (khuyến nghị thay vì localStorage, do dữ liệu lịch sử làm bài và sổ lỗi có thể lớn) |
| Stack đề xuất | React + TypeScript + Vite + KaTeX |
| Ưu điểm | Hosting tĩnh gần như miễn phí; không rủi ro bảo mật phía máy chủ; hoạt động offline sau lần tải đầu |
| Nhược điểm | Không đồng bộ đa thiết bị; không có vai trò Giáo viên (FR-H11); mất dữ liệu nếu xóa bộ nhớ trình duyệt |

**Phương án B — Có backend**

| | |
|---|---|
| Lưu trữ | PostgreSQL hoặc SQLite |
| Stack đề xuất | Next.js + TypeScript + Prisma + KaTeX |
| Ưu điểm | Đồng bộ đa thiết bị; hỗ trợ vai trò Giáo viên; sẵn nền tảng nếu sau này muốn chấm tự luận bằng AI |
| Nhược điểm | Cần vận hành máy chủ/CSDL; triển khai ban đầu lâu hơn; cần thiết kế xác thực dù ở mức tối giản |

### 10.3. Bảng so sánh nhanh QĐ-2

| Tiêu chí | Phương án A | Phương án B |
|---|---|---|
| Thời gian ra MVP | Nhanh | Chậm hơn |
| Chi phí vận hành | ~0đ | Có chi phí máy chủ/CSDL |
| Đồng bộ đa thiết bị | Không | Có |
| Vai trò Giáo viên (FR-H11) | Không khả thi | Khả thi |
| Sẵn sàng chấm tự luận bằng AI (tương lai) | Cần thêm lớp gọi API | Có sẵn |

### 10.4. Ràng buộc giữa hai quyết định

- Nếu chọn **QĐ-1 Hướng 2** (chung nền tảng), thì QĐ-2 phải **giống hệt** với lựa chọn của ứng dụng Tiếng Anh — không thể một ứng dụng có backend còn ứng dụng kia không.
- Nếu chọn **QĐ-1 Hướng 1** (độc lập), hai ứng dụng có thể chọn kiến trúc khác nhau, nhưng nên thống nhất stack để tái sử dụng kinh nghiệm và component.
- Vai trò Giáo viên (FR-H11, YC-15) chỉ khả thi khi QĐ-2 = Phương án B, bất kể QĐ-1 chọn hướng nào.

### 10.5. Khuyến nghị (không phải quyết định cuối)

Khuyến nghị: **QĐ-1 Hướng 1 (độc lập) + QĐ-2 Phương án A (client-side)** cho phiên bản đầu, nhưng bắt buộc thiết kế **lớp truy cập dữ liệu trừu tượng** (`ProgressStore`, `ContentStore`, `MasteryEngine`) thay vì gọi thẳng IndexedDB rải rác trong code. Lý do:

- Ra được bản dùng thử nhanh, kiểm chứng nội dung Toán có đúng và đủ không — đây mới là rủi ro lớn nhất của dự án này, không phải rủi ro kỹ thuật;
- `MasteryEngine` viết tách biệt sẽ tái sử dụng được nguyên vẹn nếu sau này gộp nền tảng với ứng dụng Tiếng Anh;
- Chuyển sang Phương án B về sau chỉ cần viết implementation mới cho các interface đó.

**Đây là khuyến nghị, không phải quyết định.** Claude Code cần xác nhận với người dùng trước khi khởi tạo dự án.

---

## 11. Mô hình dữ liệu (logic, áp dụng cho mọi phương án)

| Thực thể | Trường chính | Ghi chú |
|---|---|---|
| `Topic` (Chuyên đề) | `id` (SH-xx/PS-xx/DH-xx/HH-xx/DL-xx/TD-xx), `group`, `title`, `level`, `lesson`, `formulas[]`, `examples[]`, `commonMistakes[]` | Nguồn cho Module Lý thuyết |
| `Exercise` (Bài tập) | `id`, `topicIds[]`, `level`, `answerType` (`mcq`\|`numeric`\|`essay`), `statement` (hỗ trợ LaTeX), `figure` (SVG, tùy chọn), `solutionSteps[]` | `solutionSteps` bắt buộc với mọi loại |
| `McqAnswer` | `options[4]`, `answerIndex` | |
| `NumericAnswer` | `acceptedValues[]`, `unit`, `tolerance`, `requireSimplified` (bool), `requireExactForm` (bool) | Phục vụ FR-M05 → FR-M14 |
| `EssayAnswer` | `modelSolution`, `rubric[]` (danh sách mốc chấm điểm + điểm tương ứng) | Phục vụ FR-M15 → FR-M18 |
| `TestConfig` (Cấu hình đề) | `id` (`SPRINT`/`STANDARD`/`MIXED`), `totalQuestions`, `durationMinutes`, `topicWeights{}`, `answerTypeRatio{}` | Khai báo bằng dữ liệu (FR-T01) |
| `Attempt` (Lượt làm bài) | `exerciseId`, `correct` (bool), `userAnswer`, `timeSpent`, `timestamp`, `context` (`practice`\|`test`\|`diagnostic`) | Nguồn tính mức thành thạo; cần lưu đủ lịch sử để tính trọng số theo thời gian |
| `ErrorLogEntry` (Sổ lỗi) | `exerciseId`, `addedAt`, `consecutiveCorrect` | Phục vụ FR-P05, FR-P06 |
| `TestResult` (Kết quả thi thử) | `configId`, `date`, `autoScore`, `selfScore`, `total`, `byTopicGroup{}`, `durationUsed` | `selfScore` tách riêng khỏi `autoScore` (FR-M18) |
| `MasterySnapshot` | `topicId`, `masteryScore`, `level`, `lastUpdated` | Tính từ `Attempt`; nên cache nếu tính toán nặng |
| `LearnerProfile` | `alias` (biệt danh, không phải tên thật), `targetSchoolConfig` (tùy chọn), `createdAt` | Có backend: thêm `classCode` nếu dùng vai trò Giáo viên |

---

## 12. Cấu trúc thư mục dự án đề xuất

```
project-root/
├── URD-ung-dung-on-luyen-toan-vao-6.md      ← chính tài liệu này
├── src/
│   ├── content/
│   │   ├── topics/          # bài học lý thuyết theo mã chuyên đề
│   │   ├── exercises/       # ngân hàng bài tập, chia theo nhóm SH/PS/DH/HH/DL/TD
│   │   ├── figures/         # hình vẽ SVG dùng chung
│   │   └── test-configs/    # cấu hình đề SPRINT / STANDARD / MIXED
│   ├── modules/
│   │   ├── theory/          # Module Lý thuyết
│   │   ├── practice/        # Module Luyện tập (gồm sổ lỗi)
│   │   ├── mock-test/       # Module Thi thử
│   │   └── profile/         # Module Hồ sơ & Lộ trình
│   ├── core/
│   │   ├── answer-checker/  # bộ chấm numeric — FR-M05→M14, có unit test riêng
│   │   ├── mastery-engine/  # tính mức thành thạo — FR-H03, H04
│   │   └── test-generator/  # sinh đề ngẫu nhiên theo tỷ trọng — FR-T02
│   ├── data-access/         # interface ProgressStore / ContentStore (Mục 10.5)
│   │   ├── local/           # implementation Phương án A
│   │   └── remote/          # implementation Phương án B (nếu chọn)
│   ├── components/          # UI dùng chung, gồm MathRenderer (KaTeX)
│   └── app/                 # điểm khởi chạy, định tuyến
├── tests/
│   ├── unit/                # answer-checker, mastery-engine, test-generator
│   ├── content/             # kiểm chứng tính đúng đắn nội dung (Mục 13, GĐ 7)
│   └── e2e/                 # kịch bản Playwright mô phỏng học sinh
└── docs/
    └── adr/                 # ghi các quyết định kiến trúc phát sinh
```

---

## 13. Kế hoạch xây dựng theo giai đoạn

| GĐ | Nội dung | Điều kiện hoàn thành |
|---|---|---|
| 0 | Xác nhận QĐ-1 và QĐ-2 (Mục 10) với người dùng; khởi tạo dự án, cấu trúc thư mục, tích hợp KaTeX | Dự án chạy được, render thử một công thức phân số đúng |
| 1 | Xây `core/answer-checker` **trước tiên**, kèm bộ unit test phủ FR-M05→FR-M14 | Toàn bộ unit test xanh — đây là điều kiện tiên quyết cho mọi module sau |
| 2 | Module Luyện tập với nội dung mẫu (2–3 chuyên đề), đủ cả 3 loại đáp án | Làm được bài `mcq`, `numeric`, `essay`; lời giải từng bước hiển thị đúng |
| 3 | Module Lý thuyết cho cùng 2–3 chuyên đề mẫu, gồm quiz cuối bài | Học xong 1 bài, làm quiz, trạng thái chuyên đề chuyển sang "Đã nắm" |
| 4 | Module Thi thử: `test-generator` + đồng hồ + chấm + trang kết quả | Thi thử được cả 3 cấu hình đề; hết giờ tự nộp đúng |
| 5 | Module Hồ sơ & Lộ trình: `mastery-engine`, bản đồ năng lực, gợi ý, sổ lỗi | Gợi ý hiển thị đúng logic với dữ liệu giả lập |
| 6 | Mở rộng nội dung đạt mục tiêu ở Mục 4.7, ưu tiên theo thứ tự đã nêu | Đạt tối thiểu khối lượng đã đặt ra |
| 7 | **Kiểm chứng tính đúng đắn nội dung**: rà soát toàn bộ đáp án và lời giải | Xem quy trình bắt buộc bên dưới |
| 8 | *(Nếu Phương án B)* Vai trò Giáo viên (FR-H11) | Giáo viên tạo lớp, giao chuyên đề, xem tổng hợp |

### Quy trình bắt buộc cho Giai đoạn 7 — kiểm chứng nội dung

Với môn Toán, lời giải sai gây hại trực tiếp. Áp dụng ba lớp kiểm tra:

1. **Kiểm tra tự động**: viết script xác minh mọi bài `numeric` có `acceptedValues` hợp lệ, mọi bài `mcq` có đúng 4 lựa chọn và chỉ số đáp án hợp lệ, mọi bài đều có `solutionSteps` không rỗng.
2. **Kiểm tra chéo bằng phiên độc lập**: mở một phiên làm việc mới **không mang theo lịch sử soạn đề**, yêu cầu giải lại toàn bộ bài tập từ đầu và đối chiếu với đáp án đã lưu. Mọi điểm lệch phải được rà soát thủ công.
3. **Rà soát bởi giáo viên Toán tiểu học**: chốt kiểm soát bắt buộc trước khi đưa vào sử dụng thật. Không bỏ qua bước này ngay cả khi hai lớp trên đã sạch.

---

## 14. Tiêu chí nghiệm thu (Definition of Done cho v1.0)

- [ ] Bộ chấm `numeric` vượt toàn bộ unit test phủ FR-M05 → FR-M14
- [ ] Học sinh học được lý thuyết và làm quiz cho toàn bộ 57 chuyên đề
- [ ] Luyện tập được theo chuyên đề, với cả ba loại đáp án, mọi bài có lời giải từng bước
- [ ] Sổ lỗi hoạt động: tự thêm câu sai, tự xóa sau 2 lần đúng liên tiếp
- [ ] Thi thử được cả 3 cấu hình đề, có tính giờ, tự nộp khi hết giờ, có trang kết quả và xem lại
- [ ] Bản đồ năng lực và gợi ý "nên học gì tiếp theo" hoạt động đúng logic đã đặc tả
- [ ] Biểu đồ xu hướng điểm thi thử theo thời gian hiển thị đúng
- [ ] Công thức và hình vẽ hiển thị đúng trên màn hình 360px
- [ ] Không có trường thu thập thông tin định danh cá nhân của học sinh
- [ ] Đạt tối thiểu khối lượng nội dung ở Mục 4.7
- [ ] Hoàn thành cả 3 lớp kiểm chứng nội dung ở Giai đoạn 7

---

## 15. Ngoài phạm vi phiên bản v1.0

- Chấm điểm tự động bài tự luận bằng AI (chỉ hiển thị lời giải mẫu + tiêu chí tự chấm)
- Nhận diện chữ viết tay hoặc chụp ảnh bài làm để chấm
- Công cụ vẽ hình/nháp trên màn hình
- Ứng dụng di động native (chỉ web, responsive)
- Thông báo đẩy nhắc lịch học
- Nội dung môn Tiếng Việt (nếu cần, mở URD riêng theo cùng khuôn mẫu)

---

## 16. Giả định và rủi ro

| Giả định / Rủi ro | Ảnh hưởng | Ghi chú |
|---|---|---|
| Toàn bộ bài tập và lời giải là biên soạn mới, không sao chép đề thi thật | Cao | Bắt buộc để tránh vi phạm bản quyền và tránh gây hiểu nhầm là đề chính thức |
| **Lời giải sai lọt vào ngân hàng nội dung** | **Rất cao** | Rủi ro lớn nhất của dự án — bắt buộc thực hiện đủ 3 lớp kiểm chứng ở Giai đoạn 7 |
| Bộ chấm đáp số không xử lý hết các dạng nhập hợp lệ | Cao | Học sinh làm đúng bị báo sai sẽ mất niềm tin — do đó Giai đoạn 1 xây bộ chấm trước tiên |
| Công thức tính mức thành thạo và ngưỡng phân loại chưa được xác nhận | Cao | Xem Mục 17 |
| Chưa chốt QĐ-1 và QĐ-2 | Cao | Phải chốt trước khi khởi tạo dự án |
| Cấu trúc đề các trường thay đổi theo năm | Trung bình | Đã giảm thiểu bằng cách khai báo cấu hình đề dạng dữ liệu (FR-T01) |

---

## 17. Câu hỏi còn mở — cần xác nhận với chủ dự án

1. **Công thức tính mức độ thành thạo (FR-H03):** đề xuất mặc định nếu không có chỉ định khác — trung bình có trọng số của N lượt làm gần nhất (N = 10) theo từng chuyên đề, lượt gần đây trọng số cao hơn; cần tối thiểu bao nhiêu lượt mới bắt đầu tính (đề xuất: 3 lượt)?
2. **Ngưỡng phân loại 3 mức (FR-H04):** đề xuất mặc định — dưới 50% = Cần ôn lại, 50–80% = Đang tiến bộ, trên 80% = Thành thạo.
3. **Ngưỡng ưu tiên sổ lỗi (FR-H08):** khi sổ lỗi có bao nhiêu câu thì đẩy "luyện lại câu sai" lên đầu gợi ý (đề xuất: 10 câu)?
4. **Trường mục tiêu cụ thể:** có nhắm tới một trường cụ thể để đặt cấu hình đề mặc định và điều chỉnh tỷ trọng chuyên đề, hay xây tổng quát cho nhiều trường?
5. **Mức độ ưu tiên giữa tốc độ ra bản dùng thử và độ đầy đủ nội dung:** ưu tiên có đủ 4 module chạy được với nội dung mẫu vài chuyên đề (theo Mục 13), hay ưu tiên nội dung đầy đủ cho một phạm vi module hẹp hơn?
6. **Nguồn kiểm chứng nội dung:** có sẵn giáo viên Toán tiểu học để thực hiện chốt kiểm soát ở Giai đoạn 7 hay không? Nếu không, cần bàn phương án thay thế trước khi bắt đầu xây nội dung quy mô lớn.

---

## Phụ lục — Nguồn tham khảo cấu trúc đề (đã khảo sát)

- Đánh giá mức độ khó đề thi Toán vào lớp 6 các trường chất lượng cao — CLB MathFun
- Hướng dẫn ôn luyện & bộ đề thi Toán vào lớp 6 trường Nguyễn Tất Thành — TAK12
- Thông tin tuyển sinh và bộ đề thi vào lớp 6 trường THCS Archimedes — TAK12
- Phân tích đề thi Toán vào lớp 6 trường THCS Cầu Giấy năm học 2025–2026 — MathX
- Tổng hợp đề thi vào lớp 6 các trường trọng điểm Hà Nội — Trường Toán MathX
- Các dạng Toán ôn thi vào lớp 6 — VietJack
- Những dạng Toán hay gặp trong đề ôn thi vào lớp 6 tại Hà Nội — Hòa Ma Toán
- Ôn luyện môn Toán thi vào 6: các chuyên đề và tài liệu ôn tập — Contuhoc

*Đây là các bài phân tích công khai của bên thứ ba, không phải đề thi chính thức của các trường. Số liệu về cấu trúc đề cần đối chiếu lại trước mỗi mùa tuyển sinh.*

— Hết tài liệu —
