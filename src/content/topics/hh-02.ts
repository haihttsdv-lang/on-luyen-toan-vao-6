import type { Topic } from '../../types';
import { rectangleFigure, squareFigure } from '../figures/rectangle';

export const hh02: Topic = {
  id: 'HH-02',
  group: 'HH',
  title: 'Chu vi, diện tích hình chữ nhật, hình vuông',
  level: 'basic',
  lesson:
    'Hình chữ nhật có chiều dài và chiều rộng khác nhau; chu vi bằng tổng chiều dài và chiều rộng nhân đôi, diện tích bằng chiều dài nhân chiều rộng. Hình vuông là trường hợp đặc biệt khi chiều dài bằng chiều rộng (gọi là cạnh); chu vi bằng cạnh nhân 4, diện tích bằng cạnh nhân cạnh. Lưu ý: đơn vị diện tích luôn là đơn vị độ dài kèm số mũ 2 (ví dụ $cm^2$, $m^2$), khác với đơn vị chu vi chỉ là đơn vị độ dài thông thường.',
  formulas: [
    'P_{hcn} = (\\text{dài} + \\text{rộng}) \\times 2',
    'S_{hcn} = \\text{dài} \\times \\text{rộng}',
    'P_{vuông} = \\text{cạnh} \\times 4',
    'S_{vuông} = \\text{cạnh} \\times \\text{cạnh}',
  ],
  examples: [
    {
      statement: 'Một hình chữ nhật có chiều dài $8\\,cm$, chiều rộng $5\\,cm$. Tính chu vi và diện tích.',
      steps: [
        { order: 1, content: 'Chu vi $= (8 + 5) \\times 2 = 26\\,cm$.', rationale: 'Áp dụng công thức chu vi hình chữ nhật.' },
        { order: 2, content: 'Diện tích $= 8 \\times 5 = 40\\,cm^2$.', rationale: 'Áp dụng công thức diện tích hình chữ nhật.' },
      ],
    },
    {
      statement: 'Một hình vuông có cạnh $6\\,cm$. Tính chu vi và diện tích.',
      steps: [
        { order: 1, content: 'Chu vi $= 6 \\times 4 = 24\\,cm$.', rationale: 'Áp dụng công thức chu vi hình vuông.' },
        { order: 2, content: 'Diện tích $= 6 \\times 6 = 36\\,cm^2$.', rationale: 'Áp dụng công thức diện tích hình vuông.' },
      ],
    },
  ],
  commonMistakes: [
    'Nhầm công thức chu vi hình chữ nhật thành "dài x rộng x 2" thay vì "(dài + rộng) x 2".',
    'Quên đổi các số đo về cùng một đơn vị trước khi tính (ví dụ một cạnh cho bằng cm, cạnh kia cho bằng m).',
    'Viết nhầm đơn vị diện tích ($cm^2$) thành đơn vị chu vi ($cm$) hoặc ngược lại.',
  ],
  quickCheck: [
    {
      id: 'HH-02-QC1',
      statement: 'Công thức nào đúng để tính chu vi hình chữ nhật?',
      answerType: 'mcq',
      mcq: {
        options: [
          '(dài + rộng) x 2',
          'dài x rộng x 2',
          'dài x rộng',
          '(dài x rộng) : 2',
        ],
        answerIndex: 0,
      },
    },
    {
      id: 'HH-02-QC2',
      statement: 'Một hình chữ nhật dài $10\\,cm$, rộng $4\\,cm$. Diện tích bằng bao nhiêu $cm^2$?',
      answerType: 'numeric',
      numeric: { kind: 'single', acceptedValues: ['40'], tolerance: 0, isInteger: true },
    },
    {
      id: 'HH-02-QC3',
      statement: 'Một hình vuông có cạnh $7\\,cm$. Chu vi bằng bao nhiêu $cm$?',
      answerType: 'numeric',
      numeric: { kind: 'single', acceptedValues: ['28'], tolerance: 0, isInteger: true },
    },
  ],
};

export const hh02Figures = { rectangleFigure, squareFigure };
