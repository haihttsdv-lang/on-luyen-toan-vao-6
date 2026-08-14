export type MasteryLevel = 'needs-review' | 'improving' | 'mastered';

/** Tính từ Attempt; nên cache nếu tính toán nặng (Mục 11) */
export interface MasterySnapshot {
  topicId: string;
  masteryScore: number; // 0..1
  level: MasteryLevel;
  lastUpdated: string; // ISO 8601
}

export type TargetSchool = 'archimedes' | 'luong-the-vinh' | 'ngoi-sao-ha-noi' | 'cau-giay' | 'khac';

export interface LearnerProfile {
  /** Biệt danh, KHÔNG phải tên thật (NFR-03) */
  alias: string;
  targetSchoolConfig?: string;
  /** Ngày mở app lần đầu — dùng làm mốc bắt đầu Lộ trình học, không lưu mốc riêng (FR-C01) */
  createdAt: string;
  /** Trường mục tiêu — quyết định cấu hình đề mặc định cho GĐ4 Lộ trình (FR-C06, Mục 6.1) */
  targetSchool?: TargetSchool;
  /** Ngày thi dự kiến — dùng để nén/giãn lộ trình (FR-C06) */
  examDate?: string;
  /** Các ngày trong tuần học, 0 = Chủ nhật .. 6 = Thứ 7. Mặc định [2, 4, 6] (Thứ 3/5/7) */
  weeklyDays?: number[];
}
