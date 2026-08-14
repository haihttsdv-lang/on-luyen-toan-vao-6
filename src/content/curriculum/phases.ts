import type { CurriculumPhase } from '../../types';

/** 4 giai đoạn Lộ trình học (URD v2.0 Mục 7). */
export const curriculumPhases: CurriculumPhase[] = [
  {
    id: 1,
    label: '🧱 Nền tảng — chủ điểm trọng tâm',
    description: 'Học và luyện các chuyên đề cơ bản: số học, phân số, số thập phân, phần trăm, tổng-hiệu-tỉ, tuổi, chuyển động cơ bản, hình học, đơn vị đo.',
  },
  {
    id: 2,
    label: '📝 Làm đề các năm trước',
    description: 'Xen kẽ 1 buổi luyện đề đầy đủ và 1 buổi phân tích lỗi sai, ôn lại đúng chuyên đề vừa sai.',
  },
  {
    id: 3,
    label: '🚀 Chủ điểm nâng cao',
    description: 'Các chuyên đề nâng cao: hai tỉ số/hai hiệu số, giả thiết tạm, tính ngược, tỉ lệ thuận/nghịch, tỉ số diện tích...',
  },
  {
    id: 4,
    label: '🎯 Luyện đề trường mục tiêu',
    description: 'Đề theo đúng cấu hình trường mục tiêu đã chọn, kết hợp luyện chuyên sâu chuyên đề yếu nhất.',
  },
];
