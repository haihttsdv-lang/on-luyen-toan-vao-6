import type { Exercise } from '../../types';

/**
 * Đợt 6: bổ sung dạng bài tự luận (essay, có rubric chấm điểm) cho các chuyên đề
 * "phương pháp giải đặc biệt" mà URD liệt kê riêng (Mục 4.3) — trước đây các chuyên đề
 * này chỉ có bài điền đáp số/trắc nghiệm, chưa có bài yêu cầu trình bày lập luận.
 * TD-06 đã có sẵn 9 bài tự luận từ trước (chuyên đề thuần lập luận/chứng minh) nên
 * không bổ sung thêm ở đợt này.
 */
export const essayPriorityExercises: Exercise[] = [
  // DH-08 — Toán chuyển động nâng cao
  {
    id: 'DH-08-EX13',
    topicIds: ['DH-08'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Một ca-nô đi xuôi dòng từ A đến B hết 2 giờ, đi ngược dòng từ B về A hết 3 giờ. Quãng đường AB dài 90km. Hãy trình bày cách tìm vận tốc dòng nước và tính vận tốc đó.',
    solutionSteps: [
      { order: 1, content: 'Vận tốc xuôi dòng $=90:2=45$km/h; vận tốc ngược dòng $=90:3=30$km/h.', rationale: 'Vận tốc = quãng đường : thời gian.' },
      { order: 2, content: 'Xuôi dòng: $v_{xuôi}=v_{thuyền}+v_{nước}$; ngược dòng: $v_{ngược}=v_{thuyền}-v_{nước}$. Trừ hai vế: $v_{xuôi}-v_{ngược}=2\\times v_{nước}$.', rationale: 'Lập mối liên hệ giữa vận tốc xuôi/ngược và vận tốc dòng nước.' },
      { order: 3, content: 'Vận tốc dòng nước $=(45-30):2=7{,}5$km/h.', rationale: 'Thay số vào công thức vừa lập.' },
    ],
    essay: {
      modelSolution:
        'Vận tốc xuôi dòng = 90:2 = 45km/h; vận tốc ngược dòng = 90:3 = 30km/h. Vì xuôi dòng thì vận tốc thuyền cộng thêm vận tốc nước, ngược dòng thì trừ đi vận tốc nước, nên hiệu hai vận tốc xuôi và ngược đúng bằng 2 lần vận tốc dòng nước. Vậy vận tốc dòng nước = (45-30):2 = 7,5km/h.',
      rubric: [
        { criterion: 'Tính đúng vận tốc xuôi dòng (45km/h) và ngược dòng (30km/h)', points: 1 },
        { criterion: 'Giải thích được hiệu vận tốc xuôi và ngược bằng 2 lần vận tốc dòng nước', points: 1 },
        { criterion: 'Tính đúng vận tốc dòng nước = 7,5km/h', points: 1 },
      ],
    },
  },
  {
    id: 'DH-08-EX14',
    topicIds: ['DH-08'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Một người đi xe đạp từ nhà đến trường với vận tốc không đổi. Đi được nửa quãng đường thì dừng nghỉ 5 phút, sau đó đi tiếp với đúng vận tốc cũ cho tới trường. Hỏi người đó đến trường muộn hơn so với việc đi liên tục không nghỉ bao nhiêu phút? Giải thích cách suy luận.',
    solutionSteps: [
      { order: 1, content: 'Vì đi tiếp với đúng vận tốc cũ sau khi nghỉ, thời gian di chuyển thực tế trên cả quãng đường không đổi so với đi liên tục.', rationale: 'Nghỉ giữa đường không làm thay đổi vận tốc di chuyển, chỉ cộng thêm thời gian đứng yên.' },
      { order: 2, content: 'Thời gian đến trường tăng thêm đúng bằng thời gian nghỉ.', rationale: 'Tổng thời gian = thời gian di chuyển (không đổi) + thời gian nghỉ.' },
      { order: 3, content: 'Vậy người đó đến trường muộn hơn $5$ phút.', rationale: 'Kết luận theo suy luận trên.' },
    ],
    essay: {
      modelSolution:
        'Vì sau khi nghỉ người đó đi tiếp với đúng vận tốc cũ, nên tổng thời gian di chuyển (không tính lúc nghỉ) trên cả quãng đường vẫn giống hệt như đi liên tục không nghỉ. Việc dừng nghỉ chỉ cộng thêm một khoảng thời gian đứng yên vào tổng thời gian của cả chuyến đi. Do đó thời gian đến trường muộn hơn đúng bằng thời gian đã nghỉ, tức là muộn 5 phút.',
      rubric: [
        { criterion: 'Giải thích được việc nghỉ giữa đường không làm thay đổi vận tốc và thời gian di chuyển thực tế', points: 1 },
        { criterion: 'Suy luận được thời gian đến trễ chỉ do thời gian nghỉ cộng thêm', points: 1 },
        { criterion: 'Kết luận đúng: muộn 5 phút', points: 1 },
      ],
    },
  },

  // DH-11 — Bài toán giả thiết tạm
  {
    id: 'DH-11-EX10',
    topicIds: ['DH-11'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Một chuồng nuôi có 8 con gồm gà và chó, đếm được tất cả 22 chân. Hỏi có bao nhiêu con gà, bao nhiêu con chó? Trình bày cách giải bằng phương pháp giả thiết tạm.',
    solutionSteps: [
      { order: 1, content: 'Giả sử cả 8 con đều là gà (2 chân): số chân giả định $=8\\times2=16$ chân.', rationale: 'Đặt giả thiết tạm với loại con vật có ít chân hơn.' },
      { order: 2, content: 'Thực tế có $22$ chân, chênh lệch $=22-16=6$ chân. Mỗi con chó thay cho 1 con gà làm chân tăng thêm $4-2=2$.', rationale: 'Tính phần chênh lệch và mức tăng khi đổi 1 con.' },
      { order: 3, content: 'Số chó $=6:2=3$ con; số gà $=8-3=5$ con.', rationale: 'Chia chênh lệch cho mức tăng mỗi lần đổi, rồi suy ra số gà.' },
    ],
    essay: {
      modelSolution:
        'Giả sử cả 8 con đều là gà, mỗi con 2 chân, ta được số chân giả định là 8×2=16 chân. Nhưng thực tế có 22 chân, tức là còn thiếu 22-16=6 chân so với thực tế. Mỗi lần thay 1 con gà (2 chân) bằng 1 con chó (4 chân) thì số chân tăng thêm 4-2=2 chân. Vậy số con chó là 6:2=3 con, số con gà là 8-3=5 con.',
      rubric: [
        { criterion: 'Nêu đúng giả thiết tạm (coi tất cả là gà) và tính được số chân giả định = 16', points: 1 },
        { criterion: 'Tính đúng chênh lệch 6 chân và giải thích mỗi lần đổi 1 con tăng thêm 2 chân', points: 1 },
        { criterion: 'Kết luận đúng: 3 con chó, 5 con gà', points: 1 },
      ],
    },
  },
  {
    id: 'DH-11-EX11',
    topicIds: ['DH-11'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Một buổi biểu diễn xiếc bán được 50 vé, gồm vé người lớn giá 40.000đ và vé trẻ em giá 25.000đ, tổng thu được 1.700.000đ. Hỏi bán được bao nhiêu vé mỗi loại? Trình bày bằng phương pháp giả thiết tạm.',
    solutionSteps: [
      { order: 1, content: 'Giả sử cả 50 vé đều là vé trẻ em: số tiền giả định $=50\\times25\\,000=1\\,250\\,000$đ.', rationale: 'Đặt giả thiết tạm với loại vé giá rẻ hơn.' },
      { order: 2, content: 'Thực tế thu $1\\,700\\,000$đ, chênh lệch $=1\\,700\\,000-1\\,250\\,000=450\\,000$đ. Mỗi vé người lớn thay cho 1 vé trẻ em làm tiền tăng thêm $40\\,000-25\\,000=15\\,000$đ.', rationale: 'Tính chênh lệch và mức tăng khi đổi 1 vé.' },
      { order: 3, content: 'Số vé người lớn $=450\\,000:15\\,000=30$ vé; số vé trẻ em $=50-30=20$ vé.', rationale: 'Chia chênh lệch cho mức tăng mỗi lần đổi, rồi suy ra số vé trẻ em.' },
    ],
    essay: {
      modelSolution:
        'Giả sử cả 50 vé đều là vé trẻ em (25.000đ), số tiền giả định là 50×25.000=1.250.000đ. Thực tế thu được 1.700.000đ, chênh lệch là 1.700.000-1.250.000=450.000đ. Mỗi lần thay 1 vé trẻ em bằng 1 vé người lớn thì tiền thu tăng thêm 40.000-25.000=15.000đ. Vậy số vé người lớn là 450.000:15.000=30 vé, số vé trẻ em là 50-30=20 vé.',
      rubric: [
        { criterion: 'Nêu đúng giả thiết tạm (coi tất cả là vé trẻ em) và tính được số tiền giả định = 1.250.000đ', points: 1 },
        { criterion: 'Tính đúng chênh lệch 450.000đ và giải thích mỗi lần đổi 1 vé tăng thêm 15.000đ', points: 1 },
        { criterion: 'Kết luận đúng: 30 vé người lớn, 20 vé trẻ em', points: 1 },
      ],
    },
  },

  // DH-12 — Bài toán tính ngược từ cuối
  {
    id: 'DH-12-EX10',
    topicIds: ['DH-12'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Một người nghĩ ra một số. Lấy số đó cộng thêm 8, rồi nhân với 3, rồi trừ đi 6, được kết quả là 45. Hỏi số ban đầu là bao nhiêu? Trình bày cách giải bằng phương pháp tính ngược từ cuối.',
    solutionSteps: [
      { order: 1, content: 'Ngược phép trừ 6 cuối cùng: $45+6=51$.', rationale: 'Muốn tìm số trước khi trừ 6, ta cộng ngược lại 6.' },
      { order: 2, content: 'Ngược phép nhân 3: $51:3=17$.', rationale: 'Muốn tìm số trước khi nhân 3, ta chia ngược lại cho 3.' },
      { order: 3, content: 'Ngược phép cộng 8: $17-8=9$.', rationale: 'Muốn tìm số ban đầu trước khi cộng 8, ta trừ ngược lại 8.' },
    ],
    essay: {
      modelSolution:
        'Đề bài thực hiện lần lượt: cộng 8, nhân 3, trừ 6, ra kết quả 45. Để tìm lại số ban đầu, ta làm ngược lại theo thứ tự từ cuối lên đầu, mỗi bước dùng phép tính ngược: trước khi trừ 6 thì số là 45+6=51; trước khi nhân 3 thì số là 51:3=17; trước khi cộng 8 thì số là 17-8=9. Vậy số ban đầu là 9. Kiểm tra lại: 9+8=17, 17×3=51, 51-6=45, đúng với đề bài.',
      rubric: [
        { criterion: 'Thực hiện đúng bước ngược đầu tiên (cộng 6 để "hoàn tác" phép trừ): 51', points: 1 },
        { criterion: 'Thực hiện đúng bước ngược tiếp theo (chia 3 để "hoàn tác" phép nhân): 17', points: 1 },
        { criterion: 'Thực hiện đúng bước ngược cuối (trừ 8) và kết luận số ban đầu là 9, có kiểm tra lại', points: 1 },
      ],
    },
  },
  {
    id: 'DH-12-EX11',
    topicIds: ['DH-12'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'An có một số tiền. Ngày thứ nhất An tiêu hết một nửa số tiền rồi được mẹ cho thêm 20.000đ. Ngày thứ hai An tiêu tiếp một nửa số tiền đang có rồi được cho thêm 15.000đ thì còn lại 50.000đ. Hỏi ban đầu An có bao nhiêu tiền? Trình bày bằng phương pháp tính ngược từ cuối.',
    solutionSteps: [
      { order: 1, content: 'Ngược bước "được cho thêm 15.000đ" cuối cùng: $50\\,000-15\\,000=35\\,000$đ — đây là số tiền còn lại sau khi tiêu một nửa ở ngày 2.', rationale: 'Trừ ngược lại phần được cho thêm.' },
      { order: 2, content: 'Vì tiêu hết một nửa thì còn lại đúng một nửa, nên số tiền trước khi tiêu ngày 2 là $35\\,000\\times2=70\\,000$đ.', rationale: 'Nhân đôi để hoàn tác việc "còn lại một nửa".' },
      { order: 3, content: 'Ngược bước "được cho thêm 20.000đ" ngày 1: $70\\,000-20\\,000=50\\,000$đ, rồi nhân đôi để hoàn tác việc tiêu hết một nửa ngày 1: $50\\,000\\times2=100\\,000$đ.', rationale: 'Lặp lại nguyên tắc tính ngược cho ngày thứ nhất.' },
    ],
    essay: {
      modelSolution:
        'Đi ngược từ kết quả cuối cùng (50.000đ) về đầu. Trước khi được cho thêm 15.000đ ở ngày 2, An có 50.000-15.000=35.000đ — đây chính là một nửa số tiền An có trước khi tiêu ngày 2, nên số tiền trước khi tiêu ngày 2 là 35.000×2=70.000đ. Trước khi được cho thêm 20.000đ ở ngày 1, An có 70.000-20.000=50.000đ — đây là một nửa số tiền ban đầu, nên số tiền ban đầu là 50.000×2=100.000đ. Kiểm tra: 100.000đ, tiêu nửa còn 50.000đ, +20.000=70.000đ; tiêu nửa còn 35.000đ, +15.000=50.000đ, đúng với đề bài.',
      rubric: [
        { criterion: 'Tính ngược đúng bước cuối (trừ 15.000đ, rồi nhân đôi vì tiêu hết một nửa): ra 70.000đ', points: 1 },
        { criterion: 'Tính ngược đúng bước tiếp theo (trừ 20.000đ, rồi nhân đôi): ra 100.000đ', points: 1 },
        { criterion: 'Trình bày rõ nguyên tắc tính ngược (đảo thứ tự, đảo phép tính) và kiểm tra lại kết quả', points: 1 },
      ],
    },
  },

  // DH-16 — Phương pháp khử
  {
    id: 'DH-16-EX9',
    topicIds: ['DH-16'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Mua 3 quyển vở và 2 chiếc bút hết 38.000đ. Mua 3 quyển vở và 5 chiếc bút hết 62.000đ. Tính giá một chiếc bút. Trình bày bằng phương pháp khử.',
    solutionSteps: [
      { order: 1, content: 'Cả hai lần mua đều có cùng $3$ quyển vở, chỉ khác số bút — có thể khử phần vở bằng cách lấy hiệu hai lần mua.', rationale: 'Nhận ra đại lượng giống nhau ở cả hai phương trình để khử.' },
      { order: 2, content: 'Hiệu số tiền $=62\\,000-38\\,000=24\\,000$đ, ứng với hiệu số bút $=5-2=3$ chiếc.', rationale: 'Lấy hiệu hai lần mua, phần vở tự triệt tiêu, chỉ còn lại phần bút.' },
      { order: 3, content: 'Giá một chiếc bút $=24\\,000:3=8\\,000$đ.', rationale: 'Chia hiệu số tiền cho hiệu số bút.' },
    ],
    essay: {
      modelSolution:
        'Cả hai lần mua đều có 3 quyển vở giống nhau, chỉ khác số bút (2 chiếc và 5 chiếc). Vì vậy nếu lấy số tiền lần mua sau trừ đi số tiền lần mua trước, phần tiền mua vở sẽ tự triệt tiêu (khử đi), chỉ còn lại phần chênh lệch do số bút. Hiệu số tiền là 62.000-38.000=24.000đ, ứng với hiệu 5-2=3 chiếc bút. Vậy giá một chiếc bút là 24.000:3=8.000đ.',
      rubric: [
        { criterion: 'Nhận ra số vở giống nhau (3 quyển) ở cả hai lần mua để có thể khử', points: 1 },
        { criterion: 'Lập đúng phép trừ giữa hai lần mua: chênh lệch 3 chiếc bút tương ứng 24.000đ', points: 1 },
        { criterion: 'Tính đúng giá một chiếc bút = 8.000đ', points: 1 },
      ],
    },
  },
  {
    id: 'DH-16-EX10',
    topicIds: ['DH-16'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Mua 2kg cam và 3kg xoài hết 190.000đ. Mua 4kg cam và 3kg xoài hết 250.000đ. Tính giá 1kg cam. Trình bày bằng phương pháp khử.',
    solutionSteps: [
      { order: 1, content: 'Cả hai lần mua đều có cùng $3$kg xoài, chỉ khác số cam — có thể khử phần xoài bằng cách lấy hiệu hai lần mua.', rationale: 'Nhận ra đại lượng giống nhau ở cả hai phương trình để khử.' },
      { order: 2, content: 'Hiệu số tiền $=250\\,000-190\\,000=60\\,000$đ, ứng với hiệu số cam $=4-2=2$kg.', rationale: 'Lấy hiệu hai lần mua, phần xoài tự triệt tiêu, chỉ còn lại phần cam.' },
      { order: 3, content: 'Giá 1kg cam $=60\\,000:2=30\\,000$đ.', rationale: 'Chia hiệu số tiền cho hiệu số cam.' },
    ],
    essay: {
      modelSolution:
        'Cả hai lần mua đều có 3kg xoài giống nhau, chỉ khác số cam (2kg và 4kg). Nếu lấy số tiền lần mua sau trừ đi lần mua trước, phần tiền mua xoài sẽ tự triệt tiêu (khử đi), chỉ còn lại phần chênh lệch do cam. Hiệu số tiền là 250.000-190.000=60.000đ, ứng với hiệu 4-2=2kg cam. Vậy giá 1kg cam là 60.000:2=30.000đ.',
      rubric: [
        { criterion: 'Nhận ra số xoài giống nhau (3kg) ở cả hai lần mua để có thể khử', points: 1 },
        { criterion: 'Lập đúng phép trừ giữa hai lần mua: chênh lệch 2kg cam tương ứng 60.000đ', points: 1 },
        { criterion: 'Tính đúng giá 1kg cam = 30.000đ', points: 1 },
      ],
    },
  },

  // HH-09 — Tỉ số diện tích tam giác chung đáy hoặc chung chiều cao
  {
    id: 'HH-09-EX13',
    topicIds: ['HH-09'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Cho tam giác ABC, M là trung điểm của cạnh BC. So sánh diện tích tam giác ABM và tam giác ACM. Giải thích vì sao.',
    solutionSteps: [
      { order: 1, content: 'Hai tam giác ABM và ACM có chung chiều cao là đường cao hạ từ đỉnh A xuống đường thẳng BC.', rationale: 'Nhận ra yếu tố chung giữa hai tam giác.' },
      { order: 2, content: 'Vì M là trung điểm BC nên $BM=MC$ — hai đáy tương ứng bằng nhau.', rationale: 'Dùng tính chất trung điểm.' },
      { order: 3, content: 'Hai tam giác có chung chiều cao và đáy bằng nhau nên diện tích bằng nhau: $S_{ABM}=S_{ACM}$.', rationale: 'Áp dụng công thức diện tích tam giác = đáy × chiều cao : 2.' },
    ],
    essay: {
      modelSolution:
        'Hai tam giác ABM và ACM có chung đỉnh A và hai đáy BM, MC cùng nằm trên đường thẳng BC, nên chúng có chung chiều cao là đường cao hạ từ A xuống BC. Vì M là trung điểm của BC nên BM = MC, tức là hai đáy bằng nhau. Hai tam giác có chung chiều cao và đáy bằng nhau thì diện tích bằng nhau, do đó diện tích tam giác ABM bằng diện tích tam giác ACM.',
      rubric: [
        { criterion: 'Nhận ra hai tam giác có chung chiều cao (đường cao hạ từ đỉnh A xuống BC)', points: 1 },
        { criterion: 'Giải thích được BM = MC vì M là trung điểm', points: 1 },
        { criterion: 'Kết luận đúng: hai diện tích bằng nhau, có nêu rõ lý do (đáy bằng nhau, chiều cao bằng nhau)', points: 1 },
      ],
    },
  },
  {
    id: 'HH-09-EX14',
    topicIds: ['HH-09'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Tam giác ABC có diện tích 60cm². Trên cạnh BC lấy điểm D sao cho BD gấp đôi DC. So sánh diện tích tam giác ABD và ACD, từ đó tính diện tích mỗi tam giác. Giải thích cách làm.',
    solutionSteps: [
      { order: 1, content: 'Hai tam giác ABD và ACD có chung chiều cao là đường cao hạ từ đỉnh A xuống BC.', rationale: 'Nhận ra yếu tố chung giữa hai tam giác.' },
      { order: 2, content: 'Vì $BD=2\\times DC$ nên $S_{ABD}=2\\times S_{ACD}$ (hai tam giác chung chiều cao thì tỉ số diện tích bằng tỉ số hai đáy).', rationale: 'Áp dụng tính chất tỉ số diện tích khi chung chiều cao.' },
      { order: 3, content: 'Tổng $S_{ABD}+S_{ACD}=60$cm², coi $S_{ACD}$ là 1 phần thì $S_{ABD}$ là 2 phần, tổng 3 phần $=60$cm². Vậy $S_{ACD}=20$cm², $S_{ABD}=40$cm².', rationale: 'Dùng phương pháp tổng-tỉ để tính từng phần.' },
    ],
    essay: {
      modelSolution:
        'Hai tam giác ABD và ACD có chung đỉnh A, hai đáy BD và DC cùng nằm trên BC nên chung chiều cao hạ từ A. Khi hai tam giác chung chiều cao, tỉ số diện tích của chúng bằng tỉ số hai đáy. Vì BD gấp đôi DC nên diện tích ABD cũng gấp đôi diện tích ACD. Coi diện tích ACD là 1 phần thì diện tích ABD là 2 phần, tổng cộng là 3 phần ứng với 60cm². Vậy diện tích ACD = 60:3 = 20cm², diện tích ABD = 20×2 = 40cm².',
      rubric: [
        { criterion: 'Nhận ra hai tam giác chung chiều cao hạ từ đỉnh A', points: 1 },
        { criterion: 'Giải thích được tỉ số diện tích bằng tỉ số đáy BD:DC = 2:1', points: 1 },
        { criterion: 'Tính đúng bằng phương pháp tổng-tỉ: ACD = 20cm², ABD = 40cm²', points: 1 },
      ],
    },
  },

  // HH-10 — Cắt ghép hình; tính diện tích phần tô đậm
  {
    id: 'HH-10-EX10',
    topicIds: ['HH-10'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Hình chữ nhật ABCD có diện tích 84cm² được chia thành 2 tam giác bởi đường chéo AC. Giải thích vì sao diện tích tam giác ABC bằng diện tích tam giác ACD, từ đó tính diện tích mỗi tam giác.',
    solutionSteps: [
      { order: 1, content: 'Tam giác ABC và tam giác ACD đều là tam giác vuông (góc B và góc D là góc vuông của hình chữ nhật), có cạnh $AB=CD$ và $BC=AD$ (cạnh đối hình chữ nhật), và chung cạnh huyền AC.', rationale: 'So sánh các cạnh tương ứng của hai tam giác.' },
      { order: 2, content: 'Hai tam giác vuông có 2 cạnh góc vuông bằng nhau từng đôi một nên bằng nhau hoàn toàn, do đó diện tích bằng nhau.', rationale: 'Áp dụng điều kiện hai tam giác bằng nhau.' },
      { order: 3, content: 'Mỗi tam giác có diện tích bằng nửa diện tích hình chữ nhật: $84:2=42$cm².', rationale: 'Suy ra diện tích mỗi tam giác từ tổng diện tích hình chữ nhật.' },
    ],
    essay: {
      modelSolution:
        'Trong hình chữ nhật ABCD, tam giác ABC và tam giác ACD đều là tam giác vuông (vuông tại B và tại D). Hai tam giác này có AB = CD, BC = AD (các cạnh đối của hình chữ nhật bằng nhau) và chung cạnh huyền AC, nên hai tam giác vuông này bằng nhau hoàn toàn, suy ra diện tích bằng nhau. Vì hai tam giác cộng lại vừa đúng bằng hình chữ nhật, mỗi tam giác có diện tích bằng một nửa diện tích hình chữ nhật: 84:2 = 42cm².',
      rubric: [
        { criterion: 'Giải thích được đường chéo chia hình chữ nhật thành 2 tam giác vuông bằng nhau', points: 1 },
        { criterion: 'Nêu đúng căn cứ (cạnh tương ứng bằng nhau, chung cạnh huyền) để kết luận hai tam giác bằng nhau', points: 1 },
        { criterion: 'Tính đúng diện tích mỗi tam giác = 42cm²', points: 1 },
      ],
    },
  },
  {
    id: 'HH-10-EX11',
    topicIds: ['HH-10'],
    level: 'advanced',
    answerType: 'essay',
    statement:
      'Một hình vuông cạnh 12cm. Người ta tô đậm 4 tam giác ở 4 góc, mỗi tam giác có 2 cạnh góc vuông bằng nửa cạnh hình vuông (6cm). Tính diện tích phần không tô đậm ở giữa. Giải thích cách làm.',
    solutionSteps: [
      { order: 1, content: 'Diện tích hình vuông lớn $=12\\times12=144$cm².', rationale: 'Tính diện tích toàn bộ hình vuông.' },
      { order: 2, content: 'Mỗi tam giác ở góc có diện tích $=6\\times6:2=18$cm²; 4 tam giác có tổng diện tích $=4\\times18=72$cm².', rationale: 'Tính diện tích phần bị tô đậm (4 tam giác vuông cân ở 4 góc).' },
      { order: 3, content: 'Diện tích phần không tô đậm ở giữa $=144-72=72$cm².', rationale: 'Lấy diện tích hình vuông lớn trừ đi phần đã tô đậm.' },
    ],
    essay: {
      modelSolution:
        'Diện tích hình vuông lớn là 12×12 = 144cm². Mỗi tam giác ở góc là tam giác vuông cân với 2 cạnh góc vuông dài 6cm (nửa cạnh hình vuông), diện tích mỗi tam giác là 6×6:2 = 18cm². Có 4 tam giác như vậy nên tổng diện tích phần tô đậm là 4×18 = 72cm². Diện tích phần không tô đậm ở giữa bằng diện tích hình vuông lớn trừ đi phần đã tô đậm: 144-72 = 72cm².',
      rubric: [
        { criterion: 'Tính đúng diện tích hình vuông lớn = 144cm²', points: 1 },
        { criterion: 'Tính đúng diện tích 1 tam giác góc (18cm²) và tổng 4 tam giác (72cm²)', points: 1 },
        { criterion: 'Tính đúng diện tích phần còn lại ở giữa = 72cm²', points: 1 },
      ],
    },
  },
];
