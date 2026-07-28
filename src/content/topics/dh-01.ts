import type { Topic } from '../../types';

export const dh01: Topic = {
  id: 'DH-01',
  group: 'DH',
  title: 'Tìm hai số khi biết tổng và hiệu',
  level: 'basic',
  lesson:
    'Khi đề bài cho biết tổng và hiệu của hai số, ta dùng phương pháp sơ đồ đoạn thẳng. Vẽ hai đoạn thẳng biểu diễn số lớn và số bé; số lớn dài hơn số bé đúng bằng hiệu hai số. Nếu bớt đi phần chênh lệch đó khỏi số lớn, hai đoạn còn lại bằng nhau và có tổng bằng $Tổng - Hiệu$, nên mỗi đoạn (chính là số bé) bằng $(Tổng - Hiệu) : 2$. Ngược lại, nếu thêm phần chênh lệch vào số bé, tổng hai đoạn bằng nhau lúc này là $Tổng + Hiệu$, nên số lớn bằng $(Tổng + Hiệu) : 2$.',
  formulas: ['\\text{Số bé} = \\dfrac{\\text{Tổng} - \\text{Hiệu}}{2}', '\\text{Số lớn} = \\dfrac{\\text{Tổng} + \\text{Hiệu}}{2}'],
  examples: [
    {
      statement: 'Tổng của hai số là 84, hiệu của hai số là 12. Tìm hai số đó.',
      steps: [
        {
          order: 1,
          content: 'Số bé $= (84 - 12) : 2 = 72 : 2 = 36$.',
          rationale: 'Áp dụng công thức tìm số bé: lấy tổng trừ hiệu rồi chia 2.',
        },
        {
          order: 2,
          content: 'Số lớn $= 36 + 12 = 48$.',
          rationale: 'Số lớn hơn số bé đúng bằng hiệu hai số.',
        },
        {
          order: 3,
          content: 'Vậy hai số cần tìm là $36$ và $48$.',
          rationale: 'Kiểm tra lại: $36 + 48 = 84$ (đúng tổng), $48 - 36 = 12$ (đúng hiệu).',
        },
      ],
    },
    {
      statement:
        'Hai lớp 5A và 5B có tổng cộng 90 học sinh. Lớp 5A nhiều hơn lớp 5B 6 học sinh. Hỏi mỗi lớp có bao nhiêu học sinh?',
      steps: [
        {
          order: 1,
          content: 'Số học sinh lớp 5B $= (90 - 6) : 2 = 84 : 2 = 42$ (học sinh).',
          rationale: 'Lớp 5B là số bé trong bài toán tổng - hiệu.',
        },
        {
          order: 2,
          content: 'Số học sinh lớp 5A $= 42 + 6 = 48$ (học sinh).',
          rationale: 'Lớp 5A nhiều hơn lớp 5B 6 học sinh theo đề bài.',
        },
        {
          order: 3,
          content: 'Vậy lớp 5A có $48$ học sinh, lớp 5B có $42$ học sinh.',
          rationale: 'Kiểm tra: $48 + 42 = 90$ và $48 - 42 = 6$, khớp đề bài.',
        },
      ],
    },
  ],
  commonMistakes: [
    'Nhầm dấu cộng/trừ trong công thức, dẫn tới tính sai số bé thành số lớn hoặc ngược lại.',
    'Quên chia cho 2 sau khi cộng hoặc trừ tổng với hiệu.',
    'Không đối chiếu lại kết quả với đề bài (cộng hai số vừa tìm để kiểm tra đúng tổng, trừ hai số để kiểm tra đúng hiệu).',
  ],
  quickCheck: [
    {
      id: 'DH-01-QC1',
      statement: 'Tổng hai số là $50$, hiệu hai số là $10$. Số bé là bao nhiêu?',
      answerType: 'numeric',
      numeric: { kind: 'single', acceptedValues: ['20'], tolerance: 0, isInteger: true },
    },
    {
      id: 'DH-01-QC2',
      statement: 'Tổng hai số là $50$, hiệu hai số là $10$. Số lớn là bao nhiêu?',
      answerType: 'numeric',
      numeric: { kind: 'single', acceptedValues: ['30'], tolerance: 0, isInteger: true },
    },
    {
      id: 'DH-01-QC3',
      statement: 'Muốn tìm số bé khi biết tổng và hiệu, ta làm thế nào?',
      answerType: 'mcq',
      mcq: {
        options: [
          '(Tổng + Hiệu) : 2',
          '(Tổng - Hiệu) : 2',
          '(Tổng - Hiệu) x 2',
          'Tổng : 2 - Hiệu',
        ],
        answerIndex: 1,
      },
    },
  ],
};
