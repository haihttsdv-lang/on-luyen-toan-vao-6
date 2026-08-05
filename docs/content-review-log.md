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
