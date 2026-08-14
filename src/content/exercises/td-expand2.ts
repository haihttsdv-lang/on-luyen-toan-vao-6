import type { Exercise } from '../../types';

/** Đợt mở rộng thứ 2 cho các chuyên đề TD không ưu tiên, hướng dần tới 12–15 bài/chuyên đề. */
export const tdExpand2Exercises: Exercise[] = [
  // TD-01
  {
    id: 'TD-01-EX8',
    topicIds: ['TD-01'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Ba bạn An, Bình, Chi mỗi người thích một con vật: chó, mèo, cá. An không thích chó, không thích cá. Bình không thích cá. Chi thích con gì?',
    solutionSteps: [
      { order: 1, content: 'An không thích chó, không thích cá $\\Rightarrow$ An thích mèo.', rationale: 'Loại trừ hai khả năng cho An.' },
      { order: 2, content: 'Bình không thích cá, mèo đã thuộc An $\\Rightarrow$ Bình thích chó.', rationale: 'Tiếp tục loại trừ.' },
      { order: 3, content: 'Còn lại Chi thích cá.', rationale: 'Khả năng duy nhất còn lại.' },
    ],
    mcq: { options: ['Chó', 'Mèo', 'Cá', 'Không xác định'], answerIndex: 2 },
  },
  {
    id: 'TD-01-EX9',
    topicIds: ['TD-01'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Bốn bạn xếp hàng: Long đứng trước Minh, Minh đứng trước Khoa, Khoa đứng trước Duy. Ai đứng cuối hàng?',
    solutionSteps: [{ order: 1, content: 'Thứ tự: Long, Minh, Khoa, Duy $\\Rightarrow$ Duy đứng cuối.', rationale: 'Ghép các quan hệ "đứng trước" thành một thứ tự duy nhất.' }],
    mcq: { options: ['Duy', 'Khoa', 'Minh', 'Long'], answerIndex: 0 },
  },

  // TD-02
  {
    id: 'TD-02-EX8',
    topicIds: ['TD-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Trên một đường tròn có 10 điểm phân biệt. Hỏi vẽ được bao nhiêu dây cung (đoạn thẳng nối 2 điểm)?',
    solutionSteps: [{ order: 1, content: '$10\\times9:2=45$.', rationale: 'Mỗi cặp điểm tạo đúng 1 dây cung.' }],
    numeric: { kind: 'single', acceptedValues: ['45'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-02-EX9',
    topicIds: ['TD-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Có 7 đội bóng thi đấu vòng tròn 1 lượt (mỗi đội gặp đội khác đúng 1 lần). Hỏi có tất cả bao nhiêu trận đấu?',
    solutionSteps: [{ order: 1, content: '$7\\times6:2=21$.', rationale: 'Mỗi cặp đội tạo đúng 1 trận đấu, giống như đếm dây cung.' }],
    numeric: { kind: 'single', acceptedValues: ['21'], tolerance: 0, isInteger: true },
  },

  // TD-03
  {
    id: 'TD-03-EX8',
    topicIds: ['TD-03'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có 23 viên bi chia vào 6 hộp. Hộp nhiều nhất chứa ít nhất bao nhiêu viên?',
    solutionSteps: [
      { order: 1, content: 'Nếu mỗi hộp tối đa 3 viên thì tổng tối đa $=6\\times3=18<23$.', rationale: 'Giả sử phản chứng.' },
      { order: 2, content: 'Vậy có ít nhất 1 hộp chứa từ 4 viên trở lên.', rationale: 'Áp dụng nguyên lý Dirichlet.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['4'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-03-EX9',
    topicIds: ['TD-03'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Trong một nhóm có 33 học sinh. Chắc chắn có ít nhất bao nhiêu bạn cùng tháng sinh (12 tháng)?',
    solutionSteps: [
      { order: 1, content: 'Nếu mỗi tháng tối đa 2 học sinh thì tổng tối đa $=12\\times2=24<33$.', rationale: 'Giả sử phản chứng.' },
      { order: 2, content: 'Vậy có ít nhất 1 tháng có từ 3 học sinh trở lên.', rationale: 'Áp dụng nguyên lý Dirichlet.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['3'], tolerance: 0, isInteger: true },
  },

  // TD-04
  {
    id: 'TD-04-EX8',
    topicIds: ['TD-04'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có can 7 lít và can 3 lít (không vạch chia). Đổ đầy can 7 lít rồi rót sang can 3 lít cho đầy. Can 7 lít còn lại bao nhiêu lít?',
    solutionSteps: [{ order: 1, content: '$7-3=4$ lít.', rationale: 'Lấy dung tích can lớn trừ dung tích can nhỏ đã rót đầy.' }],
    numeric: { kind: 'single', acceptedValues: ['4'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-04-EX9',
    topicIds: ['TD-04'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có 9 viên bi giống hệt nhau về hình dạng, trong đó có 1 viên nặng hơn các viên còn lại. Cần ít nhất bao nhiêu lần cân (cân thăng bằng) để chắc chắn tìm ra viên đó?',
    solutionSteps: [
      { order: 1, content: 'Chia 9 viên thành 3 nhóm 3 viên. Cân 2 trong 3 nhóm (lần 1) để xác định nhóm chứa viên nặng.', rationale: 'Chia làm 3 để thu hẹp phạm vi nhanh nhất.' },
      { order: 2, content: 'Trong nhóm 3 viên nghi ngờ, cân 2 trong 3 viên đó (lần 2) để tìm ra viên nặng.', rationale: 'Lặp lại việc chia 3 với nhóm còn nghi ngờ.' },
      { order: 3, content: 'Vậy cần ít nhất 2 lần cân.', rationale: 'Kết luận.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true },
  },

  // TD-05
  {
    id: 'TD-05-EX8',
    topicIds: ['TD-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Dãy số $3, 7, 11, 15, ...$ mỗi số sau hơn số trước 4 đơn vị. Tìm số hạng thứ 10.',
    solutionSteps: [{ order: 1, content: 'Số hạng thứ $n=3+(n-1)\\times4$; số hạng thứ 10: $3+9\\times4=39$.', rationale: 'Áp dụng công thức số hạng tổng quát.' }],
    numeric: { kind: 'single', acceptedValues: ['39'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-05-EX9',
    topicIds: ['TD-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Dãy que diêm xếp hình vuông nối tiếp: hình 1 dùng 4 que, hình 2 dùng 7 que, hình 3 dùng 10 que (mỗi hình sau tăng 3 que). Hình thứ 8 dùng bao nhiêu que?',
    solutionSteps: [{ order: 1, content: 'Số que hình thứ $n=4+(n-1)\\times3$; hình thứ 8: $4+7\\times3=25$.', rationale: 'Áp dụng công thức số hạng tổng quát.' }],
    numeric: { kind: 'single', acceptedValues: ['25'], tolerance: 0, isInteger: true },
  },

  // TD-06 (essay)
  {
    id: 'TD-06-EX8',
    topicIds: ['TD-06'],
    level: 'advanced',
    answerType: 'essay',
    statement: 'Giải thích vì sao tổng của ba số tự nhiên liên tiếp luôn chia hết cho 3. Minh họa bằng một ví dụ cụ thể.',
    solutionSteps: [
      { order: 1, content: 'Gọi 3 số tự nhiên liên tiếp là $n, n+1, n+2$.', rationale: 'Biểu diễn tổng quát 3 số liên tiếp.' },
      { order: 2, content: 'Tổng $=n+(n+1)+(n+2)=3n+3=3\\times(n+1)$, có dạng $3\\times$ (số tự nhiên) nên chia hết cho 3.', rationale: 'Rút gọn tổng về dạng bội của 3.' },
      { order: 3, content: 'Ví dụ: $5+6+7=18=3\\times6$.', rationale: 'Kiểm chứng bằng ví dụ cụ thể.' },
    ],
    essay: {
      modelSolution:
        'Gọi 3 số tự nhiên liên tiếp là n, n+1, n+2. Tổng = n + (n+1) + (n+2) = 3n + 3 = 3×(n+1), có dạng 3 nhân với một số tự nhiên nên chia hết cho 3. Ví dụ: 5+6+7=18=3×6.',
      rubric: [
        { criterion: 'Biểu diễn đúng 3 số tự nhiên liên tiếp dạng n, n+1, n+2', points: 1 },
        { criterion: 'Rút gọn được tổng về dạng 3×(n+1), chỉ ra chia hết cho 3', points: 1 },
        { criterion: 'Đưa ra ví dụ minh họa đúng', points: 1 },
      ],
    },
  },
  {
    id: 'TD-06-EX9',
    topicIds: ['TD-06'],
    level: 'advanced',
    answerType: 'essay',
    statement: 'Giải thích vì sao một số có chữ số tận cùng là 0 hoặc 5 thì chia hết cho 5. Minh họa bằng số 235.',
    solutionSteps: [
      { order: 1, content: 'Một số $N$ bất kỳ có thể viết dưới dạng $N = a\\times10+d$, với $d$ là chữ số tận cùng, $a$ là số tạo bởi các chữ số còn lại.', rationale: 'Tách số theo chữ số tận cùng.' },
      { order: 2, content: 'Vì $10$ chia hết cho $5$, nên $a\\times10$ luôn chia hết cho $5$ với mọi $a$; do đó $N$ chia hết cho $5$ khi và chỉ khi $d$ chia hết cho $5$, tức $d=0$ hoặc $d=5$.', rationale: 'Suy luận từ tính chất chia hết của tích.' },
      { order: 3, content: 'Ví dụ: $235=23\\times10+5$; kiểm tra $235:5=47$ (không dư).', rationale: 'Kiểm chứng bằng ví dụ cụ thể.' },
    ],
    essay: {
      modelSolution:
        'Một số N = a×10 + d, với d là chữ số tận cùng. Vì 10 chia hết cho 5, nên a×10 luôn chia hết cho 5; do đó N chia hết cho 5 khi và chỉ khi d chia hết cho 5, tức d=0 hoặc d=5. Ví dụ: 235=23×10+5, và 235:5=47 (không dư).',
      rubric: [
        { criterion: 'Tách đúng số N thành a×10 + d', points: 1 },
        { criterion: 'Giải thích được vì sao chỉ chữ số tận cùng quyết định chia hết cho 5', points: 1 },
        { criterion: 'Kiểm chứng lại bằng phép chia trực tiếp', points: 1 },
      ],
    },
  },

  // TD-07
  {
    id: 'TD-07-EX8',
    topicIds: ['TD-07'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một lớp có 42 học sinh. Có 25 bạn thích Toán, 20 bạn thích Tiếng Anh, 8 bạn không thích môn nào trong 2 môn. Hỏi có bao nhiêu bạn thích cả 2 môn?',
    solutionSteps: [
      { order: 1, content: 'Số bạn thích ít nhất 1 môn: $42-8=34$.', rationale: 'Lấy tổng số học sinh trừ đi số không thích môn nào.' },
      { order: 2, content: 'Số bạn thích cả 2 môn: $25+20-34=11$.', rationale: 'Suy ra từ công thức bao hàm-loại trừ theo chiều ngược lại.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['11'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-07-EX9',
    topicIds: ['TD-07'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một câu lạc bộ thể thao có 60 thành viên. 35 người chơi bóng đá, 28 người chơi cầu lông, 15 người chơi cả 2 môn. Hỏi có bao nhiêu người không chơi môn nào trong 2 môn đó?',
    solutionSteps: [
      { order: 1, content: 'Số người chơi ít nhất 1 môn: $35+28-15=48$.', rationale: 'Áp dụng công thức bao hàm-loại trừ.' },
      { order: 2, content: 'Số người không chơi môn nào: $60-48=12$.', rationale: 'Lấy tổng thành viên trừ đi số chơi ít nhất 1 môn.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['12'], tolerance: 0, isInteger: true },
  },
];
