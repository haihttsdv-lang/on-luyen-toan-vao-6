import type { Topic } from '../../types';

/** 10 chuyên đề mới bổ sung theo URD v2.0 Mục 4.2/5 (SH-11/12, PS-11, DH-15/16/17, HH-12, DL-07/08, TD-07). */
export const v2NewTopics: Topic[] = [
  {
    id: 'SH-11',
    group: 'SH',
    title: 'Chữ số tận cùng của tích, của lũy thừa; đếm chữ số 0 tận cùng',
    level: 'advanced',
    lesson:
      'Chữ số tận cùng của một tích chỉ phụ thuộc vào tích các chữ số tận cùng của các thừa số. Khi nâng lũy thừa, chữ số tận cùng lặp lại theo chu kỳ: 2, 3, 7, 8 có chu kỳ 4 (ví dụ chu kỳ của 2 là 2, 4, 8, 6); 4, 9 có chu kỳ 2; còn 0, 1, 5, 6 luôn giữ nguyên chữ số tận cùng dù nâng lên lũy thừa nào. Muốn đếm số chữ số 0 tận cùng của một tích, ta đếm số lần tích đó chia hết cho 10, tức là đếm số cặp (2, 5) có được khi phân tích các thừa số ra thừa số nguyên tố — số chữ số 0 bằng số nhỏ hơn giữa số lũy thừa của 2 và số lũy thừa của 5.',
    formulas: [
      '\\text{Chu kỳ chữ số tận cùng của } a^n: 2,3,7,8 \\to 4;\\ 4,9 \\to 2;\\ 0,1,5,6 \\to \\text{không đổi}',
      '\\text{Số chữ số 0 tận cùng} = \\min(\\text{số lũy thừa của } 2,\\ \\text{số lũy thừa của } 5)',
    ],
    examples: [
      {
        statement: 'Tìm chữ số tận cùng của $2^{2024}$.',
        steps: [
          { order: 1, content: 'Chu kỳ chữ số tận cùng của $2$ là $2, 4, 8, 6$ (chu kỳ $4$), ứng với các số mũ $1, 2, 3, 4, 5, 6,...$', rationale: 'Liệt kê chu kỳ lặp của chữ số tận cùng khi nâng lũy thừa 2.' },
          { order: 2, content: '$2024 : 4 = 506$ dư $0$, nghĩa là số mũ $2024$ ứng với vị trí thứ $4$ (cuối chu kỳ) — chữ số $6$.', rationale: 'Số mũ chia hết cho 4 ứng đúng phần tử cuối cùng của chu kỳ.' },
          { order: 3, content: 'Vậy $2^{2024}$ có chữ số tận cùng là $6$.', rationale: 'Kết luận theo chu kỳ.' },
        ],
      },
      {
        statement: 'Tích $23 \\times 47 \\times 89$ có chữ số tận cùng là bao nhiêu?',
        steps: [
          { order: 1, content: 'Chữ số tận cùng của các thừa số lần lượt là $3, 7, 9$.', rationale: 'Chỉ cần xét chữ số tận cùng của mỗi thừa số.' },
          { order: 2, content: '$3 \\times 7 \\times 9 = 189$, chữ số tận cùng của $189$ là $9$.', rationale: 'Nhân các chữ số tận cùng với nhau.' },
          { order: 3, content: 'Vậy tích $23 \\times 47 \\times 89$ có chữ số tận cùng là $9$.', rationale: 'Kiểm tra: $23 \\times 47 \\times 89 = 96209$, đúng tận cùng $9$.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm lẫn chu kỳ tận cùng giữa các chữ số khác nhau (ví dụ nhầm chu kỳ của 3 với chu kỳ của 2).',
      'Quên rằng nếu có một thừa số tận cùng là 0 thì cả tích tận cùng là 0, không cần xét chu kỳ.',
      'Nhầm số dư 0 khi chia số mũ cho chu kỳ với "không có phần tử nào" — số dư 0 nghĩa là ứng với phần tử CUỐI của chu kỳ, không phải phần tử đầu.',
    ],
    quickCheck: [
      {
        id: 'SH-11-QC1',
        statement: 'Chữ số tận cùng của $3^{2023}$ là bao nhiêu?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['7'], tolerance: 0, isInteger: true },
      },
      {
        id: 'SH-11-QC2',
        statement: 'Tích $34 \\times 56 \\times 78$ có chữ số tận cùng là bao nhiêu?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true },
      },
      {
        id: 'SH-11-QC3',
        statement: 'Số $5^{100}$ có chữ số tận cùng là mấy?',
        answerType: 'mcq',
        mcq: { options: ['5', '1', '0', '9'], answerIndex: 0 },
      },
    ],
  },
  {
    id: 'SH-12',
    group: 'SH',
    title: 'Dãy chữ theo quy luật; bài toán đánh số trang sách',
    level: 'advanced',
    lesson:
      'Với dãy chữ cái lặp lại theo một chu kỳ cố định, muốn tìm chữ cái ở vị trí thứ n, ta lấy n chia cho độ dài chu kỳ; số dư (coi số dư 0 là ứng với phần tử cuối chu kỳ) cho biết vị trí trong chu kỳ. Với bài toán đánh số trang sách, số chữ số cần dùng phụ thuộc vào số trang có 1, 2 hay 3 chữ số: các trang từ 1–9 dùng 1 chữ số/trang (9 trang, 9 chữ số), các trang từ 10–99 dùng 2 chữ số/trang (90 trang, 180 chữ số), các trang từ 100–999 dùng 3 chữ số/trang (900 trang, 2700 chữ số) — cộng dồn theo từng đoạn để ra tổng số chữ số.',
    formulas: [
      '\\text{Trang } 1\\text{–}9: 9 \\text{ trang} \\times 1 = 9 \\text{ chữ số}',
      '\\text{Trang } 10\\text{–}99: 90 \\text{ trang} \\times 2 = 180 \\text{ chữ số}',
      '\\text{Trang } 100\\text{–}999: 900 \\text{ trang} \\times 3 = 2700 \\text{ chữ số}',
    ],
    examples: [
      {
        statement: 'Một quyển sách có 150 trang. Hỏi cần dùng bao nhiêu chữ số để đánh số trang từ 1 đến 150?',
        steps: [
          { order: 1, content: 'Trang $1$–$9$: $9$ trang $\\times 1 = 9$ chữ số.', rationale: 'Trang 1 chữ số.' },
          { order: 2, content: 'Trang $10$–$99$: $90$ trang $\\times 2 = 180$ chữ số.', rationale: 'Trang 2 chữ số.' },
          { order: 3, content: 'Trang $100$–$150$: có $150 - 100 + 1 = 51$ trang, dùng $51 \\times 3 = 153$ chữ số.', rationale: 'Trang 3 chữ số, chỉ tính tới trang 150.' },
          { order: 4, content: 'Tổng số chữ số $= 9 + 180 + 153 = 342$.', rationale: 'Cộng dồn 3 đoạn.' },
        ],
      },
      {
        statement: "Dãy chữ cái 'ABCABCABC...' được viết lặp lại theo chu kỳ 'ABC'. Chữ cái thứ 50 trong dãy là chữ gì?",
        steps: [
          { order: 1, content: 'Chu kỳ "ABC" có độ dài $3$.', rationale: 'Xác định độ dài chu kỳ.' },
          { order: 2, content: '$50 : 3 = 16$ dư $2$.', rationale: 'Lấy vị trí chia cho độ dài chu kỳ.' },
          { order: 3, content: 'Số dư $2$ ứng với chữ cái thứ $2$ trong "ABC", tức là chữ $B$.', rationale: 'Số dư khác 0 ứng đúng vị trí đó trong chu kỳ.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên tách riêng các đoạn trang 1 chữ số / 2 chữ số / 3 chữ số khi tính tổng chữ số dùng để đánh số.',
      'Nhầm số dư 0 khi chia cho độ dài chu kỳ với "không có phần tử nào" — số dư 0 nghĩa là ứng với phần tử CUỐI chu kỳ.',
      'Tính sai số lượng trang trong một đoạn (quên +1 khi đếm số trang từ a đến b).',
    ],
    quickCheck: [
      {
        id: 'SH-12-QC1',
        statement: 'Số chữ số dùng để đánh số các trang từ 1 đến 99 là bao nhiêu?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['189'], tolerance: 0, isInteger: true },
      },
      {
        id: 'SH-12-QC2',
        statement: "Dãy chữ cái 'XYZXYZXYZ...' lặp lại theo chu kỳ 'XYZ'. Chữ cái thứ 20 trong dãy là chữ gì?",
        answerType: 'mcq',
        mcq: { options: ['Y', 'X', 'Z', 'Không xác định'], answerIndex: 0 },
      },
      {
        id: 'SH-12-QC3',
        statement: 'Một quyển sách dày 250 trang. Cần dùng bao nhiêu chữ số để đánh số trang từ 1 đến 250?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['642'], tolerance: 0, isInteger: true },
      },
    ],
  },
  {
    id: 'PS-11',
    group: 'PS',
    title: 'Bài toán trộn dung dịch, hỗn hợp; bài toán tươi–khô',
    level: 'advanced',
    lesson:
      'Bài toán tươi–khô dựa trên nguyên tắc: khối lượng "chất khô" (phần không phải nước) không đổi khi phơi/sấy, chỉ có lượng nước bay hơi. Khối lượng chất khô $= $ khối lượng tươi $\\times$ (100% $-$ tỉ lệ nước trong tươi) $=$ khối lượng khô $\\times$ (100% $-$ tỉ lệ nước trong khô). Bài toán trộn dung dịch/hỗn hợp: lượng chất tan (muối, đường...) sau khi trộn bằng tổng lượng chất tan của các dung dịch thành phần; nồng độ dung dịch sau khi trộn $=$ tổng lượng chất tan chia cho tổng khối lượng (hoặc thể tích) dung dịch.',
    formulas: [
      '\\text{Khối lượng chất khô} = \\text{Khối lượng tươi} \\times (100\\% - \\text{tỉ lệ nước tươi})',
      '\\text{Khối lượng khô} = \\dfrac{\\text{Khối lượng chất khô}}{100\\% - \\text{tỉ lệ nước khô}}',
      '\\text{Nồng độ sau trộn} = \\dfrac{\\text{Tổng chất tan}}{\\text{Tổng khối lượng dung dịch}}',
    ],
    examples: [
      {
        statement: 'Có 8kg rau tươi chứa 90% nước. Sau khi phơi khô, rau khô chỉ còn chứa 20% nước. Hỏi khối lượng rau khô thu được là bao nhiêu?',
        steps: [
          { order: 1, content: 'Khối lượng chất khô (không phải nước) $= 8 \\times (100\\% - 90\\%) = 8 \\times 10\\% = 0{,}8$kg.', rationale: 'Phần chất khô không đổi khi phơi.' },
          { order: 2, content: 'Trong rau khô, chất khô chiếm $100\\% - 20\\% = 80\\%$.', rationale: 'Rau khô còn 20% là nước, phần còn lại là chất khô.' },
          { order: 3, content: 'Khối lượng rau khô $= 0{,}8 : 80\\% = 1$kg.', rationale: 'Chất khô chia cho tỉ lệ chất khô trong rau khô.' },
        ],
      },
      {
        statement: 'Trộn 2 lít dung dịch chứa 30% muối với 3 lít dung dịch chứa 10% muối. Tính nồng độ muối của dung dịch sau khi trộn.',
        steps: [
          { order: 1, content: 'Lượng muối trong dung dịch 1: $2 \\times 30\\% = 0{,}6$ lít (quy đổi).', rationale: 'Tính lượng chất tan của từng dung dịch.' },
          { order: 2, content: 'Lượng muối trong dung dịch 2: $3 \\times 10\\% = 0{,}3$ lít.', rationale: 'Tương tự cho dung dịch 2.' },
          { order: 3, content: 'Tổng muối $= 0{,}6 + 0{,}3 = 0{,}9$; tổng dung dịch $= 2 + 3 = 5$ lít.', rationale: 'Cộng dồn chất tan và tổng khối lượng.' },
          { order: 4, content: 'Nồng độ sau trộn $= 0{,}9 : 5 = 18\\%$.', rationale: 'Chất tan chia cho tổng dung dịch.' },
        ],
      },
    ],
    commonMistakes: [
      'Tính theo khối lượng nước thay vì khối lượng chất khô (chất khô mới là đại lượng không đổi khi phơi/sấy).',
      'Quên đổi tỉ lệ % về số thập phân khi tính toán, dẫn tới sai một bậc (nhầm 10 lần).',
      'Khi trộn nhiều dung dịch, quên cộng dồn đúng cả tử số (chất tan) lẫn mẫu số (tổng khối lượng).',
    ],
    quickCheck: [
      {
        id: 'PS-11-QC1',
        statement: 'Có 10kg táo tươi chứa 90% nước. Khối lượng chất khô (không phải nước) trong số táo đó là bao nhiêu kg?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['1'], tolerance: 0 },
      },
      {
        id: 'PS-11-QC2',
        statement: 'Có 10kg táo tươi chứa 80% nước. Sau khi phơi khô còn 20% nước. Khối lượng táo khô thu được là bao nhiêu kg?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['2.5', '2,5'], tolerance: 0.01 },
      },
      {
        id: 'PS-11-QC3',
        statement: 'Trộn 1kg dung dịch đường 20% với 4kg nước (0% đường). Nồng độ đường của dung dịch sau khi trộn là bao nhiêu?',
        answerType: 'mcq',
        mcq: { options: ['4%', '20%', '10%', '5%'], answerIndex: 0 },
      },
    ],
  },
  {
    id: 'DH-15',
    group: 'DH',
    title: 'Bài toán tỉ lệ kép',
    level: 'advanced',
    lesson:
      'Bài toán tỉ lệ kép là bài toán mà một đại lượng (khối lượng công việc) phụ thuộc đồng thời vào hai hay nhiều đại lượng khác (ví dụ: số người và số ngày), thay vì chỉ một đại lượng như tỉ lệ thuận/nghịch đơn. Cách giải phổ biến nhất ở tiểu học là quy về "một đơn vị chung" (thường là "1 người làm trong 1 ngày làm được bao nhiêu"), rồi nhân lên theo số liệu mới. Cách này tránh phải xét riêng đại lượng nào tỉ lệ thuận, đại lượng nào tỉ lệ nghịch.',
    formulas: [
      '\\text{Năng suất 1 đơn vị} = \\dfrac{\\text{Kết quả}}{\\text{Số người/máy} \\times \\text{Số ngày/giờ}}',
      '\\text{Kết quả mới} = \\text{Năng suất 1 đơn vị} \\times \\text{Số người/máy mới} \\times \\text{Số ngày/giờ mới}',
    ],
    examples: [
      {
        statement: '6 công nhân làm trong 8 ngày thì xây được 24m tường. Hỏi 9 công nhân làm trong 12 ngày thì xây được bao nhiêu mét tường (năng suất mỗi người như nhau)?',
        steps: [
          { order: 1, content: '1 công nhân làm trong 1 ngày xây được: $24 : (6 \\times 8) = 24 : 48 = 0{,}5$m.', rationale: 'Quy về năng suất 1 người - 1 ngày.' },
          { order: 2, content: '9 công nhân làm trong 12 ngày xây được: $0{,}5 \\times 9 \\times 12 = 54$m.', rationale: 'Nhân năng suất đơn vị với số người và số ngày mới.' },
        ],
      },
      {
        statement: '10 người làm trong 6 ngày thì xong một công việc. Hỏi 15 người làm (năng suất như nhau) thì mất bao nhiêu ngày để xong công việc đó?',
        steps: [
          { order: 1, content: 'Tổng khối lượng công việc tính theo "người-ngày": $10 \\times 6 = 60$ (người-ngày).', rationale: 'Tổng công việc không đổi dù chia cho bao nhiêu người.' },
          { order: 2, content: 'Số ngày cần với 15 người: $60 : 15 = 4$ ngày.', rationale: 'Chia tổng công việc cho số người mới.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm lẫn giữa việc nhân và chia khi cả hai đại lượng (người, ngày) đều thay đổi.',
      'Quên nhân/chia đúng cả hai hệ số biến đổi (chỉ tính theo 1 đại lượng thay đổi mà quên đại lượng còn lại).',
      'Áp dụng máy móc công thức tỉ lệ thuận đơn cho bài có 2 đại lượng cùng biến đổi.',
    ],
    quickCheck: [
      {
        id: 'DH-15-QC1',
        statement: '4 máy dệt trong 5 giờ dệt được 100m vải. Hỏi 6 máy dệt trong 5 giờ (năng suất máy như nhau) dệt được bao nhiêu mét vải?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['150'], tolerance: 0, isInteger: true },
      },
      {
        id: 'DH-15-QC2',
        statement: '3 người làm trong 4 ngày xây xong một bức tường. Hỏi 6 người làm (năng suất như nhau) thì mất bao nhiêu ngày để xây xong bức tường đó?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true },
      },
      {
        id: 'DH-15-QC3',
        statement: 'Muốn giải bài toán tỉ lệ kép (2 đại lượng cùng thay đổi), cách làm phổ biến nhất là gì?',
        answerType: 'mcq',
        mcq: {
          options: [
            'Quy về năng suất của 1 đơn vị rồi nhân lên theo số liệu mới',
            'Chỉ xét đại lượng nào thay đổi nhiều hơn',
            'Cộng trực tiếp hai đại lượng lại với nhau',
            'Luôn coi là tỉ lệ nghịch với cả hai đại lượng',
          ],
          answerIndex: 0,
        },
      },
    ],
  },
  {
    id: 'DH-16',
    group: 'DH',
    title: 'Phương pháp khử',
    level: 'advanced',
    lesson:
      'Phương pháp khử dùng để giải bài toán có 2 đại lượng chưa biết (ví dụ giá của 2 loại hàng), cho biết 2 "phương trình" tổng tiền ứng với 2 lần mua khác nhau. Ý tưởng: làm cho hệ số của một đại lượng ở hai lần mua bằng nhau (nếu cần thì nhân thêm), sau đó trừ hai phương trình cho nhau để "khử" đại lượng đó, chỉ còn lại một đại lượng chưa biết để tính trực tiếp. Sau khi tìm được một đại lượng, thay ngược lại một trong hai phương trình ban đầu để tìm đại lượng còn lại.',
    formulas: [
      '\\text{Nếu hệ số 1 đại lượng bằng nhau ở 2 lần mua: Hiệu tổng tiền} = \\text{Hiệu số lượng đại lượng kia} \\times \\text{đơn giá}',
    ],
    examples: [
      {
        statement: 'Mua 2 quyển vở và 3 chiếc bút hết 26.000 đồng. Mua 2 quyển vở và 5 chiếc bút hết 34.000 đồng. Tính giá tiền một chiếc bút.',
        steps: [
          { order: 1, content: 'Hai lần mua đều có $2$ quyển vở giống nhau, chỉ khác số bút: lần 2 nhiều hơn lần 1 là $5 - 3 = 2$ chiếc bút.', rationale: 'Xác định đại lượng có thể khử (số vở bằng nhau).' },
          { order: 2, content: 'Chênh lệch tiền tương ứng: $34\\,000 - 26\\,000 = 8\\,000$ đồng, đây chính là tiền của $2$ chiếc bút.', rationale: 'Trừ hai phương trình để khử đại lượng vở.' },
          { order: 3, content: 'Giá 1 chiếc bút $= 8\\,000 : 2 = 4\\,000$ đồng.', rationale: 'Chia đều cho số bút chênh lệch.' },
        ],
      },
      {
        statement: 'Mua 2kg gạo và 3kg đường hết 88.000 đồng. Mua 2kg gạo và 5kg đường hết 128.000 đồng. Tính giá 1kg đường và 1kg gạo.',
        steps: [
          { order: 1, content: 'Chênh lệch đường: $5 - 3 = 2$kg, chênh lệch tiền: $128\\,000 - 88\\,000 = 40\\,000$ đồng.', rationale: 'Khử đại lượng gạo (bằng nhau ở 2 lần mua).' },
          { order: 2, content: 'Giá 1kg đường $= 40\\,000 : 2 = 20\\,000$ đồng.', rationale: 'Chia đều cho số kg đường chênh lệch.' },
          { order: 3, content: 'Từ lần mua đầu: $2$kg gạo $= 88\\,000 - 3 \\times 20\\,000 = 88\\,000 - 60\\,000 = 28\\,000$ đồng, nên giá 1kg gạo $= 28\\,000 : 2 = 14\\,000$ đồng.', rationale: 'Thay ngược lại một phương trình ban đầu.' },
        ],
      },
    ],
    commonMistakes: [
      'Trừ hai phương trình khi hệ số của đại lượng muốn khử chưa bằng nhau (quên nhân để cân bằng hệ số trước).',
      'Nhầm dấu khi trừ hai phương trình (lấy phương trình có tổng tiền nhỏ trừ phương trình có tổng tiền lớn nhưng lại lấy sai chiều số lượng).',
      'Quên bước cuối: thay ngược lại một phương trình ban đầu để tìm đại lượng còn lại.',
    ],
    quickCheck: [
      {
        id: 'DH-16-QC1',
        statement: 'Mua 3 cái kẹo và 2 cái bánh hết 22.000 đồng. Mua 3 cái kẹo và 5 cái bánh hết 37.000 đồng. Giá 1 cái bánh là bao nhiêu đồng?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['5000'], tolerance: 0, isInteger: true, unit: 'đồng' },
      },
      {
        id: 'DH-16-QC2',
        statement: 'Mua 4kg cam và 2kg táo hết 180.000 đồng. Mua 4kg cam và 6kg táo hết 260.000 đồng. Giá 1kg táo là bao nhiêu đồng?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['20000'], tolerance: 0, isInteger: true, unit: 'đồng' },
      },
      {
        id: 'DH-16-QC3',
        statement: 'Theo dữ kiện ở câu trên (4kg cam + 2kg táo = 180.000đ, táo 20.000đ/kg), giá 1kg cam là bao nhiêu?',
        answerType: 'mcq',
        mcq: { options: ['35.000 đồng', '40.000 đồng', '30.000 đồng', '45.000 đồng'], answerIndex: 0 },
      },
    ],
  },
  {
    id: 'DH-17',
    group: 'DH',
    title: 'Chuyển động đặc biệt: tàu hỏa, lên/xuống dốc, vòng tròn, tiến–lùi',
    level: 'advanced',
    lesson:
      'Có nhiều dạng chuyển động đặc biệt cần lưu ý: (1) Vật có chiều dài (tàu hỏa): khi tàu chạy qua một cột mốc (coi như một điểm), quãng đường tàu đi được đúng bằng chiều dài đoàn tàu; khi tàu chạy qua một cây cầu hoặc một tàu khác đang đứng yên, quãng đường phải cộng thêm chiều dài của cầu (hoặc tàu kia). (2) Lên dốc/xuống dốc: vận tốc đi lên và đi xuống khác nhau, cần tính riêng thời gian/quãng đường cho từng đoạn dốc. (3) Chuyển động vòng tròn: hai xe cùng xuất phát từ một điểm trên đường tròn — nếu đi cùng chiều, xe nhanh "vượt" xe chậm đúng 1 vòng thì gặp lại nhau (áp dụng công thức đuổi kịp với hiệu vận tốc); nếu đi ngược chiều, hai xe gặp nhau khi tổng quãng đường đi được bằng đúng 1 vòng (áp dụng công thức gặp nhau với tổng vận tốc). (4) Tiến–lùi: vật di chuyển xen kẽ tiến rồi lùi, cần tính quãng đường thực tế đã đi theo từng giai đoạn.',
    formulas: [
      '\\text{Tàu qua cột mốc: Quãng đường} = \\text{Chiều dài tàu}',
      '\\text{Tàu qua cầu/vật khác: Quãng đường} = \\text{Chiều dài tàu} + \\text{Chiều dài cầu (hoặc vật kia)}',
      '\\text{Vòng tròn cùng chiều: Thời gian gặp lại} = \\dfrac{\\text{Chu vi}}{\\text{Hiệu vận tốc}}',
      '\\text{Vòng tròn ngược chiều: Thời gian gặp nhau} = \\dfrac{\\text{Chu vi}}{\\text{Tổng vận tốc}}',
    ],
    examples: [
      {
        statement: 'Một đoàn tàu dài 150m chạy qua một cột điện (coi như một điểm) hết 10 giây. Tính vận tốc của đoàn tàu.',
        steps: [
          { order: 1, content: 'Vì cột điện coi như một điểm, quãng đường tàu đi qua đúng bằng chiều dài đoàn tàu: $150$m.', rationale: 'Áp dụng nguyên tắc "tàu qua cột mốc".' },
          { order: 2, content: 'Vận tốc $= 150 : 10 = 15$m/giây.', rationale: 'Vận tốc = quãng đường : thời gian.' },
        ],
      },
      {
        statement: 'Một đoàn tàu dài 200m chạy với vận tốc 20m/giây qua một cây cầu dài 400m. Hỏi đoàn tàu qua hết cầu (từ lúc đầu tàu lên cầu đến lúc toa cuối rời khỏi cầu) mất bao nhiêu giây?',
        steps: [
          { order: 1, content: 'Quãng đường tàu phải đi $=$ chiều dài tàu $+$ chiều dài cầu $= 200 + 400 = 600$m.', rationale: 'Toa cuối phải rời khỏi cầu nên phải cộng thêm chiều dài tàu.' },
          { order: 2, content: 'Thời gian $= 600 : 20 = 30$ giây.', rationale: 'Thời gian = quãng đường : vận tốc.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên cộng chiều dài đoàn tàu khi tính quãng đường tàu qua cầu (chỉ tính chiều dài cầu).',
      'Nhầm công thức hiệu vận tốc (đi cùng chiều) với tổng vận tốc (đi ngược chiều) trong bài toán vòng tròn.',
      'Không đổi các đại lượng về cùng đơn vị (m và giây, hoặc km và giờ) trước khi tính.',
    ],
    quickCheck: [
      {
        id: 'DH-17-QC1',
        statement: 'Một đoàn tàu dài 120m chạy qua một cột mốc hết 8 giây. Tính vận tốc đoàn tàu (m/giây).',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['15'], tolerance: 0, isInteger: true },
      },
      {
        id: 'DH-17-QC2',
        statement: 'Một đoàn tàu dài 180m vận tốc 18m/giây qua một cây cầu dài 270m. Tính thời gian tàu qua hết cầu (giây).',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['25'], tolerance: 0, isInteger: true },
      },
      {
        id: 'DH-17-QC3',
        statement: 'Hai xe cùng xuất phát từ một điểm trên đường đua vòng tròn dài 400m, đi cùng chiều. Xe A vận tốc 10m/giây, xe B vận tốc 8m/giây. Sau bao lâu xe A vượt xe B đúng 1 vòng?',
        answerType: 'mcq',
        mcq: { options: ['200 giây', '400 giây', '50 giây', '20 giây'], answerIndex: 0 },
      },
    ],
  },
  {
    id: 'HH-12',
    group: 'HH',
    title: 'Bài toán sơn màu hình lập phương, hình hộp chữ nhật',
    level: 'advanced',
    lesson:
      'Một khối lập phương cạnh $n$ (đơn vị: khối lập phương cạnh 1) được sơn tất cả 6 mặt ngoài rồi cắt thành $n^3$ khối lập phương nhỏ cạnh 1. Các khối nhỏ được phân loại theo số mặt được sơn: khối ở góc luôn có 3 mặt sơn (luôn có đúng 8 khối, ứng với 8 đỉnh); khối ở cạnh (không phải góc) có 2 mặt sơn, số lượng $= 12 \\times (n-2)$; khối ở giữa mỗi mặt có 1 mặt sơn, số lượng $= 6 \\times (n-2)^2$; khối nằm hoàn toàn bên trong không mặt nào được sơn, số lượng $= (n-2)^3$. Với hình hộp chữ nhật kích thước $a \\times b \\times c$, số khối 3 mặt luôn là 8 (ứng với 8 đỉnh); số khối 2 mặt $= 4 \\times [(a-2)+(b-2)+(c-2)]$; số khối 0 mặt $= (a-2)(b-2)(c-2)$.',
    formulas: [
      '\\text{Lập phương cạnh } n:\\ 3\\text{ mặt} = 8;\\ 2\\text{ mặt} = 12(n-2);\\ 1\\text{ mặt} = 6(n-2)^2;\\ 0\\text{ mặt} = (n-2)^3',
      '\\text{Hộp chữ nhật } a\\times b\\times c:\\ 3\\text{ mặt} = 8;\\ 2\\text{ mặt} = 4[(a-2)+(b-2)+(c-2)];\\ 0\\text{ mặt} = (a-2)(b-2)(c-2)',
    ],
    examples: [
      {
        statement: 'Một khối lập phương cạnh 4cm được sơn đỏ tất cả 6 mặt ngoài, sau đó cắt thành 64 khối lập phương nhỏ cạnh 1cm. Hỏi có bao nhiêu khối nhỏ được sơn đúng 2 mặt?',
        steps: [
          { order: 1, content: 'Áp dụng công thức số khối 2 mặt với $n = 4$: $12 \\times (4 - 2) = 12 \\times 2 = 24$.', rationale: 'Khối 2 mặt nằm ở các cạnh, không phải góc.' },
        ],
      },
      {
        statement: 'Với khối lập phương cạnh 4cm ở trên, có bao nhiêu khối nhỏ không được sơn mặt nào?',
        steps: [
          { order: 1, content: 'Áp dụng công thức số khối 0 mặt với $n = 4$: $(4 - 2)^3 = 2^3 = 8$.', rationale: 'Khối 0 mặt nằm hoàn toàn bên trong khối lớn.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm lẫn công thức của khối 1 mặt, 2 mặt, 3 mặt với nhau.',
      'Quên số khối 3 mặt (ở góc) luôn luôn là 8, không phụ thuộc vào cạnh $n$ (miễn $n \\ge 2$).',
      'Áp dụng công thức của hình lập phương cho hình hộp chữ nhật (cần dùng công thức riêng có 3 kích thước $a, b, c$ khác nhau).',
    ],
    quickCheck: [
      {
        id: 'HH-12-QC1',
        statement: 'Khối lập phương cạnh 5cm sơn 6 mặt rồi cắt thành 125 khối nhỏ cạnh 1cm. Có bao nhiêu khối sơn đúng 3 mặt?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['8'], tolerance: 0, isInteger: true },
      },
      {
        id: 'HH-12-QC2',
        statement: 'Khối lập phương cạnh 5cm (như trên) có bao nhiêu khối sơn đúng 1 mặt?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['54'], tolerance: 0, isInteger: true },
      },
      {
        id: 'HH-12-QC3',
        statement: 'Khối lập phương cạnh 5cm (như trên) có bao nhiêu khối không sơn mặt nào?',
        answerType: 'mcq',
        mcq: { options: ['27', '54', '24', '8'], answerIndex: 0 },
      },
    ],
  },
  {
    id: 'DL-07',
    group: 'DL',
    title: 'Đọc và xử lý số liệu thống kê, bảng biểu',
    level: 'advanced',
    lesson:
      'Khi đề bài cho một bảng số liệu (thống kê theo tên, theo nhóm, theo thời gian...), cần đọc chính xác từng giá trị tương ứng, sau đó áp dụng đúng phép tính đề bài yêu cầu: tính tổng, tính hiệu, so sánh lớn nhất/nhỏ nhất, hoặc tính trung bình cộng của các giá trị trong bảng. Điểm quan trọng là đọc đúng dòng/cột tương ứng với từng đối tượng trước khi tính toán, tránh nhầm lẫn giữa các đối tượng trong bảng.',
    formulas: ['\\text{Trung bình cộng} = \\dfrac{\\text{Tổng các giá trị}}{\\text{Số lượng giá trị}}'],
    examples: [
      {
        statement: 'Bảng số lượng sách đọc trong tháng của 4 bạn: An: 5 quyển, Bình: 8 quyển, Chi: 6 quyển, Dũng: 9 quyển. Hỏi trung bình mỗi bạn đọc bao nhiêu quyển sách?',
        steps: [
          { order: 1, content: 'Tổng số sách 4 bạn đọc: $5 + 8 + 6 + 9 = 28$ (quyển).', rationale: 'Đọc và cộng đúng các giá trị trong bảng.' },
          { order: 2, content: 'Trung bình cộng $= 28 : 4 = 7$ (quyển).', rationale: 'Chia tổng cho số bạn.' },
        ],
      },
      {
        statement: 'Bảng số lượng bút chì bán được trong 4 ngày của một cửa hàng: Thứ 2: 25 cái, Thứ 3: 30 cái, Thứ 4: 18 cái, Thứ 5: 27 cái. Ngày nào bán được nhiều bút chì nhất?',
        steps: [
          { order: 1, content: 'So sánh các giá trị: $25, 30, 18, 27$.', rationale: 'Liệt kê để so sánh.' },
          { order: 2, content: 'Giá trị lớn nhất là $30$, ứng với Thứ 3.', rationale: 'Tìm giá trị lớn nhất trong bảng.' },
        ],
      },
    ],
    commonMistakes: [
      'Đọc nhầm giá trị của đối tượng này sang đối tượng khác trong bảng.',
      'Quên chia cho đúng số lượng đối tượng khi tính trung bình cộng.',
      'Nhầm lẫn giữa "tổng số lượt" (một đối tượng có thể xuất hiện ở nhiều cột) với "tổng số đối tượng".',
    ],
    quickCheck: [
      {
        id: 'DL-07-QC1',
        statement: 'Bảng điểm kiểm tra Toán của tổ 1: Lan 8đ, Hoa 9đ, Mai 7đ, Nam 10đ, Tùng 6đ. Tính điểm trung bình của tổ.',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['8'], tolerance: 0, isInteger: true },
      },
      {
        id: 'DL-07-QC2',
        statement: 'Theo bảng điểm ở trên (Lan 8, Hoa 9, Mai 7, Nam 10, Tùng 6), ai đạt điểm cao nhất?',
        answerType: 'mcq',
        mcq: { options: ['Nam', 'Lan', 'Hoa', 'Mai'], answerIndex: 0 },
      },
      {
        id: 'DL-07-QC3',
        statement: 'Bảng số cây trồng được của 3 lớp: 5A trồng 24 cây, 5B trồng 18 cây, 5C trồng 30 cây. Tính tổng số cây 3 lớp trồng được.',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['72'], tolerance: 0, isInteger: true },
      },
    ],
  },
  {
    id: 'DL-08',
    group: 'DL',
    title: 'Bài toán về lịch (dương lịch) và về đồng hồ (vị trí, góc giữa hai kim)',
    level: 'advanced',
    lesson:
      'Bài toán về lịch: một tuần có 7 ngày, các thứ lặp lại theo chu kỳ 7. Biết một ngày là thứ mấy, muốn tìm một ngày khác cách đó $k$ ngày, ta lấy $k$ chia cho 7 để tìm số dư rồi đếm tiếp theo đúng số dư đó từ thứ đã biết. Bài toán về đồng hồ: kim giờ và kim phút đều di chuyển liên tục quanh mặt đồng hồ (kim giờ không đứng yên tại vạch giờ đúng mà di chuyển dần theo phút). Góc giữa hai kim lúc $H$ giờ $M$ phút tính theo công thức $|30H - 5{,}5M|$ độ; nếu kết quả lớn hơn $180°$ thì góc thực tế (góc nhỏ hơn giữa hai kim) là $360°$ trừ đi giá trị đó.',
    formulas: [
      '\\text{Số dư ngày} = k \\mod 7',
      '\\text{Góc (độ)} = |30 \\times H - 5{,}5 \\times M|,\\ \\text{nếu} > 180° \\text{ thì lấy } 360° - \\text{góc đó}',
    ],
    examples: [
      {
        statement: 'Ngày 1/1/2024 là thứ Hai. Hỏi ngày 31/1/2024 là thứ mấy?',
        steps: [
          { order: 1, content: 'Số ngày từ 1/1 đến 31/1 là $31 - 1 = 30$ ngày sau.', rationale: 'Tính khoảng cách ngày.' },
          { order: 2, content: '$30 : 7 = 4$ dư $2$.', rationale: 'Lấy số ngày chia cho 7 để tìm số dư.' },
          { order: 3, content: 'Thứ Hai $+ 2$ ngày $=$ Thứ Tư.', rationale: 'Đếm tiếp 2 ngày từ Thứ Hai: Thứ Ba, Thứ Tư.' },
        ],
      },
      {
        statement: 'Tính góc giữa kim giờ và kim phút lúc 4 giờ 30 phút.',
        steps: [
          { order: 1, content: 'Áp dụng công thức với $H = 4$, $M = 30$: $|30 \\times 4 - 5{,}5 \\times 30| = |120 - 165| = 45°$.', rationale: 'Thay số vào công thức góc.' },
          { order: 2, content: '$45° < 180°$ nên đây chính là góc cần tìm.', rationale: 'Không cần lấy 360° trừ đi vì đã nhỏ hơn 180°.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên kim giờ cũng di chuyển dần theo phút, không đứng yên tại đúng vạch giờ.',
      'Không lấy $360°$ trừ đi khi kết quả công thức lớn hơn $180°$ (góc giữa hai kim luôn được hiểu là góc nhỏ hơn hoặc bằng $180°$).',
      'Tính sai số dư khi ngày tính toán vượt qua ranh giới giữa hai tháng có số ngày khác nhau.',
    ],
    quickCheck: [
      {
        id: 'DL-08-QC1',
        statement: 'Ngày 1/1/2024 là thứ Hai. Hỏi ngày 8/1/2024 là thứ mấy?',
        answerType: 'mcq',
        mcq: { options: ['Thứ Hai', 'Thứ Ba', 'Chủ Nhật', 'Thứ Tư'], answerIndex: 0 },
      },
      {
        id: 'DL-08-QC2',
        statement: 'Tính góc giữa kim giờ và kim phút lúc 6 giờ đúng.',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['180'], tolerance: 0, isInteger: true, unit: 'độ' },
      },
      {
        id: 'DL-08-QC3',
        statement: 'Tính góc giữa kim giờ và kim phút lúc 9 giờ đúng.',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['90'], tolerance: 0, isInteger: true, unit: 'độ' },
      },
    ],
  },
  {
    id: 'TD-07',
    group: 'TD',
    title: 'Suy luận bằng biểu đồ Ven',
    level: 'advanced',
    lesson:
      'Biểu đồ Ven dùng để biểu diễn quan hệ giữa các tập hợp (nhóm học sinh thích môn này, môn kia...) và giải các bài toán đếm số phần tử. Nguyên tắc quan trọng nhất là công thức bao hàm–loại trừ: số phần tử thuộc ít nhất một trong hai nhóm bằng tổng số phần tử của từng nhóm trừ đi số phần tử thuộc cả hai nhóm (vì phần giao đã bị đếm 2 lần nếu chỉ cộng đơn thuần). Từ đó có thể suy ra: số phần tử "chỉ thuộc nhóm A" (không thuộc B) $=$ số phần tử của A trừ đi phần giao; số phần tử không thuộc nhóm nào $=$ tổng số phần tử trừ đi số phần tử thuộc ít nhất một nhóm.',
    formulas: [
      '|A \\cup B| = |A| + |B| - |A \\cap B|',
      '\\text{Chỉ thuộc A} = |A| - |A \\cap B|',
      '\\text{Không thuộc nhóm nào} = \\text{Tổng} - |A \\cup B|',
    ],
    examples: [
      {
        statement: 'Lớp 5A có 20 học sinh thích Toán, 15 học sinh thích Tiếng Việt, trong đó có 8 học sinh thích cả 2 môn. Hỏi có bao nhiêu học sinh thích ít nhất 1 trong 2 môn?',
        steps: [
          { order: 1, content: 'Áp dụng công thức bao hàm-loại trừ: $|A \\cup B| = 20 + 15 - 8 = 27$.', rationale: 'Trừ đi phần giao vì đã được đếm 2 lần khi cộng trực tiếp.' },
        ],
      },
      {
        statement: 'Lớp 5B có 35 học sinh. Có 20 bạn thích bóng đá, 18 bạn thích cầu lông, 10 bạn thích cả 2 môn. Hỏi có bao nhiêu bạn không thích môn nào trong 2 môn đó?',
        steps: [
          { order: 1, content: 'Số học sinh thích ít nhất 1 môn: $20 + 18 - 10 = 28$.', rationale: 'Áp dụng công thức bao hàm-loại trừ.' },
          { order: 2, content: 'Số học sinh không thích môn nào: $35 - 28 = 7$.', rationale: 'Lấy tổng số học sinh trừ đi số thích ít nhất 1 môn.' },
        ],
      },
    ],
    commonMistakes: [
      'Quên trừ phần giao khi tính tổng số phần tử thuộc ít nhất 1 nhóm, dẫn tới đếm 2 lần phần tử thuộc cả 2 nhóm.',
      'Nhầm "chỉ thích Toán" (không kể người thích cả 2 môn) với "thích Toán" (kể cả người thích cả 2 môn).',
      'Khi bài toán cho biết số người không thuộc nhóm nào, quên đây là dữ kiện để tính ngược ra số người thuộc ít nhất 1 nhóm trước.',
    ],
    quickCheck: [
      {
        id: 'TD-07-QC1',
        statement: 'Một lớp có 18 bạn thích vẽ, 14 bạn thích hát, 6 bạn thích cả 2. Hỏi có bao nhiêu bạn thích ít nhất 1 trong 2 hoạt động?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['26'], tolerance: 0, isInteger: true },
      },
      {
        id: 'TD-07-QC2',
        statement: 'Lớp có 30 học sinh. 22 bạn thích đá bóng, 16 bạn thích bơi, 10 bạn thích cả 2. Hỏi có bao nhiêu bạn không thích môn nào?',
        answerType: 'numeric',
        numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true },
      },
      {
        id: 'TD-07-QC3',
        statement: 'Theo dữ kiện câu trên (22 thích bóng, 16 thích bơi, 10 thích cả 2), có bao nhiêu bạn chỉ thích đá bóng (không thích bơi)?',
        answerType: 'mcq',
        mcq: { options: ['12', '16', '6', '10'], answerIndex: 0 },
      },
    ],
  },
];
