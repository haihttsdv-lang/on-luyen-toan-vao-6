import type { Topic } from '../../types';

export const dlTopics: Topic[] = [
  {
    id: 'DL-01',
    group: 'DL',
    title: 'Đơn vị đo độ dài, khối lượng: đổi đơn vị và tính toán',
    level: 'basic',
    lesson:
      'Đơn vị đo độ dài từ lớn đến bé: km, hm, dam, m, dm, cm, mm — mỗi đơn vị gấp 10 lần đơn vị liền sau. Đơn vị đo khối lượng: tấn, tạ, yến, kg, hg, dag, g — cũng gấp 10 lần đơn vị liền sau. Muốn đổi từ đơn vị lớn sang đơn vị bé liền kề, nhân với 10; ngược lại, chia cho 10.',
    formulas: ['1\\,km = 10\\,hm = 100\\,dam = 1000\\,m'],
    examples: [
      { statement: 'Đổi $3\\,km$ sang mét.', steps: [{ order: 1, content: '$3\\,km = 3 \\times 1000 = 3000\\,m$.', rationale: 'Mỗi bước từ km xuống m gấp 1000 lần (3 bước x10).' }] },
      { statement: 'Đổi $4500\\,g$ sang kg.', steps: [{ order: 1, content: '$4500\\,g = 4500:1000 = 4{,}5\\,kg$.', rationale: 'Đổi từ đơn vị bé sang đơn vị lớn phải chia.' }] },
    ],
    commonMistakes: [
      'Nhầm số lần giữa các đơn vị không liền kề (phải nhân/chia đúng số bước, mỗi bước x10).',
      'Nhầm chiều đổi: đơn vị lớn sang bé phải nhân, bé sang lớn phải chia.',
      'Nhầm lẫn đơn vị đo độ dài với đơn vị đo khối lượng khi làm bài.',
    ],
    quickCheck: [
      { id: 'DL-01-QC1', statement: 'Đổi $5\\,km$ sang mét.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['5000'], tolerance: 0, isInteger: true } },
      { id: 'DL-01-QC2', statement: 'Đổi $2500\\,g$ sang kg.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['2.5'], tolerance: 0 } },
      { id: 'DL-01-QC3', statement: '1kg bằng bao nhiêu g?', answerType: 'mcq', mcq: { options: ['1000g', '100g', '10g', '10000g'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DL-02',
    group: 'DL',
    title: 'Đơn vị đo diện tích',
    level: 'basic',
    lesson:
      'Đơn vị đo diện tích: km², hm² (ha), dam², m², dm², cm², mm² — mỗi đơn vị gấp 100 lần đơn vị liền sau (khác với đơn vị đo độ dài chỉ gấp 10 lần). Đặc biệt, $1\\,ha = 1\\,hm^2 = 10\\,000\\,m^2$.',
    formulas: ['1\\,m^2 = 100\\,dm^2 = 10\\,000\\,cm^2,\\quad 1\\,ha = 10\\,000\\,m^2'],
    examples: [
      { statement: 'Đổi $3\\,m^2$ sang $dm^2$.', steps: [{ order: 1, content: '$3\\,m^2 = 3 \\times 100 = 300\\,dm^2$.', rationale: 'Đơn vị diện tích liền kề gấp nhau 100 lần.' }] },
      { statement: 'Đổi $25\\,000\\,m^2$ sang ha.', steps: [{ order: 1, content: '$25\\,000\\,m^2 = 25\\,000 : 10\\,000 = 2{,}5\\,ha$.', rationale: '1ha = 10 000m².' }] },
    ],
    commonMistakes: [
      'Nhầm hệ số 100 lần của đơn vị diện tích với hệ số 10 lần của đơn vị độ dài.',
      'Quên rằng $1\\,ha = 10\\,000\\,m^2$ chứ không phải $100\\,m^2$.',
      'Nhầm chiều đổi giữa đơn vị lớn và đơn vị bé.',
    ],
    quickCheck: [
      { id: 'DL-02-QC1', statement: 'Đổi $5\\,m^2$ sang $dm^2$.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['500'], tolerance: 0, isInteger: true } },
      { id: 'DL-02-QC2', statement: 'Đổi $30\\,000\\,m^2$ sang ha.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['3'], tolerance: 0, isInteger: true } },
      { id: 'DL-02-QC3', statement: '$1\\,m^2$ bằng bao nhiêu $cm^2$?', answerType: 'mcq', mcq: { options: ['10000cm²', '1000cm²', '100cm²', '100000cm²'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DL-03',
    group: 'DL',
    title: 'Đơn vị đo thể tích (cm³, dm³, m³, lít) và phép tính giữa các đơn vị',
    level: 'basic',
    lesson:
      'Đơn vị đo thể tích: m³, dm³, cm³ — mỗi đơn vị gấp 1000 lần đơn vị liền sau. Đặc biệt, $1$ lít $= 1\\,dm^3 = 1000\\,cm^3$.',
    formulas: ['1\\,m^3 = 1000\\,dm^3 = 1\\,000\\,000\\,cm^3,\\quad 1\\,\\text{lít} = 1\\,dm^3 = 1000\\,cm^3'],
    examples: [
      { statement: 'Đổi $2\\,m^3$ sang $dm^3$.', steps: [{ order: 1, content: '$2\\,m^3 = 2 \\times 1000 = 2000\\,dm^3$.', rationale: 'Đơn vị thể tích liền kề gấp nhau 1000 lần.' }] },
      { statement: 'Một bể chứa $5000\\,cm^3$ nước. Đổi sang lít.', steps: [{ order: 1, content: '$5000\\,cm^3 = 5000:1000 = 5$ lít.', rationale: '1 lít = 1000cm³.' }] },
    ],
    commonMistakes: [
      'Nhầm hệ số 1000 lần giữa các đơn vị thể tích với hệ số 100 lần của đơn vị diện tích.',
      'Nhầm lít với $dm^3$ (thực ra hai đơn vị này bằng nhau).',
      'Nhầm mililít (ml) với lít khi tính toán.',
    ],
    quickCheck: [
      { id: 'DL-03-QC1', statement: 'Đổi $3\\,m^3$ sang $dm^3$.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['3000'], tolerance: 0, isInteger: true } },
      { id: 'DL-03-QC2', statement: 'Đổi $7000\\,cm^3$ sang lít.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['7'], tolerance: 0, isInteger: true } },
      { id: 'DL-03-QC3', statement: '1 lít bằng bao nhiêu $cm^3$?', answerType: 'mcq', mcq: { options: ['1000cm³', '100cm³', '10cm³', '10000cm³'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DL-04',
    group: 'DL',
    title: 'Đơn vị đo thời gian; bốn phép tính với số đo thời gian',
    level: 'basic',
    lesson:
      '1 giờ = 60 phút, 1 phút = 60 giây, 1 ngày = 24 giờ, 1 tuần = 7 ngày. Khi cộng số đo thời gian, nếu số phút (hoặc giây) vượt quá 60 thì phải đổi sang đơn vị lớn hơn liền kề. Khi trừ mà số phút (hoặc giây) bị trừ nhỏ hơn số trừ, phải "mượn" 1 đơn vị lớn hơn (1 giờ = 60 phút) rồi mới trừ.',
    formulas: ['1\\,\\text{giờ} = 60\\,\\text{phút},\\quad 1\\,\\text{phút} = 60\\,\\text{giây}'],
    examples: [
      {
        statement: 'Tính: $2$ giờ $45$ phút $+$ $1$ giờ $30$ phút.',
        steps: [
          { order: 1, content: 'Cộng riêng giờ và phút: $3$ giờ $75$ phút.', rationale: 'Cộng từng đơn vị cùng loại.' },
          { order: 2, content: 'Vì $75$ phút $= 1$ giờ $15$ phút, kết quả là $4$ giờ $15$ phút.', rationale: 'Đổi phần phút vượt quá 60 sang giờ.' },
        ],
      },
      {
        statement: 'Tính: $3$ giờ $20$ phút $-$ $1$ giờ $45$ phút.',
        steps: [
          { order: 1, content: 'Vì $20$ phút $< 45$ phút, mượn 1 giờ của số bị trừ: $2$ giờ $80$ phút.', rationale: 'Đổi 1 giờ thành 60 phút để cộng vào 20 phút.' },
          { order: 2, content: '$2$ giờ $80$ phút $-$ $1$ giờ $45$ phút $=$ $1$ giờ $35$ phút.', rationale: 'Trừ riêng giờ và phút sau khi đã mượn.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên đổi khi số phút (hoặc giây) vượt quá 60 sau khi cộng.',
      'Quên "mượn" 1 giờ = 60 phút khi trừ mà số phút bị trừ nhỏ hơn số trừ.',
      'Nhầm hệ đếm thời gian (60) với hệ đếm thập phân (10, 100) khi tính toán.',
    ],
    quickCheck: [
      { id: 'DL-04-QC1', statement: 'Tính: $1$ giờ $40$ phút $+ 50$ phút. Nhập kết quả dưới dạng tổng số phút.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['150'], tolerance: 0, isInteger: true } },
      { id: 'DL-04-QC2', statement: 'Đổi $2$ giờ $15$ phút sang phút.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['135'], tolerance: 0, isInteger: true } },
      { id: 'DL-04-QC3', statement: '1 giờ bằng bao nhiêu phút?', answerType: 'mcq', mcq: { options: ['60 phút', '100 phút', '24 phút', '30 phút'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DL-05',
    group: 'DL',
    title: 'Tỉ lệ bản đồ',
    level: 'advanced',
    lesson:
      'Tỉ lệ bản đồ cho biết 1 đơn vị độ dài trên bản đồ ứng với bao nhiêu đơn vị độ dài thực tế. Ví dụ tỉ lệ $1:1\\,000\\,000$ nghĩa là 1cm trên bản đồ ứng với $1\\,000\\,000$cm ($=10$km) ngoài thực tế.',
    formulas: ['\\text{Độ dài thực tế} = \\text{Độ dài trên bản đồ} \\times \\text{mẫu số tỉ lệ}'],
    examples: [
      {
        statement: 'Bản đồ có tỉ lệ $1:500\\,000$. Khoảng cách trên bản đồ giữa hai điểm là $4\\,cm$. Tính khoảng cách thực tế (km).',
        steps: [
          { order: 1, content: 'Khoảng cách thực tế $=4\\times500\\,000=2\\,000\\,000$cm.', rationale: 'Áp dụng công thức tỉ lệ bản đồ.' },
          { order: 2, content: '$2\\,000\\,000$cm $=20$km.', rationale: 'Đổi cm sang km ($1$km$=100\\,000$cm).' },
        ],
      },
      {
        statement: 'Khoảng cách thực tế giữa hai thành phố là $150$km. Trên bản đồ tỉ lệ $1:3\\,000\\,000$, khoảng cách đó là bao nhiêu cm?',
        steps: [
          { order: 1, content: '$150$km $=15\\,000\\,000$cm.', rationale: 'Đổi km sang cm trước khi áp dụng tỉ lệ.' },
          { order: 2, content: 'Khoảng cách trên bản đồ $=15\\,000\\,000:3\\,000\\,000=5$cm.', rationale: 'Chia độ dài thực tế cho mẫu số tỉ lệ.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên đổi đơn vị (km sang cm) trước khi áp dụng tỉ lệ bản đồ.',
      'Nhầm chiều nhân/chia khi đổi giữa khoảng cách trên bản đồ và khoảng cách thực tế.',
      'Nhầm tỉ lệ bản đồ với một tỉ số thông thường không liên quan đến đơn vị đo.',
    ],
    quickCheck: [
      { id: 'DL-05-QC1', statement: 'Bản đồ tỉ lệ $1:1\\,000\\,000$. Khoảng cách trên bản đồ là $3\\,cm$. Tính khoảng cách thực tế (km).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['30'], tolerance: 0, isInteger: true } },
      { id: 'DL-05-QC2', statement: 'Khoảng cách thực tế là $40$km. Bản đồ tỉ lệ $1:2\\,000\\,000$. Tính khoảng cách trên bản đồ (cm).', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true } },
      { id: 'DL-05-QC3', statement: 'Tỉ lệ bản đồ $1:500\\,000$ nghĩa là gì?', answerType: 'mcq', mcq: { options: ['1cm trên bản đồ ứng với 500 000cm thực tế', '1cm trên bản đồ ứng với 500 000km thực tế', '500 000cm trên bản đồ ứng với 1cm thực tế', 'Không có ý nghĩa gì'], answerIndex: 0 } },
    ],
  },
  {
    id: 'DL-06',
    group: 'DL',
    title: 'Bài toán thực tế về tiền tệ, hóa đơn, đơn giá',
    level: 'basic',
    lesson: 'Đơn giá là số tiền cho một đơn vị hàng hóa. Tổng tiền bằng đơn giá nhân với số lượng. Muốn tìm đơn giá, lấy tổng tiền chia cho số lượng.',
    formulas: ['\\text{Tổng tiền} = \\text{Đơn giá} \\times \\text{Số lượng}'],
    examples: [
      { statement: 'Một hóa đơn mua $5$kg táo hết $175\\,000$đ. Tính đơn giá $1$kg táo.', steps: [{ order: 1, content: 'Đơn giá $=175\\,000:5=35\\,000$đ.', rationale: 'Chia tổng tiền cho số lượng.' }] },
      { statement: 'Một cửa hàng bán bút với đơn giá $8\\,000$đ/cái. Một khách mua $12$ cái. Tính tổng tiền phải trả.', steps: [{ order: 1, content: 'Tổng tiền $=8\\,000\\times12=96\\,000$đ.', rationale: 'Nhân đơn giá với số lượng.' }] },
    ],
    commonMistakes: [
      'Nhầm lẫn giữa đơn giá và tổng tiền.',
      'Quên đổi đơn vị tiền tệ khi so sánh hoặc tính toán.',
      'Nhầm thứ tự nhân/chia khi tìm đơn giá hoặc số lượng.',
    ],
    quickCheck: [
      { id: 'DL-06-QC1', statement: 'Mua $4$kg cam hết $100\\,000$đ. Tính đơn giá $1$kg cam.', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['25000'], tolerance: 0, isInteger: true } },
      { id: 'DL-06-QC2', statement: 'Đơn giá $1$ quyển vở là $7\\,000$đ. Mua $6$ quyển hết bao nhiêu tiền?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['42000'], tolerance: 0, isInteger: true } },
      { id: 'DL-06-QC3', statement: 'Muốn tìm đơn giá, ta làm gì?', answerType: 'mcq', mcq: { options: ['Tổng tiền chia số lượng', 'Tổng tiền nhân số lượng', 'Số lượng chia tổng tiền', 'Tổng tiền trừ số lượng'], answerIndex: 0 } },
    ],
  },
];
