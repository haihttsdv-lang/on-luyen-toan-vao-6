import type { Exercise } from '../../types';
import { rectangleFigure, squareFigure } from '../figures/rectangle';

export const hh02Exercises: Exercise[] = [
  {
    id: 'HH-02-EX1',
    topicIds: ['HH-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một hình chữ nhật có chiều dài $12\\,cm$, chiều rộng $7\\,cm$. Tính chu vi hình đó.',
    figure: rectangleFigure('12 cm', '7 cm'),
    solutionSteps: [
      { order: 1, content: 'Chu vi $= (12 + 7) \\times 2 = 38\\,cm$.', rationale: 'Áp dụng công thức chu vi hình chữ nhật.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['38'], tolerance: 0, isInteger: true, unit: 'cm' },
  },
  {
    id: 'HH-02-EX2',
    topicIds: ['HH-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một hình chữ nhật có chiều dài $12\\,cm$, chiều rộng $7\\,cm$. Tính diện tích hình đó.',
    figure: rectangleFigure('12 cm', '7 cm'),
    solutionSteps: [
      { order: 1, content: 'Diện tích $= 12 \\times 7 = 84\\,cm^2$.', rationale: 'Áp dụng công thức diện tích hình chữ nhật.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['84'], tolerance: 0, isInteger: true },
  },
  {
    id: 'HH-02-EX3',
    topicIds: ['HH-02'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Một hình vuông có cạnh $9\\,cm$. Diện tích của hình vuông là bao nhiêu?',
    figure: squareFigure('9 cm'),
    solutionSteps: [
      { order: 1, content: 'Diện tích $= 9 \\times 9 = 81\\,cm^2$.', rationale: 'Áp dụng công thức diện tích hình vuông.' },
    ],
    mcq: { options: ['81 cm²', '36 cm²', '18 cm²', '72 cm²'], answerIndex: 0 },
  },
  {
    id: 'HH-02-EX4',
    topicIds: ['HH-02'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Một hình vuông có chu vi $32\\,cm$. Tính độ dài cạnh hình vuông đó.',
    solutionSteps: [
      { order: 1, content: 'Cạnh $= 32 : 4 = 8\\,cm$.', rationale: 'Chu vi hình vuông bằng cạnh nhân 4, nên cạnh bằng chu vi chia 4.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['8'], tolerance: 0, isInteger: true, unit: 'cm' },
  },
  {
    id: 'HH-02-EX5',
    topicIds: ['HH-02'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Một mảnh đất hình chữ nhật có chiều dài $15\\,m$, chiều rộng $8\\,m$. Người ta muốn quây hàng rào xung quanh mảnh đất và lát toàn bộ nền bằng gạch. Tính chu vi và diện tích mảnh đất, từ đó cho biết cần ít nhất bao nhiêu mét hàng rào và bao nhiêu mét vuông gạch.',
    figure: rectangleFigure('15 m', '8 m'),
    solutionSteps: [
      { order: 1, content: 'Chu vi $= (15 + 8) \\times 2 = 46\\,m$.', rationale: 'Số mét hàng rào cần dùng chính là chu vi mảnh đất.' },
      { order: 2, content: 'Diện tích $= 15 \\times 8 = 120\\,m^2$.', rationale: 'Số mét vuông gạch cần dùng chính là diện tích mảnh đất.' },
      { order: 3, content: 'Vậy cần ít nhất $46\\,m$ hàng rào và $120\\,m^2$ gạch.', rationale: 'Kết luận.' },
    ],
    essay: {
      modelSolution:
        'Chu vi mảnh đất = (15 + 8) x 2 = 46 (m). Diện tích mảnh đất = 15 x 8 = 120 (m²). Vậy cần ít nhất 46m hàng rào và 120 m² gạch.',
      rubric: [
        { criterion: 'Tính đúng chu vi = 46m', points: 1 },
        { criterion: 'Tính đúng diện tích = 120 m²', points: 1 },
        { criterion: 'Kết luận đúng số mét hàng rào và số mét vuông gạch cần dùng', points: 1 },
      ],
    },
  },
  {
    id: 'HH-02-EX6',
    topicIds: ['HH-02'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Một khu vườn hình vuông có cạnh $20\\,m$. Người ta mở rộng khu vườn bằng cách tăng mỗi cạnh thêm $5\\,m$ để được một khu vườn hình vuông mới. Hỏi diện tích khu vườn mới lớn hơn diện tích khu vườn cũ bao nhiêu mét vuông?',
    solutionSteps: [
      { order: 1, content: 'Diện tích khu vườn cũ $= 20 \\times 20 = 400\\,m^2$.', rationale: 'Áp dụng công thức diện tích hình vuông với cạnh cũ.' },
      { order: 2, content: 'Cạnh khu vườn mới $= 20 + 5 = 25\\,m$, diện tích mới $= 25 \\times 25 = 625\\,m^2$.', rationale: 'Tính cạnh mới rồi áp dụng công thức diện tích hình vuông.' },
      { order: 3, content: 'Diện tích tăng thêm $= 625 - 400 = 225\\,m^2$.', rationale: 'Lấy diện tích mới trừ diện tích cũ.' },
    ],
    essay: {
      modelSolution:
        'Diện tích cũ = 20 x 20 = 400 (m²). Cạnh mới = 20 + 5 = 25 (m), diện tích mới = 25 x 25 = 625 (m²). Diện tích tăng thêm = 625 - 400 = 225 (m²).',
      rubric: [
        { criterion: 'Tính đúng diện tích cũ = 400 m²', points: 1 },
        { criterion: 'Tính đúng diện tích mới = 625 m²', points: 1 },
        { criterion: 'Tính đúng phần chênh lệch = 225 m²', points: 1 },
      ],
    },
  },
  {
    id: 'HH-02-EX7',
    topicIds: ['HH-02'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Chu vi hình vuông cạnh $5\\,cm$ là bao nhiêu?',
    figure: squareFigure('5 cm'),
    solutionSteps: [
      { order: 1, content: 'Chu vi $= 5 \\times 4 = 20\\,cm$.', rationale: 'Áp dụng công thức chu vi hình vuông.' },
    ],
    mcq: { options: ['20 cm', '25 cm', '10 cm', '15 cm'], answerIndex: 0 },
  },
];
