# URD v2.0 — Ứng dụng Tổng hợp & Ôn luyện Toán vào lớp 6 Chất lượng cao

| | |
|---|---|
| **Loại tài liệu** | User Requirements Document — đặc tả để triển khai bằng Claude Code trong VS Code |
| **Sản phẩm** | Ứng dụng Lý thuyết + Luyện tập + Thi thử + Lộ trình + Hồ sơ, môn Toán, thi vào lớp 6 CLC (Hà Nội) |
| **Phiên bản** | **2.0** — thay thế hoàn toàn v1.0 |
| **Ngày soạn** | 14/08/2026 |
| **Thay đổi chính so với v1.0** | (1) Chuyên đề 57 → **67**, bổ sung theo rà soát giáo trình trung tâm (Mục 4); (2) Thang độ khó 2 mức → **4 mức**; (3) Thêm **Lộ trình học 4 giai đoạn** (Mục 7); (4) Thêm đặc tả **UI/UX** đầy đủ (Mục 11); (5) Thêm **Gamification** (Mục 12); (6) Thêm **Đồng bộ đa thiết bị** (Mục 13); (7) **Chốt stack công nghệ** theo ứng dụng Tiếng Anh đã chạy thực tế (Mục 15) |
| **Ứng dụng tham chiếu** | `github.com/haihttsdv-lang/on-luyen-tieng-anh-vao-6` — ứng dụng Tiếng Anh cùng tác giả, đã triển khai và vận hành thực tế. **Là nguồn tham chiếu bắt buộc** cho Mục 11, 12, 13, 15 |

---

## 0. Hướng dẫn dành cho Claude Code — đọc trước khi viết mã

1. **Đọc toàn bộ tài liệu này trước khi tạo bất kỳ tệp mã nào.**
2. **Có một ứng dụng tham chiếu đã chạy thực tế**: repo `on-luyen-tieng-anh-vao-6`. Trước khi tự thiết kế UI/UX, cơ chế đồng bộ, hệ thống mastery hay gamification, **hãy đọc mã nguồn và các ADR của repo đó** (`docs/adr/0001` → `0007`). Mục 11, 12, 13 của tài liệu này đặc tả những gì cần **giữ nguyên** và những gì cần **làm khác** cho môn Toán. Đừng phát minh lại — hãy tái sử dụng mô hình đã được kiểm chứng.
3. **Mục 10 (nhập/chấm đáp số) vẫn là phần đặc thù và rủi ro nhất của môn Toán.** Xây `answer-checker` **trước tiên**, kèm bộ unit test đầy đủ, trước mọi module giao diện (xem Mục 18, Giai đoạn 1).
4. **Chỉ còn 1 quyết định chưa chốt**: QĐ-1 ở Mục 15.1 (repo độc lập hay gộp chung với app Tiếng Anh). Stack công nghệ (QĐ-2 cũ) **đã được chốt** ở Mục 15.2 — không cần hỏi lại.
5. **Đề xuất kế hoạch trước khi sinh mã hàng loạt.** Trình bày cấu trúc thư mục và thứ tự xây dựng theo Mục 18, chờ xác nhận.
6. **Khi một yêu cầu chưa đủ rõ để cài đặt chính xác, hãy hỏi thay vì tự suy đoán** — đặc biệt với công thức mastery (FR-H03) và các ngưỡng số ở Mục 22.
7. **Toàn bộ nội dung là tài liệu biên soạn mới**, không sao chép nguyên văn đề thi thật hay giáo trình có bản quyền của bất kỳ trung tâm nào. Danh mục chuyên đề ở Mục 5 là **danh mục kiến thức** (không thuộc phạm vi bảo hộ), nội dung bài học và bài tập phải tự biên soạn.
8. **Lời giải sai gây hại trực tiếp cho học sinh.** Quy trình kiểm chứng 3 lớp ở Mục 18 (Giai đoạn 8) là bắt buộc, không được bỏ qua.

---

## 1. Bối cảnh và mục tiêu

Học sinh lớp 5 tại Hà Nội thi vào lớp 6 các trường CLC (Archimedes, Lương Thế Vinh, Nguyễn Tất Thành, Ngôi Sao Hà Nội, Cầu Giấy, Thanh Xuân, Marie Curie, Hà Nội – Amsterdam...) đối mặt với đề Toán rất khác bài kiểm tra trên lớp: áp lực thời gian cao, **định dạng điền đáp số chiếm chủ đạo**, độ khó trải rộng từ cơ bản đến vận dụng cao, và nhiều dạng toán điển hình không có trong sách giáo khoa.

Mục tiêu: một công cụ tự học toàn diện, **bám sát cách các trung tâm luyện thi uy tín tổ chức chương trình** (Mục 4), có lộ trình theo giai đoạn, phản hồi tức thì kèm lời giải từng bước, thi thử mô phỏng áp lực thật, và hồ sơ chỉ ra chính xác học sinh yếu chuyên đề nào.

---

## 2. Đối tượng người dùng

| Vai trò | Mô tả | Ghi chú |
|---|---|---|
| **Học sinh** | Người dùng chính, 10–11 tuổi, học trên cả điện thoại và máy tính, lượt học 15–30 phút | Bắt buộc |
| **Phụ huynh** | Thiết lập ban đầu, theo dõi tiến trình, hỗ trợ đối chiếu bài tự luận, in báo cáo | Bắt buộc |
| **Giáo viên/Trung tâm** | Giao chuyên đề theo lớp, xem tiến trình nhiều học sinh | Ngoài phạm vi v2.0 — xem Mục 20 |

---

## 3. Phạm vi sản phẩm — sáu trụ cột

| # | Trụ cột | Mô tả ngắn | Mục đặc tả |
|---|---|---|---|
| 1 | **Lý thuyết** | Bài học theo 67 chuyên đề, có công thức trọng tâm, ví dụ giải từng bước, lỗi thường gặp, quiz cuối bài | Mục 9.1 |
| 2 | **Luyện tập** | Ngân hàng bài tập 3 loại đáp án, lời giải từng bước, sổ lỗi, luyện theo chuyên đề | Mục 9.2 |
| 3 | **Thi thử** | 3 cấu hình đề mô phỏng các trường, tính giờ, chấm tự động + lời giải mẫu | Mục 9.3 |
| 4 | **Lộ trình học** | Kế hoạch 4 giai đoạn theo ngày, buổi học có cấu trúc, tự đánh giá kết quả | Mục 7, 9.4 |
| 5 | **Hồ sơ & Cá nhân hóa** | Bản đồ năng lực 67 chuyên đề, gợi ý học tiếp, báo cáo phụ huynh | Mục 9.5 |
| 6 | **Đồng bộ đa thiết bị** | Tiến độ tự chuyển giữa điện thoại và máy tính qua mã đồng bộ | Mục 13 |

---

## 4. Kết quả rà soát giáo trình các trung tâm luyện thi

### 4.1. Nguồn đã khảo sát

| Nguồn | Kết quả tra cứu |
|---|---|
| **MathExpress** (mathexpress.vn) | Có lớp **Tổng Ôn và Luyện Đề** riêng cho khối 5. Công bố **nguyên tắc tổ chức chương trình** nhưng không công khai danh mục chuyên đề chi tiết. Bốn nguyên tắc rút ra được và áp dụng vào tài liệu này: (a) **lộ trình cá nhân hóa, xếp lớp theo trình độ và nhóm trường mục tiêu**; (b) **phân loại bài tập theo 4 mức độ** nhận biết – thông hiểu – vận dụng – vận dụng cao; (c) **chấm–chữa và phân tích lỗi sai** sau mỗi buổi; (d) **kiểm tra khảo sát định kỳ** để điều chỉnh lộ trình. Có tổ chức kỳ thi thử tuyển sinh lớp 6 và xuất bản sách "Các dạng bài và đề thi vào lớp 6 các trường THCS Chất lượng cao" |
| **CMath** (cmath.edu.vn) | Chương trình công khai tập trung vào **Toán CLC/cận chuyên/chuyên lớp 6–8**, không phải luyện thi *vào* lớp 6. Nguyên tắc nêu công khai: giáo trình cập nhật theo từng năm, dạy **nhận dạng bài theo từng chuyên đề**, thiết lập chương trình theo hướng cá nhân hóa. **Không đối chiếu được danh mục chuyên đề chi tiết** cho kỳ thi vào 6 |
| **MathX** (mathx.vn) | Có phân tích đề thi từng trường theo năm (Cầu Giấy 2025–2026, Archimedes, Nguyễn Tất Thành, Năng khiếu ĐHSPHN...). Dùng làm nguồn đối chiếu **cấu trúc đề**, không có danh mục chuyên đề tổng thể |
| **TAK12** (tak12.com) | **Nguồn đối chiếu chính.** Có bài "Lộ trình ôn thi vào lớp 6 môn Toán dành cho học sinh lớp 5" với **danh mục chuyên đề tường minh, chia rõ hai nhóm trọng tâm và nâng cao**, cùng lộ trình 4 giai đoạn có mốc thời gian. Đây là nguồn công khai duy nhất so được từng đầu mục với Mục 5 của URD v1.0 |

