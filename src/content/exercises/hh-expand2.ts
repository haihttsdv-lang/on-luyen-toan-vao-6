import type { Exercise } from '../../types';
import { rectangleFigure, squareFigure } from '../figures/rectangle';
import { shadedRegionFigure } from '../figures/shaded-region';

/** Đợt mở rộng thứ 2 cho các chuyên đề HH không ưu tiên, hướng dần tới 12–15 bài/chuyên đề. */
export const hhExpand2Exercises: Exercise[] = [
  // HH-01
  {
    id: 'HH-01-EX8',
    topicIds: ['HH-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một hình vuông được vẽ thêm 2 đường chéo. Hỏi hình đó có tất cả bao nhiêu hình tam giác?',
    solutionSteps: [
      { order: 1, content: '2 đường chéo chia hình vuông thành 4 tam giác nhỏ.', rationale: 'Đếm các tam giác đơn giản nhất.' },
      { order: 2, content: 'Ngoài ra còn 4 tam giác lớn hơn, mỗi tam giác là nửa hình vuông ghép bởi 2 tam giác nhỏ liền kề (tạo bởi 1 đường chéo và 2 cạnh vuông góc).', rationale: 'Đếm thêm các tam giác ghép từ 2 tam giác nhỏ.' },
      { order: 3, content: 'Tổng cộng: $4+4=8$ hình tam giác.', rationale: 'Cộng dồn.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['8'], tolerance: 0, isInteger: true },
  },
  {
    id: 'HH-01-EX9',
    topicIds: ['HH-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một góc vuông có số đo bằng bao nhiêu độ?',
    solutionSteps: [{ order: 1, content: 'Theo định nghĩa, góc vuông có số đo $90°$.', rationale: 'Ghi nhớ định nghĩa góc vuông.' }],
    numeric: { kind: 'single', acceptedValues: ['90'], tolerance: 0, isInteger: true, unit: 'độ' },
  },

  // HH-02
  {
    id: 'HH-02-EX8',
    topicIds: ['HH-02'],
    level: 'basic',
    answerType: 'numeric',
    figure: rectangleFigure('18 cm', '9 cm'),
    statement: 'Tính chu vi hình chữ nhật có chiều dài 18cm, chiều rộng 9cm.',
    solutionSteps: [{ order: 1, content: 'Chu vi $=(18+9)\\times2=54$cm.', rationale: 'Áp dụng công thức chu vi hình chữ nhật.' }],
    numeric: { kind: 'single', acceptedValues: ['54'], tolerance: 0, isInteger: true, unit: 'cm' },
  },
  {
    id: 'HH-02-EX9',
    topicIds: ['HH-02'],
    level: 'basic',
    answerType: 'numeric',
    figure: squareFigure('11 cm'),
    statement: 'Tính diện tích hình vuông cạnh 11cm.',
    solutionSteps: [{ order: 1, content: 'Diện tích $=11\\times11=121$cm².', rationale: 'Áp dụng công thức diện tích hình vuông.' }],
    numeric: { kind: 'single', acceptedValues: ['121'], tolerance: 0, isInteger: true },
  },

  // HH-05
  {
    id: 'HH-05-EX8',
    topicIds: ['HH-05'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Hình bình hành có đáy 14cm, chiều cao 6cm. Tính diện tích.',
    solutionSteps: [{ order: 1, content: 'Diện tích $=14\\times6=84$cm².', rationale: 'Áp dụng công thức diện tích hình bình hành: đáy nhân chiều cao.' }],
    numeric: { kind: 'single', acceptedValues: ['84'], tolerance: 0, isInteger: true },
  },
  {
    id: 'HH-05-EX9',
    topicIds: ['HH-05'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Hình thoi có hai đường chéo dài 10cm và 12cm. Tính diện tích.',
    solutionSteps: [{ order: 1, content: 'Diện tích $=(10\\times12):2=60$cm².', rationale: 'Áp dụng công thức diện tích hình thoi: tích hai đường chéo chia 2.' }],
    numeric: { kind: 'single', acceptedValues: ['60'], tolerance: 0, isInteger: true },
  },

  // HH-06
  {
    id: 'HH-06-EX8',
    topicIds: ['HH-06'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Hình tròn bán kính 5cm. Tính chu vi (lấy $\\pi=3{,}14$).',
    solutionSteps: [{ order: 1, content: 'Chu vi $=2\\times5\\times3{,}14=31{,}4$cm.', rationale: 'Áp dụng công thức chu vi hình tròn: $2\\times r\\times\\pi$.' }],
    numeric: { kind: 'single', acceptedValues: ['31.4', '31,4'], tolerance: 0, unit: 'cm' },
  },
  {
    id: 'HH-06-EX9',
    topicIds: ['HH-06'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Hình tròn đường kính 10cm. Tính diện tích (lấy $\\pi=3{,}14$).',
    solutionSteps: [
      { order: 1, content: 'Bán kính $=10:2=5$cm.', rationale: 'Bán kính bằng nửa đường kính.' },
      { order: 2, content: 'Diện tích $=5\\times5\\times3{,}14=78{,}5$cm².', rationale: 'Áp dụng công thức diện tích hình tròn: $r\\times r\\times\\pi$.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['78.5', '78,5'], tolerance: 0 },
  },

  // HH-07
  {
    id: 'HH-07-EX8',
    topicIds: ['HH-07'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Hình hộp chữ nhật có chiều dài 8cm, rộng 5cm, cao 4cm. Tính thể tích.',
    solutionSteps: [{ order: 1, content: 'Thể tích $=8\\times5\\times4=160$cm³.', rationale: 'Áp dụng công thức thể tích hình hộp chữ nhật.' }],
    numeric: { kind: 'single', acceptedValues: ['160'], tolerance: 0, isInteger: true },
  },
  {
    id: 'HH-07-EX9',
    topicIds: ['HH-07'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Hình lập phương cạnh 6cm. Tính diện tích toàn phần.',
    solutionSteps: [{ order: 1, content: 'Diện tích toàn phần $=6\\times(6\\times6)=6\\times36=216$cm².', rationale: 'Diện tích toàn phần = 6 lần diện tích một mặt.' }],
    numeric: { kind: 'single', acceptedValues: ['216'], tolerance: 0, isInteger: true },
  },

  // HH-08
  {
    id: 'HH-08-EX8',
    topicIds: ['HH-08'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một hình chữ nhật có chiều dài 16cm, rộng 10cm. Nếu tăng chiều dài thêm 4cm và giữ nguyên chiều rộng thì diện tích tăng thêm bao nhiêu cm²?',
    solutionSteps: [
      { order: 1, content: 'Diện tích ban đầu $=16\\times10=160$cm²; diện tích mới $=(16+4)\\times10=200$cm².', rationale: 'Tính diện tích trước và sau khi thay đổi.' },
      { order: 2, content: 'Diện tích tăng thêm $=200-160=40$cm² (chính là phần hình chữ nhật thêm vào, kích thước $4\\times10$).', rationale: 'Lấy diện tích mới trừ diện tích cũ.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['40'], tolerance: 0, isInteger: true },
  },
  {
    id: 'HH-08-EX9',
    topicIds: ['HH-08'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một hình vuông cạnh 8cm. Nếu tăng cạnh thêm 2cm thì diện tích tăng thêm bao nhiêu cm²?',
    solutionSteps: [
      { order: 1, content: 'Diện tích ban đầu $=8\\times8=64$cm²; diện tích mới $=10\\times10=100$cm².', rationale: 'Tính diện tích trước và sau khi thay đổi.' },
      { order: 2, content: 'Diện tích tăng thêm $=100-64=36$cm².', rationale: 'Lấy diện tích mới trừ diện tích cũ.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['36'], tolerance: 0, isInteger: true },
  },

  // HH-10
  {
    id: 'HH-10-EX8',
    topicIds: ['HH-10'],
    level: 'advanced',
    answerType: 'numeric',
    figure: shadedRegionFigure(18, 12, { kind: 'triangle', base: 8, height: 6, label: 'đáy 8, cao 6' }),
    statement: 'Hình chữ nhật dài 18cm, rộng 12cm, bên trong cắt bỏ một hình tam giác có đáy 8cm, chiều cao 6cm (không tô đậm). Tính diện tích phần tô đậm còn lại.',
    solutionSteps: [
      { order: 1, content: 'Diện tích hình chữ nhật $=18\\times12=216$cm².', rationale: 'Tính diện tích hình lớn.' },
      { order: 2, content: 'Diện tích tam giác $=8\\times6:2=24$cm².', rationale: 'Tính diện tích phần bị cắt.' },
      { order: 3, content: 'Diện tích tô đậm $=216-24=192$cm².', rationale: 'Lấy diện tích lớn trừ phần bị cắt.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['192'], tolerance: 0, isInteger: true },
  },
  {
    id: 'HH-10-EX9',
    topicIds: ['HH-10'],
    level: 'advanced',
    answerType: 'numeric',
    figure: shadedRegionFigure(16, 16, { kind: 'circle', radius: 8, label: 'r=8' }),
    statement: 'Hình vuông cạnh 16cm chứa một hình tròn bán kính 8cm nội tiếp (không tô đậm). Tính diện tích phần tô đậm còn lại, lấy $\\pi=3{,}14$.',
    solutionSteps: [
      { order: 1, content: 'Diện tích hình vuông $=16\\times16=256$cm².', rationale: 'Tính diện tích hình lớn.' },
      { order: 2, content: 'Diện tích hình tròn $=8\\times8\\times3{,}14=200{,}96$cm².', rationale: 'Tính diện tích phần bị cắt.' },
      { order: 3, content: 'Diện tích tô đậm $=256-200{,}96=55{,}04$cm².', rationale: 'Lấy diện tích lớn trừ phần bị cắt.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['55.04'], tolerance: 0 },
  },

  // HH-11
  {
    id: 'HH-11-EX8',
    topicIds: ['HH-11'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một bể cá đáy dài 40cm, rộng 25cm. Thả một hòn đá vào bể làm mực nước dâng lên 5cm. Tính thể tích hòn đá.',
    solutionSteps: [{ order: 1, content: '$40\\times25\\times5=5000$cm³.', rationale: 'Thể tích nước dâng lên bằng thể tích hòn đá.' }],
    numeric: { kind: 'single', acceptedValues: ['5000'], tolerance: 0, isInteger: true },
  },
  {
    id: 'HH-11-EX9',
    topicIds: ['HH-11'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một bể nước đáy dài 50cm, rộng 40cm. Người ta thả vào bể một khối kim loại có thể tích 4000cm³ (chìm hoàn toàn). Hỏi mực nước dâng lên bao nhiêu cm?',
    solutionSteps: [{ order: 1, content: 'Diện tích đáy bể $=50\\times40=2000$cm²; mực nước dâng $=4000:2000=2$cm.', rationale: 'Chia thể tích vật cho diện tích đáy bể.' }],
    numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true, unit: 'cm' },
  },

  // HH-12
  {
    id: 'HH-12-EX7',
    topicIds: ['HH-12'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Khối lập phương cạnh 5cm được sơn 6 mặt rồi cắt thành 125 khối nhỏ cạnh 1cm. Có bao nhiêu khối sơn đúng 2 mặt?',
    solutionSteps: [{ order: 1, content: 'Áp dụng công thức: $12\\times(n-2)$ với $n=5$: $12\\times3=36$.', rationale: 'Khối 2 mặt nằm ở cạnh, không phải góc.' }],
    numeric: { kind: 'single', acceptedValues: ['36'], tolerance: 0, isInteger: true },
  },
  {
    id: 'HH-12-EX8',
    topicIds: ['HH-12'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một khối hộp chữ nhật kích thước 5×4×3 (đơn vị: khối lập phương cạnh 1cm) được sơn 6 mặt rồi cắt rời thành các khối lập phương cạnh 1cm. Có bao nhiêu khối không sơn mặt nào?',
    solutionSteps: [{ order: 1, content: 'Áp dụng công thức $(a-2)(b-2)(c-2)$ với $a=5,b=4,c=3$: $3\\times2\\times1=6$.', rationale: 'Khối 0 mặt nằm hoàn toàn bên trong.' }],
    numeric: { kind: 'single', acceptedValues: ['6'], tolerance: 0, isInteger: true },
  },
];
