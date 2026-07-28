import { MathRenderer } from '../components/MathRenderer';

export function HomePage() {
  return (
    <div className="card">
      <h1>Ôn luyện Toán vào lớp 6</h1>
      <p>
        Công cụ tự học Toán cho học sinh lớp 5 ôn thi vào lớp 6 chất lượng cao: lý thuyết theo chuyên đề, luyện tập có
        lời giải chi tiết, thi thử mô phỏng áp lực thời gian thật, và hồ sơ theo dõi tiến trình.
      </p>
      <p>
        Ví dụ hiển thị công thức: <MathRenderer content="$\dfrac{a}{b} = \dfrac{a \times k}{b \times k}$" />
      </p>
      <p style={{ fontSize: '0.85em', opacity: 0.75 }}>
        Toàn bộ bài học và bài tập là nội dung tự biên soạn, không sao chép đề thi chính thức của bất kỳ trường nào.
      </p>
    </div>
  );
}
