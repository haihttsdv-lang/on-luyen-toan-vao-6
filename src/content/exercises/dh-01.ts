import type { Exercise } from '../../types';

export const dh01Exercises: Exercise[] = [
  {
    id: 'DH-01-EX1',
    topicIds: ['DH-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tổng hai số là $96$, hiệu hai số là $18$. Tìm số bé.',
    solutionSteps: [
      { order: 1, content: 'Số bé $= (96 - 18) : 2 = 78 : 2 = 39$.', rationale: 'Áp dụng công thức số bé = (Tổng - Hiệu) : 2.' },
      { order: 2, content: 'Vậy số bé cần tìm là $39$.', rationale: 'Kết luận.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['39'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-01-EX2',
    topicIds: ['DH-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tổng hai số là $96$, hiệu hai số là $18$. Tìm số lớn.',
    solutionSteps: [
      { order: 1, content: 'Số lớn $= (96 + 18) : 2 = 114 : 2 = 57$.', rationale: 'Áp dụng công thức số lớn = (Tổng + Hiệu) : 2.' },
      { order: 2, content: 'Kiểm tra: $57 - 39 = 18$ (đúng hiệu), $57 + 39 = 96$ (đúng tổng).', rationale: 'Đối chiếu lại với đề bài.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['57'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-01-EX3',
    topicIds: ['DH-01'],
    level: 'basic',
    answerType: 'numeric',
    statement:
      'Hai thùng dầu chứa tổng cộng $120$ lít. Thùng thứ nhất chứa nhiều hơn thùng thứ hai $24$ lít. Hỏi thùng thứ nhất chứa bao nhiêu lít dầu?',
    solutionSteps: [
      { order: 1, content: 'Thùng thứ nhất là số lớn: $(120 + 24) : 2 = 144 : 2 = 72$ (lít).', rationale: 'Thùng chứa nhiều dầu hơn ứng với số lớn trong bài toán tổng - hiệu.' },
      { order: 2, content: 'Vậy thùng thứ nhất chứa $72$ lít dầu.', rationale: 'Kết luận.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['72'], tolerance: 0, isInteger: true, unit: 'lít' },
  },
  {
    id: 'DH-01-EX4',
    topicIds: ['DH-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tuổi bố cộng tuổi con là $58$ tuổi. Bố hơn con $32$ tuổi. Tính tuổi con.',
    solutionSteps: [
      { order: 1, content: 'Tuổi con là số bé: $(58 - 32) : 2 = 26 : 2 = 13$ (tuổi).', rationale: 'Con ít tuổi hơn nên ứng với số bé.' },
      { order: 2, content: 'Vậy con năm nay $13$ tuổi.', rationale: 'Kết luận.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['13'], tolerance: 0, isInteger: true, unit: 'tuổi' },
  },
  {
    id: 'DH-01-EX5',
    topicIds: ['DH-01'],
    level: 'advanced',
    answerType: 'numeric',
    statement: 'Tổng của hai số chẵn liên tiếp là $98$. Tìm số bé trong hai số đó.',
    solutionSteps: [
      { order: 1, content: 'Hai số chẵn liên tiếp hơn kém nhau $2$ đơn vị, nên hiệu hai số là $2$.', rationale: 'Nhận diện dữ kiện hiệu ẩn trong đề bài.' },
      { order: 2, content: 'Số bé $= (98 - 2) : 2 = 96 : 2 = 48$.', rationale: 'Áp dụng công thức tìm số bé khi biết tổng và hiệu.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['48'], tolerance: 0, isInteger: true },
  },
  {
    id: 'DH-01-EX6',
    topicIds: ['DH-01'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Biết tổng hai số là $40$, hiệu hai số là $8$. Số lớn là số nào?',
    solutionSteps: [
      { order: 1, content: 'Số lớn $= (40 + 8) : 2 = 48 : 2 = 24$.', rationale: 'Áp dụng công thức số lớn = (Tổng + Hiệu) : 2.' },
    ],
    mcq: { options: ['16', '24', '20', '32'], answerIndex: 1 },
  },
];