> **Lý do chọn TAK12 làm nguồn đối chiếu chính:** đây là nguồn duy nhất công khai danh mục chuyên đề ở mức chi tiết từng dạng bài. MathExpress và CMath giữ giáo trình nội bộ (hợp lý về mặt kinh doanh), nên chỉ đối chiếu được ở tầng **nguyên tắc tổ chức chương trình**, không đối chiếu được tầng danh mục. Cách xử lý: lấy **danh mục** từ TAK12, lấy **nguyên tắc tổ chức** từ MathExpress/CMath — cả hai đều được áp dụng, ở hai tầng khác nhau.

### 4.2. Mười chuyên đề phát hiện còn thiếu so với URD v1.0

Đối chiếu danh mục TAK12 với 57 chuyên đề của v1.0, phát hiện 10 chuyên đề xuất hiện phổ biến trong tài liệu luyện thi nhưng **không có** trong v1.0:

| # | Chuyên đề còn thiếu | Mã mới | Vì sao quan trọng |
|---|---|---|---|
| 1 | Chữ số tận cùng (của tích, của biểu thức; đếm chữ số 0 tận cùng) | **SH-11** | Có ở cả nhóm trọng tâm lẫn nâng cao của TAK12 — dạng bài ăn điểm nhanh, xuất hiện đều |
| 2 | Dãy chữ và bài toán đánh số trang sách | **SH-12** | Dạng kinh điển trong đề CLC, v1.0 hoàn toàn không phủ |
| 3 | Bài toán trộn dung dịch/hỗn hợp và bài toán tươi–khô | **PS-11** | Dạng tỉ số phần trăm nâng cao đặc thù, khác hẳn ba bài toán phần trăm cơ bản |
| 4 | Bài toán tỉ lệ kép | **DH-15** | Nâng cao của tỉ lệ thuận/nghịch, v1.0 chỉ có tỉ lệ đơn |
| 5 | Bài toán giải bằng phương pháp khử | **DH-16** | Là một trong ba phương pháp giải đặc biệt (cùng giả thiết tạm và tính ngược), v1.0 thiếu đúng phương pháp này |
| 6 | Chuyển động đặc biệt: tàu hỏa (vật có chiều dài), lên/xuống dốc, vòng tròn, tiến–lùi | **DH-17** | TAK12 liệt kê 5 dạng chuyển động nâng cao; v1.0 chỉ phủ dòng nước và nhiều chặng |
| 7 | Bài toán sơn màu hình lập phương / hình hộp chữ nhật | **HH-12** | Dạng hình học không gian kết hợp đếm, rất hay ra, v1.0 không có |
| 8 | Đọc và xử lý số liệu thống kê, bảng biểu | **DL-07** | Xu hướng đề thực tế hóa; v1.0 không phủ đọc bảng/biểu đồ |
| 9 | Bài toán về lịch (dương lịch) và về đồng hồ (góc/vị trí kim) | **DL-08** | Nhóm riêng trong danh mục TAK12, v1.0 chỉ có phép tính số đo thời gian thuần |
| 10 | Suy luận logic bằng biểu đồ Ven | **TD-07** | TAK12 nêu Ven là một phương pháp riêng; v1.0 chỉ có lập bảng và loại trừ |

**Tổng chuyên đề: 57 → 67.**

### 4.3. Bốn nguyên tắc tổ chức chương trình tiếp thu từ MathExpress/CMath

| Nguyên tắc | Áp dụng vào tài liệu này |
|---|---|
| Phân loại bài tập theo 4 mức độ | Mục 5.8 — thay thang 2 mức (Cơ bản/Nâng cao) của v1.0 bằng thang **M1–M4** |
| Lộ trình cá nhân hóa theo trình độ và **nhóm trường mục tiêu** | Mục 7 — lộ trình 4 giai đoạn; Mục 9.4 — chọn trường mục tiêu để đổi cấu hình đề và tỷ trọng chuyên đề |
| Chấm–chữa và **phân tích lỗi sai** | Mục 9.2 FR-P05..P08 — sổ lỗi + trang phân tích lỗi theo chuyên đề và theo *loại lỗi* |
| **Kiểm tra khảo sát định kỳ** để điều chỉnh lộ trình | Mục 9.4 FR-C05 — bài kiểm tra định kỳ chèn vào lộ trình theo chu kỳ |

---

## 5. Phạm vi kiến thức — 67 chuyên đề

Mỗi bài tập bắt buộc gắn ít nhất một mã chuyên đề. Chuyên đề mới bổ sung ở v2.0 được đánh dấu **`[MỚI]`**.

### 5.1. SH — Số học và cấu tạo số (12)

| Mã | Chuyên đề |
|---|---|
| SH-01 | Đọc, viết, so sánh số tự nhiên; giá trị theo hàng |
| SH-02 | Bốn phép tính với số tự nhiên; tính nhanh, tính thuận tiện |
| SH-03 | Thứ tự thực hiện phép tính; tính giá trị biểu thức |
| SH-04 | Cấu tạo số: viết thêm/xóa bớt/xen giữa chữ số; lập số thỏa mãn điều kiện |
| SH-05 | Dấu hiệu chia hết cho 2, 3, 5, 9; tính chất chia hết của tổng/hiệu; thêm bớt để chia hết |
| SH-06 | Phép chia có dư; tìm số bị chia, số chia, số dư |
| SH-07 | Tìm thành phần chưa biết; tìm các số biết tổng/hiệu/tích/thương |
| SH-08 | Trung bình cộng; số hơn/kém trung bình cộng n đơn vị |
| SH-09 | Dãy số theo quy luật: số hạng thứ n, số số hạng, số chữ số, tổng dãy |
| SH-10 | Số chẵn/lẻ, số nguyên tố, ước và bội ở mức tiểu học |
| **SH-11** | **`[MỚI]`** Chữ số tận cùng: của một tích, của biểu thức; đếm chữ số 0 tận cùng |
| **SH-12** | **`[MỚI]`** Dãy chữ; bài toán đánh số trang sách |

### 5.2. PS — Phân số, số thập phân, tỉ số phần trăm (11)

| Mã | Chuyên đề |
|---|---|
| PS-01 | Khái niệm phân số; rút gọn, quy đồng |
| PS-02 | So sánh phân số nhiều cách (quy đồng, phần bù, phân số trung gian) |
| PS-03 | Bốn phép tính với phân số; tìm thành phần chưa biết |
| PS-04 | Số thập phân: đọc, viết, cấu tạo, so sánh, làm tròn |
| PS-05 | Bốn phép tính với số thập phân; bài toán có lời văn với số thập phân |
| PS-06 | Chuyển đổi phân số ↔ số thập phân ↔ tỉ số phần trăm |
| PS-07 | Tính nhanh dãy phân số có quy luật (triệt tiêu, mẫu tăng theo cấp số nhân) |
| PS-08 | Tỉ số của hai số |
| PS-09 | Ba bài toán cơ bản về tỉ số phần trăm |
| PS-10 | Phần trăm thực tế: lãi–vốn, tăng–giảm giá, khuyến mãi |
| **PS-11** | **`[MỚI]`** Bài toán trộn dung dịch, hỗn hợp; bài toán tươi–khô |

### 5.3. DH — Dạng toán điển hình có lời văn (17)

| Mã | Chuyên đề |
|---|---|
| DH-01 | Tìm hai số khi biết tổng và hiệu |
| DH-02 | Tìm hai số khi biết tổng và tỉ số |
| DH-03 | Tìm hai số khi biết hiệu và tỉ số |
| DH-04 | Bài toán hai tỉ số |
| DH-05 | Bài toán hai hiệu số |
| DH-06 | Toán tuổi: tổng–hiệu, tổng/hiệu–tỉ, tương quan ở hai thời điểm |
| DH-07 | Chuyển động cơ bản: vận tốc–quãng đường–thời gian, vận tốc trung bình, một vật |
| DH-08 | Chuyển động hai vật: ngược chiều gặp nhau, cùng chiều đuổi nhau, trên dòng nước |
| DH-09 | Công việc chung: làm chung–làm riêng, thay đổi số người/khối lượng |
| DH-10 | Toán trồng cây |
| DH-11 | Phương pháp giả thiết tạm |
| DH-12 | Phương pháp tính ngược từ cuối |
| DH-13 | Tỉ lệ thuận, tỉ lệ nghịch; rút về đơn vị |
| DH-14 | Năng suất, mật độ và đại lượng tỉ lệ trong thực tế |
| **DH-15** | **`[MỚI]`** Bài toán tỉ lệ kép |
| **DH-16** | **`[MỚI]`** Phương pháp khử |
| **DH-17** | **`[MỚI]`** Chuyển động đặc biệt: tàu hỏa (vật có chiều dài), lên/xuống dốc, theo vòng tròn, tiến–lùi |

### 5.4. HH — Hình học (12)

