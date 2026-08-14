import type { Exercise } from '../../types';

/** Đợt mở rộng thứ 2 cho các chuyên đề DL không ưu tiên, hướng dần tới 12–15 bài/chuyên đề. */
export const dlExpand2Exercises: Exercise[] = [
  // DL-01
  {
    id: 'DL-01-EX8',
    topicIds: ['DL-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Đổi 3,5km sang mét.',
    solutionSteps: [{ order: 1, content: '$3{,}5$km $=3{,}5\\times1000=3500$m.', rationale: '1km = 1000m.' }],
    numeric: { kind: 'single', acceptedValues: ['3500'], tolerance: 0, isInteger: true, unit: 'm' },
  },
  {
    id: 'DL-01-EX9',
    topicIds: ['DL-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Đổi 2400g sang kg.',
    solutionSteps: [{ order: 1, content: '$2400$g $=2400:1000=2{,}4$kg.', rationale: '1kg = 1000g.' }],
    numeric: { kind: 'single', acceptedValues: ['2.4', '2,4'], tolerance: 0, unit: 'kg' },
  },

  // DL-02
  {
    id: 'DL-02-EX8',
    topicIds: ['DL-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Đổi 5m² sang dm².',
    solutionSteps: [{ order: 1, content: '$5$m² $=5\\times100=500$dm².', rationale: '1m² = 100dm².' }],
    numeric: { kind: 'single', acceptedValues: ['500'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DL-02-EX9',
    topicIds: ['DL-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Đổi 3ha sang m².',
    solutionSteps: [{ order: 1, content: '$3$ha $=3\\times10\\,000=30\\,000$m².', rationale: '1ha = 10 000m².' }],
    numeric: { kind: 'single', acceptedValues: ['30000'], tolerance: 0, isInteger: true },
  },

  // DL-03
  {
    id: 'DL-03-EX8',
    topicIds: ['DL-03'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Đổi 2,5m³ sang dm³.',
    solutionSteps: [{ order: 1, content: '$2{,}5$m³ $=2{,}5\\times1000=2500$dm³.', rationale: '1m³ = 1000dm³.' }],
    numeric: { kind: 'single', acceptedValues: ['2500'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DL-03-EX9',
    topicIds: ['DL-03'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Đổi 4500cm³ sang lít.',
    solutionSteps: [{ order: 1, content: '$1$ lít $=1000$cm³; $4500$cm³ $=4500:1000=4{,}5$ lít.', rationale: 'Quy đổi theo mốc 1 lít = 1000cm³.' }],
    numeric: { kind: 'single', acceptedValues: ['4.5', '4,5'], tolerance: 0, unit: 'lít' },
  },

  // DL-04
  {
    id: 'DL-04-EX8',
    topicIds: ['DL-04'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Đổi 3 giờ 15 phút sang phút.',
    solutionSteps: [{ order: 1, content: '$3$ giờ $=180$ phút; $180+15=195$ phút.', rationale: '1 giờ = 60 phút.' }],
    numeric: { kind: 'single', acceptedValues: ['195'], tolerance: 0, isInteger: true, unit: 'phút' },
  },
  {
    id: 'DL-04-EX9',
    topicIds: ['DL-04'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một trận đấu bóng đá bắt đầu lúc 15 giờ 30 phút, kết thúc lúc 17 giờ 15 phút. Trận đấu kéo dài bao nhiêu phút?',
    solutionSteps: [
      { order: 1, content: 'Từ $15$h$30$ đến $17$h$30$ là $2$ giờ $=120$ phút.', rationale: 'Tính khoảng thời gian tròn giờ trước.' },
      { order: 2, content: 'Trận đấu kết thúc sớm hơn $15$ phút (lúc $17$h$15$), nên thời lượng $=120-15=105$ phút.', rationale: 'Trừ đi phần chênh lệch còn lại.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['105'], tolerance: 0, isInteger: true, unit: 'phút' },
  },

  // DL-05
  {
    id: 'DL-05-EX8',
    topicIds: ['DL-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Bản đồ tỉ lệ $1:1\\,000\\,000$. Khoảng cách trên bản đồ là 3,5cm. Tính khoảng cách thực tế (km).',
    solutionSteps: [
      { order: 1, content: 'Khoảng cách thực tế $=3{,}5\\times1\\,000\\,000=3\\,500\\,000$cm.', rationale: 'Nhân khoảng cách trên bản đồ với tỉ lệ.' },
      { order: 2, content: 'Đổi ra km: $3\\,500\\,000$cm $=35$km.', rationale: '1km = 100 000cm.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['35'], tolerance: 0, isInteger: true, unit: 'km' },
  },
  {
    id: 'DL-05-EX9',
    topicIds: ['DL-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Khoảng cách thực tế giữa 2 địa điểm là 60km. Trên bản đồ tỉ lệ $1:2\\,000\\,000$, khoảng cách đó là bao nhiêu cm?',
    solutionSteps: [
      { order: 1, content: 'Đổi $60$km ra cm: $60\\times100\\,000=6\\,000\\,000$cm.', rationale: '1km = 100 000cm.' },
      { order: 2, content: 'Khoảng cách trên bản đồ $=6\\,000\\,000:2\\,000\\,000=3$cm.', rationale: 'Chia cho tỉ lệ bản đồ.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['3'], tolerance: 0, isInteger: true, unit: 'cm' },
  },

  // DL-06
  {
    id: 'DL-06-EX8',
    topicIds: ['DL-06'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một quyển sách giá 45.000 đồng. Mua 6 quyển thì hết bao nhiêu tiền?',
    solutionSteps: [{ order: 1, content: '$45\\,000\\times6=270\\,000$đ.', rationale: 'Nhân đơn giá với số lượng.' }],
    numeric: { kind: 'single', acceptedValues: ['270000'], tolerance: 0, isInteger: true, unit: 'đồng' },
  },
  {
    id: 'DL-06-EX9',
    topicIds: ['DL-06'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một hóa đơn tiền điện tháng này là 850.000 đồng, tháng trước là 720.000 đồng. Hỏi tháng này tăng bao nhiêu so với tháng trước?',
    solutionSteps: [{ order: 1, content: '$850\\,000-720\\,000=130\\,000$đ.', rationale: 'Lấy hóa đơn tháng này trừ tháng trước.' }],
    numeric: { kind: 'single', acceptedValues: ['130000'], tolerance: 0, isInteger: true, unit: 'đồng' },
  },

  // DL-07
  {
    id: 'DL-07-EX7',
    topicIds: ['DL-07'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Bảng số bàn thắng ghi được của 4 cầu thủ trong mùa giải: Nam 12 bàn, Long 15 bàn, Khoa 9 bàn, Minh 18 bàn. Tính tổng số bàn thắng của cả 4 cầu thủ.',
    solutionSteps: [{ order: 1, content: '$12+15+9+18=54$.', rationale: 'Cộng tất cả các giá trị trong bảng.' }],
    numeric: { kind: 'single', acceptedValues: ['54'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DL-07-EX8',
    topicIds: ['DL-07'],
    level: 'advanced',
    answerType: 'mcq',
    statement: 'Theo bảng ở trên (Nam 12, Long 15, Khoa 9, Minh 18 bàn thắng), ai ghi được nhiều bàn thắng nhất?',
    solutionSteps: [{ order: 1, content: 'So sánh các giá trị: $12, 15, 9, 18$. Lớn nhất là $18$, ứng với Minh.', rationale: 'Tìm giá trị lớn nhất trong bảng.' }],
    mcq: { options: ['Minh', 'Nam', 'Long', 'Khoa'], answerIndex: 0 },
  },

  // DL-08
  {
    id: 'DL-08-EX8',
    topicIds: ['DL-08'],
    level: 'advanced',
    answerType: 'mcq',
    statement: 'Ngày 1/9/2024 là Chủ Nhật. Hỏi ngày 15/9/2024 là thứ mấy?',
    solutionSteps: [
      { order: 1, content: 'Khoảng cách: $15-1=14$ ngày.', rationale: 'Tính số ngày sau.' },
      { order: 2, content: '$14:7=2$ dư $0$, nghĩa là đúng 2 tuần sau, cùng thứ.', rationale: 'Số dư 0 nghĩa là trùng thứ với ngày ban đầu.' },
    ],
    mcq: { options: ['Chủ Nhật', 'Thứ Bảy', 'Thứ Hai', 'Thứ Sáu'], answerIndex: 0 },
  },
  {
    id: 'DL-08-EX9',
    topicIds: ['DL-08'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Tính góc giữa kim giờ và kim phút lúc 7 giờ đúng.',
    solutionSteps: [
      { order: 1, content: 'Áp dụng công thức với $H=7,M=0$: $|30\\times7-0|=210°$.', rationale: 'Thay số vào công thức.' },
      { order: 2, content: 'Vì $210°>180°$ nên góc thực tế $=360°-210°=150°$.', rationale: 'Lấy góc nhỏ hơn giữa hai kim.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['150'], tolerance: 0, isInteger: true, unit: 'độ' },
  },
];
