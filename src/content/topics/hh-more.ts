import type { Topic } from '../../types';

export const hhMoreTopics: Topic[] = [
  {
    id: 'HH-01',
    group: 'HH',
    title: 'Nhận biết hình và các yếu tố cơ bản; góc',
    level: 'basic',
    lesson:
      'Các hình cơ bản gồm điểm, đoạn thẳng, đường thẳng, hình tam giác, hình vuông, hình chữ nhật, hình tròn... Góc gồm một đỉnh và hai cạnh. Các loại góc: góc vuông (đúng $90°$), góc nhọn (nhỏ hơn $90°$), góc tù (lớn hơn $90°$ và nhỏ hơn $180°$), góc bẹt (đúng $180°$).',
    formulas: ['\\text{Góc bẹt} = 2 \\times \\text{Góc vuông} = 180°'],
    examples: [
      {
        statement: 'Một hình tam giác có 3 góc lần lượt là $50°$, $90°$, $40°$. Xác định loại mỗi góc.',
        steps: [
          { order: 1, content: '$50° < 90°$ là góc nhọn; $40° < 90°$ cũng là góc nhọn.', rationale: 'So sánh với 90°.' },
          { order: 2, content: '$90°$ đúng bằng 90° nên là góc vuông.', rationale: 'Góc vuông có số đo đúng bằng 90°.' },
        ],
      },
      {
        statement: 'So sánh góc $120°$ với góc vuông.',
        steps: [{ order: 1, content: '$120° > 90°$ và $120° < 180°$ nên đây là góc tù, lớn hơn góc vuông.', rationale: 'Áp dụng định nghĩa góc tù.' }],
      },
    ],
    commonMistakes: [
      'Nhầm góc tù với góc nhọn khi ước lượng bằng mắt mà không đo.',
      'Nhầm góc bẹt (180°, tạo thành đường thẳng) với góc tù.',
      'Cho rằng góc vuông có thể "gần bằng" 90° thay vì phải đúng bằng 90°.',
    ],
    quickCheck: [
      { id: 'HH-01-QC1', statement: 'Góc có số đo $120°$ là loại góc gì?', answerType: 'mcq', mcq: { options: ['Góc tù', 'Góc nhọn', 'Góc vuông', 'Góc bẹt'], answerIndex: 0 } },
      { id: 'HH-01-QC2', statement: 'Góc có số đo $90°$ là loại góc gì?', answerType: 'mcq', mcq: { options: ['Góc vuông', 'Góc nhọn', 'Góc tù', 'Góc bẹt'], answerIndex: 0 } },
      { id: 'HH-01-QC3', statement: 'Góc bẹt có số đo bao nhiêu độ?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['180'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'HH-03',
    group: 'HH',
    title: 'Diện tích hình tam giác',
    level: 'basic',
    lesson: 'Diện tích hình tam giác bằng đáy nhân chiều cao (tương ứng với đáy đó, vuông góc với đáy) rồi chia 2.',
    formulas: ['S = \\dfrac{a \\times h}{2}'],
    examples: [
      { statement: 'Tam giác có đáy $8\\,cm$, chiều cao $5\\,cm$. Tính diện tích.', steps: [{ order: 1, content: '$S = 8 \\times 5 : 2 = 20\\,cm^2$.', rationale: 'Áp dụng công thức diện tích tam giác.' }] },
      { statement: 'Tam giác có diện tích $24\\,cm^2$, đáy $6\\,cm$. Tính chiều cao.', steps: [{ order: 1, content: '$h = 24 \\times 2 : 6 = 8\\,cm$.', rationale: 'Suy ra chiều cao từ công thức diện tích.' }] },
    ],
    commonMistakes: [
      'Quên chia 2 sau khi nhân đáy với chiều cao.',
      'Dùng chiều cao không tương ứng (không vuông góc) với đáy đã chọn.',
      'Nhầm đơn vị diện tích ($cm^2$) với đơn vị độ dài ($cm$).',
    ],
    quickCheck: [
      { id: 'HH-03-QC1', statement: 'Tam giác có đáy $10\\,cm$, chiều cao $6\\,cm$. Tính diện tích ($cm^2$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['30'], tolerance: 0, isInteger: true } },
      { id: 'HH-03-QC2', statement: 'Tam giác có diện tích $18\\,cm^2$, chiều cao $4\\,cm$. Tính đáy ($cm$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['9'], tolerance: 0, isInteger: true } },
      { id: 'HH-03-QC3', statement: 'Công thức tính diện tích tam giác là gì?', answerType: 'mcq', mcq: { options: ['đáy x chiều cao : 2', 'đáy x chiều cao', '(đáy+chiều cao) x 2', 'đáy : chiều cao'], answerIndex: 0 } },
    ],
  },
  {
    id: 'HH-04',
    group: 'HH',
    title: 'Diện tích hình thang',
    level: 'basic',
    lesson: 'Diện tích hình thang bằng tổng hai đáy nhân chiều cao rồi chia 2.',
    formulas: ['S = \\dfrac{(a+b) \\times h}{2}'],
    examples: [
      { statement: 'Hình thang có đáy lớn $12\\,cm$, đáy bé $8\\,cm$, chiều cao $5\\,cm$. Tính diện tích.', steps: [{ order: 1, content: '$S=(12+8)\\times5:2=50\\,cm^2$.', rationale: 'Áp dụng công thức diện tích hình thang.' }] },
      { statement: 'Hình thang có diện tích $60\\,cm^2$, đáy lớn $15\\,cm$, đáy bé $9\\,cm$. Tính chiều cao.', steps: [{ order: 1, content: '$h=60\\times2:(15+9)=120:24=5\\,cm$.', rationale: 'Suy ra chiều cao từ công thức diện tích.' }] },
    ],
    commonMistakes: [
      'Quên cộng cả hai đáy trước khi nhân với chiều cao.',
      'Quên chia 2 sau khi nhân.',
      'Nhầm chiều cao hình thang với một cạnh bên (chiều cao phải vuông góc với hai đáy).',
    ],
    quickCheck: [
      { id: 'HH-04-QC1', statement: 'Hình thang có đáy lớn $14\\,cm$, đáy bé $10\\,cm$, chiều cao $6\\,cm$. Tính diện tích ($cm^2$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['72'], tolerance: 0, isInteger: true } },
      { id: 'HH-04-QC2', statement: 'Hình thang có diện tích $40\\,cm^2$, hai đáy lần lượt $7\\,cm$ và $9\\,cm$. Tính chiều cao ($cm$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['5'], tolerance: 0, isInteger: true } },
      { id: 'HH-04-QC3', statement: 'Công thức tính diện tích hình thang là gì?', answerType: 'mcq', mcq: { options: ['(đáy lớn + đáy bé) x chiều cao : 2', 'đáy lớn x đáy bé : 2', '(đáy lớn - đáy bé) x chiều cao', 'đáy lớn x chiều cao'], answerIndex: 0 } },
    ],
  },
  {
    id: 'HH-05',
    group: 'HH',
    title: 'Hình bình hành, hình thoi',
    level: 'basic',
    lesson: 'Diện tích hình bình hành bằng đáy nhân chiều cao. Diện tích hình thoi bằng tích hai đường chéo chia 2.',
    formulas: ['S_{bình hành} = a \\times h', 'S_{thoi} = \\dfrac{d_1 \\times d_2}{2}'],
    examples: [
      { statement: 'Hình bình hành có đáy $9\\,cm$, chiều cao $6\\,cm$. Tính diện tích.', steps: [{ order: 1, content: '$S=9\\times6=54\\,cm^2$.', rationale: 'Áp dụng công thức diện tích hình bình hành.' }] },
      { statement: 'Hình thoi có hai đường chéo $8\\,cm$ và $5\\,cm$. Tính diện tích.', steps: [{ order: 1, content: '$S=8\\times5:2=20\\,cm^2$.', rationale: 'Áp dụng công thức diện tích hình thoi.' }] },
    ],
    commonMistakes: [
      'Nhầm công thức diện tích hình bình hành với hình chữ nhật (hình bình hành không cần chia 2).',
      'Quên chia 2 khi tính diện tích hình thoi.',
      'Nhầm cạnh bên với chiều cao trong hình bình hành (chiều cao phải vuông góc với đáy).',
    ],
    quickCheck: [
      { id: 'HH-05-QC1', statement: 'Hình bình hành có đáy $12\\,cm$, chiều cao $5\\,cm$. Tính diện tích ($cm^2$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['60'], tolerance: 0, isInteger: true } },
      { id: 'HH-05-QC2', statement: 'Hình thoi có hai đường chéo $10\\,cm$ và $6\\,cm$. Tính diện tích ($cm^2$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['30'], tolerance: 0, isInteger: true } },
      { id: 'HH-05-QC3', statement: 'Công thức tính diện tích hình thoi là gì?', answerType: 'mcq', mcq: { options: ['đường chéo 1 x đường chéo 2 : 2', 'đường chéo 1 x đường chéo 2', '(đường chéo 1 + đường chéo 2) : 2', 'cạnh x cạnh'], answerIndex: 0 } },
    ],
  },
  {
    id: 'HH-06',
    group: 'HH',
    title: 'Hình tròn: chu vi, diện tích',
    level: 'basic',
    lesson:
      'Chu vi hình tròn bằng đường kính nhân số Pi (khoảng $3{,}14$), hoặc bán kính nhân 2 nhân Pi. Diện tích hình tròn bằng bán kính nhân bán kính nhân Pi.',
    formulas: ['C = d \\times 3{,}14 = 2 \\times r \\times 3{,}14', 'S = r \\times r \\times 3{,}14'],
    examples: [
      { statement: 'Hình tròn có bán kính $5\\,cm$. Tính chu vi và diện tích (lấy $\\pi=3{,}14$).', steps: [
        { order: 1, content: 'Chu vi $=2\\times5\\times3{,}14=31{,}4\\,cm$.', rationale: 'Áp dụng công thức chu vi theo bán kính.' },
        { order: 2, content: 'Diện tích $=5\\times5\\times3{,}14=78{,}5\\,cm^2$.', rationale: 'Áp dụng công thức diện tích hình tròn.' },
      ] },
      { statement: 'Hình tròn có đường kính $10\\,cm$. Tính chu vi (lấy $\\pi=3{,}14$).', steps: [{ order: 1, content: '$C=10\\times3{,}14=31{,}4\\,cm$.', rationale: 'Áp dụng công thức chu vi theo đường kính.' }] },
    ],
    commonMistakes: [
      'Nhầm bán kính với đường kính (đường kính gấp đôi bán kính).',
      'Quên nhân số Pi khi tính chu vi hoặc diện tích.',
      'Nhầm công thức chu vi (chỉ nhân bán kính 1 lần rồi nhân 2) với công thức diện tích (nhân bán kính 2 lần).',
    ],
    quickCheck: [
      { id: 'HH-06-QC1', statement: 'Hình tròn có bán kính $4\\,cm$. Tính chu vi ($cm$), lấy $\\pi=3{,}14$.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['25.12'], tolerance: 0 } },
      { id: 'HH-06-QC2', statement: 'Hình tròn có bán kính $4\\,cm$. Tính diện tích ($cm^2$), lấy $\\pi=3{,}14$.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['50.24'], tolerance: 0 } },
      { id: 'HH-06-QC3', statement: 'Công thức tính diện tích hình tròn là gì?', answerType: 'mcq', mcq: { options: ['bán kính x bán kính x Pi', 'đường kính x Pi', 'bán kính x 2 x Pi', 'bán kính x Pi'], answerIndex: 0 } },
    ],
  },
  {
    id: 'HH-07',
    group: 'HH',
    title: 'Hình hộp chữ nhật, hình lập phương: diện tích xung quanh, toàn phần, thể tích',
    level: 'basic',
    lesson:
      'Hình hộp chữ nhật có chiều dài $a$, chiều rộng $b$, chiều cao $c$: diện tích xung quanh bằng chu vi đáy nhân chiều cao; diện tích toàn phần bằng diện tích xung quanh cộng 2 lần diện tích đáy; thể tích bằng dài nhân rộng nhân cao. Hình lập phương cạnh $a$ là trường hợp đặc biệt khi $a=b=c$.',
    formulas: [
      'S_{xq} = (a+b) \\times 2 \\times c,\\quad S_{tp} = S_{xq} + 2 \\times a \\times b,\\quad V = a \\times b \\times c',
      '\\text{Lập phương}: S_{xq} = a \\times a \\times 4,\\quad S_{tp} = a \\times a \\times 6,\\quad V = a \\times a \\times a',
    ],
    examples: [
      { statement: 'Hình hộp chữ nhật có chiều dài $8\\,cm$, chiều rộng $5\\,cm$, chiều cao $4\\,cm$. Tính thể tích.', steps: [{ order: 1, content: '$V=8\\times5\\times4=160\\,cm^3$.', rationale: 'Áp dụng công thức thể tích hình hộp chữ nhật.' }] },
      { statement: 'Hình lập phương cạnh $5\\,cm$. Tính diện tích toàn phần và thể tích.', steps: [
        { order: 1, content: 'Diện tích toàn phần $=5\\times5\\times6=150\\,cm^2$.', rationale: 'Hình lập phương có 6 mặt bằng nhau.' },
        { order: 2, content: 'Thể tích $=5\\times5\\times5=125\\,cm^3$.', rationale: 'Áp dụng công thức thể tích hình lập phương.' },
      ] },
    ],
    commonMistakes: [
      'Nhầm công thức diện tích xung quanh (chu vi đáy nhân chiều cao) với diện tích toàn phần.',
      'Quên nhân 2 khi cộng thêm diện tích hai đáy vào diện tích toàn phần.',
      'Nhầm số mặt của hình lập phương (6 mặt) khi tính diện tích xung quanh (chỉ tính 4 mặt bên).',
    ],
    quickCheck: [
      { id: 'HH-07-QC1', statement: 'Hình hộp chữ nhật có chiều dài $10\\,cm$, chiều rộng $4\\,cm$, chiều cao $6\\,cm$. Tính thể tích ($cm^3$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['240'], tolerance: 0, isInteger: true } },
      { id: 'HH-07-QC2', statement: 'Hình lập phương cạnh $4\\,cm$. Tính thể tích ($cm^3$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['64'], tolerance: 0, isInteger: true } },
      { id: 'HH-07-QC3', statement: 'Công thức tính thể tích hình hộp chữ nhật là gì?', answerType: 'mcq', mcq: { options: ['dài x rộng x cao', '(dài+rộng) x cao', 'dài x rộng', 'dài x rộng x cao : 2'], answerIndex: 0 } },
    ],
  },
  {
    id: 'HH-08',
    group: 'HH',
    title: 'Bài toán thay đổi kích thước dẫn tới thay đổi chu vi/diện tích',
    level: 'advanced',
    lesson:
      'Khi tăng hoặc giảm các kích thước của hình, chu vi thay đổi theo tổng các kích thước thay đổi một cách đơn giản, nhưng diện tích không tỉ lệ thuận đơn giản với kích thước (vì diện tích là tích các kích thước). Vì vậy cần tính diện tích cũ và diện tích mới đầy đủ rồi so sánh, thay vì chỉ nhân phần thay đổi.',
    formulas: ['\\Delta S = S_{mới} - S_{cũ} \\ne S_{cũ} \\times \\dfrac{\\Delta a}{a} \\ \\text{(diện tích không đổi tỉ lệ thuận đơn giản)}'],
    examples: [
      {
        statement: 'Một hình chữ nhật có chiều dài $12\\,cm$, chiều rộng $8\\,cm$. Nếu tăng chiều dài thêm $3\\,cm$, giữ nguyên chiều rộng, thì diện tích tăng thêm bao nhiêu?',
        steps: [
          { order: 1, content: 'Diện tích cũ $=12\\times8=96\\,cm^2$.', rationale: 'Tính diện tích ban đầu.' },
          { order: 2, content: 'Chiều dài mới $=12+3=15\\,cm$; diện tích mới $=15\\times8=120\\,cm^2$.', rationale: 'Tính lại diện tích với kích thước mới.' },
          { order: 3, content: 'Diện tích tăng thêm $=120-96=24\\,cm^2$.', rationale: 'So sánh diện tích mới và cũ.' },
        ],
      },
      {
        statement: 'Một hình vuông có cạnh $6\\,cm$. Nếu tăng cạnh thêm $2\\,cm$ thì diện tích tăng thêm bao nhiêu?',
        steps: [
          { order: 1, content: 'Diện tích cũ $=6\\times6=36\\,cm^2$.', rationale: 'Tính diện tích ban đầu.' },
          { order: 2, content: 'Cạnh mới $=8\\,cm$; diện tích mới $=8\\times8=64\\,cm^2$.', rationale: 'Tính lại diện tích với cạnh mới.' },
          { order: 3, content: 'Diện tích tăng thêm $=64-36=28\\,cm^2$.', rationale: 'So sánh diện tích mới và cũ.' },
        ],
      },
    ],
    commonMistakes: [
      'Nghĩ diện tích tăng tỉ lệ thuận đơn giản với phần kích thước tăng thêm (sai vì diện tích là tích các kích thước).',
      'Chỉ nhân phần tăng thêm với một cạnh mà quên tính lại diện tích mới đầy đủ.',
      'Nhầm yêu cầu tính chu vi với yêu cầu tính diện tích.',
    ],
    quickCheck: [
      { id: 'HH-08-QC1', statement: 'Hình chữ nhật dài $10\\,cm$, rộng $6\\,cm$. Tăng chiều dài thêm $4\\,cm$, giữ nguyên chiều rộng. Diện tích tăng thêm bao nhiêu ($cm^2$)?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['24'], tolerance: 0, isInteger: true } },
      { id: 'HH-08-QC2', statement: 'Hình vuông cạnh $5\\,cm$. Tăng cạnh thêm $3\\,cm$. Diện tích tăng thêm bao nhiêu ($cm^2$)?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['39'], tolerance: 0, isInteger: true } },
      { id: 'HH-08-QC3', statement: 'Khi tăng một kích thước của hình chữ nhật, diện tích thay đổi như thế nào?', answerType: 'mcq', mcq: { options: ['Không tỉ lệ thuận đơn giản, cần tính lại diện tích mới', 'Luôn tỉ lệ thuận với kích thước tăng', 'Luôn không đổi', 'Luôn giảm'], answerIndex: 0 } },
    ],
  },
  {
    id: 'HH-09',
    group: 'HH',
    title: 'Tỉ số diện tích tam giác chung đáy hoặc chung chiều cao',
    level: 'advanced',
    lesson:
      'Hai tam giác có chung đáy (hoặc đáy bằng nhau): tỉ số diện tích bằng tỉ số hai chiều cao tương ứng. Hai tam giác có chung chiều cao (hoặc chiều cao bằng nhau): tỉ số diện tích bằng tỉ số hai đáy tương ứng.',
    formulas: ['\\text{Chung đáy}: \\dfrac{S_1}{S_2} = \\dfrac{h_1}{h_2}\\qquad \\text{Chung chiều cao}: \\dfrac{S_1}{S_2} = \\dfrac{a_1}{a_2}'],
    examples: [
      {
        statement: 'Hai tam giác ABC và ABD có chung đáy AB, chiều cao lần lượt là $6\\,cm$ và $9\\,cm$. Tính tỉ số diện tích hai tam giác.',
        steps: [{ order: 1, content: 'Vì chung đáy, tỉ số diện tích bằng tỉ số chiều cao: $6:9=2:3$.', rationale: 'Áp dụng tính chất tam giác chung đáy.' }],
      },
      {
        statement: 'Tam giác ABC có diện tích $48\\,cm^2$. Điểm M nằm trên BC sao cho $BM=\\dfrac{1}{3}BC$. Tính diện tích tam giác ABM.',
        steps: [
          { order: 1, content: 'Hai tam giác ABM và ABC chung chiều cao từ đỉnh A xuống BC.', rationale: 'Xác định yếu tố chung giữa hai tam giác.' },
          { order: 2, content: 'Tỉ số diện tích bằng tỉ số đáy: $BM:BC=1:3$.', rationale: 'Áp dụng tính chất tam giác chung chiều cao.' },
          { order: 3, content: 'Diện tích ABM $=48\\times\\dfrac{1}{3}=16\\,cm^2$.', rationale: 'Nhân diện tích tam giác lớn với tỉ số đáy.' },
        ],
      },
    ],
    commonMistakes: [
      'Áp dụng sai điều kiện: phải chung đáy mới so sánh theo chiều cao, phải chung chiều cao mới so sánh theo đáy.',
      'Nhầm tỉ số thuận với tỉ số nghịch giữa diện tích và chiều cao/đáy.',
      'Không xác định đúng đáy hoặc chiều cao chung giữa hai tam giác trong hình vẽ.',
    ],
    quickCheck: [
      { id: 'HH-09-QC1', statement: 'Hai tam giác chung đáy có chiều cao lần lượt $8\\,cm$ và $12\\,cm$. Tính tỉ số diện tích tam giác nhỏ so với tam giác lớn (dạng phân số tối giản).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['2/3'], tolerance: 0 } },
      { id: 'HH-09-QC2', statement: 'Tam giác ABC diện tích $60\\,cm^2$. M trên BC sao cho $BM=\\dfrac{1}{4}BC$ (chung chiều cao từ A). Tính diện tích tam giác ABM ($cm^2$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['15'], tolerance: 0, isInteger: true } },
      { id: 'HH-09-QC3', statement: 'Hai tam giác chung chiều cao thì tỉ số diện tích bằng gì?', answerType: 'mcq', mcq: { options: ['Tỉ số hai đáy tương ứng', 'Tỉ số hai chiều cao', 'Luôn bằng 1', 'Không xác định được'], answerIndex: 0 } },
    ],
  },
  {
    id: 'HH-10',
    group: 'HH',
    title: 'Cắt ghép hình; tính diện tích phần tô đậm',
    level: 'advanced',
    lesson:
      'Với bài toán tính diện tích phần tô đậm không phải là một hình cơ bản, thường dùng phương pháp: lấy diện tích hình lớn trừ đi diện tích (các) hình nhỏ không tô đậm, hoặc chia phần tô đậm thành các hình cơ bản rồi cộng diện tích lại.',
    formulas: ['S_{tô đậm} = S_{hình lớn} - S_{hình bị cắt}'],
    examples: [
      {
        statement: 'Một hình chữ nhật dài $10\\,cm$, rộng $6\\,cm$, bên trong có một hình tròn bán kính $3\\,cm$ được cắt bỏ (không tô đậm). Tính diện tích phần còn lại (lấy $\\pi=3{,}14$).',
        steps: [
          { order: 1, content: 'Diện tích hình chữ nhật $=10\\times6=60\\,cm^2$.', rationale: 'Tính diện tích hình lớn.' },
          { order: 2, content: 'Diện tích hình tròn $=3\\times3\\times3{,}14=28{,}26\\,cm^2$.', rationale: 'Tính diện tích phần bị cắt bỏ.' },
          { order: 3, content: 'Diện tích phần tô đậm $=60-28{,}26=31{,}74\\,cm^2$.', rationale: 'Lấy diện tích lớn trừ diện tích bị cắt.' },
        ],
      },
      {
        statement: 'Một hình vuông cạnh $8\\,cm$, bên trong có một tam giác với đáy và chiều cao đều bằng cạnh hình vuông (không tô đậm). Tính diện tích phần tô đậm còn lại.',
        steps: [
          { order: 1, content: 'Diện tích hình vuông $=8\\times8=64\\,cm^2$.', rationale: 'Tính diện tích hình lớn.' },
          { order: 2, content: 'Diện tích tam giác $=8\\times8:2=32\\,cm^2$.', rationale: 'Tính diện tích phần không tô đậm.' },
          { order: 3, content: 'Diện tích phần tô đậm $=64-32=32\\,cm^2$.', rationale: 'Lấy diện tích lớn trừ diện tích không tô đậm.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên trừ đúng diện tích phần không tô đậm khỏi diện tích hình lớn.',
      'Tính sai công thức diện tích của hình được cắt ra khỏi hình lớn.',
      'Cộng nhầm thay vì trừ khi phần tô đậm là phần còn lại sau khi bớt đi.',
    ],
    quickCheck: [
      { id: 'HH-10-QC1', statement: 'Hình chữ nhật dài $12\\,cm$, rộng $8\\,cm$, bên trong cắt bỏ một hình vuông cạnh $4\\,cm$ (không tô đậm). Tính diện tích phần tô đậm còn lại ($cm^2$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['80'], tolerance: 0, isInteger: true } },
      { id: 'HH-10-QC2', statement: 'Hình vuông cạnh $10\\,cm$ chứa một hình tròn bán kính $5\\,cm$ nội tiếp bên trong (không tô đậm). Tính diện tích phần tô đậm còn lại ($cm^2$), lấy $\\pi=3{,}14$.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['21.5'], tolerance: 0 } },
      { id: 'HH-10-QC3', statement: 'Muốn tính diện tích phần tô đậm khi một hình nhỏ bị cắt khỏi hình lớn, ta làm gì?', answerType: 'mcq', mcq: { options: ['Lấy diện tích hình lớn trừ diện tích hình nhỏ', 'Lấy diện tích hình lớn cộng diện tích hình nhỏ', 'Lấy diện tích hình nhỏ trừ diện tích hình lớn', 'Nhân hai diện tích với nhau'], answerIndex: 0 } },
    ],
  },
  {
    id: 'HH-11',
    group: 'HH',
    title: 'Bài toán thực tế về thể tích: mực nước dâng, xếp hộp, vật chìm',
    level: 'advanced',
    lesson:
      'Khi thả một vật chìm hoàn toàn vào bể nước hình hộp chữ nhật, thể tích nước dâng lên đúng bằng thể tích của vật đó. Từ đó suy ra: Thể tích vật bằng diện tích đáy bể nhân với chiều cao mực nước dâng lên.',
    formulas: ['V_{vật} = S_{đáy} \\times h_{dâng}'],
    examples: [
      {
        statement: 'Một bể cá hình hộp chữ nhật đáy dài $40\\,cm$, rộng $25\\,cm$. Thả một hòn đá vào bể làm mực nước dâng lên $3\\,cm$. Tính thể tích hòn đá.',
        steps: [{ order: 1, content: '$V=40\\times25\\times3=3000\\,cm^3$.', rationale: 'Thể tích nước dâng lên bằng thể tích vật thả vào.' }],
      },
      {
        statement: 'Một bể nước hình hộp chữ nhật đáy dài $50\\,cm$, rộng $20\\,cm$. Người ta thả vào bể một khối lập phương cạnh $10\\,cm$ (chìm hoàn toàn). Hỏi mực nước dâng lên bao nhiêu?',
        steps: [
          { order: 1, content: 'Thể tích khối lập phương $=10\\times10\\times10=1000\\,cm^3$.', rationale: 'Tính thể tích vật thả vào.' },
          { order: 2, content: 'Diện tích đáy bể $=50\\times20=1000\\,cm^2$.', rationale: 'Tính diện tích đáy bể.' },
          { order: 3, content: 'Mực nước dâng $=1000:1000=1\\,cm$.', rationale: 'Chia thể tích vật cho diện tích đáy bể.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm rằng thể tích nước dâng lên liên quan đến diện tích của vật thay vì thể tích của vật.',
      'Nhầm diện tích đáy bể với diện tích mặt nước ở độ cao khác (chỉ đúng khi bể có thành thẳng đứng).',
      'Tính sai thể tích khối được thả vào trước khi áp dụng công thức.',
    ],
    quickCheck: [
      { id: 'HH-11-QC1', statement: 'Một bể cá đáy dài $30\\,cm$, rộng $20\\,cm$. Thả một vật vào bể làm mực nước dâng lên $5\\,cm$. Tính thể tích vật ($cm^3$).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['3000'], tolerance: 0, isInteger: true } },
      { id: 'HH-11-QC2', statement: 'Một bể nước đáy dài $40\\,cm$, rộng $25\\,cm$. Thả một khối có thể tích $2000\\,cm^3$ vào bể (chìm hoàn toàn). Hỏi mực nước dâng lên bao nhiêu cm?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true } },
      { id: 'HH-11-QC3', statement: 'Khi thả một vật chìm hoàn toàn vào bể nước, thể tích nước dâng lên bằng gì?', answerType: 'mcq', mcq: { options: ['Thể tích của vật', 'Diện tích đáy bể', 'Diện tích của vật', 'Chiều cao của vật'], answerIndex: 0 } },
    ],
  },
];