| Mã | Chuyên đề |
|---|---|
| HH-01 | Nhận biết hình, yếu tố cơ bản, góc; đếm số lượng hình |
| HH-02 | Chu vi, diện tích hình chữ nhật, hình vuông |
| HH-03 | Diện tích hình tam giác |
| HH-04 | Diện tích hình thang |
| HH-05 | Hình bình hành, hình thoi |
| HH-06 | Hình tròn: chu vi, diện tích |
| HH-07 | Hình hộp chữ nhật, hình lập phương: Sxq, Stp, thể tích |
| HH-08 | Thay đổi kích thước dẫn tới thay đổi chu vi/diện tích |
| HH-09 | Tỉ số diện tích tam giác chung đáy hoặc chung chiều cao |
| HH-10 | Cắt ghép hình; diện tích phần tô đậm |
| HH-11 | Thể tích thực tế: mực nước dâng, xếp hộp, vật chìm |
| **HH-12** | **`[MỚI]`** Bài toán sơn màu hình lập phương / hình hộp chữ nhật |

### 5.5. DL — Đại lượng và đo lường (8)

| Mã | Chuyên đề |
|---|---|
| DL-01 | Đơn vị đo độ dài, khối lượng: đổi và so sánh |
| DL-02 | Đơn vị đo diện tích |
| DL-03 | Đơn vị đo thể tích (cm³, dm³, m³, lít) |
| DL-04 | Đơn vị đo thời gian; bốn phép tính với số đo thời gian |
| DL-05 | Tỉ lệ bản đồ |
| DL-06 | Tiền tệ, hóa đơn, đơn giá |
| **DL-07** | **`[MỚI]`** Số liệu thống kê, bảng biểu: đọc bảng, biểu đồ cột/tranh, rút thông tin |
| **DL-08** | **`[MỚI]`** Bài toán về lịch (dương lịch) và về đồng hồ (vị trí, góc giữa hai kim) |

### 5.6. TD — Toán tư duy và suy luận logic (7)

| Mã | Chuyên đề |
|---|---|
| TD-01 | Suy luận logic: lập bảng đúng/sai, loại trừ, lựa chọn tình huống |
| TD-02 | Quy tắc đếm: quy tắc nhân, đếm số cách chọn, đếm hình, đếm đoạn thẳng |
| TD-03 | Nguyên lý Dirichlet mức tiểu học ("nguyên lý chuồng thỏ") |
| TD-04 | Bài toán cân, đong, chia phần |
| TD-05 | Quy luật hình, dãy hình, toán vui |
| TD-06 | Bài toán yêu cầu lập luận/chứng minh — dành cho phần tự luận |
| **TD-07** | **`[MỚI]`** Suy luận bằng biểu đồ Ven |

### 5.7. Tổng hợp

| Nhóm | v1.0 | v2.0 |
|---|---|---|
| SH — Số học | 10 | **12** |
| PS — Phân số & phần trăm | 10 | **11** |
| DH — Dạng toán điển hình | 14 | **17** |
| HH — Hình học | 11 | **12** |
| DL — Đại lượng & đo lường | 6 | **8** |
| TD — Tư duy & logic | 6 | **7** |
| **Tổng** | **57** | **67** |

### 5.8. Thang độ khó 4 mức (thay thang 2 mức của v1.0)

Tiếp thu cách phân loại của MathExpress. Trường dữ liệu: `Exercise.level: 'M1' | 'M2' | 'M3' | 'M4'`.

| Mức | Tên | Đặc điểm | Tỷ trọng khuyến nghị trong ngân hàng |
|---|---|---|---|
| **M1** | Nhận biết | Áp dụng trực tiếp một công thức/quy tắc vừa học | 25% |
| **M2** | Thông hiểu | Cần một bước biến đổi trước khi áp dụng công thức | 35% |
| **M3** | Vận dụng | Kết hợp 2–3 bước hoặc 2 chuyên đề | 30% |
| **M4** | Vận dụng cao | Bài "sát hạch": nhiều bước, cần nhận dạng dạng bài ẩn | 10% |

> **Ràng buộc kiểm thử:** mỗi chuyên đề phải có **tối thiểu 1 bài M4** và **tối thiểu 2 bài mỗi mức M1–M3**. Viết test tự động canh ngưỡng này để lần bổ sung nội dung sau không vô tình phá vỡ.

### 5.9. Mục tiêu khối lượng nội dung

| Loại | Mục tiêu bản đầy đủ | Ưu tiên xây trước |
|---|---|---|
| Bài học lý thuyết | 1 bài × 67 chuyên đề | Nhóm DH, rồi PS, rồi HH |
| Bài tập luyện | ≥ 12 bài/chuyên đề (~**800–850 bài**) | DH-01→03, DH-06→09, PS-09, HH-03/04/09, SH-04/05/09/11 |
| Bài tự luận có lời giải mẫu | 3–5 bài/chuyên đề M3–M4 (~**130 bài**) | TD-06, DH-08, DH-11, DH-12, DH-16, HH-09, HH-10 |
| Đề thi thử hoàn chỉnh | ≥ 6 đề (2 đề/cấu hình ở Mục 6.2) | Cấu hình `STANDARD` trước |

---

## 6. Cấu trúc đề thi và cấu hình thi thử

### 6.1. Khảo sát cấu trúc đề thực tế

| Trường | Cấu trúc ghi nhận |
|---|---|
| Archimedes | ~50 câu trắc nghiệm/điền đáp số trong 60 phút; năm 2025 môn Toán điều kiện tăng lên 75 phút |
| Lương Thế Vinh | ~20 câu điền đáp số trong 60 phút; cấu trúc ổn định qua các năm |
| Ngôi Sao Hà Nội | ~12 câu, gồm ~10 câu điền đáp số và ~2 câu tự luận |
| Cầu Giấy | Có cả phần trắc nghiệm và phần tự luận; độ khó tương đương Nguyễn Tất Thành |

*Nguồn: tổng hợp phân tích công khai của bên thứ ba (Phụ lục). Cần đối chiếu lại trước mỗi mùa tuyển sinh.*

### 6.2. Ba cấu hình đề

| Mã | Mô tả | Thành phần | Mô phỏng phong cách |
|---|---|---|---|
| `SPRINT` | Rèn tốc độ | 50 câu / 60 phút, toàn `mcq` + `numeric` | Archimedes |
| `STANDARD` | Phổ biến nhất | 20 câu `numeric` / 60 phút | Lương Thế Vinh |
| `MIXED` | Có tự luận | 10 câu `numeric` + 2 câu `essay` / 60 phút | Ngôi Sao, Cầu Giấy |

> Cấu hình khai báo bằng **dữ liệu**, không hard-code — để thêm cấu hình mới khi đề trường thay đổi chỉ cần sửa dữ liệu.

---

## 7. Lộ trình học 4 giai đoạn

Thiết kế theo lộ trình Toán của TAK12, đối chiếu với nguyên tắc "lộ trình cá nhân hóa theo trình độ và nhóm trường mục tiêu" của MathExpress. **Không dạy 67 chuyên đề tuần tự theo một trật tự cố định xuyên suốt** — chia theo giai đoạn lớn và tăng mạnh tần suất luyện đề khi gần ngày thi.

| GĐ | Tên | Thời lượng | Nội dung | Điều kiện chuyển giai đoạn |
|---|---|---|---|---|
| **1** | 🧱 Nền tảng — chủ điểm trọng tâm | 3–4 tuần | ~40 chuyên đề mức M1–M2: số học cơ bản, phân số, số thập phân, phần trăm cơ bản, tổng–hiệu–tỉ, tuổi, chuyển động cơ bản, chu vi–diện tích–thể tích, đơn vị đo | Hoàn thành ≥ 80% buổi học của giai đoạn |
| **2** | 📝 Làm đề các năm trước | 4–6 tuần | Xen kẽ: 1 buổi luyện đề đầy đủ + 1 buổi **phân tích lỗi sai** và ôn lại đúng chuyên đề vừa sai | Đã làm ≥ 6 đề và có bản đồ năng lực đủ dữ liệu |
| **3** | 🚀 Chủ điểm nâng cao | 4–6 tuần | ~27 chuyên đề còn lại ở mức M3–M4: hai tỉ số/hai hiệu số, tỉ lệ kép, giả thiết tạm, tính ngược, khử, chuyển động đặc biệt, tỉ số diện tích, sơn màu, Dirichlet, Ven, dãy chữ, chữ số tận cùng, dung dịch–tươi khô | Hoàn thành ≥ 80% buổi học của giai đoạn |
| **4** | 🎯 Luyện đề trường mục tiêu | Hàng tuần đến ngày thi | Đề theo đúng cấu hình của trường mục tiêu đã chọn + buổi luyện chuyên sâu đúng chuyên đề yếu nhất | Chạy đến ngày thi |

**Quy tắc lịch học** (theo mô hình đã kiểm chứng ở ứng dụng Tiếng Anh):

- Lịch bắt đầu **từ ngày mở ứng dụng lần đầu**, không cố định ngày trong năm.
- Mặc định 3 buổi/tuần; cho phép người dùng đổi các ngày trong tuần trong phần cài đặt.
- Có thể **bỏ qua Giai đoạn 1** nếu bài kiểm tra đầu vào đạt ≥ 85% — hiển thị đề xuất này rõ ràng, không tự động nhảy.
- Cho phép nhập **ngày thi dự kiến**; hệ thống nén/giãn thời lượng các giai đoạn cho khớp và cảnh báo nếu thời gian còn lại không đủ.

