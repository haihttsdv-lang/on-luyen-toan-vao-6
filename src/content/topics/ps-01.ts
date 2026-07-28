import type { Topic } from '../../types';

export const ps01: Topic = {
  id: 'PS-01',
  group: 'PS',
  title: 'Khái niệm phân số; rút gọn, quy đồng',
  level: 'basic',
  lesson:
    'Phân số $\\dfrac{a}{b}$ ($b \\neq 0$) biểu diễn $a$ phần bằng nhau trong tổng số $b$ phần. Hai phân số bằng nhau nếu tử số và mẫu số của phân số này gấp (hoặc là ước) cùng một số lần so với phân số kia. Rút gọn phân số là chia cả tử và mẫu cho cùng một ước chung (thường là ước chung lớn nhất) để được phân số đơn giản hơn nhưng vẫn bằng phân số ban đầu; phân số tối giản là phân số không thể rút gọn thêm được nữa. Quy đồng mẫu số là đưa các phân số về cùng một mẫu số chung (thường là bội chung nhỏ nhất của các mẫu số) bằng cách nhân cả tử và mẫu của mỗi phân số với cùng một số thích hợp.',
  formulas: [
    '\\dfrac{a}{b} = \\dfrac{a : c}{b : c} \\quad (c \\text{ là ước chung của } a \\text{ và } b)',
    '\\dfrac{a}{b} = \\dfrac{a \\times k}{b \\times k} \\quad (k \\neq 0)',
  ],
  examples: [
    {
      statement: 'Rút gọn phân số $\\dfrac{12}{18}$ về dạng tối giản.',
      steps: [
        { order: 1, content: 'Tìm ước chung lớn nhất của $12$ và $18$: $ƯCLN(12, 18) = 6$.', rationale: 'Chia cho ƯCLN sẽ rút gọn về tối giản chỉ trong một bước.' },
        { order: 2, content: '$12 : 6 = 2$ và $18 : 6 = 3$, nên $\\dfrac{12}{18} = \\dfrac{2}{3}$.', rationale: 'Chia cả tử và mẫu cho ước chung vừa tìm.' },
        { order: 3, content: 'Kiểm tra: $ƯCLN(2, 3) = 1$ nên $\\dfrac{2}{3}$ đã là phân số tối giản.', rationale: 'Xác nhận không thể rút gọn thêm.' },
      ],
    },
    {
      statement: 'Quy đồng mẫu số hai phân số $\\dfrac{2}{3}$ và $\\dfrac{3}{4}$.',
      steps: [
        { order: 1, content: 'Mẫu số chung nhỏ nhất là bội chung nhỏ nhất của $3$ và $4$, tức là $12$.', rationale: 'Chọn BCNN để mẫu số chung là nhỏ nhất có thể.' },
        { order: 2, content: '$\\dfrac{2}{3} = \\dfrac{2 \\times 4}{3 \\times 4} = \\dfrac{8}{12}$.', rationale: 'Nhân cả tử và mẫu với $4$ để mẫu số thành $12$.' },
        { order: 3, content: '$\\dfrac{3}{4} = \\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}$.', rationale: 'Nhân cả tử và mẫu với $3$ để mẫu số thành $12$.' },
      ],
    },
  ],
  commonMistakes: [
    'Rút gọn chưa triệt để: mới chia một lần cho ước chung nhỏ mà chưa rút gọn về đúng dạng tối giản.',
    'Khi quy đồng, chỉ nhân mẫu số với hệ số mà quên nhân tử số theo đúng hệ số đó.',
    'Cho rằng hai phân số có tử số hoặc mẫu số giống nhau là bằng nhau, trong khi phải xét cả cặp tử số và mẫu số.',
  ],
  quickCheck: [
    {
      id: 'PS-01-QC1',
      statement: 'Rút gọn phân số $\\dfrac{8}{12}$ về dạng tối giản.',
      answerType: 'numeric',
      numeric: { kind: 'single', acceptedValues: ['2/3'], tolerance: 0, requireSimplified: true },
    },
    {
      id: 'PS-01-QC2',
      statement: 'Phân số nào dưới đây bằng $\\dfrac{1}{2}$?',
      answerType: 'mcq',
      mcq: { options: ['$\\dfrac{2}{3}$', '$\\dfrac{3}{6}$', '$\\dfrac{4}{5}$', '$\\dfrac{5}{9}$'], answerIndex: 1 },
    },
    {
      id: 'PS-01-QC3',
      statement: 'Quy đồng $\\dfrac{1}{2}$ và $\\dfrac{1}{3}$: mẫu số chung nhỏ nhất là bao nhiêu?',
      answerType: 'numeric',
      numeric: { kind: 'single', acceptedValues: ['6'], tolerance: 0, isInteger: true },
    },
  ],
};
