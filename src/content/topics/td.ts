import type { Topic } from '../../types';

export const tdTopics: Topic[] = [
  {
    id: 'TD-01',
    group: 'TD',
    title: 'Suy luận logic: lập bảng đúng/sai, phương pháp loại trừ',
    level: 'advanced',
    lesson:
      'Với bài toán suy luận logic, thường lập bảng liệt kê các khả năng rồi dùng phương pháp loại trừ: dựa vào các dữ kiện của đề bài để loại bỏ dần các khả năng sai, cho đến khi chỉ còn lại khả năng đúng duy nhất.',
    formulas: ['\\text{Nếu } A \\ne X \\text{ và } A \\ne Y \\Rightarrow A = Z \\ \\text{(phương pháp loại trừ)}'],
    examples: [
      {
        statement: 'Ba bạn An, Bình, Chi mỗi người thích một môn thể thao khác nhau: bóng đá, cầu lông, bơi. Biết An không thích bóng đá; Bình không thích bơi và không thích bóng đá. Hỏi mỗi bạn thích môn gì?',
        steps: [
          { order: 1, content: 'Bình không thích bơi, không thích bóng đá $\\Rightarrow$ Bình thích cầu lông.', rationale: 'Loại trừ hai khả năng, chỉ còn một khả năng cho Bình.' },
          { order: 2, content: 'An không thích bóng đá, mà cầu lông đã thuộc về Bình $\\Rightarrow$ An thích bơi.', rationale: 'Tiếp tục loại trừ dựa trên kết quả bước trước.' },
          { order: 3, content: 'Còn lại Chi thích bóng đá.', rationale: 'Khả năng duy nhất còn lại.' },
        ],
      },
      {
        statement: 'Ba bạn Lan, Hoa, Mai xếp hàng mua vé: Lan đứng trước Hoa, Hoa đứng trước Mai. Hỏi ai đứng cuối hàng?',
        steps: [{ order: 1, content: 'Thứ tự: Lan, Hoa, Mai $\\Rightarrow$ Mai đứng cuối hàng.', rationale: 'Ghép các quan hệ "trước" lại thành một thứ tự duy nhất.' }],
      },
    ],
    commonMistakes: [
      'Không xét hết các dữ kiện của đề bài trước khi kết luận.',
      'Loại trừ nhầm một khả năng vẫn còn khả thi.',
      'Nhầm lẫn thứ tự "trước/sau" khi sắp xếp theo dữ kiện.',
    ],
    quickCheck: [
      { id: 'TD-01-QC1', statement: 'Ba bạn Lan, Hoa, Mai xếp hàng: Lan đứng trước Hoa, Hoa đứng trước Mai. Ai đứng đầu hàng?', answerType: 'mcq', mcq: { options: ['Lan', 'Hoa', 'Mai', 'Không xác định'], answerIndex: 0 } },
      { id: 'TD-01-QC2', statement: 'Hai bạn Nam và Việt, một bạn thích Toán, một bạn thích Văn. Biết Nam không thích Văn. Nam thích môn gì?', answerType: 'mcq', mcq: { options: ['Toán', 'Văn', 'Cả hai', 'Không xác định'], answerIndex: 0 } },
      { id: 'TD-01-QC3', statement: 'Phương pháp thường dùng để giải bài toán suy luận logic là gì?', answerType: 'mcq', mcq: { options: ['Lập bảng và loại trừ dần', 'Chỉ đoán ngẫu nhiên', 'Tính trung bình cộng', 'Vẽ sơ đồ đoạn thẳng'], answerIndex: 0 } },
    ],
  },
  {
    id: 'TD-02',
    group: 'TD',
    title: 'Bài toán đếm: số cách chọn, đếm hình, đếm đoạn thẳng',
    level: 'advanced',
    lesson:
      'Đếm số đoạn thẳng tạo bởi $n$ điểm (không có 3 điểm nào trùng nhau khi nối): mỗi cặp 2 điểm tạo đúng 1 đoạn thẳng, nên số đoạn thẳng bằng số cách chọn 2 điểm trong $n$ điểm. Khi đếm số hình (tam giác, tứ giác...) trong một hình vẽ, cần phân loại theo kích thước hoặc vị trí để không bỏ sót và không đếm trùng.',
    formulas: ['\\text{Số đoạn thẳng từ } n \\text{ điểm} = \\dfrac{n \\times (n-1)}{2}'],
    examples: [
      { statement: 'Trên một đường thẳng có 5 điểm phân biệt. Hỏi có tất cả bao nhiêu đoạn thẳng?', steps: [{ order: 1, content: '$5\\times4:2=10$ đoạn thẳng.', rationale: 'Áp dụng công thức đếm đoạn thẳng.' }] },
      { statement: 'Có 4 điểm không có 3 điểm nào thẳng hàng. Hỏi nối được bao nhiêu đoạn thẳng khác nhau?', steps: [{ order: 1, content: '$4\\times3:2=6$ đoạn thẳng.', rationale: 'Mỗi cặp điểm tạo đúng 1 đoạn thẳng, dù các điểm có thẳng hàng hay không.' }] },
    ],
    commonMistakes: [
      'Đếm trùng lặp một đoạn thẳng hai lần (đoạn AB và BA là cùng một đoạn thẳng).',
      'Quên xét đủ mọi cặp điểm khi đếm thủ công.',
      'Nhầm công thức đếm đoạn thẳng với công thức đếm số hình khác.',
    ],
    quickCheck: [
      { id: 'TD-02-QC1', statement: 'Trên một đường thẳng có 6 điểm phân biệt. Hỏi có tất cả bao nhiêu đoạn thẳng?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['15'], tolerance: 0, isInteger: true } },
      { id: 'TD-02-QC2', statement: 'Có 5 điểm không có 3 điểm nào thẳng hàng. Hỏi nối được bao nhiêu đoạn thẳng?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['10'], tolerance: 0, isInteger: true } },
      { id: 'TD-02-QC3', statement: 'Công thức đếm số đoạn thẳng tạo bởi $n$ điểm là gì?', answerType: 'mcq', mcq: { options: ['n x (n-1) : 2', 'n x (n-1)', 'n x n : 2', '(n+1) x n : 2'], answerIndex: 0 } },
    ],
  },
  {
    id: 'TD-03',
    group: 'TD',
    title: 'Nguyên lý Dirichlet ở mức tiểu học ("nguyên lý chuồng thỏ")',
    level: 'advanced',
    lesson:
      'Nguyên lý Dirichlet (chuồng thỏ): nếu nhốt nhiều hơn $n$ con thỏ vào $n$ chuồng thì có ít nhất một chuồng chứa từ 2 con thỏ trở lên. Tổng quát: nếu chia $N$ đối tượng vào $n$ nhóm, thì có ít nhất một nhóm chứa từ $\\lceil N:n \\rceil$ đối tượng trở lên (làm tròn lên nếu chia không hết).',
    formulas: ['\\text{Nhóm nhiều nhất có} \\ge \\lceil N : n \\rceil \\ \\text{đối tượng}'],
    examples: [
      {
        statement: 'Trong một lớp có 13 học sinh. Giải thích vì sao chắc chắn có ít nhất 2 học sinh có cùng tháng sinh (một năm có 12 tháng).',
        steps: [
          { order: 1, content: 'Có 13 học sinh nhưng chỉ có 12 tháng để "xếp vào".', rationale: 'Số đối tượng (13) nhiều hơn số nhóm (12).' },
          { order: 2, content: 'Nếu mỗi tháng chỉ có tối đa 1 học sinh thì tổng tối đa chỉ có 12 học sinh, ít hơn 13.', rationale: 'Giả sử phản chứng để kiểm tra tính hợp lý.' },
          { order: 3, content: 'Vậy chắc chắn có ít nhất 1 tháng có từ 2 học sinh trở lên.', rationale: 'Áp dụng nguyên lý Dirichlet.' },
        ],
      },
      {
        statement: 'Có 25 viên bi được chia vào 4 hộp. Giải thích vì sao chắc chắn có ít nhất 1 hộp chứa từ 7 viên bi trở lên.',
        steps: [
          { order: 1, content: 'Nếu mỗi hộp chứa tối đa 6 viên thì tổng tối đa $=4\\times6=24$ viên.', rationale: 'Giả sử phản chứng: mỗi hộp không vượt quá 6 viên.' },
          { order: 2, content: '$24 < 25$, mâu thuẫn với đề bài có 25 viên.', rationale: 'So sánh với số bi thực tế.' },
          { order: 3, content: 'Vậy có ít nhất 1 hộp chứa từ 7 viên bi trở lên.', rationale: 'Kết luận theo nguyên lý Dirichlet.' },
        ],
      },
    ],
    commonMistakes: [
      'Nhầm điều kiện áp dụng: số đối tượng phải nhiều hơn (không chỉ bằng) một bội số của số nhóm.',
      'Tính sai thương và số dư khi xác định số lượng tối thiểu trong một nhóm.',
      'Kết luận sai mức "ít nhất bao nhiêu" (nhầm với "nhiều nhất bao nhiêu").',
    ],
    quickCheck: [
      { id: 'TD-03-QC1', statement: 'Có 15 viên kẹo chia vào 4 hộp. Hộp nhiều nhất chứa ít nhất bao nhiêu viên (chắc chắn có 1 hộp đạt được số này)?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['4'], tolerance: 0, isInteger: true } },
      { id: 'TD-03-QC2', statement: 'Trong một lớp 13 học sinh, theo nguyên lý Dirichlet, ta có thể khẳng định điều gì về tháng sinh (12 tháng)?', answerType: 'mcq', mcq: { options: ['Có ít nhất 2 học sinh cùng tháng sinh', 'Không có ai cùng tháng sinh', 'Tất cả cùng tháng sinh', 'Không thể xác định'], answerIndex: 0 } },
      { id: 'TD-03-QC3', statement: 'Có 10 quả bóng chia vào 3 giỏ. Giỏ nhiều nhất chứa ít nhất bao nhiêu quả?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['4'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'TD-04',
    group: 'TD',
    title: 'Bài toán cân, đong, chia phần',
    level: 'advanced',
    lesson:
      'Dạng toán này yêu cầu chia một đại lượng (nước, gạo...) thành các phần bằng những dụng cụ đong có dung tích cho trước, hoặc dùng cân thăng bằng để tìm ra vật khác biệt (nặng/nhẹ hơn) trong số ít lần cân nhất. Phương pháp: liệt kê cụ thể từng bước đong/cân và kiểm tra tính khả thi.',
    formulas: ['\\text{Rót đầy can nhỏ từ can lớn} \\Rightarrow \\text{can lớn còn lại} = V_{lớn} - V_{nhỏ}'],
    examples: [
      {
        statement: 'Có một can 5 lít và một can 3 lít (không có vạch chia). Làm sao đong được đúng 4 lít nước?',
        steps: [
          { order: 1, content: 'Đổ đầy can 5 lít.', rationale: 'Bước khởi đầu.' },
          { order: 2, content: 'Rót từ can 5 lít sang can 3 lít cho đến khi đầy can 3 lít; can 5 lít còn lại $5-3=2$ lít.', rationale: 'Tận dụng dung tích can 3 lít.' },
          { order: 3, content: 'Đổ hết can 3 lít, rồi rót 2 lít còn lại từ can 5 lít sang can 3 lít.', rationale: 'Chuyển phần dư sang can nhỏ.' },
          { order: 4, content: 'Đổ đầy lại can 5 lít, rót sang can 3 lít (đang có 2 lít, chỉ cần thêm 1 lít là đầy); can 5 lít còn lại đúng $5-1=4$ lít.', rationale: 'Bước cuối để có đúng 4 lít.' },
        ],
      },
      {
        statement: 'Có 8 viên bi giống hệt nhau, trong đó 1 viên nặng hơn các viên còn lại. Dùng cân thăng bằng (không quả cân), tìm viên nặng hơn với ít nhất bao nhiêu lần cân?',
        steps: [
          { order: 1, content: 'Chia 8 viên thành 3 nhóm: 3, 3, 2. Cân 2 nhóm 3 viên với nhau (nhóm 2 viên để riêng).', rationale: 'Chia nhóm để thu hẹp phạm vi tìm kiếm.' },
          { order: 2, content: 'Nếu cân thăng bằng, viên nặng nằm trong 2 viên còn lại — cân tiếp 2 viên đó để tìm ra (lần cân thứ 2).', rationale: 'Xét trường hợp thăng bằng.' },
          { order: 3, content: 'Nếu không thăng bằng, viên nặng nằm trong nhóm 3 viên nặng hơn — cân 2 trong 3 viên đó (lần cân thứ 2) để xác định.', rationale: 'Xét trường hợp lệch cân.' },
          { order: 4, content: 'Vậy trong mọi trường hợp, cần ít nhất 2 lần cân.', rationale: 'Kết luận chung cho cả hai trường hợp.' },
        ],
      },
    ],
    commonMistakes: [
      'Bỏ sót một bước trong quy trình đong nước.',
      'Không xét hết các trường hợp có thể xảy ra khi cân (thăng bằng hoặc lệch).',
      'Nhầm lẫn giữa "ít nhất bao nhiêu lần" (chiến lược tối ưu) và số lần cân bất kỳ.',
    ],
    quickCheck: [
      { id: 'TD-04-QC1', statement: 'Có can 5 lít và can 3 lít. Đổ đầy can 5 lít rồi rót sang can 3 lít cho đầy. Can 5 lít còn lại bao nhiêu lít?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['2'], tolerance: 0, isInteger: true } },
      { id: 'TD-04-QC2', statement: 'Trong bài toán cân 8 viên bi để tìm viên nặng hơn, cần ít nhất bao nhiêu lần cân?', answerType: 'mcq', mcq: { options: ['2 lần', '1 lần', '3 lần', '4 lần'], answerIndex: 0 } },
      { id: 'TD-04-QC3', statement: 'Có 9 viên bi giống nhau, 1 viên nặng hơn. Sau khi chia 3 nhóm 3 viên và cân lần đầu đã xác định được nhóm chứa viên nặng (còn 3 viên nghi ngờ). Cần thêm ít nhất bao nhiêu lần cân nữa?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['1'], tolerance: 0, isInteger: true } },
    ],
  },
  {
    id: 'TD-05',
    group: 'TD',
    title: 'Quy luật hình, dãy hình, toán vui',
    level: 'advanced',
    lesson:
      'Với bài toán quy luật hình hoặc dãy hình, cần quan sát sự thay đổi giữa các hình liên tiếp (số lượng chi tiết tăng/giảm, cách ghép...) để tìm ra quy luật, từ đó suy ra hình tiếp theo hoặc hình thứ $n$.',
    formulas: ['\\text{Số hạng thứ } n = \\text{số hạng đầu} + (n-1) \\times d'],
    examples: [
      {
        statement: 'Dãy hình vuông ghép từ que diêm: hình 1 dùng 4 que, hình 2 dùng 7 que, hình 3 dùng 10 que (mỗi hình sau tăng thêm 3 que). Hỏi hình thứ 5 dùng bao nhiêu que diêm?',
        steps: [
          { order: 1, content: 'Số que hình thứ $n$ $=4+(n-1)\\times3$.', rationale: 'Xác định quy luật cộng thêm 3 que mỗi hình.' },
          { order: 2, content: 'Hình thứ 5: $4+4\\times3=16$ que.', rationale: 'Thay $n=5$ vào công thức.' },
        ],
      },
      {
        statement: 'Dãy số chấm tròn xếp thành hình tam giác: hình 1 có 1 chấm, hình 2 có 3 chấm, hình 3 có 6 chấm, hình 4 có 10 chấm. Hỏi hình thứ 5 có bao nhiêu chấm?',
        steps: [
          { order: 1, content: 'Số chấm hình thứ $n$ $= n \\times (n+1) : 2$ (dãy số tam giác).', rationale: 'Nhận ra quy luật dãy số tam giác quen thuộc.' },
          { order: 2, content: 'Hình thứ 5: $5\\times6:2=15$ chấm.', rationale: 'Thay $n=5$ vào công thức.' },
        ],
      },
    ],
    commonMistakes: [
      'Không quan sát đủ số hình để xác định chắc chắn quy luật (nên xem ít nhất 3 hình liên tiếp).',
      'Nhầm quy luật cộng thêm (cấp số cộng) với quy luật nhân.',
      'Áp dụng sai công thức số hạng tổng quát do nhầm vị trí bắt đầu đếm ($n=1$ hay $n=0$).',
    ],
    quickCheck: [
      { id: 'TD-05-QC1', statement: 'Dãy que diêm: hình 1 dùng 4 que, hình 2 dùng 7 que, hình 3 dùng 10 que. Hình thứ 4 dùng bao nhiêu que?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['13'], tolerance: 0, isInteger: true } },
      { id: 'TD-05-QC2', statement: 'Dãy số chấm tam giác: hình 1 có 1 chấm, hình 2 có 3 chấm, hình 3 có 6 chấm. Hình thứ 4 có bao nhiêu chấm?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['10'], tolerance: 0, isInteger: true } },
      { id: 'TD-05-QC3', statement: 'Để xác định đúng quy luật của một dãy hình, ta cần làm gì trước tiên?', answerType: 'mcq', mcq: { options: ['Quan sát sự thay đổi giữa các hình liên tiếp', 'Đoán ngẫu nhiên', 'Chỉ nhìn hình đầu tiên', 'Chỉ nhìn hình cuối cùng'], answerIndex: 0 } },
    ],
  },
  {
    id: 'TD-06',
    group: 'TD',
    title: 'Bài toán yêu cầu lập luận/chứng minh — dành cho phần tự luận',
    level: 'advanced',
    lesson:
      'Với dạng bài yêu cầu lập luận hoặc giải thích, học sinh cần trình bày rõ ràng từng bước suy luận, nêu rõ căn cứ (dựa vào dữ kiện nào, quy tắc nào) cho mỗi bước, kiểm tra lại bằng ví dụ cụ thể, và đi đến kết luận một cách chặt chẽ — không bỏ qua bước nào.',
    formulas: ['\\text{Giả thiết} \\Rightarrow \\text{Bước 1} \\Rightarrow \\text{Bước 2} \\Rightarrow \\cdots \\Rightarrow \\text{Kết luận}'],
    examples: [
      {
        statement: 'Giải thích vì sao một số có tổng các chữ số chia hết cho 9 thì số đó cũng chia hết cho 9. Minh họa bằng số 4527.',
        steps: [
          { order: 1, content: 'Tổng các chữ số của 4527 là $4+5+2+7=18$.', rationale: 'Tính tổng các chữ số theo dấu hiệu chia hết cho 9.' },
          { order: 2, content: '$18$ chia hết cho 9 ($18:9=2$).', rationale: 'Kiểm tra tổng chữ số.' },
          { order: 3, content: 'Theo dấu hiệu chia hết cho 9 đã học, số có tổng chữ số chia hết cho 9 thì số đó cũng chia hết cho 9.', rationale: 'Áp dụng dấu hiệu chia hết.' },
          { order: 4, content: 'Kiểm tra lại: $4527:9=503$ (chia hết, không dư). Vậy kết luận đúng.', rationale: 'Xác minh lại bằng phép chia trực tiếp.' },
        ],
      },
      {
        statement: 'Giải thích vì sao trong 3 số tự nhiên liên tiếp bất kỳ luôn có ít nhất một số chia hết cho 3.',
        steps: [
          { order: 1, content: 'Khi chia một số tự nhiên bất kỳ cho 3, số dư chỉ có thể là 0, 1 hoặc 2.', rationale: 'Liệt kê đầy đủ các khả năng của số dư.' },
          { order: 2, content: 'Xét 3 số liên tiếp: nếu số đầu chia 3 dư 0 thì chính nó chia hết cho 3; nếu dư 1 thì số liền sau thứ hai (số thứ ba) sẽ chia hết cho 3; nếu dư 2 thì số liền sau (số thứ hai) sẽ chia hết cho 3.', rationale: 'Xét đủ 3 trường hợp số dư có thể xảy ra.' },
          { order: 3, content: 'Vậy trong mọi trường hợp, luôn có ít nhất một trong 3 số liên tiếp chia hết cho 3.', rationale: 'Kết luận chung cho cả 3 trường hợp.' },
          { order: 4, content: 'Ví dụ minh họa: $7, 8, 9$ có $9$ chia hết cho 3; $10, 11, 12$ có $12$ chia hết cho 3.', rationale: 'Kiểm chứng bằng ví dụ cụ thể.' },
        ],
      },
    ],
    commonMistakes: [
      'Chỉ nêu kết luận mà không trình bày các bước lập luận dẫn đến kết luận đó.',
      'Bỏ qua việc kiểm tra lại bằng một ví dụ cụ thể để xác nhận lập luận đúng.',
      'Lập luận không xét hết các trường hợp có thể xảy ra, dẫn đến thiếu chặt chẽ.',
    ],
    quickCheck: [
      { id: 'TD-06-QC1', statement: 'Khi trình bày một bài lập luận/giải thích, điều quan trọng nhất là gì?', answerType: 'mcq', mcq: { options: ['Nêu rõ căn cứ cho từng bước suy luận', 'Chỉ cần ghi đáp số cuối cùng', 'Đoán kết quả rồi kiểm tra ngẫu nhiên', 'Không cần giải thích gì thêm'], answerIndex: 0 } },
      { id: 'TD-06-QC2', statement: 'Trong 3 số tự nhiên liên tiếp bất kỳ, luôn có ít nhất một số chia hết cho mấy?', answerType: 'mcq', mcq: { options: ['3', '2', '5', '9'], answerIndex: 0 } },
      { id: 'TD-06-QC3', statement: 'Tổng các chữ số của số 6534 là bao nhiêu?', answerType: 'numeric', numeric: { kind: 'single', acceptedValues: ['18'], tolerance: 0, isInteger: true } },
    ],
  },
];