---

## 8. Yêu cầu người dùng

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| YC-01 | Là học sinh, tôi muốn học phương pháp giải từng chuyên đề trước khi làm bài | Cao |
| YC-02 | Là học sinh, tôi muốn xem lời giải chi tiết từng bước khi làm sai | Cao |
| YC-03 | Là học sinh, tôi muốn luyện riêng chuyên đề tôi đang yếu | Cao |
| YC-04 | Là học sinh, tôi muốn tự nhập đáp số như khi thi thật | Cao |
| YC-05 | Là học sinh, tôi muốn làm bài tự luận và xem lời giải mẫu để đối chiếu cách trình bày | Cao |
| YC-06 | Là học sinh, tôi muốn thi thử đúng áp lực thời gian của trường tôi nhắm tới | Cao |
| YC-07 | Là học sinh, tôi muốn làm lại những câu tôi từng làm sai | Cao |
| YC-08 | Là học sinh, tôi muốn biết mình mạnh/yếu ở chuyên đề nào một cách trực quan | Cao |
| YC-09 | Là học sinh, tôi muốn được gợi ý nên học gì tiếp theo | Cao |
| YC-10 | Là học sinh, tôi muốn có một **kế hoạch học theo ngày** để biết hôm nay phải làm gì | Cao |
| YC-11 | Là học sinh, tôi muốn làm bài kiểm tra đầu vào để ứng dụng biết trình độ của tôi | Trung bình |
| YC-12 | Là học sinh, tôi muốn thấy điểm thi thử tiến bộ dần theo thời gian | Trung bình |
| YC-13 | Là học sinh, tôi muốn **có động lực học đều** chứ không bỏ giữa chừng | Cao |
| YC-14 | Là học sinh, tôi muốn **học tiếp trên điện thoại đúng chỗ đã dừng trên máy tính** | Cao |
| YC-15 | Là học sinh, tôi muốn công thức và phân số hiển thị đúng như trong sách | Cao |
| YC-16 | Là học sinh, tôi muốn **biết mình hay sai kiểu lỗi gì** để tránh lặp lại | Trung bình |
| YC-17 | Là phụ huynh, tôi muốn xem tổng quan tiến trình của con và **in ra được** | Cao |
| YC-18 | Là phụ huynh, tôi muốn chắc chắn ứng dụng không thu thập thông tin cá nhân của con | Cao |

---

## 9. Yêu cầu chức năng theo module

### 9.1. Module Lý thuyết

| Mã | Yêu cầu | Truy vết |
|---|---|---|
| FR-L01 | Danh sách 67 chuyên đề nhóm theo 6 nhóm, mỗi chuyên đề có trạng thái: Chưa học / Đang học / Đã nắm | YC-01, YC-08 |
| FR-L02 | Mỗi chuyên đề có bài học gồm: phương pháp giải, khối **công thức trọng tâm** nổi bật, 2–3 ví dụ mẫu giải từng bước, mục **lỗi thường gặp** | YC-01 |
| FR-L03 | Lời giải ví dụ hiển thị **từng bước có đánh số**, mỗi bước kèm câu diễn giải lý do — không chỉ liệt kê phép tính | YC-01, YC-02 |
| FR-L04 | Quiz cuối bài 3–5 câu; **hiển thị công khai ngưỡng đạt ngay đầu quiz**; đạt ngưỡng mới đánh dấu "Đã nắm". Ngưỡng 80%, nhưng bài dưới 5 câu luôn được phép sai 1 câu | YC-01 |
| FR-L05 | Mở lại bài lý thuyết của chuyên đề ngay từ màn hình làm bài tập khi làm sai | YC-01, YC-02 |
| FR-L06 | Trang **Sơ đồ tư duy** tổng hợp toàn bộ 67 chuyên đề theo nhóm, bấm được để đi thẳng tới bài học — phục vụ tra cứu nhanh | YC-01 |
| FR-L07 | Điều hướng "bài trước / bài sau" ở cuối mỗi bài học, hiển thị **tên bài** chứ không phải mã chuyên đề | YC-01 |

### 9.2. Module Luyện tập

| Mã | Yêu cầu | Truy vết |
|---|---|---|
| FR-P01 | Mỗi bài tập gắn: mã chuyên đề (≥1), mức độ M1–M4, loại đáp án (`mcq`/`numeric`/`essay`) | YC-03, YC-08 |
| FR-P02 | Hỗ trợ đầy đủ ba loại đáp án theo Mục 10 | YC-04, YC-05 |
| FR-P03 | Chọn luyện theo một/nhiều chuyên đề, lọc thêm theo mức độ M1–M4 | YC-03 |
| FR-P04 | Sau mỗi câu: kết quả đúng/sai + **lời giải từng bước** (bắt buộc với mọi bài) | YC-02 |
| FR-P05 | **Sổ lỗi**: tự lưu mọi câu làm sai; có chế độ luyện lại riêng | YC-07 |
| FR-P06 | Câu được xóa khỏi sổ lỗi khi làm đúng **2 lần liên tiếp** ở các lần luyện lại sau | YC-07 |
| FR-P07 | Với bài `numeric` làm sai, hiển thị **gợi ý hướng làm** (`hint`) — chỉ hiện **sau khi trả lời sai**, không hiện trước | YC-02 |
| FR-P08 | **Trang phân tích lỗi sai**: thống kê lỗi theo chuyên đề *và* theo **loại lỗi** (`errorType`: sai công thức / sai đơn vị / nhầm dữ kiện / tính toán sai / không nhận ra dạng bài) | YC-16 |
| FR-P09 | Chế độ **luyện có tính giờ theo câu** (tùy chọn bật/tắt): đặt giới hạn thời gian mỗi câu để rèn tốc độ, tách biệt với module Thi thử | YC-06 |

### 9.3. Module Thi thử

| Mã | Yêu cầu | Truy vết |
|---|---|---|
| FR-T01 | Chọn một trong 3 cấu hình đề (Mục 6.2); cấu hình khai báo bằng dữ liệu | YC-06 |
| FR-T02 | Sinh đề ngẫu nhiên theo tỷ trọng chuyên đề và tỷ lệ mức độ M1–M4 khai báo trong cấu hình | YC-06 |
| FR-T03 | Đồng hồ đếm ngược; cảnh báo trực quan khi còn dưới 5 phút; tự nộp khi hết giờ | YC-06 |
| FR-T04 | Bảng số thứ tự câu, đánh dấu đã làm / chưa làm / **đánh dấu xem lại** | YC-06 |
| FR-T05 | Trong lúc thi **không** hiển thị đáp án hay phản hồi đúng/sai | YC-06 |
| FR-T06 | Sau khi nộp: chấm tự động `mcq` và `numeric`; với `essay` hiển thị lời giải mẫu + bảng tiêu chí tự chấm | YC-05, YC-06 |
| FR-T07 | Trang kết quả: điểm tổng, thời gian dùng, **điểm theo nhóm chuyên đề**, **điểm theo mức độ M1–M4**, bảng xem lại từng câu kèm lời giải | YC-06, YC-08 |
| FR-T08 | Lưu lịch sử mọi lần thi; **biểu đồ xu hướng điểm theo thời gian** | YC-12 |
| FR-T09 | Chế độ **tạo đề tùy chỉnh**: tự chọn chuyên đề, số câu, thời gian | YC-03, YC-06 |

### 9.4. Module Lộ trình học

| Mã | Yêu cầu | Truy vết |
|---|---|---|
| FR-C01 | Sinh lịch học đầy đủ 4 giai đoạn (Mục 7) từ ngày mở ứng dụng lần đầu | YC-10 |
| FR-C02 | **Thẻ "Buổi học hôm nay"** trên trang chủ với 3 trạng thái: buổi hôm nay / đang trễ lịch / buổi tiếp theo, kèm thanh tiến độ toàn khóa | YC-10 |
| FR-C03 | Mỗi buổi học có cấu trúc khối rõ ràng (ví dụ: khởi động 5 phút → học lý thuyết → luyện tập → tổng kết), bấm vào khối là **đi thẳng tới đúng nội dung** đó | YC-10 |
| FR-C04 | Cuối buổi, học sinh **tự đánh giá kết quả** theo 3 mức (Xuất sắc / Ổn / Cần ôn lại) — dùng cho gamification (Mục 12) | YC-10, YC-13 |
| FR-C05 | Chèn **bài kiểm tra định kỳ** vào lộ trình: kiểm tra tuần (cuối mỗi tuần) và kiểm tra tháng (cuối mỗi tháng), nội dung lấy từ các chuyên đề đã học tính tới thời điểm đó | YC-12 |
| FR-C06 | Cho phép nhập **ngày thi dự kiến** và **trường mục tiêu**; hệ thống điều chỉnh thời lượng giai đoạn và đặt cấu hình đề mặc định cho khớp | YC-06, YC-10 |
| FR-C07 | **Bản đồ hành trình** trực quan hiển thị 4 giai đoạn và vị trí hiện tại của học sinh | YC-10, YC-13 |
| FR-C08 | **Banner "Quay lại buổi học đang dở"** hiển thị khi học sinh rời buổi học giữa chừng | YC-10 |

