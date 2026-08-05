import type { Exercise } from '../../types';

/** Mở rộng bài tập cho các chuyên đề TD, hướng tới 6–8 bài/chuyên đề. */
export const tdExpandExercises: Exercise[] = [
  // TD-01
  {
    id: 'TD-01-EX4',
    topicIds: ['TD-01'],
    level: 'advanced',
    answerType: 'mcq',
    statement: 'Ba bạn Lan, Mai, Hà mỗi người thích một môn: vẽ, hát, múa. Biết Lan không thích hát và không thích múa; Mai không thích múa. Hà thích môn gì?',
    solutionSteps: [
      { order: 1, content: 'Lan không hát, không múa $\\Rightarrow$ Lan thích vẽ.', rationale: 'Loại trừ hai khả năng cho Lan.' },
      { order: 2, content: 'Mai không múa, vẽ đã thuộc Lan $\\Rightarrow$ Mai thích hát.', rationale: 'Tiếp tục loại trừ.' },
      { order: 3, content: 'Còn lại Hà thích múa.', rationale: 'Khả năng duy nhất còn lại.' },
    ],
    mcq: { options: ['Vẽ', 'Hát', 'Múa', 'Không xác định'], answerIndex: 2 },
  },
  {
    id: 'TD-01-EX5',
    topicIds: ['TD-01'],
    level: 'advanced',
    answerType: 'mcq',
    statement: 'Bốn bạn xếp hàng: An đứng sau Bình, Bình đứng sau Chi, Chi đứng sau Dương. Ai đứng đầu hàng?',
    solutionSteps: [{ order: 1, content: 'Thứ tự: Dương, Chi, Bình, An $\\Rightarrow$ Dương đứng đầu.', rationale: 'Ghép các quan hệ "đứng sau" thành một thứ tự duy nhất.' }],
    mcq: { options: ['An', 'Bình', 'Chi', 'Dương'], answerIndex: 3 },
  },
  {
    id: 'TD-01-EX6',
    topicIds: ['TD-01'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Ba hộp: hộp 1 nặng hơn hộp 2, hộp 2 nặng hơn hộp 3. Hộp nào nhẹ nhất?',
    solutionSteps: [{ order: 1, content: 'Thứ tự nặng dần: hộp 3 < hộp 2 < hộp 1. Vậy hộp 3 nhẹ nhất.', rationale: 'Ghép các quan hệ so sánh thành thứ tự duy nhất.' }],
    mcq: { options: ['Hộp 1', 'Hộp 2', 'Hộp 3', 'Không xác định'], answerIndex: 2 },
  },
  {
    id: 'TD-01-EX7',
    topicIds: ['TD-01'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Hai bạn Nam và Long, một bạn cao, một bạn thấp. Biết Long không thấp. Long là bạn nào?',
    solutionSteps: [{ order: 1, content: 'Long không thấp, mà chỉ có 2 khả năng cao/thấp $\\Rightarrow$ Long cao.', rationale: 'Loại trừ khả năng còn lại.' }],
    mcq: { options: ['Cao', 'Thấp', 'Cả hai', 'Không xác định'], answerIndex: 0 },
  },

  // TD-02
  {
    id: 'TD-02-EX4',
    topicIds: ['TD-02'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Trên một đường thẳng có 9 điểm phân biệt. Hỏi có tất cả bao nhiêu đoạn thẳng?',
    solutionSteps: [{ order: 1, content: '$9\\times8:2=36$.', rationale: 'Áp dụng công thức đếm đoạn thẳng.' }],
    numeric: { kind: 'single', acceptedValues: ['36'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-02-EX5',
    topicIds: ['TD-02'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có 6 điểm không có 3 điểm nào thẳng hàng. Hỏi nối được bao nhiêu đoạn thẳng?',
    solutionSteps: [{ order: 1, content: '$6\\times5:2=15$.', rationale: 'Mỗi cặp điểm tạo đúng 1 đoạn thẳng.' }],
    numeric: { kind: 'single', acceptedValues: ['15'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-02-EX6',
    topicIds: ['TD-02'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Trên một đường thẳng có 12 điểm phân biệt. Hỏi có tất cả bao nhiêu đoạn thẳng?',
    solutionSteps: [{ order: 1, content: '$12\\times11:2=66$.', rationale: 'Áp dụng công thức đếm đoạn thẳng.' }],
    numeric: { kind: 'single', acceptedValues: ['66'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-02-EX7',
    topicIds: ['TD-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Có 4 bạn bắt tay nhau, mỗi cặp bắt tay đúng 1 lần. Hỏi có tất cả bao nhiêu cái bắt tay?',
    solutionSteps: [{ order: 1, content: '$4\\times3:2=6$.', rationale: 'Mỗi cặp bạn tạo đúng 1 cái bắt tay, giống như đếm đoạn thẳng.' }],
    numeric: { kind: 'single', acceptedValues: ['6'], tolerance: 0, isInteger: true },
  },

  // TD-03
  {
    id: 'TD-03-EX4',
    topicIds: ['TD-03'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có 17 viên bi chia vào 5 hộp. Hộp nhiều nhất chứa ít nhất bao nhiêu viên?',
    solutionSteps: [
      { order: 1, content: 'Nếu mỗi hộp tối đa 3 viên thì tổng tối đa $=5\\times3=15<17$.', rationale: 'Giả sử phản chứng.' },
      { order: 2, content: 'Vậy có ít nhất 1 hộp chứa từ 4 viên trở lên.', rationale: 'Áp dụng nguyên lý Dirichlet.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['4'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-03-EX5',
    topicIds: ['TD-03'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Trong một nhóm có 26 học sinh. Hỏi chắc chắn có ít nhất bao nhiêu học sinh cùng tháng sinh (12 tháng)?',
    solutionSteps: [
      { order: 1, content: 'Nếu mỗi tháng tối đa 2 học sinh thì tổng tối đa $=12\\times2=24<26$.', rationale: 'Giả sử phản chứng.' },
      { order: 2, content: 'Vậy có ít nhất 1 tháng có từ 3 học sinh trở lên.', rationale: 'Áp dụng nguyên lý Dirichlet.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['3'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-03-EX6',
    topicIds: ['TD-03'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có 30 quả táo chia vào 7 giỏ. Giỏ nhiều nhất chứa ít nhất bao nhiêu quả?',
    solutionSteps: [
      { order: 1, content: 'Nếu mỗi giỏ tối đa 4 quả thì tổng tối đa $=7\\times4=28<30$.', rationale: 'Giả sử phản chứng.' },
      { order: 2, content: 'Vậy có ít nhất 1 giỏ chứa từ 5 quả trở lên.', rationale: 'Áp dụng nguyên lý Dirichlet.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['5'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-03-EX7',
    topicIds: ['TD-03'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có 41 cuốn vở xếp vào 8 ngăn. Ngăn nhiều nhất chứa ít nhất bao nhiêu cuốn?',
    solutionSteps: [
      { order: 1, content: 'Nếu mỗi ngăn tối đa 5 cuốn thì tổng tối đa $=8\\times5=40<41$.', rationale: 'Giả sử phản chứng.' },
      { order: 2, content: 'Vậy có ít nhất 1 ngăn chứa từ 6 cuốn trở lên.', rationale: 'Áp dụng nguyên lý Dirichlet.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['6'], tolerance: 0, isInteger: true },
  },

  // TD-04
  {
    id: 'TD-04-EX4',
    topicIds: ['TD-04'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có can 8 lít và can 5 lít (không vạch chia). Đổ đầy can 8 lít rồi rót sang can 5 lít cho đầy. Can 8 lít còn lại bao nhiêu lít?',
    solutionSteps: [{ order: 1, content: '$8-5=3$ lít.', rationale: 'Lấy dung tích can lớn trừ dung tích can nhỏ đã rót đầy.' }],
    numeric: { kind: 'single', acceptedValues: ['3'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-04-EX5',
    topicIds: ['TD-04'],
    level: 'advanced',
    answerType: 'mcq',
    statement: 'Có 6 viên bi giống nhau, 1 viên nặng hơn. Cần ít nhất bao nhiêu lần cân (cân thăng bằng) để chắc chắn tìm ra viên đó?',
    solutionSteps: [{ order: 1, content: 'Chia 6 viên thành 3 nhóm 2. Cân 2 nhóm với nhau (lần 1) để xác định nhóm chứa viên nặng (2 viên), rồi cân 2 viên đó (lần 2) để tìm ra — cần 2 lần.', rationale: 'Chia đôi để thu hẹp phạm vi tìm kiếm.' }],
    mcq: { options: ['2 lần', '1 lần', '3 lần', '4 lần'], answerIndex: 0 },
  },
  {
    id: 'TD-04-EX6',
    topicIds: ['TD-04'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có can 10 lít và can 6 lít. Đổ đầy can 10 lít rồi rót sang can 6 lít cho đầy. Can 10 lít còn lại bao nhiêu lít?',
    solutionSteps: [{ order: 1, content: '$10-6=4$ lít.', rationale: 'Lấy dung tích can lớn trừ dung tích can nhỏ đã rót đầy.' }],
    numeric: { kind: 'single', acceptedValues: ['4'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-04-EX7',
    topicIds: ['TD-04'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Có 3 viên bi, trong đó có 1 viên nặng hơn 2 viên còn lại (2 viên nhẹ nặng bằng nhau). Cần ít nhất bao nhiêu lần cân (thăng bằng) để tìm ra viên nặng?',
    solutionSteps: [{ order: 1, content: 'Đặt 2 trong 3 viên lên cân, để riêng 1 viên. Nếu cân lệch, viên nặng hơn là viên nặng; nếu cân bằng, viên còn lại (chưa cân) là viên nặng. Chỉ cần 1 lần cân.', rationale: 'So sánh trực tiếp 2 trong 3 viên.' }],
    numeric: { kind: 'single', acceptedValues: ['1'], tolerance: 0, isInteger: true },
  },

  // TD-05
  {
    id: 'TD-05-EX4',
    topicIds: ['TD-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Dãy que diêm xếp tam giác: hình 1 dùng 3 que, hình 2 dùng 5 que, hình 3 dùng 7 que (mỗi hình sau tăng 2 que). Hình thứ 6 dùng bao nhiêu que?',
    solutionSteps: [{ order: 1, content: 'Số que hình thứ $n=3+(n-1)\\times2$; hình thứ 6: $3+5\\times2=13$.', rationale: 'Áp dụng công thức số hạng tổng quát.' }],
    numeric: { kind: 'single', acceptedValues: ['13'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-05-EX5',
    topicIds: ['TD-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Dãy số chấm hình vuông: hình 1 có 1 chấm, hình 2 có 4 chấm, hình 3 có 9 chấm (số chính phương). Hình thứ 6 có bao nhiêu chấm?',
    solutionSteps: [{ order: 1, content: 'Số chấm hình thứ $n=n\\times n$; hình thứ 6: $6\\times6=36$.', rationale: 'Nhận ra quy luật số chính phương.' }],
    numeric: { kind: 'single', acceptedValues: ['36'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-05-EX6',
    topicIds: ['TD-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Dãy que diêm xếp tam giác: hình 1 dùng 3 que, hình 2 dùng 5 que, hình 3 dùng 7 que. Hình thứ 10 dùng bao nhiêu que?',
    solutionSteps: [{ order: 1, content: 'Số que hình thứ $n=3+(n-1)\\times2$; hình thứ 10: $3+9\\times2=21$.', rationale: 'Áp dụng công thức số hạng tổng quát.' }],
    numeric: { kind: 'single', acceptedValues: ['21'], tolerance: 0, isInteger: true },
  },
  {
    id: 'TD-05-EX7',
    topicIds: ['TD-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Dãy số chấm hình vuông: hình 1 có 1 chấm, hình 2 có 4 chấm, hình 3 có 9 chấm. Hình thứ 8 có bao nhiêu chấm?',
    solutionSteps: [{ order: 1, content: 'Số chấm hình thứ $n=n\\times n$; hình thứ 8: $8\\times8=64$.', rationale: 'Nhận ra quy luật số chính phương.' }],
    numeric: { kind: 'single', acceptedValues: ['64'], tolerance: 0, isInteger: true },
  },

  // TD-06 (essay, ưu tiên theo Mục 4.7 URD)
  {
    id: 'TD-06-EX4',
    topicIds: ['TD-06'],
    level: 'advanced',
    answerType: 'essay',
    statement: 'Giải thích vì sao tích của hai số lẻ bất kỳ luôn là một số lẻ. Minh họa bằng một ví dụ cụ thể.',
    solutionSteps: [
      { order: 1, content: 'Số lẻ có thể viết dưới dạng $2a+1$ (a là số tự nhiên).', rationale: 'Biểu diễn tổng quát của số lẻ.' },
      { order: 2, content: 'Tích hai số lẻ: $(2a+1)\\times(2b+1)=4ab+2a+2b+1=2\\times(2ab+a+b)+1$, có dạng $2k+1$ nên là số lẻ.', rationale: 'Khai triển và rút gọn về dạng số lẻ tổng quát.' },
      { order: 3, content: 'Ví dụ: $3\\times5=15$; cả 3, 5 và 15 đều là số lẻ.', rationale: 'Kiểm chứng bằng ví dụ cụ thể.' },
    ],
    essay: {
      modelSolution:
        'Số lẻ có thể viết dưới dạng 2a+1. Tích hai số lẻ (2a+1)×(2b+1) = 4ab+2a+2b+1 = 2×(2ab+a+b)+1, có dạng 2k+1, tức là số lẻ. Ví dụ: 3×5=15, cả 3, 5 và 15 đều là số lẻ.',
      rubric: [
        { criterion: 'Nêu đúng dạng tổng quát của số lẻ (2a+1)', points: 1 },
        { criterion: 'Khai triển và chỉ ra tích vẫn có dạng 2k+1', points: 1 },
        { criterion: 'Đưa ra ví dụ minh họa đúng', points: 1 },
      ],
    },
  },
  {
    id: 'TD-06-EX5',
    topicIds: ['TD-06'],
    level: 'advanced',
    answerType: 'essay',
    statement: 'Giải thích vì sao một số có tổng các chữ số chia hết cho 3 thì số đó cũng chia hết cho 3. Minh họa bằng số 2145.',
    solutionSteps: [
      { order: 1, content: 'Phân tích theo hàng: $2145=2\\times1000+1\\times100+4\\times10+5$.', rationale: 'Tách số theo giá trị từng hàng.' },
      { order: 2, content: 'Nhận xét $1000=999+1$, $100=99+1$, $10=9+1$; mà $999, 99, 9$ đều chia hết cho 3.', rationale: 'Mỗi giá trị hàng đều hơn một bội của 3 đúng 1 đơn vị.' },
      { order: 3, content: 'Vậy $2145=(2\\times999+1\\times99+4\\times9)+(2+1+4+5)$; phần trong ngoặc thứ nhất chia hết cho 3, nên $2145$ chia hết cho 3 khi và chỉ khi tổng các chữ số $2+1+4+5=12$ chia hết cho 3.', rationale: 'Tách thành phần chắc chắn chia hết cho 3 và phần tổng chữ số.' },
      { order: 4, content: '$12$ chia hết cho 3 ($12:3=4$) nên $2145$ chia hết cho 3. Kiểm tra lại: $2145:3=715$ (không dư).', rationale: 'Kết luận và xác minh bằng phép chia trực tiếp.' },
    ],
    essay: {
      modelSolution:
        'Tách 2145 theo hàng: 2145 = 2×1000 + 1×100 + 4×10 + 5. Vì 1000 = 999+1, 100 = 99+1, 10 = 9+1, mà 999, 99, 9 đều chia hết cho 3, nên 2145 = (2×999 + 1×99 + 4×9) + (2+1+4+5). Phần đầu chắc chắn chia hết cho 3, vậy 2145 chia hết cho 3 khi và chỉ khi tổng các chữ số (2+1+4+5=12) chia hết cho 3. Vì 12 chia hết cho 3 nên 2145 chia hết cho 3. Kiểm tra: 2145:3=715 (không dư).',
      rubric: [
        { criterion: 'Tách đúng số theo giá trị từng hàng (nghìn, trăm, chục, đơn vị)', points: 1 },
        { criterion: 'Giải thích được vì sao phần "999, 99, 9 nhân với chữ số" luôn chia hết cho 3, từ đó suy ra chỉ còn tổng chữ số quyết định', points: 1 },
        { criterion: 'Kiểm chứng lại bằng phép chia trực tiếp', points: 1 },
      ],
    },
  },
  {
    id: 'TD-06-EX6',
    topicIds: ['TD-06'],
    level: 'advanced',
    answerType: 'essay',
    statement: 'Giải thích vì sao trong 2 số tự nhiên liên tiếp bất kỳ, luôn có đúng một số chẵn và một số lẻ.',
    solutionSteps: [
      { order: 1, content: 'Xét hai số tự nhiên liên tiếp $n$ và $n+1$. Có hai trường hợp cho $n$: chẵn hoặc lẻ.', rationale: 'Xét đủ các trường hợp có thể của n.' },
      { order: 2, content: 'Nếu $n$ chẵn, viết $n=2k$, thì $n+1=2k+1$ là số lẻ.', rationale: 'Trường hợp n chẵn.' },
      { order: 3, content: 'Nếu $n$ lẻ, viết $n=2k+1$, thì $n+1=2k+2=2(k+1)$ là số chẵn.', rationale: 'Trường hợp n lẻ.' },
      { order: 4, content: 'Cả hai trường hợp đều cho đúng một số chẵn và một số lẻ. Ví dụ: 6 (chẵn) và 7 (lẻ); 9 (lẻ) và 10 (chẵn).', rationale: 'Kết luận và kiểm chứng bằng ví dụ cụ thể.' },
    ],
    essay: {
      modelSolution:
        'Xét hai số tự nhiên liên tiếp n và n+1. Nếu n chẵn (n=2k) thì n+1=2k+1 là số lẻ. Nếu n lẻ (n=2k+1) thì n+1=2k+2=2(k+1) là số chẵn. Trong cả hai trường hợp, một trong hai số liên tiếp luôn chẵn và số kia luôn lẻ. Ví dụ: 6 (chẵn) và 7 (lẻ); 9 (lẻ) và 10 (chẵn).',
      rubric: [
        { criterion: 'Xét đủ hai trường hợp n chẵn và n lẻ', points: 1 },
        { criterion: 'Suy ra đúng tính chẵn/lẻ của n+1 trong từng trường hợp', points: 1 },
        { criterion: 'Đưa ra ví dụ minh họa đúng', points: 1 },
      ],
    },
  },
  {
    id: 'TD-06-EX7',
    topicIds: ['TD-06'],
    level: 'advanced',
    answerType: 'essay',
    statement: 'Giải thích vì sao tổng của một số chẵn và một số lẻ bất kỳ luôn là một số lẻ. Minh họa bằng một ví dụ cụ thể.',
    solutionSteps: [
      { order: 1, content: 'Số chẵn chia hết cho 2 (dư 0); số lẻ chia cho 2 dư 1.', rationale: 'Nhắc lại đặc điểm số dư khi chia cho 2.' },
      { order: 2, content: 'Khi cộng một số dư 0 với một số dư 1 (chia cho 2), tổng cũng dư 1 khi chia cho 2, tức là số lẻ.', rationale: 'Giải thích tính chất số dư khi cộng.' },
      { order: 3, content: 'Ví dụ: $8$ (chẵn) $+ 5$ (lẻ) $= 13$ (lẻ).', rationale: 'Kiểm chứng bằng ví dụ cụ thể.' },
    ],
    essay: {
      modelSolution:
        'Số chẵn chia hết cho 2, số lẻ dư 1 khi chia cho 2. Khi cộng một số chia hết cho 2 với một số dư 1 khi chia cho 2, tổng cũng dư 1 khi chia cho 2, tức là số lẻ. Ví dụ: 8 (chẵn) + 5 (lẻ) = 13 (lẻ).',
      rubric: [
        { criterion: 'Nêu đúng đặc điểm số dư khi chia cho 2 của số chẵn và số lẻ', points: 1 },
        { criterion: 'Giải thích được tổng có số dư 1, tức là số lẻ', points: 1 },
        { criterion: 'Đưa ra ví dụ minh họa đúng', points: 1 },
      ],
    },
  },
];
