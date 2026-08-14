import type { CurriculumPhaseId, SessionTemplate, Topic, TopicGroup } from '../../types';

const GROUP_ORDER: TopicGroup[] = ['SH', 'PS', 'DH', 'HH', 'DL', 'TD'];

/** Sắp xếp chuyên đề theo đúng thứ tự nhóm SH→PS→DH→HH→DL→TD rồi theo mã, bất kể thứ tự khai báo gốc. */
export function sortTopicsByGroup(topics: Topic[]): Topic[] {
  return [...topics].sort((a, b) => {
    const groupDiff = GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group);
    return groupDiff !== 0 ? groupDiff : a.id.localeCompare(b.id);
  });
}

/**
 * Mỗi chuyên đề -> đúng 1 buổi học với 2 khối có đích đến thật (FR-C03): học lý thuyết rồi luyện
 * tập ngay chuyên đề đó. Dùng cho Giai đoạn 1 (chuyên đề `basic`) và Giai đoạn 3 (`advanced`).
 */
export function buildTopicSessions(topics: Topic[], phase: CurriculumPhaseId): SessionTemplate[] {
  return sortTopicsByGroup(topics).map((topic) => ({
    id: `P${phase}-${topic.id}`,
    phase,
    focus: 'theory',
    topicIds: [topic.id],
    blocks: [
      { label: `Học lý thuyết: ${topic.title}`, estimatedMinutes: 10, to: `/ly-thuyet/${topic.id}` },
      {
        label: `Luyện tập: ${topic.title}`,
        estimatedMinutes: 15,
        to: '/luyen-tap/lam-bai',
        navState: { topicIds: [topic.id] },
      },
    ],
  }));
}