### 9.5. Module Hồ sơ & Cá nhân hóa

| Mã | Yêu cầu | Truy vết |
|---|---|---|
| FR-H01 | Bài kiểm tra đầu vào ~30 câu phủ đều 6 nhóm chuyên đề, khởi tạo bản đồ năng lực | YC-11 |
| FR-H02 | Bỏ qua kiểm tra đầu vào → mọi chuyên đề ở trạng thái "chưa có dữ liệu", dùng lộ trình mặc định theo Mục 7 | YC-11 |
| FR-H03 | Tính **mức độ thành thạo** từng chuyên đề theo độ chính xác các lần làm gần nhất, có trọng số ưu tiên lần gần đây. **Công thức cần xác nhận — Mục 22** | YC-08 |
| FR-H04 | Phân loại 3 mức: **Cần ôn lại** / **Đang tiến bộ** / **Thành thạo**. Ngưỡng cần xác nhận — Mục 22 | YC-08 |
| FR-H05 | **Biểu đồ radar** thể hiện năng lực theo 6 nhóm chuyên đề + bản đồ lưới chi tiết 67 chuyên đề | YC-08 |
| FR-H06 | Gợi ý tối đa 3 hành động tiếp theo, ưu tiên chuyên đề mastery thấp nhất **trong số đã từng luyện ≥ 1 lần** | YC-09 |
| FR-H07 | Chuyên đề chưa từng luyện **không** bị coi là yếu; đưa vào gợi ý theo lộ trình nền tảng | YC-09 |
| FR-H08 | Nếu sổ lỗi vượt ngưỡng, ưu tiên đẩy "luyện lại câu sai" lên đầu gợi ý | YC-07, YC-09 |
| FR-H09 | **Trang phụ huynh**: số buổi học trong tuần, xu hướng điểm thi thử, 2–3 chuyên đề yếu nhất, ngôn ngữ dễ hiểu không thuật ngữ, **in được** (Mục 11.6) | YC-17 |
| FR-H10 | Hiển thị **lý do** mỗi gợi ý (ví dụ: "vì con đúng 3/10 bài gần nhất ở chuyên đề này") | YC-09 |
| FR-H11 | **Sao lưu & khôi phục** thủ công: xuất/nhập toàn bộ tiến độ dạng file JSON | YC-14 |

---

## 10. Đặc thù môn Toán — nhập đáp án và hiển thị công thức

> **Phần rủi ro kỹ thuật cao nhất.** Học sinh làm đúng mà bị chấm sai sẽ mất niềm tin vào ứng dụng.

### 10.1. Hiển thị công thức và hình vẽ

| Mã | Yêu cầu |
|---|---|
| FR-M01 | Phân số, lũy thừa, căn, ký hiệu hình học hiển thị đúng chuẩn toán học |
| FR-M02 | Dùng **KaTeX** (nhẹ, render nhanh hơn MathJax); nội dung lưu dạng LaTeX trong dữ liệu |
| FR-M03 | Công thức hiển thị đúng trên màn hình 360px, không tràn ngang; công thức dài cho phép cuộn ngang trong khối riêng |
| FR-M04 | Hình vẽ hình học dùng **SVG nội tuyến hoặc dựng bằng component**, không dùng ảnh bitmap — để chạy được cả trong bản đóng gói 1 file HTML |

### 10.2. Chấm đáp số tự nhập (`numeric`) — đặc tả bắt buộc

| Mã | Yêu cầu |
|---|---|
| FR-M05 | **Dấu thập phân**: chấp nhận cả dấu phẩy (`4,65`) và dấu chấm (`4.65`) là tương đương |
| FR-M06 | **Phân số ↔ thập phân**: `1/2`, `0,5`, `0.5` là cùng một đáp án, trừ khi đề yêu cầu rõ dạng trình bày |
| FR-M07 | **Phân số chưa tối giản**: `2/4` đúng khi đáp án là `1/2`, trừ khi đề yêu cầu "rút gọn tối giản" |
| FR-M08 | **Hỗn số**: `1 1/2` và `3/2` là tương đương |
| FR-M09 | **Dấu phân cách hàng nghìn**: `1 000`, `1.000`, `1000` như nhau khi đáp án là số nguyên |
| FR-M10 | **Đơn vị đo**: mỗi câu khai báo đơn vị kỳ vọng; nhập kèm đơn vị đúng vẫn được chấp nhận; nhập **sai** đơn vị tính là sai kèm thông báo giải thích |
| FR-M11 | **Sai số cho phép**: mỗi câu khai báo `tolerance`, mặc định 0. Bài liên quan số pi hoặc chia không hết phải ghi rõ yêu cầu làm tròn |
| FR-M12 | **Nhiều đáp án đúng**: hỗ trợ câu có nhiều đáp số hợp lệ; đúng khi liệt kê đủ và không thừa |
| FR-M13 | **Số âm và số 0**: xử lý đúng dấu âm; không nhầm chuỗi rỗng với số 0 |
| FR-M14 | Nhập sai định dạng (chữ vào ô số) → hiện hướng dẫn, **không** tính là làm sai |
| FR-M15 | Ô nhập dùng `inputmode="decimal"` để bật bàn phím số trên điện thoại |

> **Kiểm thử bắt buộc:** bộ chấm `numeric` phải có unit test phủ **toàn bộ** FR-M05 → FR-M15 trước khi module Luyện tập được coi là hoàn thành.

### 10.3. Bài tự luận (`essay`)

| Mã | Yêu cầu |
|---|---|
| FR-M16 | Khung nhập để học sinh trình bày lời giải (hoặc ghi chú tóm tắt nếu làm ra giấy) |
| FR-M17 | Lời giải mẫu **chỉ mở khi học sinh đã gõ ≥ 20 ký tự** và bấm "Tôi đã làm xong" — chỉ khóa bằng nút bấm thì học sinh sẽ bấm ngay để chép |
| FR-M18 | **Bảng tiêu chí tự chấm** với các mốc điểm cụ thể của bài đó |
| FR-M19 | Điểm tự chấm lưu vào hồ sơ nhưng **đánh dấu rõ là điểm tự đánh giá**, và **không** dùng để tính mastery tự động (tránh làm sai lệch bản đồ năng lực) |
| FR-M20 | Không chấm điểm tự luận tự động ở v2.0 (xem Mục 20) |

---

## 11. Yêu cầu UI/UX

> Toàn bộ mục này kế thừa từ ứng dụng Tiếng Anh đã triển khai. **Đọc mã nguồn repo tham chiếu trước khi tự thiết kế.**

### 11.1. Điều hướng

| Mã | Yêu cầu |
|---|---|
| UX-01 | **Thanh điều hướng ngang** chỉ hiện từ breakpoint `sm:` trở lên; dưới đó dùng **thanh tab cố định ở đáy màn hình** (mô hình quen thuộc với người dùng di động) |
| UX-02 | Header rút gọn còn 1 dòng dưới `lg:`; `main` có `padding-bottom` để nội dung không bị thanh tab che |
| UX-03 | Vì mỗi mục điều hướng xuất hiện ở **hai** thanh, test tự động phải khoanh vùng theo `role="navigation"` có tên cụ thể, không tìm liên kết trên toàn trang |

### 11.2. Màn hình làm bài

| Mã | Yêu cầu |
|---|---|
| UX-04 | Bài có **hình vẽ hoặc bảng số liệu** (HH-*, DL-07): khung nới rộng và xếp **2 cột** từ `lg:` — hình/bảng dính (`sticky`) bên trái, câu hỏi bên phải, để mắt không phải cuộn lên xuống. Bài chỉ có chữ giữ khung hẹp theo nguyên tắc độ dài dòng dễ đọc |
| UX-05 | **Thanh tiến trình tô màu theo kết quả từng câu** (xanh đúng / đỏ sai / xám chưa làm) |
| UX-06 | **Nút thoát** có hộp xác nhận nêu rõ đã làm bao nhiêu câu và **kết quả vẫn được ghi nhận** — để học sinh không sợ mất trắng |
| UX-07 | **Phím tắt**: `1`–`4` chọn đáp án trắc nghiệm, `Enter` sang câu tiếp; số thứ tự hiện trên từng phương án (chỉ từ `sm:` trở lên vì điện thoại không có bàn phím vật lý) |
| UX-08 | Lời giải từng bước có thể **mở dần từng bước một** (không đổ hết ra cùng lúc) — để học sinh thử tự làm tiếp sau mỗi gợi ý |
| UX-09 | **Khu vực nháp**: ô ghi chú tạm cho học sinh tính toán, không lưu vào tiến độ |

### 11.3. Danh sách và trang chủ

