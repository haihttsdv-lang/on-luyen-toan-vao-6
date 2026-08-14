import type { Exercise } from '../../types';

/** Đợt mở rộng thứ 2 cho các chuyên đề PS không ưu tiên, hướng dần tới 12–15 bài/chuyên đề. */
export const psExpand2Exercises: Exercise[] = [
  // PS-01
  {
    id: 'PS-01-EX9',
    topicIds: ['PS-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Rút gọn phân số $\\dfrac{36}{48}$ về dạng tối giản.',
    solutionSteps: [{ order: 1, content: 'ƯCLN của $36$ và $48$ là $12$; $\\dfrac{36}{48}=\\dfrac{36:12}{48:12}=\\dfrac{3}{4}$.', rationale: 'Chia cả tử và mẫu cho ước chung lớn nhất.' }],
    numeric: { kind: 'single', acceptedValues: ['3/4'], tolerance: 0 },
  },
  {
    id: 'PS-01-EX10',
    topicIds: ['PS-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Quy đồng mẫu số hai phân số $\\dfrac{2}{5}$ và $\\dfrac{3}{7}$. Mẫu số chung nhỏ nhất là bao nhiêu?',
    solutionSteps: [{ order: 1, content: 'Vì $5$ và $7$ không có ước chung nào ngoài $1$, mẫu số chung nhỏ nhất là $5\\times7=35$.', rationale: 'Hai mẫu số nguyên tố cùng nhau thì MSC là tích của chúng.' }],
    numeric: { kind: 'single', acceptedValues: ['35'], tolerance: 0, isInteger: true },
  },

  // PS-02
  {
    id: 'PS-02-EX8',
    topicIds: ['PS-02'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'So sánh hai phân số $\\dfrac{5}{6}$ và $\\dfrac{7}{9}$, phân số nào lớn hơn?',
    solutionSteps: [
      { order: 1, content: 'Quy đồng mẫu số $18$: $\\dfrac{5}{6}=\\dfrac{15}{18}$, $\\dfrac{7}{9}=\\dfrac{14}{18}$.', rationale: 'Đưa về cùng mẫu số để so sánh.' },
      { order: 2, content: '$\\dfrac{15}{18}>\\dfrac{14}{18}$ nên $\\dfrac{5}{6}$ lớn hơn.', rationale: 'Cùng mẫu số, phân số nào có tử lớn hơn thì lớn hơn.' },
    ],
    mcq: { options: ['5/6', '7/9', 'Bằng nhau', 'Không so sánh được'], answerIndex: 0 },
  },
  {
    id: 'PS-02-EX9',
    topicIds: ['PS-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Trong hai phân số $\\dfrac{3}{4}$ và $\\dfrac{4}{5}$, phân số nào bé hơn?',
    solutionSteps: [{ order: 1, content: 'Quy đồng mẫu số $20$: $\\dfrac{3}{4}=\\dfrac{15}{20}$, $\\dfrac{4}{5}=\\dfrac{16}{20}$; vì $15<16$ nên $\\dfrac{3}{4}$ bé hơn.', rationale: 'Đưa về cùng mẫu số để so sánh.' }],
    numeric: { kind: 'single', acceptedValues: ['3/4'], tolerance: 0 },
  },

  // PS-03
  {
    id: 'PS-03-EX9',
    topicIds: ['PS-03'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tính: $\\dfrac{2}{3} + \\dfrac{1}{4}$.',
    solutionSteps: [{ order: 1, content: 'Quy đồng mẫu số $12$: $\\dfrac{8}{12}+\\dfrac{3}{12}=\\dfrac{11}{12}$.', rationale: 'Quy đồng rồi cộng tử số.' }],
    numeric: { kind: 'single', acceptedValues: ['11/12'], tolerance: 0 },
  },
  {
    id: 'PS-03-EX10',
    topicIds: ['PS-03'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tính: $\\dfrac{5}{6} - \\dfrac{1}{3}$.',
    solutionSteps: [{ order: 1, content: 'Quy đồng mẫu số $6$: $\\dfrac{5}{6}-\\dfrac{2}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}$.', rationale: 'Quy đồng rồi trừ tử số, sau đó rút gọn.' }],
    numeric: { kind: 'single', acceptedValues: ['1/2'], tolerance: 0 },
  },

  // PS-04
  {
    id: 'PS-04-EX8',
    topicIds: ['PS-04'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Làm tròn số 15,478 đến hàng phần trăm (2 chữ số sau dấu phẩy).',
    solutionSteps: [{ order: 1, content: 'Chữ số hàng phần nghìn là $8 \\ge 5$ nên làm tròn lên: $15{,}478 \\approx 15{,}48$.', rationale: 'Xét chữ số ngay sau hàng cần làm tròn.' }],
    numeric: { kind: 'single', acceptedValues: ['15.48', '15,48'], tolerance: 0 },
  },
  {
    id: 'PS-04-EX9',
    topicIds: ['PS-04'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'So sánh hai số thập phân 3,08 và 3,8, số nào lớn hơn?',
    solutionSteps: [{ order: 1, content: '$3{,}8=3{,}80$; so hàng phần mười: $8>0$ nên $3{,}8>3{,}08$.', rationale: 'Viết thêm chữ số 0 để so sánh cùng số chữ số thập phân.' }],
    mcq: { options: ['3,8', '3,08', 'Bằng nhau', 'Không xác định'], answerIndex: 0 },
  },

  // PS-05
  {
    id: 'PS-05-EX8',
    topicIds: ['PS-05'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tính: $12,5 + 7,35$.',
    solutionSteps: [{ order: 1, content: '$12{,}50+7{,}35=19{,}85$.', rationale: 'Đặt tính thẳng cột, cộng như số tự nhiên rồi đặt dấu phẩy.' }],
    numeric: { kind: 'single', acceptedValues: ['19.85', '19,85'], tolerance: 0 },
  },
  {
    id: 'PS-05-EX9',
    topicIds: ['PS-05'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tính: $8,4 \\times 5$.',
    solutionSteps: [{ order: 1, content: '$8{,}4\\times5=42$.', rationale: 'Nhân như số tự nhiên rồi đặt dấu phẩy đúng vị trí.' }],
    numeric: { kind: 'single', acceptedValues: ['42'], tolerance: 0 },
  },

  // PS-06
  {
    id: 'PS-06-EX8',
    topicIds: ['PS-06'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Chuyển phân số $\\dfrac{3}{4}$ thành số thập phân.',
    solutionSteps: [{ order: 1, content: '$\\dfrac{3}{4}=3:4=0{,}75$.', rationale: 'Lấy tử số chia cho mẫu số.' }],
    numeric: { kind: 'single', acceptedValues: ['0.75', '0,75'], tolerance: 0 },
  },
  {
    id: 'PS-06-EX9',
    topicIds: ['PS-06'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Chuyển số thập phân 0,6 thành tỉ số phần trăm.',
    solutionSteps: [{ order: 1, content: '$0{,}6=60\\%$ (nhân với $100$ rồi thêm dấu %).', rationale: 'Đổi số thập phân sang phần trăm bằng cách nhân 100.' }],
    numeric: { kind: 'single', acceptedValues: ['60'], tolerance: 0, unit: '%' },
  },

  // PS-07
  {
    id: 'PS-07-EX8',
    topicIds: ['PS-07'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Tính nhanh: $\\dfrac{1}{2}+\\dfrac{1}{4}+\\dfrac{1}{8}+\\dfrac{1}{16}$.',
    solutionSteps: [{ order: 1, content: 'Quy đồng mẫu $16$: $\\dfrac{8}{16}+\\dfrac{4}{16}+\\dfrac{2}{16}+\\dfrac{1}{16}=\\dfrac{15}{16}$ (hoặc nhận xét dãy có quy luật, tổng $=1-\\dfrac{1}{16}$).', rationale: 'Quy đồng mẫu số chung là 16 để cộng nhanh.' }],
    numeric: { kind: 'single', acceptedValues: ['15/16'], tolerance: 0 },
  },
  {
    id: 'PS-07-EX9',
    topicIds: ['PS-07'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Tính nhanh: $\\dfrac{1}{1\\times2}+\\dfrac{1}{2\\times3}+\\dfrac{1}{3\\times4}$.',
    solutionSteps: [
      { order: 1, content: 'Mỗi phân số dạng $\\dfrac{1}{n\\times(n+1)}=\\dfrac{1}{n}-\\dfrac{1}{n+1}$.', rationale: 'Áp dụng công thức tách phân số đặc biệt.' },
      { order: 2, content: 'Tổng $=\\left(1-\\dfrac{1}{2}\\right)+\\left(\\dfrac{1}{2}-\\dfrac{1}{3}\\right)+\\left(\\dfrac{1}{3}-\\dfrac{1}{4}\\right)=1-\\dfrac{1}{4}=\\dfrac{3}{4}$.', rationale: 'Các số hạng giữa triệt tiêu nhau (tính chất bắc cầu).' },
    ],
    numeric: { kind: 'single', acceptedValues: ['3/4'], tolerance: 0 },
  },

  // PS-08
  {
    id: 'PS-08-EX8',
    topicIds: ['PS-08'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tỉ số giữa số học sinh nam và nữ của một lớp là $3:4$. Lớp có 35 học sinh. Tính số học sinh nam.',
    solutionSteps: [
      { order: 1, content: 'Tổng số phần bằng nhau $=3+4=7$ phần; mỗi phần $=35:7=5$ học sinh.', rationale: 'Chia tổng số học sinh theo tổng số phần.' },
      { order: 2, content: 'Số nam $=3\\times5=15$.', rationale: 'Nam chiếm 3 phần.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['15'], tolerance: 0, isInteger: true },
  },
  {
    id: 'PS-08-EX9',
    topicIds: ['PS-08'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một đội bóng đá có tỉ số cầu thủ chính thức và dự bị là $11:7$. Nếu có 22 cầu thủ chính thức thì có bao nhiêu cầu thủ dự bị?',
    solutionSteps: [
      { order: 1, content: '$22=11\\times2$, nghĩa là mỗi "phần" ứng với $2$ cầu thủ.', rationale: 'Tìm giá trị 1 phần từ số cầu thủ chính thức đã biết.' },
      { order: 2, content: 'Số dự bị $=7\\times2=14$.', rationale: 'Dự bị chiếm 7 phần.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['14'], tolerance: 0, isInteger: true },
  },

  // PS-10
  {
    id: 'PS-10-EX8',
    topicIds: ['PS-10'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Giá một chiếc áo là 250.000 đồng, được giảm giá 20%. Tính giá sau khi giảm.',
    solutionSteps: [
      { order: 1, content: 'Số tiền giảm $=250\\,000\\times20\\%=50\\,000$đ.', rationale: 'Tính số tiền được giảm.' },
      { order: 2, content: 'Giá sau khi giảm $=250\\,000-50\\,000=200\\,000$đ.', rationale: 'Lấy giá gốc trừ số tiền giảm.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['200000'], tolerance: 0, isInteger: true, unit: 'đồng' },
  },
  {
    id: 'PS-10-EX9',
    topicIds: ['PS-10'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một cửa hàng bán được 80 sản phẩm trong tháng trước. Tháng này bán tăng 15% so với tháng trước. Tính số sản phẩm bán được tháng này.',
    solutionSteps: [
      { order: 1, content: 'Số sản phẩm tăng thêm $=80\\times15\\%=12$.', rationale: 'Tính số lượng tăng thêm.' },
      { order: 2, content: 'Số sản phẩm tháng này $=80+12=92$.', rationale: 'Lấy số cũ cộng số tăng thêm.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['92'], tolerance: 0, isInteger: true },
  },

  // PS-11
  {
    id: 'PS-11-EX8',
    topicIds: ['PS-11'],
    level: 'advanced',
    answerType: 'numeric',
    statement: '8kg dưa chuột tươi chứa 95% nước, phơi khô còn 10% nước. Tính khối lượng chất khô (không phải nước) trong 8kg dưa tươi.',
    solutionSteps: [{ order: 1, content: '$8\\times(100\\%-95\\%)=8\\times5\\%=0{,}4$kg.', rationale: 'Chất khô = khối lượng tươi nhân tỉ lệ không phải nước.' }],
    numeric: { kind: 'single', acceptedValues: ['0.4', '0,4'], tolerance: 0.01, unit: 'kg' },
  },
  {
    id: 'PS-11-EX9',
    topicIds: ['PS-11'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Trộn 4 lít nước đường nồng độ 15% với 6 lít nước đường nồng độ 25%. Tính nồng độ (%) của hỗn hợp sau khi trộn.',
    solutionSteps: [
      { order: 1, content: 'Lượng đường $=4\\times15\\%+6\\times25\\%=0{,}6+1{,}5=2{,}1$.', rationale: 'Cộng dồn chất tan của 2 dung dịch.' },
      { order: 2, content: 'Nồng độ sau trộn $=2{,}1:10=21\\%$.', rationale: 'Chia cho tổng thể tích (4+6=10 lít).' },
    ],
    numeric: { kind: 'single', acceptedValues: ['21'], tolerance: 0, unit: '%' },
  },
];
