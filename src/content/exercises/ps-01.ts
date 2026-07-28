import type { Exercise } from '../../types';

export const ps01Exercises: Exercise[] = [
  {
    id: 'PS-01-EX1',
    topicIds: ['PS-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Rút gọn phân số $\\dfrac{15}{25}$ về dạng tối giản.',
    solutionSteps: [
      { order: 1, content: '$ƯCLN(15, 25) = 5$.', rationale: 'Tìm ước chung lớn nhất của tử số và mẫu số.' },
      { order: 2, content: '$15 : 5 = 3$, $25 : 5 = 5$, nên $\\dfrac{15}{25} = \\dfrac{3}{5}$.', rationale: 'Chia cả tử và mẫu cho ƯCLN.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['3/5'], tolerance: 0, requireSimplified: true },
  },
  {
    id: 'PS-01-EX2',
    topicIds: ['PS-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Rút gọn phân số $\\dfrac{24}{36}$ về dạng tối giản.',
    solutionSteps: [
      { order: 1, content: '$ƯCLN(24, 36) = 12$.', rationale: 'Tìm ước chung lớn nhất của tử số và mẫu số.' },
      { order: 2, content: '$24 : 12 = 2$, $36 : 12 = 3$, nên $\\dfrac{24}{36} = \\dfrac{2}{3}$.', rationale: 'Chia cả tử và mẫu cho ƯCLN.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['2/3'], tolerance: 0, requireSimplified: true },
  },
  {
    id: 'PS-01-EX3',
    topicIds: ['PS-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Quy đồng mẫu số hai phân số $\\dfrac{3}{4}$ và $\\dfrac{5}{6}$. Mẫu số chung nhỏ nhất là bao nhiêu?',
    solutionSteps: [
      { order: 1, content: 'Mẫu số chung nhỏ nhất là bội chung nhỏ nhất của $4$ và $6$.', rationale: 'BCNN của các mẫu số cho mẫu số chung nhỏ nhất.' },
      { order: 2, content: '$BCNN(4, 6) = 12$.', rationale: 'Tính bội chung nhỏ nhất.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['12'], tolerance: 0, isInteger: true },
  },
  {
    id: 'PS-01-EX4',
    topicIds: ['PS-01'],
    level: 'basic',
    answerType: 'mcq',
    statement: 'Phân số nào dưới đây bằng phân số $\\dfrac{3}{4}$?',
    solutionSteps: [
      { order: 1, content: '$\\dfrac{6}{8} = \\dfrac{6:2}{8:2} = \\dfrac{3}{4}$, các lựa chọn còn lại rút gọn ra phân số khác.', rationale: 'Rút gọn từng lựa chọn để so sánh.' },
    ],
    mcq: { options: ['$\\dfrac{6}{8}$', '$\\dfrac{5}{6}$', '$\\dfrac{4}{5}$', '$\\dfrac{2}{3}$'], answerIndex: 0 },
  },
  {
    id: 'PS-01-EX5',
    topicIds: ['PS-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tính: $\\dfrac{1}{3} + \\dfrac{1}{6} = ?$',
    solutionSteps: [
      { order: 1, content: 'Quy đồng mẫu số chung là $6$: $\\dfrac{1}{3} = \\dfrac{2}{6}$.', rationale: 'Đưa hai phân số về cùng mẫu số trước khi cộng.' },
      { order: 2, content: '$\\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}$.', rationale: 'Cộng tử số, giữ nguyên mẫu số, rồi rút gọn.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['1/2'], tolerance: 0 },
  },
  {
    id: 'PS-01-EX6',
    topicIds: ['PS-01'],
    level: 'basic',
    answerType: 'numeric',
    statement: 'Tính: $\\dfrac{3}{4} - \\dfrac{1}{2} = ?$',
    solutionSteps: [
      { order: 1, content: 'Quy đồng mẫu số chung là $4$: $\\dfrac{1}{2} = \\dfrac{2}{4}$.', rationale: 'Đưa hai phân số về cùng mẫu số trước khi trừ.' },
      { order: 2, content: '$\\dfrac{3}{4} - \\dfrac{2}{4} = \\dfrac{1}{4}$.', rationale: 'Trừ tử số, giữ nguyên mẫu số.' },
    ],
    numeric: { kind: 'single', acceptedValues: ['1/4'], tolerance: 0 },
  },
];