| Mã | Yêu cầu |
|---|---|
| UX-10 | Các trang danh sách (Lý thuyết, Luyện tập, Thi thử) chuyển sang **lưới 2–3 cột** từ `lg:`, các ô cùng hàng cao bằng nhau |
| UX-11 | Trang chủ lấy **thẻ Buổi học hôm nay** làm trung tâm (FR-C02), dùng **đúng cùng một hàm sinh lịch** với trang Lộ trình để hai màn hình không bao giờ lệch nhau |

### 11.4. Khả năng tiếp cận

| Mã | Yêu cầu |
|---|---|
| UX-12 | Mọi thao tác thực hiện được bằng bàn phím; trạng thái focus rõ ràng |
| UX-13 | Tôn trọng `prefers-reduced-motion`: tắt mọi animation khi hệ điều hành bật chế độ giảm chuyển động |
| UX-14 | **Không lồng `<button>` trong `<button>`** và không đặt nút bên trong `<label>` của radio — lỗi này đã xảy ra thực tế ở ứng dụng tham chiếu, làm hỏng bố cục và khiến học sinh vô tình chọn đáp án |

### 11.5. Đọc đề bằng giọng nói

| Mã | Yêu cầu |
|---|---|
| UX-15 | Nút **đọc đề bài** dùng Web Speech API (giọng tiếng Việt) cho bài toán có lời văn — hỗ trợ học sinh đọc chậm. Nút tự ẩn khi trình duyệt không hỗ trợ |
| UX-16 | **Tự hủy giọng đọc khi rời trang** — nếu không, giọng đọc vẫn chạy tiếp ở trang mới |

### 11.6. Bản in cho phụ huynh

| Mã | Yêu cầu |
|---|---|
| UX-17 | `@media print`: ẩn header và thanh điều hướng, nền trắng, để trang giấy chỉ còn nội dung báo cáo |

---

## 12. Gamification và động lực học

> Kế thừa mô hình đã kiểm chứng ở ứng dụng Tiếng Anh. Mục tiêu: giữ học sinh 10–11 tuổi học đều trong 3–4 tháng.

| Mã | Yêu cầu |
|---|---|
| GM-01 | **Hệ thống xu**: cộng xu khi hoàn thành buổi học và làm đúng bài tập; hiển thị số xu ở header |
| GM-02 | Xu theo **kết quả tự đánh giá cuối buổi** (FR-C04): "Xuất sắc" cộng đủ, "Ổn" cộng một nửa, **"Cần ôn lại" trừ một nửa** — thiết kế cố ý để khuyến khích tự đánh giá trung thực thay vì luôn bấm mức cao nhất để lấy xu |
| GM-03 | Buổi học càng nặng (luyện đề, kiểm tra tháng) thì mức xu càng cao, phản ánh đúng công sức |
| GM-04 | **Huy hiệu**: hoàn thành mỗi giai đoạn, chuỗi 5 buổi liên tiếp không bỏ, hoàn thành 100% bài trong 1 tuần, thi thử đạt trên 80% |
| GM-05 | **Tủ huy hiệu** hiển thị huy hiệu đã đạt và chưa đạt (chưa đạt hiện dạng mờ kèm điều kiện) |
| GM-06 | **Vòng tiến độ theo giai đoạn** hiển thị % hoàn thành từng giai đoạn |
| GM-07 | Hiệu ứng âm thanh sinh bằng Web Audio API (không thêm file âm thanh), có **công tắc bật/tắt** ở trang Hồ sơ. Tiếng báo sai phải **trầm và ngắn, không chói tai** |
| GM-08 | Chế độ **Thử thách tốc độ**: trả lời nhiều câu M1–M2 trong thời gian giới hạn, phục vụ rèn phản xạ tính nhanh |

---

## 13. Đồng bộ đa thiết bị

> Đặc tả này sao chép cơ chế đã vận hành thực tế ở ứng dụng Tiếng Anh (ADR 0005 của repo tham chiếu). **Giữ nguyên thiết kế, chỉ đổi tiền tố khóa lưu trữ.**

### 13.1. Nguyên tắc thiết kế

| Mã | Yêu cầu |
|---|---|
| SY-01 | Dùng **Firebase Firestore** làm nơi lưu trung gian — không dựng backend riêng |
| SY-02 | **Không thêm API mới cho từng loại dữ liệu.** Tái dùng nguyên `exportAll()` / `importAll()` đã có cho tính năng Sao lưu & khôi phục (FR-H11); cả file JSON cục bộ và cloud dùng **chung một định dạng**, chỉ khác nơi lưu |
| SY-03 | **Một document Firestore duy nhất cho mỗi mã đồng bộ**: `progress_sync/{syncCode}` chứa `{ data, updatedAt, updatedBy }`. Không tách theo loại tiến độ |
| SY-04 | **Mã đồng bộ 8 ký tự** sinh ngẫu nhiên, **bỏ ký tự dễ nhầm** `0/O`, `1/I/L`. Mã vừa là khóa tra cứu vừa đóng vai trò mật khẩu — không xây hệ thống tài khoản thật vì không cần ở quy mô gia đình |
| SY-05 | Kết hợp **Firebase Anonymous Auth** để Firestore Rules chặn được truy cập hoàn toàn không xác thực (`request.auth != null`) |
| SY-06 | Cảnh báo rõ trong giao diện khi liên kết vào mã có sẵn: **dữ liệu cục bộ sẽ bị ghi đè** bởi dữ liệu cloud |

### 13.2. Thời điểm đồng bộ — quan trọng

**Chỉ đồng bộ tại 3 thời điểm rõ ràng, không giữ kết nối hay tiến trình nền nào giữa các thời điểm đó.** (Ứng dụng tham chiếu ban đầu làm realtime liên tục rồi phải đổi lại — đừng lặp lại sai lầm này.)

| Mã | Thời điểm | Hành vi |
|---|---|---|
| SY-07 | **Mở ứng dụng** | Đọc 1 lần: nếu dữ liệu cloud mới hơn mốc đồng bộ gần nhất của máy này thì kéo về; ngược lại đẩy dữ liệu hiện tại lên (bù cho phiên trước chưa kịp đẩy) |
| SY-08 | **Rời ứng dụng** | Bắt qua `visibilitychange` → `hidden` và `pagehide` (**không dùng** `beforeunload`/`unload` — nhiều trình duyệt di động bỏ qua), đẩy dữ liệu lên 1 lần |
| SY-09 | **Bấm "Đồng bộ ngay"** | Làm cả hai bước trên ngay lập tức, cho người dùng chủ động đồng bộ giữa chừng |

| Mã | Yêu cầu bổ sung |
|---|---|
| SY-10 | Lưu `lastSyncedAt` (epoch ms) mỗi lần đẩy/kéo thành công; lúc mở app chỉ kéo về nếu `updatedAt` trên cloud mới hơn mốc này — tránh kéo lại dữ liệu không đổi mỗi lần mở |
| SY-11 | **Xung đột**: last-write-wins theo mốc thời gian, không xây cơ chế merge (chấp nhận được ở quy mô 1–2 học sinh) |
| SY-12 | Lợi ích phụ quan trọng: tối đa **2 lượt ghi Firestore mỗi phiên** thay vì mỗi thao tác nhỏ một lượt — giữ trong hạn mức gói miễn phí |

### 13.3. Ràng buộc kỹ thuật

| Mã | Yêu cầu |
|---|---|
| SY-13 | Tách phần **"nhẹ"** (kiểm tra trạng thái đồng bộ, sinh mã, đọc/ghi localStorage) khỏi phần **"nặng"** (SDK Firebase ~550KB). Phần nhẹ nằm trong bundle chính; SDK chỉ `import()` **động** khi thật sự có mã đồng bộ hoặc người dùng bấm tạo/liên kết mã |
| SY-14 | Tính năng **hoàn toàn tùy chọn**: không cấu hình biến môi trường Firebase thì hàm kiểm tra khả dụng trả về `false`, giao diện hiện hướng dẫn thay vì lỗi, mọi tính năng khác không ảnh hưởng |
| SY-15 | Ghi rõ trong README và cảnh báo trong giao diện: mức bảo mật là "chấp nhận được cho dữ liệu học tập không nhạy cảm", **không tương đương hệ thống tài khoản thật** |
| SY-16 | README phải có **hướng dẫn thiết lập Firebase từng bước cho người không rành kỹ thuật** (tạo project → bật Firestore → bật Anonymous Auth → lấy config → đặt Firestore Rules → thêm biến môi trường) |

---

## 14. Yêu cầu phi chức năng

