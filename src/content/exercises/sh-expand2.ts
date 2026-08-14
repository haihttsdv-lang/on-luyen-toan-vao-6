import type { Exercise } from '../../types';

/** Đợt mở rộng thứ 2 cho các chuyên đề SH không ưu tiên, hướng dần tới 12–15 bài/chuyên đề. */
export const shExpand2Exercises: Exercise[] = [
  // SH-01
  {
    id: 'SH-01-EX8',
    topicIds: ['SH-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Trong một trò chơi điện tử, điểm số của Nam là $48576$, điểm số của Long là $48657$. Ai đạt điểm cao hơn? Hãy nhập điểm cao hơn.',
    solutionSteps: [
      { order: 1, content: 'So sánh từng hàng: hàng chục nghìn, nghìn, trăm đều bằng nhau ($4,8,5$... khoan, xét lại: $48576$ và $48657$ giống nhau ở hàng chục nghìn ($4$) và nghìn ($8$).', rationale: 'So sánh từ trái sang phải.' },
      { order: 2, content: 'Đến hàng trăm: $5 < 6$, nên $48657 > 48576$.', rationale: 'Gặp hàng đầu tiên khác nhau, số có chữ số lớn hơn là số lớn hơn.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['48657'], tolerance: 0, isInteger: true },
  },
  {
    id: 'SH-01-EX9',
    topicIds: ['SH-01'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Số liền sau của số lớn nhất có 4 chữ số khác nhau lập được từ các chữ số $1, 3, 5, 7$ là số nào?',
    solutionSteps: [
      { order: 1, content: 'Số lớn nhất có 4 chữ số khác nhau từ $1,3,5,7$ là $7531$ (xếp các chữ số theo thứ tự giảm dần).', rationale: 'Muốn số lớn nhất, xếp chữ số lớn ở hàng cao nhất.' },
      { order: 2, content: 'Số liền sau $7531$ là $7532$.', rationale: 'Số liền sau hơn số đã cho đúng 1 đơn vị.' },
    ],
    mcq: { options: ['7532', '7530', '7533', '7531'], answerIndex: 0 },
  },

  // SH-02
  {
    id: 'SH-02-EX8',
    topicIds: ['SH-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một cửa hàng game bán được 125 đĩa game trong ngày thứ Bảy, số đĩa bán được ngày Chủ Nhật gấp đôi ngày thứ Bảy. Tính tổng số đĩa bán được trong 2 ngày.',
    solutionSteps: [
      { order: 1, content: 'Số đĩa ngày Chủ Nhật $=125\\times2=250$.', rationale: 'Gấp đôi ngày thứ Bảy.' },
      { order: 2, content: 'Tổng 2 ngày $=125+250=375$.', rationale: 'Cộng số đĩa 2 ngày.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['375'], tolerance: 0, isInteger: true },
  },
  {
    id: 'SH-02-EX9',
    topicIds: ['SH-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tính bằng cách thuận tiện: $25 \\times 37 \\times 4$.',
    solutionSteps: [
      { order: 1, content: '$25\\times37\\times4=(25\\times4)\\times37=100\\times37$.', rationale: 'Nhóm $25$ và $4$ vì tích của chúng là số tròn trăm.' },
      { order: 2, content: '$100\\times37=3700$.', rationale: 'Nhân với số tròn trăm.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['3700'], tolerance: 0, isInteger: true },
  },

  // SH-03
  {
    id: 'SH-03-EX8',
    topicIds: ['SH-03'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một đội đua xe mô hình tính điểm thưởng theo biểu thức: $45 + 15 \\times 3 - 20$. Tính điểm thưởng.',
    solutionSteps: [
      { order: 1, content: 'Thực hiện phép nhân trước: $15\\times3=45$.', rationale: 'Nhân chia trước, cộng trừ sau.' },
      { order: 2, content: '$45+45-20=70$.', rationale: 'Thực hiện cộng trừ theo thứ tự từ trái sang phải.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['70'], tolerance: 0, isInteger: true },
  },
  {
    id: 'SH-03-EX9',
    topicIds: ['SH-03'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tính giá trị biểu thức: $(120 - 45) : 5 + 18$.',
    solutionSteps: [
      { order: 1, content: 'Trong ngoặc trước: $120-45=75$.', rationale: 'Ưu tiên tính trong ngoặc.' },
      { order: 2, content: '$75:5+18=15+18=33$.', rationale: 'Chia trước, cộng sau.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['33'], tolerance: 0, isInteger: true },
  },

  // SH-06
  {
    id: 'SH-06-EX8',
    topicIds: ['SH-06'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Trong một trò chơi xếp hình, có 175 mảnh ghép chia đều vào các hộp, mỗi hộp chứa 8 mảnh. Hỏi chia được nhiều nhất bao nhiêu hộp đầy?',
    solutionSteps: [
      { order: 1, content: '$175 : 8 = 21$ dư $7$.', rationale: 'Thực hiện phép chia có dư.' },
      { order: 2, content: 'Vậy chia được nhiều nhất $21$ hộp đầy (còn dư $7$ mảnh không đủ 1 hộp).', rationale: 'Thương chính là số hộp đầy.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['21'], tolerance: 0, isInteger: true },
  },
  {
    id: 'SH-06-EX9',
    topicIds: ['SH-06'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Số bị chia là 253, số chia là 12. Tìm số dư của phép chia này.',
    solutionSteps: [
      { order: 1, content: '$12\\times21=252$, mà $253-252=1$.', rationale: 'Tìm thương lớn nhất sao cho tích không vượt quá số bị chia.' },
      { order: 2, content: 'Vậy $253:12=21$ dư $1$.', rationale: 'Kết luận số dư.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['1'], tolerance: 0, isInteger: true },
  },

  // SH-07
  {
    id: 'SH-07-EX8',
    topicIds: ['SH-07'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tìm X: $X \\times 7 = 588$.',
    solutionSteps: [{ order: 1, content: '$X=588:7=84$.', rationale: 'Muốn tìm thừa số chưa biết, lấy tích chia cho thừa số đã biết.' }],
    numeric: { kind: 'single', acceptedValues: ['84'], tolerance: 0, isInteger: true },
  },
  {
    id: 'SH-07-EX9',
    topicIds: ['SH-07'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tìm X: $936 : X = 12$.',
    solutionSteps: [{ order: 1, content: '$X=936:12=78$.', rationale: 'Muốn tìm số chia, lấy số bị chia chia cho thương.' }],
    numeric: { kind: 'single', acceptedValues: ['78'], tolerance: 0, isInteger: true },
  },

  // SH-08
  {
    id: 'SH-08-EX8',
    topicIds: ['SH-08'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Ba trận đấu bóng rổ, một đội ghi được lần lượt 42, 38, 46 điểm. Tính điểm trung bình mỗi trận.',
    solutionSteps: [
      { order: 1, content: 'Tổng điểm 3 trận $=42+38+46=126$.', rationale: 'Cộng các giá trị.' },
      { order: 2, content: 'Trung bình $=126:3=42$.', rationale: 'Chia tổng cho số trận.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['42'], tolerance: 0, isInteger: true },
  },
  {
    id: 'SH-08-EX9',
    topicIds: ['SH-08'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Trung bình cộng của 4 số là 25. Ba số đầu lần lượt là 20, 22, 28. Tìm số thứ tư.',
    solutionSteps: [
      { order: 1, content: 'Tổng 4 số $=25\\times4=100$.', rationale: 'Trung bình cộng nhân số lượng số hạng.' },
      { order: 2, content: 'Tổng 3 số đầu $=20+22+28=70$; số thứ tư $=100-70=30$.', rationale: 'Lấy tổng 4 số trừ tổng 3 số đã biết.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['30'], tolerance: 0, isInteger: true },
  },

  // SH-10
  {
    id: 'SH-10-EX8',
    topicIds: ['SH-10'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Số nào dưới đây là số nguyên tố?',
    solutionSteps: [
      { order: 1, content: '$21=3\\times7$, $27=3^3$, $33=3\\times11$ đều không phải số nguyên tố (có nhiều hơn 2 ước).', rationale: 'Kiểm tra từng số xem có ước nào ngoài 1 và chính nó không.' },
      { order: 2, content: '$23$ chỉ có 2 ước là $1$ và $23$, nên là số nguyên tố.', rationale: 'Số nguyên tố chỉ có đúng 2 ước.' },
    ],
    mcq: { options: ['21', '23', '27', '33'], answerIndex: 1 },
  },
  {
    id: 'SH-10-EX9',
    topicIds: ['SH-10'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tìm số chẵn lớn nhất có 2 chữ số là bội số của 6.',
    solutionSteps: [{ order: 1, content: 'Bội của 6 nhỏ hơn 100 lớn nhất là $6\\times16=96$; $96$ cũng là số chẵn (mọi bội của 6 đều là số chẵn).', rationale: 'Tìm bội lớn nhất của 6 có 2 chữ số.' }],
    numeric: { kind: 'single', acceptedValues: ['96'], tolerance: 0, isInteger: true },
  },

  // SH-11
  {
    id: 'SH-11-EX9',
    topicIds: ['SH-11'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Tính chữ số tận cùng của $6^{50}$.',
    solutionSteps: [{ order: 1, content: 'Chữ số $6$ khi nâng lên lũy thừa bất kỳ luôn giữ nguyên chữ số tận cùng là $6$.', rationale: '6 thuộc nhóm chữ số không đổi khi nâng lũy thừa.' }],
    numeric: { kind: 'single', acceptedValues: ['6'], tolerance: 0, isInteger: true },
  },
  {
    id: 'SH-11-EX10',
    topicIds: ['SH-11'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Tích $11 \\times 13 \\times 15$ có chữ số tận cùng là bao nhiêu?',
    solutionSteps: [
      { order: 1, content: 'Chữ số tận cùng của các thừa số: $1, 3, 5$.', rationale: 'Chỉ cần xét chữ số tận cùng.' },
      { order: 2, content: '$1\\times3\\times5=15$, chữ số tận cùng là $5$.', rationale: 'Nhân các chữ số tận cùng.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['5'], tolerance: 0, isInteger: true },
  },

  // SH-12
  {
    id: 'SH-12-EX7',
    topicIds: ['SH-12'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một quyển sách có 88 trang. Hỏi cần dùng bao nhiêu chữ số để đánh số trang từ 1 đến 88?',
    solutionSteps: [
      { order: 1, content: 'Trang $1$–$9$: $9$ chữ số.', rationale: 'Trang 1 chữ số.' },
      { order: 2, content: 'Trang $10$–$88$: có $88-10+1=79$ trang, dùng $79\\times2=158$ chữ số.', rationale: 'Trang 2 chữ số.' },
      { order: 3, content: 'Tổng $=9+158=167$ chữ số.', rationale: 'Cộng dồn 2 đoạn.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['167'], tolerance: 0, isInteger: true },
  },
  {
    id: 'SH-12-EX8',
    topicIds: ['SH-12'],
    level: 'advanced',
    answerType: 'mcq',
    statement: "Dãy chữ cái lặp lại theo chu kỳ 'GAME' (4 chữ). Chữ cái thứ 50 trong dãy là chữ gì?",
    solutionSteps: [
      { order: 1, content: '$50:4=12$ dư $2$.', rationale: 'Chia vị trí cho độ dài chu kỳ.' },
      { order: 2, content: 'Số dư $2$ ứng với chữ cái thứ 2 trong "GAME": $G(1), A(2), M(3), E(4)$.', rationale: 'Đếm tới vị trí ứng với số dư.' },
    ],
    mcq: { options: ['A', 'G', 'M', 'E'], answerIndex: 0 },
  },
];
