import type { Topic } from '../../types';

export const dhMoreTopics: Topic[] = [
  {
    id: 'DH-02',
    group: 'DH',
    title: 'Tìm hai số khi biết tổng và tỉ số',
    level: 'basic',
    lesson:
      'Khi biết tổng và tỉ số của hai số, dùng sơ đồ đoạn thẳng: số bé ứng với một số phần bằng nhau, số lớn ứng với số phần khác theo đúng tỉ số. Giá trị 1 phần bằng tổng chia cho tổng số phần. Từ đó suy ra số bé và số lớn.',
    formulas: ['\\text{Giá trị 1 phần} = \\text{Tổng} : (\\text{số phần số bé} + \\text{số phần số lớn})'],
    examples: [
      {
        statement: 'Tổng hai số là 45, tỉ số số bé và số lớn là $2:3$. Tìm hai số.',
        steps: [
          { order: 1, content: 'Tổng số phần $= 2 + 3 = 5$.', rationale: 'Cộng số phần của số bé và số lớn theo tỉ số.' },
          { order: 2, content: 'Giá trị 1 phần $= 45 : 5 = 9$.', rationale: 'Chia tổng cho tổng số phần.' },
          { order: 3, content: 'Số bé $= 9 \\times 2 = 18$; số lớn $= 9 \\times 3 = 27$.', rationale: 'Nhân giá trị 1 phần với số phần tương ứng.' },
        ],
      },
      {
        statement: 'Tổng hai số là 96. Số thứ nhất gấp 3 lần số thứ hai. Tìm hai số.',
        steps: [
          { order: 1, content: 'Tỉ số số thứ hai và số thứ nhất là $1:3$; tổng số phần $= 1+3=4$.', rationale: 'Số thứ nhất gấp 3 lần nghĩa là tỉ số 1:3.' },
          { order: 2, content: 'Giá trị 1 phần $= 96:4=24$.', rationale: 'Chia tổng cho tổng số phần.' },
          { order: 3, content: 'Số thứ hai $=24$; số thứ nhất $=24 \\times 3=72$.', rationale: 'Nhân giá trị 1 phần với số phần tương ứng.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm lẫn tỉ số ứng với số bé và số lớn (đảo ngược thứ tự).',
      'Cộng sai tổng số phần trước khi chia.',
      'Áp dụng nhầm công thức của bài toán tổng-hiệu cho bài toán tổng-tỉ.',
    ],
    quickCheck: [
      { id: 'DH-02-QC1', statement: 'Tổng hai số là 56, tỉ số là $3:4$. Tìm số bé.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['24'], tolerance: 0, isInteger: true } },
      { id: 'DH-02-QC2', statement: 'Tổng hai số là 56, tỉ số là $3:4$. Tìm số lớn.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['32'], tolerance: 0, isInteger: true } },
      { id: 'DH-02-QC3', statement: 'Muốn tìm giá trị 1 phần khi biết tổng và tỉ số, ta làm gì?', answerType: 'mcq', mcq: { options: ['Tổng chia tổng số phần', 'Tổng nhân tổng số phần', 'Hiệu chia tổng số phần', 'Tổng trừ tổng số phần'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-03',
    group: 'DH',
    title: 'Tìm hai số khi biết hiệu và tỉ số',
    level: 'basic',
    lesson:
      'Khi biết hiệu và tỉ số của hai số, dùng sơ đồ: số bé ứng với một số phần, số lớn ứng với số phần nhiều hơn theo đúng tỉ số. Giá trị 1 phần bằng hiệu chia cho hiệu số phần (phần số lớn trừ phần số bé). Từ đó suy ra số bé và số lớn.',
    formulas: ['\\text{Giá trị 1 phần} = \\text{Hiệu} : (\\text{số phần số lớn} - \\text{số phần số bé})'],
    examples: [
      {
        statement: 'Hiệu hai số là 24, tỉ số là $2:5$. Tìm hai số.',
        steps: [
          { order: 1, content: 'Hiệu số phần $= 5 - 2 = 3$.', rationale: 'Lấy số phần lớn trừ số phần bé.' },
          { order: 2, content: 'Giá trị 1 phần $= 24 : 3 = 8$.', rationale: 'Chia hiệu cho hiệu số phần.' },
          { order: 3, content: 'Số bé $= 8 \\times 2 = 16$; số lớn $= 8 \\times 5 = 40$.', rationale: 'Nhân giá trị 1 phần với số phần tương ứng.' },
        ],
      },
      {
        statement: 'Hiệu hai số là 18. Số lớn gấp 4 lần số bé. Tìm hai số.',
        steps: [
          { order: 1, content: 'Tỉ số là $1:4$; hiệu số phần $= 4-1=3$.', rationale: 'Số lớn gấp 4 lần số bé nghĩa là tỉ số 1:4.' },
          { order: 2, content: 'Giá trị 1 phần $= 18:3=6$.', rationale: 'Chia hiệu cho hiệu số phần.' },
          { order: 3, content: 'Số bé $=6$; số lớn $=6\\times4=24$.', rationale: 'Nhân giá trị 1 phần với số phần tương ứng.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm lấy hiệu chia tổng số phần (nhầm với dạng toán tổng-tỉ).',
      'Đảo ngược thứ tự số bé/số lớn trong tỉ số.',
      'Tính hiệu số phần bằng phép cộng thay vì phép trừ.',
    ],
    quickCheck: [
      { id: 'DH-03-QC1', statement: 'Hiệu hai số là 30, tỉ số là $2:5$. Tìm số bé.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['20'], tolerance: 0, isInteger: true } },
      { id: 'DH-03-QC2', statement: 'Hiệu hai số là 30, tỉ số là $2:5$. Tìm số lớn.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['50'], tolerance: 0, isInteger: true } },
      { id: 'DH-03-QC3', statement: 'Muốn tìm giá trị 1 phần khi biết hiệu và tỉ số, ta làm gì?', answerType: 'mcq', mcq: { options: ['Hiệu chia hiệu số phần', 'Hiệu chia tổng số phần', 'Hiệu nhân hiệu số phần', 'Tổng chia hiệu số phần'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-04',
    group: 'DH',
    title: 'Bài toán hai tỉ số',
    level: 'advanced',
    lesson:
      'Dạng toán cho hai tỉ số khác nhau ở hai thời điểm (trước và sau khi thêm/bớt một đại lượng), trong khi đại lượng còn lại không đổi. Phương pháp: đặt đại lượng không đổi theo một số phần chung (ẩn số phần), lập phương trình theo tỉ số mới, từ đó tìm số phần và suy ra kết quả.',
    formulas: ['\\dfrac{a \\pm x}{b} = \\dfrac{p}{q} \\ \\Rightarrow \\ q \\times (a \\pm x) = p \\times b'],
    examples: [
      {
        statement: 'Số học sinh nam và nữ của một lớp có tỉ số $3:4$. Nếu chuyển 2 bạn nam sang lớp khác thì tỉ số nam và nữ là $2:3$. Tính số học sinh nam và nữ lúc đầu.',
        steps: [
          { order: 1, content: 'Gọi số nam lúc đầu là $3k$, số nữ là $4k$ (nữ không đổi).', rationale: 'Đặt ẩn theo tỉ số ban đầu.' },
          { order: 2, content: 'Sau khi chuyển đi, số nam còn $3k - 2$; theo tỉ số mới: $(3k-2):4k = 2:3$.', rationale: 'Lập phương trình theo tỉ số mới.' },
          { order: 3, content: '$3(3k-2) = 2 \\times 4k \\Rightarrow 9k-6=8k \\Rightarrow k=6$.', rationale: 'Giải phương trình tìm k.' },
          { order: 4, content: 'Số nam lúc đầu $=3\\times6=18$; số nữ $=4\\times6=24$.', rationale: 'Kết luận.' },
        ],
      },
      {
        statement: 'Một cửa hàng có số sách Toán và sách Văn theo tỉ số $5:3$. Sau khi nhập thêm 20 quyển sách Văn thì tỉ số Toán và Văn là $5:4$. Tính số sách Toán ban đầu.',
        steps: [
          { order: 1, content: 'Gọi số sách Toán là $5k$ (không đổi), số sách Văn ban đầu là $3k$.', rationale: 'Đặt ẩn theo tỉ số ban đầu.' },
          { order: 2, content: 'Sau khi nhập thêm, số Văn là $3k+20$; theo tỉ số mới: $5k:(3k+20)=5:4$.', rationale: 'Lập phương trình theo tỉ số mới.' },
          { order: 3, content: '$4\\times5k = 5\\times(3k+20) \\Rightarrow 20k=15k+100 \\Rightarrow k=20$.', rationale: 'Giải phương trình tìm k.' },
          { order: 4, content: 'Số sách Toán ban đầu $=5\\times20=100$ (quyển).', rationale: 'Kết luận.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên xác định đại lượng nào không đổi trước khi đặt ẩn theo số phần.',
      'Lập sai tỉ số mới (nhầm chiều so sánh giữa hai đại lượng).',
      'Đặt ẩn k cho cả hai đại lượng dù một trong hai đại lượng đã thay đổi sau biến động.',
    ],
    quickCheck: [
      { id: 'DH-04-QC1', statement: 'Số bi đỏ và bi xanh có tỉ số $2:3$. Nếu bớt đi 4 viên bi đỏ thì tỉ số bi đỏ và bi xanh là $1:2$. Tìm số bi xanh (không đổi).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['24'], tolerance: 0, isInteger: true } },
      { id: 'DH-04-QC2', statement: 'Trong bài toán hai tỉ số, đại lượng nào thường được giữ nguyên để lập phương trình?', answerType: 'mcq', mcq: { options: ['Đại lượng không bị thêm/bớt', 'Đại lượng bị thêm/bớt', 'Cả hai đại lượng', 'Không đại lượng nào'], answerIndex: 0 } },
      { id: 'DH-04-QC3', statement: 'Số sách Toán và Văn có tỉ số $4:3$. Nếu nhập thêm 20 quyển Văn thì tỉ số Toán và Văn là $4:5$. Tính số sách Toán (không đổi).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['40'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'DH-05',
    group: 'DH',
    title: 'Bài toán hai hiệu số',
    level: 'advanced',
    lesson:
      'Dạng toán cho hai lần mua (hoặc đo) với một loại hàng có số lượng giống nhau ở cả hai lần, loại hàng còn lại khác nhau. Chênh lệch tổng số tiền (hoặc tổng giá trị) giữa hai lần hoàn toàn do phần chênh lệch số lượng của loại hàng khác nhau gây ra, từ đó tìm được đơn giá của loại hàng đó.',
    formulas: ['\\text{Đơn giá loại thay đổi} = \\text{Chênh lệch tổng tiền} : \\text{Chênh lệch số lượng}'],
    examples: [
      {
        statement: 'Mua 5 quyển vở A và 3 quyển vở B hết 45 000đ. Mua 5 quyển vở A và 7 quyển vở B hết 65 000đ. Tính giá 1 quyển vở B.',
        steps: [
          { order: 1, content: 'Số vở A ở hai lần mua bằng nhau (5 quyển), nên chênh lệch tiền hoàn toàn do vở B.', rationale: 'Xác định đại lượng không đổi giữa hai lần mua.' },
          { order: 2, content: 'Chênh lệch số vở B: $7-3=4$ (quyển). Chênh lệch tiền: $65\\,000-45\\,000=20\\,000$đ.', rationale: 'Tính hai hiệu số tương ứng.' },
          { order: 3, content: 'Giá 1 quyển vở B $=20\\,000:4=5\\,000$đ.', rationale: 'Chia chênh lệch tiền cho chênh lệch số lượng.' },
        ],
      },
      {
        statement: 'Mua 2kg cam và 3kg táo hết 130 000đ. Mua 2kg cam và 5kg táo hết 170 000đ. Tính giá 1kg táo.',
        steps: [
          { order: 1, content: 'Số cam bằng nhau (2kg), chênh lệch tiền hoàn toàn do táo.', rationale: 'Xác định đại lượng không đổi.' },
          { order: 2, content: 'Chênh lệch táo: $5-3=2$ (kg). Chênh lệch tiền: $170\\,000-130\\,000=40\\,000$đ.', rationale: 'Tính hai hiệu số tương ứng.' },
          { order: 3, content: 'Giá 1kg táo $=40\\,000:2=20\\,000$đ.', rationale: 'Chia chênh lệch tiền cho chênh lệch số lượng.' },
        ],
      },
    ],
    commonMistakes: [
      'Không nhận diện được đại lượng nào giữ nguyên giữa hai lần mua/đo để loại trừ.',
      'Tính sai chênh lệch số lượng hoặc chênh lệch tiền (lấy nhầm chiều trừ).',
      'Quên rằng phương pháp chỉ áp dụng được khi một loại hàng có số lượng giống nhau ở cả hai lần.',
    ],
    quickCheck: [
      { id: 'DH-05-QC1', statement: 'Mua 3kg gạo và 2kg đường hết 88 000đ. Mua 3kg gạo và 5kg đường hết 133 000đ. Tính giá 1kg đường.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['15000'], tolerance: 0, isInteger: true } },
      { id: 'DH-05-QC2', statement: 'Trong phương pháp hai hiệu số, ta cần tìm điều gì trước tiên?', answerType: 'mcq', mcq: { options: ['Đại lượng không đổi giữa hai lần', 'Tổng của cả hai lần', 'Trung bình cộng hai lần', 'Tích của hai đại lượng'], answerIndex: 0 } },
      { id: 'DH-05-QC3', statement: 'Mua 4 vé loại thường và 2 vé loại VIP hết 340 000đ. Mua 4 vé loại thường và 5 vé loại VIP hết 610 000đ. Tính giá 1 vé VIP.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['90000'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'DH-06',
    group: 'DH',
    title: 'Toán tính tuổi (tương quan tuổi ở hai thời điểm khác nhau)',
    level: 'advanced',
    lesson:
      'Đặc điểm quan trọng của toán tính tuổi: hiệu số tuổi giữa hai người luôn không đổi theo thời gian (mỗi năm cả hai đều tăng thêm 1 tuổi như nhau), dù tỉ số tuổi có thể thay đổi. Có thể kết hợp với dạng toán tổng-tỉ hoặc hiệu-tỉ tại một thời điểm cụ thể (hiện tại, quá khứ hoặc tương lai).',
    formulas: ['\\text{Hiệu tuổi hai người luôn không đổi theo thời gian}'],
    examples: [
      {
        statement: 'Hiện nay tuổi bố gấp 4 lần tuổi con. Hiệu tuổi hai bố con là 30 tuổi. Tính tuổi mỗi người hiện nay.',
        steps: [
          { order: 1, content: 'Tỉ số con:bố hiện tại là $1:4$; hiệu số phần $=4-1=3$.', rationale: 'Áp dụng dạng hiệu-tỉ tại thời điểm hiện tại.' },
          { order: 2, content: 'Giá trị 1 phần $=30:3=10$.', rationale: 'Chia hiệu cho hiệu số phần.' },
          { order: 3, content: 'Tuổi con $=10$; tuổi bố $=10\\times4=40$.', rationale: 'Kết luận.' },
        ],
      },
      {
        statement: 'Trước đây 5 năm, tuổi con là 8. Tính tuổi con hiện nay và tuổi con sau 7 năm nữa.',
        steps: [
          { order: 1, content: 'Tuổi con hiện nay $=8+5=13$.', rationale: 'Cộng thêm số năm đã trôi qua.' },
          { order: 2, content: 'Tuổi con sau 7 năm nữa $=13+7=20$.', rationale: 'Cộng thêm số năm trong tương lai.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên rằng hiệu tuổi không đổi theo thời gian trong khi tỉ số tuổi có thể thay đổi.',
      'Nhầm lẫn cộng/trừ số năm khi tính tuổi ở quá khứ hoặc tương lai.',
      'Áp dụng tỉ số tại một thời điểm cho một thời điểm khác mà không kiểm tra lại đề bài.',
    ],
    quickCheck: [
      { id: 'DH-06-QC1', statement: 'Hiện nay tuổi mẹ gấp 3 lần tuổi con. Hiệu tuổi mẹ con là 24 tuổi. Tính tuổi con hiện nay.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['12'], tolerance: 0, isInteger: true } },
      { id: 'DH-06-QC2', statement: 'Năm nay Lan 9 tuổi. Hỏi 6 năm nữa Lan bao nhiêu tuổi?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['15'], tolerance: 0, isInteger: true } },
      { id: 'DH-06-QC3', statement: 'Hiệu số tuổi giữa hai người thay đổi như thế nào theo thời gian?', answerType: 'mcq', mcq: { options: ['Không đổi', 'Tăng dần', 'Giảm dần', 'Không xác định'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-07',
    group: 'DH',
    title: 'Toán chuyển động cơ bản: cùng chiều, ngược chiều, gặp nhau, đuổi kịp',
    level: 'advanced',
    lesson:
      'Quãng đường bằng vận tốc nhân thời gian. Hai xe chuyển động ngược chiều xuất phát cùng lúc: thời gian gặp nhau bằng quãng đường ban đầu chia tổng vận tốc hai xe. Hai xe chuyển động cùng chiều (đuổi kịp): thời gian đuổi kịp bằng khoảng cách ban đầu chia hiệu vận tốc hai xe.',
    formulas: [
      'S = v \\times t',
      't_{gặp nhau} = S : (v_1 + v_2) \\quad \\text{(ngược chiều)}',
      't_{đuổi kịp} = S : (v_1 - v_2) \\quad \\text{(cùng chiều)}',
    ],
    examples: [
      {
        statement: 'Hai ô tô xuất phát cùng lúc từ hai địa điểm cách nhau 225km, đi ngược chiều nhau với vận tốc 45km/h và 30km/h. Hỏi sau bao lâu hai xe gặp nhau?',
        steps: [
          { order: 1, content: 'Tổng vận tốc $=45+30=75$km/h.', rationale: 'Hai xe ngược chiều nên cộng vận tốc.' },
          { order: 2, content: 'Thời gian gặp nhau $=225:75=3$ giờ.', rationale: 'Áp dụng công thức thời gian gặp nhau.' },
        ],
      },
      {
        statement: 'Xe máy đi từ A lúc 6 giờ với vận tốc 40km/h. Ô tô đi từ A lúc 7 giờ đuổi theo với vận tốc 60km/h. Hỏi ô tô đuổi kịp xe máy lúc mấy giờ?',
        steps: [
          { order: 1, content: 'Khi ô tô xuất phát, xe máy đã đi được $40\\times1=40$km (khoảng cách ban đầu).', rationale: 'Tính quãng đường xe máy đi trước.' },
          { order: 2, content: 'Hiệu vận tốc $=60-40=20$km/h.', rationale: 'Hai xe cùng chiều nên trừ vận tốc.' },
          { order: 3, content: 'Thời gian đuổi kịp $=40:20=2$ giờ; ô tô đuổi kịp lúc $7+2=9$ giờ.', rationale: 'Cộng thời gian đuổi kịp vào giờ xuất phát của ô tô.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm công thức tổng vận tốc (ngược chiều) với hiệu vận tốc (đuổi kịp cùng chiều).',
      'Quên tính khoảng cách ban đầu khi hai xe không xuất phát cùng lúc.',
      'Quên đổi đơn vị thời gian hoặc vận tốc về cùng hệ trước khi tính.',
    ],
    quickCheck: [
      { id: 'DH-07-QC1', statement: 'Hai xe cách nhau 180km đi ngược chiều, vận tốc 50km/h và 40km/h. Hỏi sau bao lâu (giờ) hai xe gặp nhau?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0 } },
      { id: 'DH-07-QC2', statement: 'Một xe đuổi theo xe khác cách 24km, hiệu vận tốc hai xe là 8km/h. Hỏi sau bao lâu (giờ) xe sau đuổi kịp xe trước?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['3'], tolerance: 0 } },
      { id: 'DH-07-QC3', statement: 'Công thức tính thời gian gặp nhau khi hai xe đi ngược chiều là gì?', answerType: 'mcq', mcq: { options: ['Quãng đường : tổng vận tốc', 'Quãng đường : hiệu vận tốc', 'Quãng đường × tổng vận tốc', 'Tổng vận tốc : quãng đường'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-08',
    group: 'DH',
    title: 'Toán chuyển động nâng cao: trên dòng nước, có nghỉ giữa đường, nhiều chặng',
    level: 'advanced',
    lesson:
      'Chuyển động trên dòng nước: vận tốc xuôi dòng bằng vận tốc thực cộng vận tốc dòng nước; vận tốc ngược dòng bằng vận tốc thực trừ vận tốc dòng nước. Khi bài toán có thời gian nghỉ giữa đường, phải trừ thời gian nghỉ ra khỏi tổng thời gian trước khi tính quãng đường.',
    formulas: [
      'v_{xuôi} = v_{thực} + v_{nước}, \\quad v_{ngược} = v_{thực} - v_{nước}',
      'v_{thực} = (v_{xuôi} + v_{ngược}) : 2, \\quad v_{nước} = (v_{xuôi} - v_{ngược}) : 2',
    ],
    examples: [
      {
        statement: 'Một ca nô xuôi dòng với vận tốc 28km/h, ngược dòng với vận tốc 20km/h. Tính vận tốc thực của ca nô và vận tốc dòng nước.',
        steps: [
          { order: 1, content: 'Vận tốc thực $=(28+20):2=24$km/h.', rationale: 'Áp dụng công thức tính vận tốc thực.' },
          { order: 2, content: 'Vận tốc dòng nước $=(28-20):2=4$km/h.', rationale: 'Áp dụng công thức tính vận tốc dòng nước.' },
        ],
      },
      {
        statement: 'Một người đi xe đạp từ A đến B mất 3 giờ kể cả thời gian nghỉ giữa đường 30 phút. Biết vận tốc đi là 12km/h. Tính quãng đường AB.',
        steps: [
          { order: 1, content: 'Thời gian đi thực tế $=3 - 0{,}5=2{,}5$ giờ.', rationale: 'Trừ thời gian nghỉ ra khỏi tổng thời gian.' },
          { order: 2, content: 'Quãng đường $=12\\times2{,}5=30$km.', rationale: 'Áp dụng công thức quãng đường = vận tốc × thời gian.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm công thức cộng/trừ vận tốc dòng nước (xuôi dòng cộng, ngược dòng trừ).',
      'Quên trừ thời gian nghỉ khi tính thời gian di chuyển thực tế.',
      'Nhầm đơn vị phút và giờ khi tính toán thời gian.',
    ],
    quickCheck: [
      { id: 'DH-08-QC1', statement: 'Một ca nô xuôi dòng vận tốc 32km/h, ngược dòng vận tốc 24km/h. Tính vận tốc thực.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['28'], tolerance: 0, isInteger: true } },
      { id: 'DH-08-QC2', statement: 'Một ca nô xuôi dòng vận tốc 32km/h, ngược dòng vận tốc 24km/h. Tính vận tốc dòng nước.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['4'], tolerance: 0, isInteger: true } },
      { id: 'DH-08-QC3', statement: 'Một người đi bộ trong 4 giờ (đã tính cả thời gian nghỉ), nghỉ giữa đường 1 giờ, vận tốc đi 5km/h. Tính quãng đường đã đi.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['15'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'DH-09',
    group: 'DH',
    title: 'Toán công việc chung (làm chung – làm riêng, thay đổi số người)',
    level: 'advanced',
    lesson:
      'Nếu một người (hoặc một đội) làm xong công việc trong $a$ đơn vị thời gian thì trong 1 đơn vị thời gian làm được $\\dfrac{1}{a}$ công việc (năng suất). Khi làm chung, năng suất được cộng lại. Thời gian làm chung xong việc bằng 1 chia cho năng suất chung. Số người và thời gian hoàn thành tỉ lệ nghịch với nhau (cùng năng suất mỗi người).',
    formulas: ['\\text{Năng suất chung} = \\dfrac{1}{a} + \\dfrac{1}{b}, \\quad \\text{Thời gian làm chung} = 1 : \\text{Năng suất chung}'],
    examples: [
      {
        statement: 'Người thứ nhất làm một mình xong việc trong 6 giờ, người thứ hai làm một mình xong trong 3 giờ. Nếu làm chung thì sau bao lâu xong việc?',
        steps: [
          { order: 1, content: 'Năng suất người 1 là $\\dfrac{1}{6}$, người 2 là $\\dfrac{1}{3}$.', rationale: 'Năng suất bằng 1 chia thời gian làm riêng.' },
          { order: 2, content: 'Năng suất chung $=\\dfrac{1}{6}+\\dfrac{1}{3}=\\dfrac{1}{6}+\\dfrac{2}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}$.', rationale: 'Cộng năng suất hai người.' },
          { order: 3, content: 'Thời gian làm chung $=1:\\dfrac{1}{2}=2$ giờ.', rationale: 'Lấy 1 chia cho năng suất chung.' },
        ],
      },
      {
        statement: 'Một đội 5 người làm xong một công việc trong 8 ngày. Hỏi nếu có 10 người (cùng năng suất mỗi người) thì làm xong công việc đó trong bao nhiêu ngày?',
        steps: [
          { order: 1, content: 'Tổng "người-ngày" cần để hoàn thành $=5\\times8=40$.', rationale: 'Khối lượng công việc không đổi, đo bằng người-ngày.' },
          { order: 2, content: 'Với 10 người, thời gian $=40:10=4$ ngày.', rationale: 'Chia tổng người-ngày cho số người mới.' },
        ],
      },
    ],
    commonMistakes: [
      'Cộng trực tiếp số giờ/ngày làm riêng thay vì cộng năng suất (nghịch đảo của thời gian).',
      'Quên quy đồng mẫu số khi cộng các phân số năng suất.',
      'Nhầm mối quan hệ tỉ lệ nghịch giữa số người và thời gian hoàn thành.',
    ],
    quickCheck: [
      { id: 'DH-09-QC1', statement: 'Người thứ nhất làm xong việc trong 4 giờ, người thứ hai làm xong trong 4 giờ. Làm chung thì sau bao lâu (giờ) xong việc?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0 } },
      { id: 'DH-09-QC2', statement: 'Một đội 4 người làm xong việc trong 6 ngày. Nếu có 8 người thì xong việc trong bao nhiêu ngày?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['3'], tolerance: 0 } },
      { id: 'DH-09-QC3', statement: 'Muốn tính năng suất chung khi hai người cùng làm, ta làm gì?', answerType: 'mcq', mcq: { options: ['Cộng năng suất từng người', 'Cộng thời gian làm riêng', 'Nhân thời gian làm riêng', 'Trừ năng suất hai người'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-10',
    group: 'DH',
    title: 'Toán trồng cây',
    level: 'basic',
    lesson:
      'Trồng cây trên đường thẳng có trồng ở cả hai đầu: số cây bằng số khoảng cách cộng 1. Trồng cây theo đường khép kín (quanh ao, quanh vườn...): số cây bằng số khoảng cách (không cộng thêm). Số khoảng cách bằng độ dài đường chia khoảng cách giữa hai cây liên tiếp.',
    formulas: [
      '\\text{Đường thẳng (2 đầu)}: \\text{Số cây} = \\text{Độ dài} : \\text{khoảng cách} + 1',
      '\\text{Đường khép kín}: \\text{Số cây} = \\text{Độ dài} : \\text{khoảng cách}',
    ],
    examples: [
      {
        statement: 'Một con đường dài 100m, trồng cây hai bên với khoảng cách 5m, trồng ở cả hai đầu đường. Hỏi cần bao nhiêu cây (một bên đường)?',
        steps: [
          { order: 1, content: 'Số khoảng cách $=100:5=20$.', rationale: 'Chia độ dài cho khoảng cách giữa hai cây.' },
          { order: 2, content: 'Số cây (1 bên) $=20+1=21$.', rationale: 'Đường thẳng có 2 đầu nên cộng thêm 1.' },
        ],
      },
      {
        statement: 'Trồng cây xung quanh một hồ nước hình tròn có chu vi 120m, khoảng cách giữa hai cây liên tiếp là 6m. Hỏi cần bao nhiêu cây?',
        steps: [{ order: 1, content: 'Đường khép kín nên số cây $=$ số khoảng cách $=120:6=20$.', rationale: 'Đường khép kín không cộng thêm 1.' }],
      },
    ],
    commonMistakes: [
      'Quên cộng thêm 1 khi trồng cây trên đường thẳng có trồng ở cả hai đầu.',
      'Cộng thêm 1 một cách máy móc cho cả trường hợp đường khép kín (không cần cộng thêm).',
      'Nhầm lẫn giữa chu vi và độ dài một đoạn khi tính số khoảng cách.',
    ],
    quickCheck: [
      { id: 'DH-10-QC1', statement: 'Một con đường dài 60m, trồng cây ở cả hai đầu, khoảng cách 4m. Hỏi cần bao nhiêu cây?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['16'], tolerance: 0, isInteger: true } },
      { id: 'DH-10-QC2', statement: 'Trồng cây quanh một hồ hình tròn chu vi 90m, khoảng cách 5m. Hỏi cần bao nhiêu cây?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['18'], tolerance: 0, isInteger: true } },
      { id: 'DH-10-QC3', statement: 'Khi trồng cây trên đường thẳng có trồng ở cả hai đầu, số cây tính thế nào?', answerType: 'mcq', mcq: { options: ['Số khoảng cách + 1', 'Số khoảng cách - 1', 'Bằng số khoảng cách', 'Số khoảng cách x 2'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-11',
    group: 'DH',
    title: 'Bài toán giả thiết tạm',
    level: 'advanced',
    lesson:
      'Phương pháp giả thiết tạm dùng cho bài toán có hai loại đối tượng với hai mức giá trị khác nhau (ví dụ gà và chó với số chân khác nhau). Giả sử tất cả đều thuộc một loại, tính chênh lệch so với thực tế, từ đó suy ra số lượng loại còn lại nhờ mức chênh lệch giữa hai loại.',
    formulas: ['\\text{Số đối tượng loại 2} = (\\text{Tổng thực tế} - \\text{Tổng giả thiết}) : \\text{chênh lệch mỗi đối tượng}'],
    examples: [
      {
        statement: 'Vừa gà vừa chó có tất cả 36 con và 100 chân. Hỏi có bao nhiêu con gà, bao nhiêu con chó?',
        steps: [
          { order: 1, content: 'Giả sử tất cả 36 con đều là gà (2 chân): tổng chân $=36\\times2=72$.', rationale: 'Giả thiết tạm toàn bộ là loại có ít chân hơn.' },
          { order: 2, content: 'Số chân còn thiếu so với thực tế $=100-72=28$.', rationale: 'So sánh với số chân thực tế của đề bài.' },
          { order: 3, content: 'Mỗi con chó có nhiều hơn gà $4-2=2$ chân; số chó $=28:2=14$ (con).', rationale: 'Mỗi lần thay 1 gà bằng 1 chó, số chân tăng thêm 2.' },
          { order: 4, content: 'Số gà $=36-14=22$ (con).', rationale: 'Lấy tổng số con trừ số chó.' },
        ],
      },
      {
        statement: 'Có 15 xe gồm xe đạp (2 bánh) và xe ba bánh, tất cả có 36 bánh xe. Tính số xe ba bánh.',
        steps: [
          { order: 1, content: 'Giả sử tất cả 15 xe đều là xe đạp: tổng bánh $=15\\times2=30$.', rationale: 'Giả thiết tạm toàn bộ là loại có ít bánh hơn.' },
          { order: 2, content: 'Số bánh còn thiếu so với thực tế $=36-30=6$.', rationale: 'So sánh với số bánh thực tế của đề bài.' },
          { order: 3, content: 'Mỗi xe ba bánh có nhiều hơn xe đạp 1 bánh; số xe ba bánh $=6:1=6$.', rationale: 'Mỗi lần thay 1 xe đạp bằng 1 xe ba bánh, số bánh tăng thêm 1.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm mức chênh lệch giữa hai loại (ví dụ chó hơn gà 2 chân chứ không phải 4 chân).',
      'Giả thiết tạm nhưng tính sai tổng theo giả thiết đã đặt ra.',
      'Quên lấy tổng số đối tượng trừ đi kết quả vừa tìm để ra loại còn lại.',
    ],
    quickCheck: [
      { id: 'DH-11-QC1', statement: 'Vừa gà vừa chó có 20 con và 56 chân. Giả sử tất cả là gà, tổng số chân là bao nhiêu?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['40'], tolerance: 0, isInteger: true } },
      { id: 'DH-11-QC2', statement: 'Vừa gà vừa chó có 20 con và 56 chân. Tính số con chó.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['8'], tolerance: 0, isInteger: true } },
      { id: 'DH-11-QC3', statement: 'Phương pháp giả thiết tạm thường dùng cho dạng bài nào?', answerType: 'mcq', mcq: { options: ['Hai loại đối tượng có giá trị khác nhau (như số chân)', 'Tìm trung bình cộng', 'So sánh phân số', 'Tính chu vi hình học'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-12',
    group: 'DH',
    title: 'Bài toán tính ngược từ cuối',
    level: 'advanced',
    lesson:
      'Với bài toán cho biết kết quả sau nhiều bước biến đổi liên tiếp (cộng, trừ, nhân, chia) và yêu cầu tìm số ban đầu, ta thực hiện các phép tính ngược theo thứ tự từ bước cuối lên bước đầu: phép cộng ở bước gốc trở thành phép trừ, trừ thành cộng, nhân thành chia, chia thành nhân.',
    formulas: ['\\text{Tính ngược}: \\ + \\leftrightarrow -, \\quad \\times \\leftrightarrow :'],
    examples: [
      {
        statement: 'Một số, sau khi cộng 5 rồi nhân 3 thì được 36. Tìm số ban đầu.',
        steps: [
          { order: 1, content: 'Trước khi nhân 3 để được 36, số đó là $36:3=12$.', rationale: 'Tính ngược phép nhân thành phép chia.' },
          { order: 2, content: 'Trước khi cộng 5 để được 12, số ban đầu là $12-5=7$.', rationale: 'Tính ngược phép cộng thành phép trừ.' },
        ],
      },
      {
        statement: 'Một số, sau khi nhân 2 rồi trừ đi 8 thì được 20. Tìm số ban đầu.',
        steps: [
          { order: 1, content: 'Trước khi trừ 8 để được 20, số đó là $20+8=28$.', rationale: 'Tính ngược phép trừ thành phép cộng.' },
          { order: 2, content: 'Trước khi nhân 2 để được 28, số ban đầu là $28:2=14$.', rationale: 'Tính ngược phép nhân thành phép chia.' },
        ],
      },
    ],
    commonMistakes: [
      'Thực hiện các phép tính ngược không theo đúng thứ tự (phải làm từ bước cuối cùng lên bước đầu tiên).',
      'Nhầm phép tính ngược tương ứng (ví dụ cộng lại trở thành cộng thay vì trừ).',
      'Quên đổi chiều phép tính khi tính ngược từng bước.',
    ],
    quickCheck: [
      { id: 'DH-12-QC1', statement: 'Một số, sau khi cộng 4 rồi nhân 2 thì được 30. Tìm số ban đầu.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['11'], tolerance: 0, isInteger: true } },
      { id: 'DH-12-QC2', statement: 'Một số, sau khi nhân 3 rồi trừ đi 5 thì được 40. Tìm số ban đầu.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['15'], tolerance: 0, isInteger: true } },
      { id: 'DH-12-QC3', statement: 'Khi tính ngược từ cuối, phép cộng ở bước gốc sẽ trở thành phép tính gì?', answerType: 'mcq', mcq: { options: ['Trừ', 'Cộng', 'Nhân', 'Chia'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-13',
    group: 'DH',
    title: 'Tỉ lệ thuận, tỉ lệ nghịch; phương pháp rút về đơn vị',
    level: 'basic',
    lesson:
      'Hai đại lượng tỉ lệ thuận: đại lượng này tăng (giảm) bao nhiêu lần thì đại lượng kia cũng tăng (giảm) bấy nhiêu lần. Hai đại lượng tỉ lệ nghịch: đại lượng này tăng bao nhiêu lần thì đại lượng kia giảm bấy nhiêu lần. Phương pháp "rút về đơn vị": tìm giá trị ứng với 1 đơn vị rồi từ đó suy ra giá trị cần tìm.',
    formulas: ['\\text{Tỉ lệ thuận}: \\dfrac{a_1}{a_2}=\\dfrac{b_1}{b_2\\ }\\qquad \\text{Tỉ lệ nghịch}: a_1 \\times b_1 = a_2 \\times b_2'],
    examples: [
      {
        statement: 'Mua 5 quyển vở hết 25 000đ. Hỏi mua 8 quyển vở hết bao nhiêu tiền? (tỉ lệ thuận)',
        steps: [
          { order: 1, content: 'Giá 1 quyển $=25\\,000:5=5\\,000$đ.', rationale: 'Rút về giá trị 1 đơn vị.' },
          { order: 2, content: '8 quyển hết $5\\,000\\times8=40\\,000$đ.', rationale: 'Nhân giá 1 đơn vị với số lượng cần tìm.' },
        ],
      },
      {
        statement: '4 người làm xong một công việc trong 6 ngày. Hỏi 3 người làm xong công việc đó trong bao nhiêu ngày (cùng năng suất)? (tỉ lệ nghịch)',
        steps: [
          { order: 1, content: '1 người làm xong trong $6\\times4=24$ ngày.', rationale: 'Số người ít hơn thì thời gian làm một mình nhiều hơn theo đúng số lần.' },
          { order: 2, content: '3 người làm xong trong $24:3=8$ ngày.', rationale: 'Chia thời gian 1 người cho số người mới.' },
        ],
      },
    ],
    commonMistakes: [
      'Áp dụng công thức tỉ lệ thuận (nhân) cho bài toán tỉ lệ nghịch, hoặc ngược lại.',
      'Quên xác định đúng mối quan hệ tỉ lệ thuận hay tỉ lệ nghịch trước khi giải.',
      'Tính sai giá trị ứng với 1 đơn vị ở bước rút về đơn vị.',
    ],
    quickCheck: [
      { id: 'DH-13-QC1', statement: 'Mua 3kg gạo hết 45 000đ. Hỏi mua 7kg gạo hết bao nhiêu tiền?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['105000'], tolerance: 0, isInteger: true } },
      { id: 'DH-13-QC2', statement: '6 người làm xong việc trong 8 ngày. Hỏi 4 người làm xong việc đó trong bao nhiêu ngày?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['12'], tolerance: 0, isInteger: true } },
      { id: 'DH-13-QC3', statement: 'Hai đại lượng tỉ lệ nghịch có tính chất gì?', answerType: 'mcq', mcq: { options: ['Đại lượng này tăng thì đại lượng kia giảm theo cùng số lần', 'Cả hai cùng tăng theo cùng số lần', 'Cả hai cùng giảm theo cùng số lần', 'Không liên quan gì nhau'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DH-14',
    group: 'DH',
    title: 'Bài toán về năng suất, mật độ và đại lượng tỉ lệ trong thực tế',
    level: 'advanced',
    lesson:
      'Năng suất là khối lượng công việc hoàn thành trong một đơn vị thời gian (hoặc trên một đơn vị diện tích). Các bài toán này thường áp dụng phương pháp rút về đơn vị: tìm năng suất (giá trị ứng với 1 đơn vị thời gian/diện tích) rồi suy ra kết quả cho trường hợp khác.',
    formulas: ['\\text{Năng suất} = \\text{Khối lượng công việc} : \\text{Thời gian (hoặc diện tích)}'],
    examples: [
      {
        statement: 'Một thửa ruộng 500m² thu hoạch được 250kg thóc. Tính năng suất (kg/m²) và sản lượng thu hoạch trên thửa ruộng 800m² (cùng năng suất).',
        steps: [
          { order: 1, content: 'Năng suất $=250:500=0{,}5$kg/m².', rationale: 'Chia khối lượng công việc cho diện tích.' },
          { order: 2, content: 'Sản lượng $800$m² $=0{,}5\\times800=400$kg.', rationale: 'Nhân năng suất với diện tích mới.' },
        ],
      },
      {
        statement: 'Một máy in in được 1200 trang trong 2 giờ. Tính năng suất in (trang/giờ) và số trang in được trong 5 giờ.',
        steps: [
          { order: 1, content: 'Năng suất $=1200:2=600$ trang/giờ.', rationale: 'Chia khối lượng công việc cho thời gian.' },
          { order: 2, content: 'Số trang trong 5 giờ $=600\\times5=3000$ trang.', rationale: 'Nhân năng suất với thời gian mới.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm lẫn năng suất với tổng khối lượng công việc.',
      'Áp dụng sai công thức khi thời gian hoặc diện tích thay đổi.',
      'Quên đơn vị đo khi tính năng suất (kg/m², trang/giờ...).',
    ],
    quickCheck: [
      { id: 'DH-14-QC1', statement: 'Một thửa ruộng 400m² thu hoạch 200kg thóc. Tính năng suất (kg/m²), nhập số.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['0.5'], tolerance: 0 } },
      { id: 'DH-14-QC2', statement: 'Với năng suất 0,5kg/m², một thửa ruộng 600m² thu hoạch được bao nhiêu kg thóc?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['300'], tolerance: 0, isInteger: true } },
      { id: 'DH-14-QC3', statement: 'Năng suất được tính bằng cách nào?', answerType: 'mcq', mcq: { options: ['Khối lượng công việc chia thời gian (hoặc diện tích)', 'Khối lượng công việc nhân thời gian', 'Thời gian chia khối lượng công việc', 'Không tính được'], answerIndex: 0 } },
    ],
  },
];