| Mã | Yêu cầu | Chỉ tiêu |
|---|---|---|
| NFR-01 | Phản hồi nhanh | Chuyển màn hình và chấm câu dưới 150ms; render công thức không gây nhấp nháy bố cục |
| NFR-02 | Tương thích thiết bị | Bố cục đúng từ 360px đến 1440px; công thức và hình không tràn ngang |
| NFR-03 | Bảo vệ dữ liệu trẻ em | Không thu thập tên thật, số điện thoại, địa chỉ, hình ảnh, giọng nói lưu trữ |
| NFR-04 | Khả năng tiếp cận | Theo UX-12, UX-13 |
| NFR-05 | Độ bền dữ liệu | Tiến độ, sổ lỗi, lịch sử thi thử không mất khi đóng/mở lại; có xuất/nhập JSON |
| NFR-06 | Mở rộng nội dung | Thêm chuyên đề/bài tập/đề chỉ cần thêm dữ liệu đúng schema, không sửa logic hiển thị |
| NFR-07 | **Tính đúng đắn nội dung** | 100% bài tập có lời giải đã qua kiểm chứng 3 lớp (Mục 18, GĐ 8) |
| NFR-08 | Minh bạch gợi ý | Xem được lý do một chuyên đề được đề xuất (FR-H10) |
| NFR-09 | Đa dạng đề thi thử | Cùng cấu hình, xác suất trùng đề hoàn toàn giữa hai lần sinh liên tiếp dưới 1% |
| NFR-10 | **Chạy được không cần máy chủ** | Hỗ trợ chế độ build đóng gói **1 file HTML** mở trực tiếp bằng `file://`; ở chế độ này dùng `HashRouter` thay vì `BrowserRouter` |

---

## 15. Kiến trúc kỹ thuật

### 15.1. QĐ-1 — Repo độc lập hay gộp chung với ứng dụng Tiếng Anh? *(CHƯA CHỐT)*

| Hướng | Ưu điểm | Nhược điểm |
|---|---|---|
| **A. Repo độc lập** (khuyến nghị) | Triển khai nhanh; không rủi ro làm hỏng ứng dụng Tiếng Anh đang chạy; mỗi app tối ưu riêng (Toán cần KaTeX, Tiếng Anh cần flashcard/speech) | Học sinh mở hai ứng dụng riêng; phụ huynh xem tiến trình ở hai nơi; trùng lặp `MasteryEngine` và các component chung |
| **B. Gộp monorepo** | Một hồ sơ duy nhất; trang phụ huynh thấy cả hai môn; engine và component chung viết một lần | Phải tái cấu trúc ứng dụng Tiếng Anh đang chạy ổn định; thời gian thiết lập lâu hơn; rủi ro hồi quy |

**Khuyến nghị: Hướng A**, nhưng **sao chép có chủ đích** các module đã kiểm chứng từ repo tham chiếu (`mastery-engine`, `data-access`, `cloud sync`, `Layout`, `QuestionRunner`) và giữ **cùng tên khóa lưu trữ theo tiền tố riêng** (`ol6m.*` cho Toán, tránh đụng `ol6.*` của Tiếng Anh). Nếu sau này muốn gộp, việc gộp hai repo cùng stack và cùng kiến trúc dễ hơn nhiều so với gộp hai kiến trúc khác nhau.

**Claude Code cần hỏi người dùng xác nhận QĐ-1 trước khi khởi tạo dự án.**

### 15.2. QĐ-2 — Stack công nghệ *(ĐÃ CHỐT)*

Chốt **giống hệt ứng dụng Tiếng Anh** đã chạy thực tế, vì đã được kiểm chứng ở đúng bài toán và đúng nhóm người dùng:

| Thành phần | Lựa chọn |
|---|---|
| Framework | **React 19 + TypeScript** |
| Build tool | **Vite** |
| CSS | **Tailwind CSS v4** (qua plugin Vite) |
| Định tuyến | **react-router-dom** — `BrowserRouter` cho bản hosted, `HashRouter` cho bản 1 file HTML |
| Công thức toán | **KaTeX** *(khác biệt duy nhất so với app Tiếng Anh)* |
| Lưu trữ cục bộ | `localStorage` qua lớp trừu tượng `ProgressStore` |
| Đồng bộ cloud | **Firebase** (Firestore + Anonymous Auth), lazy-load |
| Unit test | **Vitest** + Testing Library |
| E2E test | **Playwright** |
| Lint | **oxlint** |
| Đóng gói 1 file | **vite-plugin-singlefile** |
| Triển khai | GitHub Pages / Vercel / Netlify (có sẵn cấu hình SPA fallback) |

### 15.3. Nguyên tắc kiến trúc bắt buộc

- **Lớp truy cập dữ liệu trừu tượng**: `ProgressStore`, `ContentStore` — không gọi thẳng `localStorage` rải rác trong code. Đây là điều kiện để tính năng đồng bộ (Mục 13) hoạt động mà không phải sửa từng module.
- **Logic thuần tách khỏi component**: `answer-checker`, `mastery-engine`, `test-generator`, `schedule` phải là module thuần TypeScript có unit test riêng, không phụ thuộc React.
- **Nội dung tách khỏi mã**: toàn bộ bài học/bài tập/đề nằm trong `src/content/`, chỉ là dữ liệu.

---

## 16. Mô hình dữ liệu

| Thực thể | Trường chính | Ghi chú |
|---|---|---|
| `Topic` | `id` (SH/PS/DH/HH/DL/TD-xx), `group`, `title`, `lesson`, `formulas[]`, `examples[]`, `commonMistakes[]` | 67 bản ghi |
| `Exercise` | `id`, `topicIds[]`, `level` (M1–M4), `answerType`, `statement` (LaTeX), `figure?`, `solutionSteps[]`, `hint?`, `errorTypes?` | `solutionSteps` bắt buộc với mọi loại |
| `McqAnswer` | `options[4]`, `answerIndex` | |
| `NumericAnswer` | `acceptedValues[]`, `unit?`, `tolerance`, `requireSimplified`, `requireExactForm` | Phục vụ FR-M05→M15 |
| `EssayAnswer` | `modelSolution`, `rubric[]` | Phục vụ FR-M16→M20 |
| `TestConfig` | `id`, `totalQuestions`, `durationMinutes`, `topicWeights{}`, `levelRatio{}`, `answerTypeRatio{}` | Dữ liệu, không hard-code |
| `CurriculumPhase` / `SessionTemplate` | `phase`, `focus`, `blocks[]`, `estimatedMinutes` | Nguồn sinh lịch 4 giai đoạn |
| `ScheduledSession` | `date`, `phaseLabel`, `focus`, `blocks[]`, `outcome?`, `completedAt?` | Sinh động từ ngày bắt đầu |
| `Attempt` | `exerciseId`, `correct`, `userAnswer`, `errorType?`, `timeSpent`, `timestamp`, `context` | Nguồn tính mastery |
| `ErrorLogEntry` | `exerciseId`, `addedAt`, `consecutiveCorrect`, `errorType?` | FR-P05, P06, P08 |
| `TestResult` | `configId`, `date`, `autoScore`, `selfScore`, `total`, `byTopicGroup{}`, `byLevel{}`, `durationUsed` | `selfScore` tách riêng (FR-M19) |
| `MasterySnapshot` | `topicId`, `masteryScore`, `level`, `lastUpdated` | Tính từ `Attempt` |
| `LearnerProfile` | `alias`, `targetSchool?`, `examDate?`, `startDate`, `coins`, `badges[]` | Không chứa thông tin định danh thật |
| `SyncMeta` | `syncCode?`, `deviceId`, `lastSyncedAt?` | Khóa tiền tố `ol6m.sync.*` |

---

## 17. Cấu trúc thư mục

```
project-root/
├── URD-ung-dung-on-luyen-toan-vao-6-v2.md   ← tài liệu này
├── .env.example                              # 6 biến VITE_FIREBASE_*
├── src/
│   ├── content/
│   │   ├── topics/            # 67 bài học lý thuyết
│   │   ├── exercises/         # ngân hàng bài tập theo nhóm SH/PS/DH/HH/DL/TD
│   │   ├── figures/           # hình vẽ (component/SVG nội tuyến)
│   │   ├── test-configs/      # SPRINT / STANDARD / MIXED
│   │   └── curriculum/        # kế hoạch 4 giai đoạn
│   ├── core/                  # LOGIC THUẦN — có unit test riêng, không phụ thuộc React
│   │   ├── answer-checker/    # FR-M05→M15  ← XÂY TRƯỚC TIÊN
│   │   ├── mastery-engine/    # FR-H03, H04
│   │   ├── test-generator/    # FR-T02
│   │   ├── schedule/          # FR-C01 sinh lịch 4 giai đoạn
│   │   ├── error-analysis/    # FR-P08
│   │   └── rewards/           # GM-01→GM-06
│   ├── data-access/
│   │   ├── types.ts           # ProgressStore, ContentStore
│   │   ├── local/             # localStorage
│   │   └── cloud/             # syncMeta.ts (nhẹ) + firebaseSync.ts (nặng, lazy)
│   ├── modules/
│   │   ├── theory/  practice/  mock-test/  curriculum/  profile/
│   ├── components/            # Layout, MathRenderer(KaTeX), QuestionRunner, SpeakButton...
│   └── app/                   # router, App, HomePage
├── tests/
│   ├── unit/                  # answer-checker, mastery, schedule, rewards, content.schema
│   └── e2e/                   # Playwright: các luồng học sinh
└── docs/adr/                  # ghi quyết định kiến trúc phát sinh
```

---

## 18. Kế hoạch xây dựng

