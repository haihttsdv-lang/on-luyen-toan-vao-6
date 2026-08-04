import type { Topic } from '../../types';

export const psMoreTopics: Topic[] = [
  {
    id: 'PS-02',
    group: 'PS',
    title: 'So sánh phân số bằng nhiều cách (quy đồng, phần bù, phân số trung gian)',
    level: 'advanced',
    lesson:
      'Có thể so sánh phân số bằng cách: quy đồng mẫu số rồi so sánh tử số; quy đồng tử số rồi so sánh mẫu số; dùng phân số trung gian (một phân số đơn giản nằm giữa hai phân số cần so sánh); hoặc dùng "phần bù" (phần còn thiếu để bằng 1) khi hai phân số có tử số gần bằng mẫu số — phân số nào có phần bù nhỏ hơn thì phân số đó lớn hơn.',
    formulas: ['\\text{Phần bù của } \\dfrac{a}{b} \\text{ đến } 1 \\text{ là } \\dfrac{b-a}{b}'],
    examples: [
      {
        statement: 'So sánh $\\dfrac{3}{4}$ và $\\dfrac{5}{7}$ bằng cách quy đồng mẫu số.',
        steps: [
          { order: 1, content: 'Quy đồng về mẫu chung 28: $\\dfrac{3}{4} = \\dfrac{21}{28}$, $\\dfrac{5}{7} = \\dfrac{20}{28}$.', rationale: 'Đưa hai phân số về cùng mẫu số.' },
          { order: 2, content: '$21 > 20$ nên $\\dfrac{3}{4} > \\dfrac{5}{7}$.', rationale: 'So sánh tử số khi mẫu số đã bằng nhau.' },
        ],
      },
      {
        statement: 'So sánh $\\dfrac{7}{8}$ và $\\dfrac{8}{9}$ bằng phần bù.',
        steps: [
          { order: 1, content: 'Phần bù của $\\dfrac{7}{8}$ là $\\dfrac{1}{8}$; phần bù của $\\dfrac{8}{9}$ là $\\dfrac{1}{9}$.', rationale: 'Tính phần còn thiếu để mỗi phân số bằng 1.' },
          { order: 2, content: 'Vì $\\dfrac{1}{8} > \\dfrac{1}{9}$ nên phân số có phần bù lớn hơn ($\\dfrac{7}{8}$) là phân số bé hơn: $\\dfrac{7}{8} < \\dfrac{8}{9}$.', rationale: 'Phần bù càng lớn thì phân số gốc càng bé.' },
        ],
      },
    ],
    commonMistakes: [
      'So sánh tử số khi mẫu số hai phân số chưa bằng nhau.',
      'Áp dụng quy tắc phần bù sai chiều (nhầm phần bù lớn hơn thì phân số gốc cũng lớn hơn).',
      'Chọn phân số trung gian không phù hợp khiến việc so sánh không rõ ràng.',
    ],
    quickCheck: [
      { id: 'PS-02-QC1', statement: 'Quy đồng mẫu số $\\dfrac{2}{3}$ và $\\dfrac{3}{5}$ về mẫu chung 15: $\\dfrac{2}{3}=\\dfrac{10}{15}$, $\\dfrac{3}{5}=\\dfrac{9}{15}$. Phân số nào lớn hơn?', answerType: 'mcq', mcq: { options: ['2/3', '3/5', 'Bằng nhau', 'Không so sánh được'], answerIndex: 0 } },
      { id: 'PS-02-QC2', statement: 'So sánh phần bù đến 1 của $\\dfrac{5}{6}$ và $\\dfrac{7}{9}$: phân số nào lớn hơn?', answerType: 'mcq', mcq: { options: ['5/6', '7/9', 'Bằng nhau', 'Không xác định'], answerIndex: 0 } },
      { id: 'PS-02-QC3', statement: 'Tính phần bù đến 1 của phân số $\\dfrac{7}{10}$.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['3/10'], tolerance: 0 } },
    ],
  },
  {
    id: 'PS-03',
    group: 'PS',
    title: 'Bốn phép tính với phân số',
    level: 'basic',
    lesson:
      'Cộng/trừ phân số: quy đồng mẫu số rồi cộng/trừ tử số, giữ nguyên mẫu số chung. Nhân phân số: nhân tử với tử, mẫu với mẫu. Chia phân số: nhân với phân số nghịch đảo của số chia.',
    formulas: [
      '\\dfrac{a}{b} + \\dfrac{c}{b} = \\dfrac{a+c}{b}',
      '\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}',
      '\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}',
    ],
    examples: [
      { statement: 'Tính: $\\dfrac{2}{3} \\times \\dfrac{3}{4}$', steps: [{ order: 1, content: '$\\dfrac{2 \\times 3}{3 \\times 4} = \\dfrac{6}{12} = \\dfrac{1}{2}$.', rationale: 'Nhân tử với tử, mẫu với mẫu rồi rút gọn.' }] },
      { statement: 'Tính: $\\dfrac{3}{5} : \\dfrac{2}{7}$', steps: [{ order: 1, content: '$\\dfrac{3}{5} \\times \\dfrac{7}{2} = \\dfrac{21}{10}$.', rationale: 'Chia phân số bằng cách nhân với nghịch đảo.' }] },
    ],
    commonMistakes: [
      'Quên quy đồng mẫu số trước khi cộng hoặc trừ phân số.',
      'Quy đồng mẫu số một cách không cần thiết khi nhân hoặc chia phân số.',
      'Quên đảo ngược phân số thứ hai khi thực hiện phép chia.',
    ],
    quickCheck: [
      { id: 'PS-03-QC1', statement: 'Tính: $\\dfrac{1}{4} + \\dfrac{1}{3}$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['7/12'], tolerance: 0 } },
      { id: 'PS-03-QC2', statement: 'Tính: $\\dfrac{2}{5} \\times \\dfrac{5}{6}$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['1/3'], tolerance: 0 } },
      { id: 'PS-03-QC3', statement: 'Tính: $\\dfrac{3}{4} : \\dfrac{1}{2}$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['3/2'], tolerance: 0 } },
    ],
  },
  {
    id: 'PS-04',
    group: 'PS',
    title: 'Số thập phân: đọc, viết, so sánh, làm tròn',
    level: 'basic',
    lesson:
      'Số thập phân gồm phần nguyên và phần thập phân, ngăn cách bởi dấu phẩy. So sánh số thập phân: so sánh phần nguyên trước; nếu bằng nhau thì so sánh từng hàng ở phần thập phân từ trái sang phải (có thể viết thêm số 0 vào cuối để hai số có cùng số chữ số thập phân). Làm tròn số thập phân đến một hàng nào đó: nhìn chữ số ngay sau hàng cần làm tròn — nếu chữ số đó $\\ge 5$ thì làm tròn lên, nếu $< 5$ thì giữ nguyên.',
    formulas: ['\\overline{a,bc} = a + \\dfrac{b}{10} + \\dfrac{c}{100}'],
    examples: [
      {
        statement: 'So sánh $4{,}56$ và $4{,}6$.',
        steps: [
          { order: 1, content: 'Viết lại $4{,}6 = 4{,}60$ để cùng 2 chữ số thập phân.', rationale: 'Thêm số 0 để so sánh dễ dàng hơn.' },
          { order: 2, content: 'So sánh phần thập phân: $56 < 60$ nên $4{,}56 < 4{,}6$.', rationale: 'So sánh từng hàng phần thập phân.' },
        ],
      },
      {
        statement: 'Làm tròn số $7{,}86$ đến hàng phần mười.',
        steps: [
          { order: 1, content: 'Chữ số hàng phần trăm là 6, mà $6 \\ge 5$.', rationale: 'Xét chữ số ngay sau hàng cần làm tròn.' },
          { order: 2, content: 'Làm tròn lên: $7{,}86 \\approx 7{,}9$.', rationale: 'Áp dụng quy tắc làm tròn lên.' },
        ],
      },
    ],
    commonMistakes: [
      'So sánh số thập phân như so sánh số tự nhiên (tưởng số có nhiều chữ số thập phân hơn là lớn hơn).',
      'Quên thêm số 0 vào cuối để hai số có cùng số chữ số thập phân trước khi so sánh.',
      'Làm tròn xuống dù chữ số ngay sau đã $\\ge 5$.',
    ],
    quickCheck: [
      { id: 'PS-04-QC1', statement: 'Số nào lớn hơn: $4{,}56$ hay $4{,}6$?', answerType: 'mcq', mcq: { options: ['4,56', '4,6', 'Bằng nhau', 'Không so sánh được'], answerIndex: 1 } },
      { id: 'PS-04-QC2', statement: 'Làm tròn số $7{,}86$ đến hàng phần mười.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['7.9'], tolerance: 0 } },
      { id: 'PS-04-QC3', statement: 'Làm tròn số $12{,}34$ đến hàng đơn vị.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['12'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'PS-05',
    group: 'PS',
    title: 'Bốn phép tính với số thập phân',
    level: 'basic',
    lesson:
      'Cộng/trừ số thập phân: đặt tính sao cho các dấu phẩy thẳng cột rồi cộng/trừ như số tự nhiên. Nhân số thập phân: nhân như số tự nhiên rồi đếm tổng số chữ số phần thập phân của hai thừa số để đặt dấu phẩy ở tích. Chia số thập phân: có thể nhân cả số bị chia và số chia với 10, 100... để đưa số chia về số tự nhiên rồi chia bình thường.',
    formulas: ['a{,}b \\times 10 = ab \\quad \\text{(dịch dấu phẩy sang phải 1 hàng)}'],
    examples: [
      { statement: 'Tính: $1{,}2 \\times 0{,}4$', steps: [
        { order: 1, content: 'Nhân như số tự nhiên: $12 \\times 4 = 48$.', rationale: 'Bỏ qua dấu phẩy, nhân như số tự nhiên.' },
        { order: 2, content: 'Tổng số chữ số phần thập phân của hai thừa số là $1+1=2$, đặt dấu phẩy: $0{,}48$.', rationale: 'Đếm đúng số chữ số thập phân để đặt dấu phẩy.' },
      ] },
      { statement: 'Tính: $3{,}5 + 2{,}47$', steps: [{ order: 1, content: 'Đặt tính thẳng cột dấu phẩy: $3{,}50 + 2{,}47 = 5{,}97$.', rationale: 'Viết thêm số 0 để hai số cùng số chữ số thập phân rồi cộng.' }] },
    ],
    commonMistakes: [
      'Đặt tính không thẳng cột dấu phẩy khi cộng hoặc trừ.',
      'Quên đếm đúng tổng số chữ số phần thập phân khi nhân hai số thập phân.',
      'Khi chia, quên nhân cả số bị chia và số chia với cùng một lũy thừa của 10.',
    ],
    quickCheck: [
      { id: 'PS-05-QC1', statement: 'Tính: $4{,}25 + 3{,}7$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['7.95'], tolerance: 0 } },
      { id: 'PS-05-QC2', statement: 'Tính: $2{,}5 \\times 0{,}2$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['0.5'], tolerance: 0 } },
      { id: 'PS-05-QC3', statement: 'Tính: $6{,}4 - 1{,}25$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['5.15'], tolerance: 0 } },
    ],
  },
  {
    id: 'PS-06',
    group: 'PS',
    title: 'Chuyển đổi phân số ↔ số thập phân ↔ tỉ số phần trăm',
    level: 'basic',
    lesson:
      'Muốn đổi phân số sang số thập phân, lấy tử số chia cho mẫu số. Muốn đổi số thập phân sang tỉ số phần trăm, nhân với 100 rồi thêm ký hiệu %. Muốn đổi phân số sang tỉ số phần trăm, đổi phân số sang số thập phân trước rồi nhân với 100.',
    formulas: ['\\dfrac{a}{b} = (a : b) \\ \\rightarrow \\ \\times 100\\%'],
    examples: [
      { statement: 'Đổi $\\dfrac{3}{4}$ sang số thập phân và tỉ số phần trăm.', steps: [{ order: 1, content: '$3 : 4 = 0{,}75 = 75\\%$.', rationale: 'Chia tử cho mẫu rồi nhân 100 để ra phần trăm.' }] },
      { statement: 'Đổi $0{,}6$ sang phân số tối giản và tỉ số phần trăm.', steps: [
        { order: 1, content: '$0{,}6 = \\dfrac{6}{10} = \\dfrac{3}{5}$.', rationale: 'Viết số thập phân dưới dạng phân số rồi rút gọn.' },
        { order: 2, content: '$0{,}6 \\times 100\\% = 60\\%$.', rationale: 'Nhân với 100 để ra tỉ số phần trăm.' },
      ] },
    ],
    commonMistakes: [
      'Quên nhân với 100 khi đổi số thập phân sang tỉ số phần trăm.',
      'Đổi phân số sang thập phân bằng cách chia mẫu cho tử thay vì tử cho mẫu.',
      'Không rút gọn phân số sau khi đổi từ số thập phân.',
    ],
    quickCheck: [
      { id: 'PS-06-QC1', statement: 'Đổi phân số $\\dfrac{1}{4}$ sang số thập phân.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['0.25'], tolerance: 0 } },
      { id: 'PS-06-QC2', statement: 'Đổi số thập phân $0{,}45$ sang tỉ số phần trăm (nhập số, không cần dấu %).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['45'], tolerance: 0, isInteger: true } },
      { id: 'PS-06-QC3', statement: 'Đổi $\\dfrac{3}{5}$ sang tỉ số phần trăm (nhập số, không cần dấu %).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['60'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'PS-07',
    group: 'PS',
    title: 'Dãy tính phân số có quy luật (rút gọn dây chuyền, tách phân số)',
    level: 'advanced',
    lesson:
      'Một số dãy tính phân số có thể rút gọn theo dây chuyền khi tử số của phân số sau bằng mẫu số của phân số liền trước (các thừa số triệt tiêu lẫn nhau, chỉ còn tử đầu và mẫu cuối). Một số bài toán có thể tách một phân số thành hiệu của hai phân số đơn vị liên tiếp để tính tổng dễ dàng hơn.',
    formulas: ['\\dfrac{1}{n \\times (n+1)} = \\dfrac{1}{n} - \\dfrac{1}{n+1}'],
    examples: [
      { statement: 'Tính: $\\dfrac{2}{3} \\times \\dfrac{3}{4} \\times \\dfrac{4}{5}$', steps: [{ order: 1, content: 'Rút gọn dây chuyền (tử phân số sau trùng mẫu phân số trước), chỉ còn tử đầu và mẫu cuối: $\\dfrac{2}{5}$.', rationale: 'Các thừa số 3 và 4 lần lượt triệt tiêu giữa tử và mẫu.' }] },
      { statement: 'Tính: $\\dfrac{1}{1 \\times 2} + \\dfrac{1}{2 \\times 3} + \\dfrac{1}{3 \\times 4}$', steps: [
        { order: 1, content: 'Tách từng số hạng: $\\left(\\dfrac{1}{1}-\\dfrac{1}{2}\\right)+\\left(\\dfrac{1}{2}-\\dfrac{1}{3}\\right)+\\left(\\dfrac{1}{3}-\\dfrac{1}{4}\\right)$.', rationale: 'Áp dụng công thức tách phân số.' },
        { order: 2, content: 'Các số hạng ở giữa triệt tiêu, còn lại $\\dfrac{1}{1} - \\dfrac{1}{4} = \\dfrac{3}{4}$.', rationale: 'Chỉ số hạng đầu và cuối còn lại sau khi triệt tiêu.' },
      ] },
    ],
    commonMistakes: [
      'Áp dụng rút gọn dây chuyền khi tử số và mẫu số không thực sự trùng nhau giữa các phân số liên tiếp.',
      'Tách phân số sai công thức, đặc biệt nhầm dấu cộng/trừ.',
      'Quên rằng chỉ các số hạng ở giữa mới triệt tiêu, số đầu và số cuối vẫn giữ nguyên.',
    ],
    quickCheck: [
      { id: 'PS-07-QC1', statement: 'Tính: $\\dfrac{3}{4} \\times \\dfrac{4}{5} \\times \\dfrac{5}{6}$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['1/2'], tolerance: 0 } },
      { id: 'PS-07-QC2', statement: 'Tính: $\\dfrac{1}{2 \\times 3} + \\dfrac{1}{3 \\times 4}$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['1/4'], tolerance: 0 } },
      { id: 'PS-07-QC3', statement: 'Công thức nào đúng để tách phân số $\\dfrac{1}{n(n+1)}$?', answerType: 'mcq', mcq: { options: ['$\\dfrac{1}{n}-\\dfrac{1}{n+1}$', '$\\dfrac{1}{n}+\\dfrac{1}{n+1}$', '$\\dfrac{1}{n+1}-\\dfrac{1}{n}$', '$n-(n+1)$'], answerIndex: 0 } },
    ],
  },
  {
    id: 'PS-08',
    group: 'PS',
    title: 'Tỉ số của hai số; bài toán về tỉ số',
    level: 'basic',
    lesson: 'Tỉ số của hai số $a$ và $b$ ($b \\ne 0$) là thương $a : b$, có thể viết dưới dạng phân số $\\dfrac{a}{b}$. Tỉ số cho biết số này gấp hoặc bằng bao nhiêu phần số kia.',
    formulas: ['\\text{Tỉ số của } a \\text{ và } b = a : b = \\dfrac{a}{b}'],
    examples: [
      { statement: 'Một lớp có 15 bạn nam và 20 bạn nữ. Tìm tỉ số giữa số bạn nam và số bạn nữ.', steps: [{ order: 1, content: 'Tỉ số $= 15 : 20 = \\dfrac{15}{20} = \\dfrac{3}{4}$.', rationale: 'Lập tỉ số rồi rút gọn về dạng đơn giản nhất.' }] },
      { statement: 'Tỉ số giữa tuổi con và tuổi bố là $1:4$. Biết tuổi con là 8. Tính tuổi bố.', steps: [{ order: 1, content: 'Bố gấp 4 lần con: $8 \\times 4 = 32$ tuổi.', rationale: 'Áp dụng đúng ý nghĩa tỉ số 1:4.' }] },
    ],
    commonMistakes: [
      'Viết tỉ số ngược thứ tự so với yêu cầu của đề bài (tỉ số của A và B khác tỉ số của B và A).',
      'Quên rút gọn tỉ số về dạng đơn giản nhất.',
      'Nhầm lẫn tỉ số (thương) với hiệu số của hai số.',
    ],
    quickCheck: [
      { id: 'PS-08-QC1', statement: 'Một lớp có 12 bạn nam và 18 bạn nữ. Tỉ số giữa số nam và số nữ là bao nhiêu (nhập dạng phân số tối giản)?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['2/3'], tolerance: 0 } },
      { id: 'PS-08-QC2', statement: 'Tỉ số giữa hai số là $2:5$. Biết số bé là 10. Tìm số lớn.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['25'], tolerance: 0, isInteger: true } },
      { id: 'PS-08-QC3', statement: 'Tỉ số của $a$ và $b$ được viết là gì?', answerType: 'mcq', mcq: { options: ['a:b', 'b:a', 'a+b', 'a-b'], answerIndex: 0 } },
    ],
  },
  {
    id: 'PS-09',
    group: 'PS',
    title: 'Ba bài toán cơ bản về tỉ số phần trăm',
    level: 'basic',
    lesson:
      'Ba dạng cơ bản: (1) Tìm tỉ số phần trăm của hai số — lấy số này chia số kia rồi nhân với 100. (2) Tìm giá trị phần trăm của một số — lấy số đó nhân với tỉ lệ phần trăm rồi chia cho 100. (3) Tìm một số biết giá trị phần trăm của nó — lấy giá trị đã biết chia cho tỉ lệ phần trăm rồi nhân với 100.',
    formulas: [
      '\\text{Tỉ số \\%} = \\dfrac{a}{b} \\times 100\\%',
      '\\text{Giá trị \\%} = \\text{Số đã cho} \\times \\text{tỉ lệ \\%} : 100',
      '\\text{Số cần tìm} = \\text{Giá trị đã biết} : \\text{tỉ lệ \\%} \\times 100',
    ],
    examples: [
      { statement: 'Lớp có 40 học sinh, trong đó có 8 học sinh giỏi. Tính tỉ số phần trăm học sinh giỏi.', steps: [{ order: 1, content: '$8 : 40 = 0{,}2 = 20\\%$.', rationale: 'Áp dụng công thức dạng 1: tìm tỉ số phần trăm của hai số.' }] },
      { statement: 'Một cửa hàng có 200 sản phẩm, 15% bị lỗi. Tính số sản phẩm bị lỗi.', steps: [{ order: 1, content: '$200 \\times 15 : 100 = 30$.', rationale: 'Áp dụng công thức dạng 2: tìm giá trị phần trăm của một số.' }] },
    ],
    commonMistakes: [
      'Nhầm lẫn ba dạng bài với nhau dẫn đến áp dụng sai công thức.',
      'Quên nhân hoặc chia cho 100 ở bước cuối cùng.',
      'Nhầm số đã cho (ứng với 100%) với số cần tìm giá trị phần trăm.',
    ],
    quickCheck: [
      { id: 'PS-09-QC1', statement: 'Một lớp có 50 học sinh, có 10 học sinh đạt loại giỏi. Tính tỉ số % học sinh giỏi (nhập số, không cần dấu %).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['20'], tolerance: 0, isInteger: true } },
      { id: 'PS-09-QC2', statement: 'Một kho có 500kg gạo, đã bán 24% số gạo. Tính số kg gạo đã bán.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['120'], tolerance: 0, isInteger: true, unit: 'kg' } },
      { id: 'PS-09-QC3', statement: 'Biết 20% của một số là 16. Tìm số đó.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['80'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'PS-10',
    group: 'PS',
    title: 'Bài toán thực tế về phần trăm: lãi–lỗ, tăng–giảm giá, khuyến mãi',
    level: 'advanced',
    lesson:
      'Giá bán bằng giá gốc cộng thêm lãi (hoặc trừ đi lỗ). Lãi hoặc lỗ tính theo phần trăm luôn tính trên giá gốc: Lãi = Giá gốc × tỉ lệ lãi : 100. Khi giảm giá $x\\%$, giá mới bằng giá gốc nhân $(100-x)$ rồi chia 100; khi tăng giá $x\\%$, giá mới bằng giá gốc nhân $(100+x)$ rồi chia 100.',
    formulas: [
      '\\text{Giá sau giảm } x\\% = \\text{Giá gốc} \\times (100 - x) : 100',
      '\\text{Giá sau tăng } x\\% = \\text{Giá gốc} \\times (100 + x) : 100',
    ],
    examples: [
      { statement: 'Một chiếc áo giá gốc 200 000đ được giảm giá 20%. Tính giá sau khi giảm.', steps: [{ order: 1, content: '$200\\,000 \\times (100-20) : 100 = 200\\,000 \\times 80 : 100 = 160\\,000$ (đồng).', rationale: 'Áp dụng công thức giá sau giảm.' }] },
      { statement: 'Một người mua hàng giá 500 000đ rồi bán lại lãi 10%. Tính giá bán.', steps: [
        { order: 1, content: 'Tiền lãi $= 500\\,000 \\times 10 : 100 = 50\\,000$ (đồng).', rationale: 'Lãi tính trên giá gốc (giá mua).' },
        { order: 2, content: 'Giá bán $= 500\\,000 + 50\\,000 = 550\\,000$ (đồng).', rationale: 'Giá bán bằng giá gốc cộng tiền lãi.' },
      ] },
    ],
    commonMistakes: [
      'Tính phần trăm trên giá bán thay vì trên giá gốc.',
      'Quên cộng (hoặc trừ) phần trăm vào giá gốc sau khi tính được số tiền lãi/lỗ hoặc phần thay đổi giá.',
      'Nhầm lẫn giữa tình huống tăng giá và giảm giá khi áp dụng công thức.',
    ],
    quickCheck: [
      { id: 'PS-10-QC1', statement: 'Một mặt hàng giá gốc 100 000đ, giảm giá 10%. Tính giá sau khi giảm.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['90000'], tolerance: 0, isInteger: true } },
      { id: 'PS-10-QC2', statement: 'Một người mua hàng giá 300 000đ rồi bán lãi 20%. Tính số tiền lãi.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['60000'], tolerance: 0, isInteger: true } },
      { id: 'PS-10-QC3', statement: 'Một chiếc áo giá gốc 250 000đ được tăng giá 8%. Tính giá sau khi tăng.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['270000'], tolerance: 0, isInteger: true } },
    ],
  },
];
