import type { Topic } from '../../types';

export const shTopics: Topic[] = [
  {
    id: 'SH-01',
    group: 'SH',
    title: 'Đọc, viết, so sánh số tự nhiên; giá trị theo hàng',
    level: 'basic',
    lesson:
      'Giá trị của một chữ số trong một số phụ thuộc vào vị trí (hàng) của nó: hàng đơn vị, hàng chục, hàng trăm, hàng nghìn... So sánh hai số tự nhiên: số nào có nhiều chữ số hơn thì lớn hơn; nếu số chữ số bằng nhau thì so sánh từng cặp chữ số từ trái sang phải, gặp hàng nào khác nhau trước thì số có chữ số lớn hơn ở hàng đó là số lớn hơn.',
    formulas: ['\\overline{abc} = a \\times 100 + b \\times 10 + c'],
    examples: [
      {
        statement: 'So sánh hai số 4578 và 4587.',
        steps: [
          { order: 1, content: 'Cả hai số đều có 4 chữ số nên so sánh từng hàng từ trái sang phải.', rationale: 'Số chữ số bằng nhau thì phải so sánh theo từng hàng.' },
          { order: 2, content: 'Hàng nghìn: 4 = 4. Hàng trăm: 5 = 5. Hàng chục: 7 < 8.', rationale: 'Gặp hàng chục là hàng đầu tiên có chữ số khác nhau.' },
          { order: 3, content: 'Vậy $4578 < 4587$.', rationale: 'Số có chữ số nhỏ hơn ở hàng khác nhau đầu tiên là số bé hơn.' },
        ],
      },
      {
        statement: 'Số 3502 gồm mấy nghìn, mấy trăm, mấy chục, mấy đơn vị? Chữ số 5 có giá trị bao nhiêu?',
        steps: [
          { order: 1, content: '$3502 = 3 \\times 1000 + 5 \\times 100 + 0 \\times 10 + 2$.', rationale: 'Phân tích số theo giá trị từng hàng.' },
          { order: 2, content: 'Số gồm 3 nghìn, 5 trăm, 0 chục, 2 đơn vị.', rationale: 'Đọc lại kết quả phân tích.' },
          { order: 3, content: 'Chữ số 5 ở hàng trăm nên có giá trị $5 \\times 100 = 500$.', rationale: 'Giá trị chữ số bằng chữ số nhân với giá trị hàng nó đứng.' },
        ],
      },
    ],
    commonMistakes: [
      'So sánh chỉ dựa vào chữ số đầu tiên rồi dừng lại, quên so sánh tiếp các hàng sau khi hàng đầu bằng nhau.',
      'Nhầm giá trị của chữ số với chính chữ số đó (quên nhân với giá trị hàng).',
      'Khi phân tích số, quên chữ số 0 ở hàng nào đó vẫn phải tính vào cấu tạo số.',
    ],
    quickCheck: [
      { id: 'SH-01-QC1', statement: 'Chữ số 2 trong số 7256 có giá trị bằng bao nhiêu?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['200'], tolerance: 0, isInteger: true } },
      { id: 'SH-01-QC2', statement: 'Số nào lớn hơn: 5892 hay 5829?', answerType: 'mcq', mcq: { options: ['5892', '5829', 'Bằng nhau', 'Không so sánh được'], answerIndex: 0 } },
      { id: 'SH-01-QC3', statement: 'Viết số gồm 4 nghìn, 3 trăm, 0 chục, 5 đơn vị.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['4305'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'SH-02',
    group: 'SH',
    title: 'Bốn phép tính với số tự nhiên; tính nhanh, tính bằng cách thuận tiện',
    level: 'basic',
    lesson:
      'Tính chất giao hoán cho phép đổi chỗ các số hạng (hoặc thừa số); tính chất kết hợp cho phép nhóm các số hạng (hoặc thừa số) theo cách thuận tiện; tính chất phân phối của phép nhân với phép cộng giúp tách hoặc gộp biểu thức. Khi "tính bằng cách thuận tiện nhất", hãy tìm cách nhóm các số sao cho ra số tròn chục, tròn trăm hoặc tròn nghìn.',
    formulas: [
      'a + b = b + a',
      '(a + b) + c = a + (b + c)',
      'a \\times (b + c) = a \\times b + a \\times c',
    ],
    examples: [
      {
        statement: 'Tính nhanh: $25 + 47 + 75$.',
        steps: [
          { order: 1, content: 'Đổi chỗ và nhóm: $(25 + 75) + 47$.', rationale: '25 và 75 cộng lại tròn trăm, thuận tiện hơn.' },
          { order: 2, content: '$25 + 75 = 100$, rồi $100 + 47 = 147$.', rationale: 'Thực hiện phép tính đã nhóm.' },
        ],
      },
      {
        statement: 'Tính nhanh: $4 \\times 37 \\times 25$.',
        steps: [
          { order: 1, content: 'Đổi chỗ và nhóm: $(4 \\times 25) \\times 37$.', rationale: '4 và 25 nhân lại tròn trăm.' },
          { order: 2, content: '$4 \\times 25 = 100$, rồi $100 \\times 37 = 3700$.', rationale: 'Thực hiện phép tính đã nhóm.' },
        ],
      },
    ],
    commonMistakes: [
      'Chỉ nhóm được các số đứng cạnh nhau mà quên đổi chỗ (tính chất giao hoán) trước khi nhóm.',
      'Nhầm lẫn áp dụng tính chất phân phối giữa phép cộng và phép trừ.',
      'Quên một số hạng hoặc thừa số khi nhóm lại biểu thức.',
    ],
    quickCheck: [
      { id: 'SH-02-QC1', statement: 'Tính nhanh: $15 + 38 + 85$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['138'], tolerance: 0, isInteger: true } },
      { id: 'SH-02-QC2', statement: 'Tính nhanh: $2 \\times 53 \\times 5$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['530'], tolerance: 0, isInteger: true } },
      { id: 'SH-02-QC3', statement: 'Tính chất nào cho phép đổi chỗ các số hạng trong một tổng?', answerType: 'mcq', mcq: { options: ['Giao hoán', 'Kết hợp', 'Phân phối', 'Không có tính chất nào'], answerIndex: 0 } },
    ],
  },
  {
    id: 'SH-03',
    group: 'SH',
    title: 'Thứ tự thực hiện phép tính; tính giá trị biểu thức',
    level: 'basic',
    lesson:
      'Biểu thức không có ngoặc: nếu chỉ có cộng/trừ (hoặc chỉ có nhân/chia) thì tính từ trái sang phải; nếu có cả nhân/chia lẫn cộng/trừ thì làm nhân/chia trước, cộng/trừ sau. Biểu thức có ngoặc: tính trong ngoặc trước, ngoài ngoặc sau.',
    formulas: ['a + b \\times c = a + (b \\times c)'],
    examples: [
      {
        statement: 'Tính giá trị biểu thức: $24 + 6 \\times 5$.',
        steps: [
          { order: 1, content: 'Nhân trước: $6 \\times 5 = 30$.', rationale: 'Nhân được ưu tiên trước cộng.' },
          { order: 2, content: 'Cộng: $24 + 30 = 54$.', rationale: 'Thực hiện phép cộng còn lại.' },
        ],
      },
      {
        statement: 'Tính giá trị biểu thức: $(24 + 6) \\times 5$.',
        steps: [
          { order: 1, content: 'Trong ngoặc trước: $24 + 6 = 30$.', rationale: 'Ngoặc luôn được tính trước.' },
          { order: 2, content: 'Nhân: $30 \\times 5 = 150$.', rationale: 'Thực hiện phép nhân còn lại.' },
        ],
      },
    ],
    commonMistakes: [
      'Tính từ trái sang phải một cách máy móc mà bỏ qua thứ tự ưu tiên nhân/chia trước cộng/trừ.',
      'Quên tính trong ngoặc trước khi có ngoặc trong biểu thức.',
      'Khi biểu thức có nhiều ngoặc lồng nhau, tính sai thứ tự từ ngoặc trong cùng ra ngoài.',
    ],
    quickCheck: [
      { id: 'SH-03-QC1', statement: 'Tính: $18 + 4 \\times 3$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['30'], tolerance: 0, isInteger: true } },
      { id: 'SH-03-QC2', statement: 'Tính: $(18 + 4) \\times 3$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['66'], tolerance: 0, isInteger: true } },
      { id: 'SH-03-QC3', statement: 'Trong biểu thức $12 - 8 : 4$, phép tính nào được thực hiện trước?', answerType: 'mcq', mcq: { options: ['12 - 8', '8 : 4', '12 : 4', 'Không phép nào'], answerIndex: 1 } },
    ],
  },
  {
    id: 'SH-04',
    group: 'SH',
    title: 'Cấu tạo số: viết thêm/xóa bớt chữ số, đổi chỗ chữ số, quan hệ số mới – số cũ',
    level: 'advanced',
    lesson:
      'Viết thêm một chữ số 0 vào bên phải một số tự nhiên thì số đó gấp lên 10 lần. Ngược lại, xóa chữ số hàng đơn vị của một số thì số mới bằng (số cũ trừ chữ số hàng đơn vị) chia cho 10 — hay nói cách khác, hiệu giữa số cũ và số mới liên quan trực tiếp đến chữ số hàng chục và chữ số bị xóa.',
    formulas: [
      '\\text{Viết thêm chữ số } 0 \\text{ vào bên phải} \\Rightarrow \\text{số mới} = \\text{số cũ} \\times 10',
      '\\text{Xóa chữ số hàng đơn vị } d \\text{ của số } \\overline{td} \\Rightarrow \\text{số mới} = t,\\ \\ \\text{số cũ} - \\text{số mới} = 9t + d',
    ],
    examples: [
      {
        statement: 'Nếu viết thêm chữ số 0 vào bên phải một số thì số đó tăng thêm 261 đơn vị. Tìm số đó.',
        steps: [
          { order: 1, content: 'Gọi số cũ là $a$. Viết thêm 0 vào bên phải thì số mới là $10a$.', rationale: 'Áp dụng quy tắc viết thêm chữ số 0.' },
          { order: 2, content: 'Số mới hơn số cũ: $10a - a = 9a = 261$.', rationale: 'Đề cho biết số tăng thêm chính là hiệu của số mới và số cũ.' },
          { order: 3, content: '$a = 261 : 9 = 29$.', rationale: 'Giải phương trình tìm số cũ.' },
        ],
      },
      {
        statement: 'Một số có 2 chữ số. Nếu xóa chữ số hàng đơn vị thì được số mới kém số đã cho 75 đơn vị. Tìm số đã cho.',
        steps: [
          { order: 1, content: 'Gọi số đã cho là $\\overline{td}$ với $t$ là chữ số hàng chục, $d$ là chữ số hàng đơn vị: số đã cho $= 10t + d$.', rationale: 'Đặt tên các thành phần của số có 2 chữ số.' },
          { order: 2, content: 'Xóa chữ số hàng đơn vị được số mới $= t$. Theo đề: $(10t + d) - t = 75$, tức $9t + d = 75$.', rationale: 'Lập biểu thức theo dữ kiện đề bài.' },
          { order: 3, content: 'Vì $0 \\le d \\le 9$ nên $9t$ phải nằm trong khoảng từ 66 đến 75, suy ra $t = 8$ (vì $9 \\times 8 = 72$), khi đó $d = 75 - 72 = 3$.', rationale: 'Xét điều kiện chữ số để tìm t và d.' },
          { order: 4, content: 'Vậy số đã cho là 83.', rationale: 'Kết luận.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm "viết thêm chữ số vào bên phải" với "viết thêm vào bên trái" (bản chất phép tính khác hẳn nhau).',
      'Quên điều kiện chữ số phải nằm trong khoảng 0 đến 9 khi giải, dẫn đến chọn nghiệm sai hoặc bỏ sót trường hợp.',
      'Nhầm lẫn số mới lớn hơn hay bé hơn số cũ trong từng thao tác (viết thêm thì tăng, xóa bớt thì giảm).',
    ],
    quickCheck: [
      { id: 'SH-04-QC1', statement: 'Viết thêm chữ số 0 vào bên phải số 45 thì được số mới là bao nhiêu?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['450'], tolerance: 0, isInteger: true } },
      { id: 'SH-04-QC2', statement: 'Một số có 2 chữ số, chữ số hàng chục là 6. Nếu xóa chữ số hàng đơn vị thì được số mới kém số đã cho 54 đơn vị. Tìm số đã cho.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['60'], tolerance: 0, isInteger: true } },
      { id: 'SH-04-QC3', statement: 'Khi viết thêm 1 chữ số 0 vào bên phải một số tự nhiên, số đó thay đổi thế nào?', answerType: 'mcq', mcq: { options: ['Gấp 10 lần', 'Gấp 100 lần', 'Tăng thêm 10 đơn vị', 'Không đổi'], answerIndex: 0 } },
    ],
  },
  {
    id: 'SH-05',
    group: 'SH',
    title: 'Dấu hiệu chia hết cho 2, 3, 5, 9 và bài toán kết hợp nhiều dấu hiệu',
    level: 'advanced',
    lesson:
      'Số chia hết cho 2 khi chữ số tận cùng là 0, 2, 4, 6, 8. Số chia hết cho 5 khi chữ số tận cùng là 0 hoặc 5. Số chia hết cho 3 khi tổng các chữ số chia hết cho 3. Số chia hết cho 9 khi tổng các chữ số chia hết cho 9. Với bài toán yêu cầu chia hết cho nhiều số cùng lúc, cần kiểm tra đủ tất cả các dấu hiệu liên quan.',
    formulas: [
      'S(\\overline{a_1 a_2 \\ldots a_n}) = a_1 + a_2 + \\cdots + a_n \\ \\text{chia hết cho } 3 \\Leftrightarrow \\overline{a_1 a_2 \\ldots a_n} \\ \\text{chia hết cho } 3',
    ],
    examples: [
      {
        statement: 'Số 372 có chia hết cho 3 không?',
        steps: [
          { order: 1, content: 'Tổng các chữ số: $3 + 7 + 2 = 12$.', rationale: 'Áp dụng dấu hiệu chia hết cho 3.' },
          { order: 2, content: '12 chia hết cho 3, nên 372 chia hết cho 3.', rationale: 'Kết luận theo dấu hiệu.' },
        ],
      },
      {
        statement: 'Tìm chữ số $x$ để số $\\overline{45x}$ chia hết cho cả 2 và 5.',
        steps: [
          { order: 1, content: 'Số chia hết cho cả 2 và 5 thì chữ số tận cùng phải vừa chẵn vừa là 0 hoặc 5.', rationale: 'Kết hợp hai dấu hiệu chia hết.' },
          { order: 2, content: 'Chỉ có chữ số 0 thỏa mãn cả hai điều kiện (5 là số lẻ).', rationale: 'Xét từng khả năng 0 và 5.' },
          { order: 3, content: 'Vậy $x = 0$, số cần tìm là 450.', rationale: 'Kết luận.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm dấu hiệu chia hết cho 3 (tổng chia hết cho 3) với dấu hiệu chia hết cho 9 (tổng chia hết cho 9).',
      'Quên xét số 0 khi tìm chữ số tận cùng để một số chia hết cho cả 2 và 5.',
      'Chỉ kiểm tra một dấu hiệu trong khi đề yêu cầu chia hết cho nhiều số cùng lúc.',
    ],
    quickCheck: [
      { id: 'SH-05-QC1', statement: 'Số nào sau đây chia hết cho 3?', answerType: 'mcq', mcq: { options: ['4185', '4186', '4187', '4189'], answerIndex: 0 } },
      { id: 'SH-05-QC2', statement: 'Tìm chữ số $x$ (khác 0) để số $\\overline{12x}$ chia hết cho 5.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['5'], tolerance: 0, isInteger: true } },
      { id: 'SH-05-QC3', statement: 'Số nào sau đây chia hết cho cả 2 và 3?', answerType: 'mcq', mcq: { options: ['18', '15', '22', '27'], answerIndex: 0 } },
    ],
  },
  {
    id: 'SH-06',
    group: 'SH',
    title: 'Phép chia có dư; tìm số bị chia, số chia, số dư',
    level: 'basic',
    lesson:
      'Trong phép chia có dư, Số bị chia bằng Số chia nhân Thương rồi cộng Số dư; số dư luôn nhỏ hơn số chia.',
    formulas: ['\\text{Số bị chia} = \\text{Số chia} \\times \\text{Thương} + \\text{Số dư}\\ \\ (\\text{Số dư} < \\text{Số chia})'],
    examples: [
      {
        statement: 'Một phép chia có số chia là 7, thương là 8, số dư là 3. Tìm số bị chia.',
        steps: [
          { order: 1, content: '$7 \\times 8 = 56$.', rationale: 'Nhân số chia với thương.' },
          { order: 2, content: '$56 + 3 = 59$.', rationale: 'Cộng thêm số dư.' },
        ],
      },
      {
        statement: 'Số dư lớn nhất có thể có khi chia một số cho 6 là bao nhiêu?',
        steps: [
          { order: 1, content: 'Số dư luôn nhỏ hơn số chia.', rationale: 'Tính chất của phép chia có dư.' },
          { order: 2, content: 'Số dư lớn nhất có thể là $6 - 1 = 5$.', rationale: 'Số lớn nhất nhỏ hơn 6 là 5.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên điều kiện số dư phải nhỏ hơn số chia, dẫn đến chia sai hoặc kết luận sai.',
      'Nhầm thứ tự trong công thức, nhân số chia với số dư thay vì với thương.',
      'Quên cộng số dư sau khi đã nhân số chia với thương.',
    ],
    quickCheck: [
      { id: 'SH-06-QC1', statement: 'Một phép chia có số chia là 9, thương là 5, số dư là 4. Tìm số bị chia.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['49'], tolerance: 0, isInteger: true } },
      { id: 'SH-06-QC2', statement: 'Số dư lớn nhất có thể có khi chia cho 8 là bao nhiêu?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['7'], tolerance: 0, isInteger: true } },
      { id: 'SH-06-QC3', statement: 'Trong phép chia có dư, số dư phải như thế nào so với số chia?', answerType: 'mcq', mcq: { options: ['Nhỏ hơn số chia', 'Lớn hơn số chia', 'Bằng số chia', 'Không liên quan'], answerIndex: 0 } },
    ],
  },
  {
    id: 'SH-07',
    group: 'SH',
    title: 'Tìm thành phần chưa biết của phép tính (tìm X)',
    level: 'basic',
    lesson:
      'Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng đã biết. Muốn tìm số bị trừ, lấy hiệu cộng số trừ. Muốn tìm số trừ, lấy số bị trừ trừ hiệu. Muốn tìm thừa số chưa biết, lấy tích chia thừa số đã biết. Muốn tìm số bị chia, lấy thương nhân số chia. Muốn tìm số chia, lấy số bị chia chia thương.',
    formulas: ['x + a = b \\Rightarrow x = b - a', 'x \\times a = b \\Rightarrow x = b : a'],
    examples: [
      {
        statement: 'Tìm $x$: $x + 25 = 60$.',
        steps: [{ order: 1, content: '$x = 60 - 25 = 35$.', rationale: 'Muốn tìm số hạng, lấy tổng trừ số hạng đã biết.' }],
      },
      {
        statement: 'Tìm $x$: $x \\times 4 = 96$.',
        steps: [{ order: 1, content: '$x = 96 : 4 = 24$.', rationale: 'Muốn tìm thừa số, lấy tích chia thừa số đã biết.' }],
      },
    ],
    commonMistakes: [
      'Thực hiện phép tính ngược sai chiều (ví dụ lấy tổng cộng thêm thay vì trừ).',
      'Nhầm công thức tìm số bị trừ và số trừ vì phép trừ không có tính giao hoán.',
      'Khi biểu thức có nhiều bước, quên tính vế phải trước khi tìm x.',
    ],
    quickCheck: [
      { id: 'SH-07-QC1', statement: 'Tìm $x$: $x + 18 = 42$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['24'], tolerance: 0, isInteger: true } },
      { id: 'SH-07-QC2', statement: 'Tìm $x$: $x \\times 6 = 54$', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['9'], tolerance: 0, isInteger: true } },
      { id: 'SH-07-QC3', statement: 'Muốn tìm số bị trừ chưa biết, ta làm thế nào?', answerType: 'mcq', mcq: { options: ['Lấy hiệu cộng số trừ', 'Lấy hiệu trừ số trừ', 'Lấy số trừ trừ hiệu', 'Lấy hiệu nhân số trừ'], answerIndex: 0 } },
    ],
  },
  {
    id: 'SH-08',
    group: 'SH',
    title: 'Trung bình cộng và các bài toán liên quan',
    level: 'basic',
    lesson: 'Trung bình cộng của một số các số bằng tổng các số đó chia cho số lượng các số hạng.',
    formulas: ['\\text{TBC} = \\dfrac{a_1 + a_2 + \\cdots + a_n}{n}'],
    examples: [
      {
        statement: 'Tìm trung bình cộng của 12, 18, 24.',
        steps: [
          { order: 1, content: 'Tổng: $12 + 18 + 24 = 54$.', rationale: 'Cộng tất cả các số hạng.' },
          { order: 2, content: 'TBC $= 54 : 3 = 18$.', rationale: 'Chia tổng cho số lượng số hạng.' },
        ],
      },
      {
        statement: 'Ba bạn có số kẹo lần lượt là 8, 10, 12. Hỏi trung bình mỗi bạn có bao nhiêu kẹo?',
        steps: [
          { order: 1, content: 'Tổng: $8 + 10 + 12 = 30$.', rationale: 'Cộng số kẹo của cả ba bạn.' },
          { order: 2, content: 'TBC $= 30 : 3 = 10$.', rationale: 'Chia tổng cho số bạn.' },
        ],
      },
    ],
    commonMistakes: [
      'Đếm sai số lượng số hạng, đặc biệt khi đề cho nhiều nhóm số khác nhau.',
      'Tính sai tổng trước khi chia.',
      'Nhầm trung bình cộng với số ở giữa dãy số (trung vị).',
    ],
    quickCheck: [
      { id: 'SH-08-QC1', statement: 'Tìm trung bình cộng của 10, 20, 30.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['20'], tolerance: 0, isInteger: true } },
      { id: 'SH-08-QC2', statement: 'Tìm trung bình cộng của 5, 9, 13, 17.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['11'], tolerance: 0, isInteger: true } },
      { id: 'SH-08-QC3', statement: 'Muốn tìm trung bình cộng của nhiều số, ta làm thế nào?', answerType: 'mcq', mcq: { options: ['Lấy tổng chia số lượng các số hạng', 'Lấy tổng nhân số lượng các số hạng', 'Lấy số lớn nhất trừ số bé nhất', 'Lấy số ở giữa'], answerIndex: 0 } },
    ],
  },
  {
    id: 'SH-09',
    group: 'SH',
    title: 'Dãy số viết theo quy luật: tìm số hạng, đếm số hạng, tính tổng dãy',
    level: 'advanced',
    lesson:
      'Dãy số cách đều có mỗi số hạng sau hơn (hoặc kém) số hạng liền trước một số không đổi gọi là khoảng cách (công sai, ký hiệu $d$). Số các số hạng bằng (số cuối trừ số đầu) chia khoảng cách rồi cộng 1. Tổng của dãy số cách đều bằng (số đầu cộng số cuối) nhân số số hạng rồi chia 2.',
    formulas: [
      '\\text{Số số hạng} = (\\text{Số cuối} - \\text{Số đầu}) : d + 1',
      '\\text{Tổng} = (\\text{Số đầu} + \\text{Số cuối}) \\times \\text{Số số hạng} : 2',
    ],
    examples: [
      {
        statement: 'Dãy số $3, 7, 11, 15, \\ldots, 39$. Tìm số số hạng của dãy.',
        steps: [
          { order: 1, content: 'Khoảng cách $d = 4$.', rationale: 'Hiệu giữa hai số hạng liên tiếp.' },
          { order: 2, content: 'Số số hạng $= (39 - 3) : 4 + 1 = 9 + 1 = 10$.', rationale: 'Áp dụng công thức đếm số hạng.' },
        ],
      },
      {
        statement: 'Tính tổng dãy số $2, 4, 6, \\ldots, 20$.',
        steps: [
          { order: 1, content: 'Số số hạng $= (20 - 2) : 2 + 1 = 10$.', rationale: 'Đếm số số hạng trước khi tính tổng.' },
          { order: 2, content: 'Tổng $= (2 + 20) \\times 10 : 2 = 110$.', rationale: 'Áp dụng công thức tính tổng dãy cách đều.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên cộng thêm 1 khi tính số số hạng, dẫn tới đếm thiếu một số hạng.',
      'Quên chia 2 trong công thức tính tổng.',
      'Áp dụng công thức dãy cách đều cho một dãy số không cách đều mà chưa kiểm tra kỹ quy luật.',
    ],
    quickCheck: [
      { id: 'SH-09-QC1', statement: 'Dãy số $5, 10, 15, \\ldots, 50$. Có bao nhiêu số hạng?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['10'], tolerance: 0, isInteger: true } },
      { id: 'SH-09-QC2', statement: 'Tính tổng dãy số $1, 2, 3, \\ldots, 10$.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['55'], tolerance: 0, isInteger: true } },
      { id: 'SH-09-QC3', statement: 'Trong dãy số cách đều, khoảng cách giữa hai số hạng liên tiếp gọi là gì?', answerType: 'mcq', mcq: { options: ['Công sai', 'Số hạng', 'Tổng', 'Thương'], answerIndex: 0 } },
    ],
  },
  {
    id: 'SH-10',
    group: 'SH',
    title: 'Số chẵn/lẻ, số nguyên tố, ước và bội ở mức tiểu học',
    level: 'advanced',
    lesson:
      'Số chẵn chia hết cho 2, số lẻ không chia hết cho 2. Số nguyên tố là số tự nhiên lớn hơn 1 chỉ có đúng hai ước là 1 và chính nó (ví dụ 2, 3, 5, 7, 11...); số 1 không phải là số nguyên tố. Ước của một số là các số chia hết số đó; bội của một số là các số chia hết cho số đó.',
    formulas: ['n \\ \\text{là số nguyên tố} \\Leftrightarrow n > 1 \\ \\text{và} \\ Ư(n) = \\{1, n\\}'],
    examples: [
      {
        statement: 'Tìm các ước của 12.',
        steps: [{ order: 1, content: '$Ư(12) = \\{1, 2, 3, 4, 6, 12\\}$.', rationale: 'Liệt kê tất cả các số chia hết 12.' }],
      },
      {
        statement: 'Trong các số 15, 17, 21, 23, số nào là số nguyên tố?',
        steps: [
          { order: 1, content: '$15 = 3 \\times 5$ và $21 = 3 \\times 7$ nên không phải số nguyên tố.', rationale: 'Có ước khác 1 và chính nó.' },
          { order: 2, content: '17 và 23 chỉ có ước là 1 và chính nó nên là số nguyên tố.', rationale: 'Kiểm tra không tìm được ước nào khác.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm số 1 là số nguyên tố (số 1 chỉ có 1 ước nên không phải số nguyên tố).',
      'Nhầm lẫn giữa ước và bội của một số (ước luôn nhỏ hơn hoặc bằng số đó, bội luôn lớn hơn hoặc bằng số đó).',
      'Quên rằng 2 là số nguyên tố chẵn duy nhất.',
    ],
    quickCheck: [
      { id: 'SH-10-QC1', statement: 'Số nào sau đây là số nguyên tố?', answerType: 'mcq', mcq: { options: ['9', '11', '15', '21'], answerIndex: 1 } },
      { id: 'SH-10-QC2', statement: 'Số 18 có tất cả bao nhiêu ước?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['6'], tolerance: 0, isInteger: true } },
      { id: 'SH-10-QC3', statement: 'Số nào sau đây vừa là số chẵn vừa là số nguyên tố?', answerType: 'mcq', mcq: { options: ['2', '4', '3', '9'], answerIndex: 0 } },
    ],
  },
];
