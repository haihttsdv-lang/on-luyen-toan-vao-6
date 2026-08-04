import { describe, expect, it } from 'vitest';
import { buildRecommendations, type TopicSummary } from './recommend';
import type { TopicProgressStatus } from '../../types';

const CONFIG = { windowSize: 10, errorLogPriorityThreshold: 10, maxRecommendations: 3 };

const TOPICS: TopicSummary[] = [
  { id: 'SH-01', title: 'Đọc viết số', group: 'SH', level: 'basic' },
  { id: 'SH-04', title: 'Cấu tạo số', group: 'SH', level: 'advanced' },
  { id: 'DH-01', title: 'Tổng và hiệu', group: 'DH', level: 'basic' },
  { id: 'DH-09', title: 'Công việc chung', group: 'DH', level: 'advanced' },
  { id: 'HH-02', title: 'Chu vi diện tích', group: 'HH', level: 'basic' },
];

describe('buildRecommendations', () => {
  it('sổ lỗi vượt ngưỡng -> ưu tiên lên đầu (FR-H08)', () => {
    const recs = buildRecommendations({
      topics: TOPICS,
      attemptsByTopic: new Map(),
      topicStatus: new Map(),
      errorLogCount: 12,
      config: CONFIG,
    });
    expect(recs[0].id).toBe('error-log');
    expect(recs[0].reason).toContain('12');
  });

  it('sổ lỗi dưới ngưỡng -> không đưa vào gợi ý', () => {
    const recs = buildRecommendations({
      topics: TOPICS,
      attemptsByTopic: new Map(),
      topicStatus: new Map(),
      errorLogCount: 5,
      config: CONFIG,
    });
    expect(recs.every((r) => r.id !== 'error-log')).toBe(true);
  });

  it('chuyên đề đã luyện -> ưu tiên chuyên đề có điểm thấp nhất trước (FR-H06)', () => {
    const attemptsByTopic = new Map<string, { correct: boolean }[]>([
      ['DH-01', [{ correct: true }, { correct: true }, { correct: true }]], // điểm cao
      ['SH-01', [{ correct: false }, { correct: false }, { correct: false }]], // điểm thấp
    ]);
    const recs = buildRecommendations({
      topics: TOPICS,
      attemptsByTopic,
      topicStatus: new Map(),
      errorLogCount: 0,
      config: CONFIG,
    });
    const weakIndex = recs.findIndex((r) => r.id === 'SH-01');
    const strongIndex = recs.findIndex((r) => r.id === 'DH-01');
    expect(weakIndex).toBeGreaterThanOrEqual(0);
    expect(strongIndex).toBeGreaterThanOrEqual(0);
    expect(weakIndex).toBeLessThan(strongIndex);
  });

  it('nêu đúng lý do dạng "đúng X/Y bài gần nhất" (FR-H10)', () => {
    const attemptsByTopic = new Map<string, { correct: boolean }[]>([
      ['SH-01', [{ correct: true }, { correct: false }, { correct: false }]],
    ]);
    const recs = buildRecommendations({
      topics: TOPICS,
      attemptsByTopic,
      topicStatus: new Map(),
      errorLogCount: 0,
      config: CONFIG,
    });
    const rec = recs.find((r) => r.id === 'SH-01')!;
    expect(rec.reason).toContain('1/3');
  });

  it('chuyên đề chưa từng luyện không bị coi là yếu, chỉ đề xuất theo lộ trình nền tảng (FR-H07)', () => {
    // DH-09 (advanced) chưa từng luyện; không được đề xuất trước các chuyên đề basic
    const recs = buildRecommendations({
      topics: TOPICS,
      attemptsByTopic: new Map(),
      topicStatus: new Map(),
      errorLogCount: 0,
      config: CONFIG,
    });
    expect(recs.every((r) => r.id !== 'DH-09')).toBe(true);
    expect(recs.every((r) => TOPICS.find((t) => t.id === r.id)?.level === 'basic')).toBe(true);
  });

  it('người dùng mới hoàn toàn -> đề xuất lộ trình mặc định Cơ bản trước, đúng thứ tự nhóm', () => {
    const recs = buildRecommendations({
      topics: TOPICS,
      attemptsByTopic: new Map(),
      topicStatus: new Map(),
      errorLogCount: 0,
      config: CONFIG,
    });
    expect(recs.length).toBe(3);
    expect(recs.map((r) => r.id)).toEqual(['SH-01', 'DH-01', 'HH-02']);
  });

  it('chuyên đề đã "Đã nắm" không được đề xuất lại trong lộ trình nền tảng', () => {
    const topicStatus = new Map<string, TopicProgressStatus>([['SH-01', 'mastered']]);
    const recs = buildRecommendations({
      topics: TOPICS,
      attemptsByTopic: new Map(),
      topicStatus,
      errorLogCount: 0,
      config: CONFIG,
    });
    expect(recs.every((r) => r.id !== 'SH-01')).toBe(true);
  });

  it('không vượt quá maxRecommendations', () => {
    const recs = buildRecommendations({
      topics: TOPICS,
      attemptsByTopic: new Map(),
      topicStatus: new Map(),
      errorLogCount: 20,
      config: CONFIG,
    });
    expect(recs.length).toBeLessThanOrEqual(CONFIG.maxRecommendations);
  });
});
