import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localContentStore } from '../../data-access/local/content-store';
import { GROUP_ICONS, GROUP_LABELS, GROUP_ORDER, LEVEL_LABELS, STATUS_ICONS, STATUS_LABELS } from '../../content/labels';
import type { Topic } from '../../types';
import { useTopicProgressList } from './useTopicProgress';

/** Danh sách chuyên đề nhóm theo 6 nhóm, kèm mức độ và trạng thái học (FR-L01). */
export function TopicList() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const { records } = useTopicProgressList();

  useEffect(() => {
    localContentStore.listTopics().then(setTopics);
  }, []);

  function statusOf(topicId: string) {
    return records.find((r) => r.topicId === topicId)?.status ?? 'not-started';
  }

  return (
    <div className="card">
      <h2>Lý thuyết</h2>
      <p>Chọn một chuyên đề để học lý thuyết và làm bài kiểm tra nhanh (FR-L01).</p>
      {GROUP_ORDER.map((group) => {
        const groupTopics = topics.filter((t) => t.group === group);
        if (groupTopics.length === 0) return null;
        return (
          <div key={group} style={{ marginBottom: 16 }}>
            <h3>
              {GROUP_ICONS[group]} {group} — {GROUP_LABELS[group]}
            </h3>
            {groupTopics.map((t) => (
              <div key={t.id} className="topic-row" onClick={() => navigate(`/ly-thuyet/${t.id}`)}>
                <span className="topic-pill">{t.id}</span> {t.title} — <em>{LEVEL_LABELS[t.level]}</em> —{' '}
                <strong>
                  {STATUS_ICONS[statusOf(t.id)]} {STATUS_LABELS[statusOf(t.id)]}
                </strong>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
