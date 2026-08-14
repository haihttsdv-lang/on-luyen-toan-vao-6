import type { Exercise } from '../../types';

/** Đợt mở rộng thứ 2 cho các chuyên đề DH không ưu tiên, hướng dần tới 12–15 bài/chuyên đề. */
export const dhExpand2Exercises: Exercise[] = [
  // DH-04: hai tỉ số
  {
    id: 'DH-04-EX8',
    topicIds: ['DH-04'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Số kẹo và bánh có tỉ số $2:3$. Nếu ăn hết 8 cái kẹo thì tỉ số kẹo và bánh là $1:3$. Tính số cái bánh (không đổi).',
    solutionSteps: [
      { order: 1, content: 'Gọi kẹo $=2k \\to 2k-8$, bánh $=3k$ (không đổi): $(2k-8):3k=1:3$.', rationale: 'Lập phương trình theo tỉ số mới.' },
      { order: 2, content: '$3(2k-8)=3k \\Rightarrow 6k-24=3k \\Rightarrow k=8$.', rationale: 'Giải tìm k.' },
      { order: 3, content: 'Số bánh $=3\\times8=24$.', rationale: 'Kết luận.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['24'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-04-EX9',
    topicIds: ['DH-04'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Số quyển truyện tranh và truyện chữ có tỉ số $7:4$. Nếu mua thêm 8 quyển truyện chữ thì tỉ số truyện tranh và truyện chữ là $7:6$. Tính số truyện tranh (không đổi).',
    solutionSteps: [
      { order: 1, content: 'Gọi truyện tranh $=7k$ (không đổi), truyện chữ $=4k \\to 4k+8$: $7k:(4k+8)=7:6$.', rationale: 'Lập phương trình theo tỉ số mới.' },
      { order: 2, content: '$6\\times7k=7\\times(4k+8) \\Rightarrow 42k=28k+56 \\Rightarrow k=4$.', rationale: 'Giải tìm k.' },
      { order: 3, content: 'Số truyện tranh $=7\\times4=28$.', rationale: 'Kết luận.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['28'], tolerance: 0, isInteger: true },
  },

  // DH-05: hai hiệu số
  {
    id: 'DH-05-EX4',
    topicIds: ['DH-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Mua 5kg cam và 3kg xoài hết 310 000đ. Mua 5kg cam và 8kg xoài hết 510 000đ. Tính giá 1kg xoài.',
    solutionSteps: [
      { order: 1, content: 'Số cam bằng nhau (5kg); chênh lệch xoài $=8-3=5$kg, chênh lệch tiền $=510\\,000-310\\,000=200\\,000$đ.', rationale: 'Xác định đại lượng không đổi và tính hai hiệu số.' },
      { order: 2, content: 'Giá 1kg xoài $=200\\,000:5=40\\,000$đ.', rationale: 'Chia chênh lệch tiền cho chênh lệch số lượng.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['40000'], tolerance: 0, isInteger: true, unit: 'đồng' },
  },
  {
    id: 'DH-05-EX5',
    topicIds: ['DH-05'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Mua 8 vé xem phim loại thường và 3 vé loại VIP hết 970 000đ. Mua 8 vé loại thường và 7 vé loại VIP hết 1 610 000đ. Tính giá 1 vé VIP.',
    solutionSteps: [
      { order: 1, content: 'Số vé thường bằng nhau (8 vé); chênh lệch vé VIP $=7-3=4$, chênh lệch tiền $=1\\,610\\,000-970\\,000=640\\,000$đ.', rationale: 'Xác định đại lượng không đổi và tính hai hiệu số.' },
      { order: 2, content: 'Giá 1 vé VIP $=640\\,000:4=160\\,000$đ.', rationale: 'Chia chênh lệch tiền cho chênh lệch số lượng.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['160000'], tolerance: 0, isInteger: true, unit: 'đồng' },
  },

  // DH-10: trồng cây
  {
    id: 'DH-10-EX4',
    topicIds: ['DH-10'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một con đường dài 120m, trồng cây ở cả hai đầu, khoảng cách 8m. Hỏi cần bao nhiêu cây?',
    solutionSteps: [{ order: 1, content: '$120:8+1=16$ cây.', rationale: 'Đường thẳng có 2 đầu nên cộng thêm 1.' }],
    numeric: { kind: 'single', acceptedValues: ['16'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-10-EX5',
    topicIds: ['DH-10'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Trồng cây quanh một hồ nước hình tròn có chu vi 150m, khoảng cách 5m. Hỏi cần bao nhiêu cây?',
    solutionSteps: [{ order: 1, content: 'Đường khép kín: $150:5=30$ cây.', rationale: 'Không cộng thêm 1 vì đường khép kín.' }],
    numeric: { kind: 'single', acceptedValues: ['30'], tolerance: 0, isInteger: true },
  },

  // DH-11: giả thiết tạm
  {
    id: 'DH-11-EX8',
    topicIds: ['DH-11'],
    level: 'advanced',
    answerType: 'numeric',
    hint: 'Thử giả sử TẤT CẢ đều là gà (loại có ít chân hơn), tính xem số chân thiếu bao nhiêu so với thực tế — phần thiếu đó chia cho mức chênh lệch chân giữa chó và gà sẽ ra số con chó.',
    statement: 'Vừa gà vừa chó có 36 con và 100 chân. Tính số con chó.',
    solutionSteps: [
      { order: 1, content: 'Giả sử tất cả là gà: $36\\times2=72$ chân; thiếu $100-72=28$ chân.', rationale: 'Giả thiết tạm toàn bộ là gà.' },
      { order: 2, content: 'Mỗi con chó hơn gà 2 chân; số chó $=28:2=14$.', rationale: 'Chia số chân thiếu cho mức chênh lệch mỗi con.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['14'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-11-EX9',
    topicIds: ['DH-11'],
    level: 'advanced',
    answerType: 'numeric',
    hint: 'Thử giả sử TẤT CẢ đều là hạc (loại có ít chân hơn), tính xem số chân thiếu bao nhiêu so với thực tế — phần thiếu đó chia cho mức chênh lệch chân giữa rùa và hạc sẽ ra số con rùa.',
    statement: 'Có một số con hạc (2 chân) và con rùa (4 chân), tất cả có 20 con và 56 chân. Tính số con rùa.',
    solutionSteps: [
      { order: 1, content: 'Giả sử tất cả là hạc: $20\\times2=40$ chân; thiếu $56-40=16$ chân.', rationale: 'Giả thiết tạm toàn bộ là hạc.' },
      { order: 2, content: 'Mỗi con rùa hơn hạc 2 chân; số rùa $=16:2=8$.', rationale: 'Chia số chân thiếu cho mức chênh lệch mỗi con.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['8'], tolerance: 0, isInteger: true },
  },

  // DH-12: tính ngược từ cuối
  {
    id: 'DH-12-EX8',
    topicIds: ['DH-12'],
    level: 'advanced',
    answerType: 'numeric',
    hint: 'Làm ngược lại các phép tính theo đúng thứ tự ngược của đề bài — phép tính nào làm SAU thì tính ngược TRƯỚC.',
    statement: 'Một số, sau khi cộng 12 rồi nhân 3 thì được 51. Tìm số ban đầu.',
    solutionSteps: [
      { order: 1, content: 'Trước khi nhân $3$ để được $51$, số đó là $51:3=17$.', rationale: 'Tính ngược phép nhân thành phép chia.' },
      { order: 2, content: 'Trước khi cộng $12$ để được $17$, số ban đầu là $17-12=5$.', rationale: 'Tính ngược phép cộng thành phép trừ.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['5'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-12-EX9',
    topicIds: ['DH-12'],
    level: 'advanced',
    answerType: 'numeric',
    hint: 'Làm ngược lại các phép tính theo đúng thứ tự ngược của đề bài — phép tính nào làm SAU thì tính ngược TRƯỚC.',
    statement: 'Một số, sau khi nhân 6 rồi trừ 8 thì được 40. Tìm số ban đầu.',
    solutionSteps: [
      { order: 1, content: 'Trước khi trừ $8$ để được $40$, số đó là $40+8=48$.', rationale: 'Tính ngược phép trừ thành phép cộng.' },
      { order: 2, content: 'Trước khi nhân $6$ để được $48$, số ban đầu là $48:6=8$.', rationale: 'Tính ngược phép nhân thành phép chia.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['8'], tolerance: 0, isInteger: true },
  },

  // DH-13: tỉ lệ thuận/nghịch, rút về đơn vị
  {
    id: 'DH-13-EX4',
    topicIds: ['DH-13'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Mua 6 quả bóng hết 90 000đ. Hỏi mua 10 quả bóng hết bao nhiêu tiền?',
    solutionSteps: [{ order: 1, content: 'Giá 1 quả $=90\\,000:6=15\\,000$đ; 10 quả hết $15\\,000\\times10=150\\,000$đ.', rationale: 'Rút về đơn vị rồi nhân với số lượng cần tìm.' }],
    numeric: { kind: 'single', acceptedValues: ['150000'], tolerance: 0, isInteger: true, unit: 'đồng' },
  },
  {
    id: 'DH-13-EX5',
    topicIds: ['DH-13'],
    level: 'basic',
    answerType: 'numeric',
    statement: '8 công nhân xây xong một bức tường trong 15 ngày. Hỏi 12 công nhân xây xong bức tường đó trong bao nhiêu ngày (năng suất như nhau)?',
    solutionSteps: [{ order: 1, content: 'Người-ngày $=8\\times15=120$; với 12 người: $120:12=10$ ngày.', rationale: 'Tỉ lệ nghịch giữa số người và thời gian.' }],
    numeric: { kind: 'single', acceptedValues: ['10'], tolerance: 0, isInteger: true },
  },

  // DH-14: năng suất, mật độ
  {
    id: 'DH-14-EX4',
    topicIds: ['DH-14'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một đội thợ may may được 450 chiếc áo trong 5 ngày. Tính năng suất (áo/ngày).',
    solutionSteps: [{ order: 1, content: '$450:5=90$ áo/ngày.', rationale: 'Chia khối lượng công việc cho thời gian.' }],
    numeric: { kind: 'single', acceptedValues: ['90'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-14-EX5',
    topicIds: ['DH-14'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Với năng suất 90 áo/ngày, đội thợ đó may được bao nhiêu áo trong 8 ngày?',
    solutionSteps: [{ order: 1, content: '$90\\times8=720$ áo.', rationale: 'Nhân năng suất với thời gian.' }],
    numeric: { kind: 'single', acceptedValues: ['720'], tolerance: 0, isInteger: true },
  },

  // DH-15: tỉ lệ kép
  {
    id: 'DH-15-EX7',
    topicIds: ['DH-15'],
    level: 'advanced',
    answerType: 'numeric',
    statement: '7 người làm trong 9 ngày thì xong một công việc. Hỏi 9 người làm (năng suất như nhau) thì mất bao nhiêu ngày để xong công việc đó?',
    solutionSteps: [
      { order: 1, content: 'Tổng công việc: $7\\times9=63$ (người-ngày).', rationale: 'Tổng công việc không đổi.' },
      { order: 2, content: 'Số ngày với 9 người: $63:9=7$ ngày.', rationale: 'Chia tổng công việc cho số người mới.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['7'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-15-EX8',
    topicIds: ['DH-15'],
    level: 'advanced',
    answerType: 'numeric',
    statement: '3 máy in trong 4 giờ in được 600 tờ. Hỏi 5 máy in trong 6 giờ in được bao nhiêu tờ (năng suất mỗi máy như nhau)?',
    solutionSteps: [
      { order: 1, content: '1 máy in trong 1 giờ in được: $600:(3\\times4)=50$ tờ.', rationale: 'Quy về năng suất đơn vị.' },
      { order: 2, content: '5 máy in trong 6 giờ in được: $50\\times5\\times6=1500$ tờ.', rationale: 'Nhân năng suất đơn vị với số liệu mới.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['1500'], tolerance: 0, isInteger: true },
  },

  // DH-16: phương pháp khử
  {
    id: 'DH-16-EX7',
    topicIds: ['DH-16'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Mua 4 quyển vở và 2 cái thước hết 38.000 đồng. Mua 4 quyển vở và 5 cái thước hết 68.000 đồng. Tính giá 1 cái thước.',
    solutionSteps: [
      { order: 1, content: 'Chênh lệch thước: $5-2=3$, chênh lệch tiền: $68\\,000-38\\,000=30\\,000$ đồng.', rationale: 'Khử đại lượng vở (bằng nhau ở 2 lần mua).' },
      { order: 2, content: 'Giá 1 cái thước $=30\\,000:3=10\\,000$ đồng.', rationale: 'Chia chênh lệch tiền cho chênh lệch số thước.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['10000'], tolerance: 0, isInteger: true, unit: 'đồng' },
  },
  {
    id: 'DH-16-EX8',
    topicIds: ['DH-16'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Mua 4 quyển vở và 2 cái thước hết 38.000 đồng. Mua 4 quyển vở và 5 cái thước hết 68.000 đồng. Tính giá 1 quyển vở.',
    solutionSteps: [
      { order: 1, content: 'Giá 1 cái thước $=10\\,000$ đồng (tính như bài trước).', rationale: 'Dùng kết quả đã tìm được.' },
      { order: 2, content: '$4$ quyển vở $=38\\,000-2\\times10\\,000=18\\,000$ đồng.', rationale: 'Thay ngược vào phương trình ban đầu.' },
      { order: 3, content: 'Giá 1 quyển vở $=18\\,000:4=4\\,500$ đồng.', rationale: 'Chia đều cho 4 quyển vở.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['4500'], tolerance: 0, isInteger: true, unit: 'đồng' },
  },

  // DH-17: chuyển động đặc biệt
  {
    id: 'DH-17-EX7',
    topicIds: ['DH-17'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Một đoàn tàu dài 180m chạy qua một cột điện hết 9 giây. Tính vận tốc đoàn tàu.',
    solutionSteps: [{ order: 1, content: '$180:9=20$m/giây.', rationale: 'Vận tốc = chiều dài tàu : thời gian (qua cột mốc).' }],
    numeric: { kind: 'single', acceptedValues: ['20'], tolerance: 0, isInteger: true, unit: 'm/giây' },
  },
  {
    id: 'DH-17-EX8',
    topicIds: ['DH-17'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Hai xe đạp cùng xuất phát từ một điểm trên đường đua vòng tròn dài 500m, đi cùng chiều. Xe A vận tốc 6m/giây, xe B vận tốc 4m/giây. Sau bao lâu xe A vượt xe B đúng 1 vòng?',
    solutionSteps: [
      { order: 1, content: 'Hiệu vận tốc $=6-4=2$m/giây.', rationale: 'Đi cùng chiều nên dùng hiệu vận tốc.' },
      { order: 2, content: 'Thời gian $=500:2=250$ giây.', rationale: 'Chu vi chia cho hiệu vận tốc.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['250'], tolerance: 0, isInteger: true, unit: 'giây' },
  },
];