| GĐ | Nội dung | Điều kiện hoàn thành |
|---|---|---|
| 0 | Xác nhận QĐ-1 (Mục 15.1); khởi tạo dự án theo stack Mục 15.2; tích hợp KaTeX | Render thử một phân số và một công thức hình học đúng |
| 1 | **`core/answer-checker` + unit test phủ FR-M05→M15** | Toàn bộ test xanh — **điều kiện tiên quyết cho mọi module sau** |
| 2 | Module Luyện tập với nội dung mẫu 3 chuyên đề, đủ 3 loại đáp án, sổ lỗi | Làm được `mcq`/`numeric`/`essay`; lời giải từng bước mở dần đúng |
| 3 | Module Lý thuyết cho cùng 3 chuyên đề mẫu + quiz cuối bài + sơ đồ tư duy | Học xong 1 bài → quiz → trạng thái chuyển "Đã nắm" |
| 4 | Module Thi thử: `test-generator`, đồng hồ, chấm, trang kết quả, đề tùy chỉnh | Thi thử được cả 3 cấu hình; hết giờ tự nộp đúng |
| 5 | Module Lộ trình: `schedule`, thẻ buổi hôm nay, bản đồ hành trình, kiểm tra định kỳ | Lịch sinh đúng 4 giai đoạn từ ngày mở app |
| 6 | Module Hồ sơ: `mastery-engine`, radar, gợi ý, phân tích lỗi, trang phụ huynh, sao lưu JSON | Gợi ý đúng logic với dữ liệu giả lập |
| 7 | **Đồng bộ đa thiết bị** (Mục 13) + gamification (Mục 12) + hoàn thiện UI/UX (Mục 11) | Đồng bộ được giữa 2 trình duyệt khác nhau bằng mã |
| 8 | Mở rộng nội dung đạt mục tiêu Mục 5.9 + **kiểm chứng nội dung 3 lớp** | Xem quy trình bên dưới |

### Quy trình kiểm chứng nội dung (Giai đoạn 8) — bắt buộc

1. **Kiểm tra tự động**: script xác minh mọi bài `numeric` có `acceptedValues` hợp lệ, mọi `mcq` đúng 4 lựa chọn và chỉ số đáp án hợp lệ, mọi bài có `solutionSteps` không rỗng, **mỗi chuyên đề đủ ngưỡng số bài và đủ mức M1–M4** (Mục 5.8).
2. **Kiểm tra chéo bằng phiên độc lập**: mở phiên làm việc mới **không mang theo lịch sử soạn đề**, giải lại toàn bộ bài tập từ đầu và đối chiếu với đáp án đã lưu. Mọi điểm lệch phải rà soát thủ công.
3. **Rà soát bởi giáo viên Toán tiểu học**: chốt kiểm soát bắt buộc trước khi sử dụng thật. Không bỏ qua kể cả khi hai lớp trên đã sạch.

---

## 19. Tiêu chí nghiệm thu v2.0

- [ ] `answer-checker` vượt toàn bộ unit test phủ FR-M05 → FR-M15
- [ ] Học và làm quiz được toàn bộ **67** chuyên đề; sơ đồ tư duy đi đúng tới từng bài
- [ ] Luyện tập đủ 3 loại đáp án, mọi bài có lời giải từng bước mở dần
- [ ] Sổ lỗi tự thêm câu sai, tự xóa sau 2 lần đúng liên tiếp; có trang phân tích lỗi theo loại lỗi
- [ ] Thi thử đủ 3 cấu hình + đề tùy chỉnh; kết quả tách theo nhóm chuyên đề và theo mức M1–M4
- [ ] Lộ trình 4 giai đoạn sinh đúng từ ngày mở app; thẻ buổi hôm nay và trang Lộ trình **không bao giờ lệch nhau**
- [ ] Bản đồ năng lực + radar 6 nhóm + gợi ý có nêu lý do
- [ ] **Đồng bộ được tiến độ giữa hai trình duyệt khác nhau bằng mã đồng bộ**
- [ ] Gamification: xu, huy hiệu, chuỗi buổi học hoạt động đúng, có công tắc âm thanh
- [ ] Thanh tab đáy trên di động; phím tắt trên máy tính; bản in trang phụ huynh sạch
- [ ] Công thức và hình hiển thị đúng trên 360px
- [ ] Build được **bản 1 file HTML** chạy qua `file://`
- [ ] Không có trường thu thập thông tin định danh cá nhân
- [ ] Đạt khối lượng nội dung Mục 5.9 và hoàn thành 3 lớp kiểm chứng

---

## 20. Ngoài phạm vi v2.0

- Chấm điểm tự động bài tự luận bằng AI
- Nhận diện chữ viết tay / chụp ảnh bài làm
- Công cụ vẽ hình trên màn hình (chỉ có ô nháp dạng văn bản — UX-09)
- Vai trò Giáo viên/Trung tâm (cần hệ thống tài khoản thật, khác hẳn mô hình mã đồng bộ)
- Ứng dụng di động native
- Thông báo đẩy nhắc lịch học
- Ghi âm giọng nói của học sinh (khác app Tiếng Anh — môn Toán không có nhu cầu luyện phát âm)

---

## 21. Rủi ro

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| **Lời giải sai lọt vào ngân hàng** | Rất cao | 3 lớp kiểm chứng Giai đoạn 8, không rút gọn |
| Bộ chấm đáp số không phủ hết dạng nhập hợp lệ | Cao | Xây trước tiên ở Giai đoạn 1 với unit test đầy đủ |
| **Khối lượng nội dung 800+ bài quá lớn cho một người** | Cao | Xây theo thứ tự ưu tiên Mục 5.9; ra bản dùng được với 3 chuyên đề mẫu trước (GĐ 2–3) rồi mở rộng dần |
| Công thức mastery và các ngưỡng chưa xác nhận | Trung bình | Mục 22 |
| Chưa chốt QĐ-1 | Trung bình | Hỏi trước khi khởi tạo dự án |
| Cấu trúc đề các trường thay đổi theo năm | Trung bình | Cấu hình đề khai báo bằng dữ liệu (FR-T01) |
| Hạn mức Firestore miễn phí | Thấp | Thiết kế SY-07→SY-12 giới hạn 2 lượt ghi/phiên |

---

## 22. Câu hỏi còn mở

1. **Công thức mastery (FR-H03)**: đề xuất mặc định — trung bình có trọng số N = 10 lượt gần nhất mỗi chuyên đề, lượt gần đây trọng số cao hơn; tối thiểu 3 lượt mới bắt đầu tính. Xác nhận?
2. **Ngưỡng 3 mức (FR-H04)**: đề xuất — dưới 50% Cần ôn lại, 50–80% Đang tiến bộ, trên 80% Thành thạo. Xác nhận?
3. **Ngưỡng sổ lỗi (FR-H08)**: bao nhiêu câu thì đẩy "luyện lại câu sai" lên đầu gợi ý (đề xuất 10)?
4. **Trường mục tiêu**: có nhắm một trường cụ thể để đặt cấu hình đề mặc định và tỷ trọng chuyên đề không?
5. **Ngày thi dự kiến**: có mốc cụ thể để tính ngược lộ trình (FR-C06) không?
6. **Nguồn kiểm chứng nội dung**: có sẵn giáo viên Toán tiểu học cho chốt kiểm soát Giai đoạn 8 không? Nếu chưa có, cần bàn phương án thay thế **trước khi** đầu tư xây 800+ bài.
7. **QĐ-1** (Mục 15.1): repo độc lập hay gộp monorepo với ứng dụng Tiếng Anh?

---

## Phụ lục — Nguồn tham khảo

**Giáo trình và lộ trình trung tâm (Mục 4):**
- Lộ trình ôn thi vào lớp 6 môn Toán dành cho học sinh lớp 5 — TAK12 *(nguồn đối chiếu danh mục chính)*
- Luyện thi vào 6, lớp Tổng Ôn và Luyện Đề — MathExpress (mathexpress.vn)
- Kỳ thi thử tuyển sinh lớp 6 và đề cương khảo sát định kỳ khối 5 — MathExpress
- Học thêm toán lớp 6 / trang chủ — CMath (cmath.edu.vn)
- Phân tích đề thi Toán vào lớp 6 THCS Cầu Giấy 2025–2026 — MathX

**Cấu trúc đề (Mục 6.1):**
- Đánh giá mức độ khó đề thi Toán vào lớp 6 các trường CLC — CLB MathFun
- Thông tin tuyển sinh và bộ đề thi vào lớp 6 THCS Archimedes — TAK12
- Hướng dẫn ôn luyện & bộ đề thi Toán vào lớp 6 THCS Nguyễn Tất Thành — TAK12

**Ứng dụng tham chiếu (Mục 11, 12, 13, 15):**
- `github.com/haihttsdv-lang/on-luyen-tieng-anh-vao-6` — mã nguồn và `docs/adr/0001`→`0007`

*Các bài phân tích là của bên thứ ba, không phải đề thi chính thức của các trường. Danh mục chuyên đề là danh mục kiến thức; nội dung bài học và bài tập phải tự biên soạn.*

— Hết tài liệu —
