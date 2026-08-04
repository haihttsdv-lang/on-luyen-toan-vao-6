import { useNavigate } from 'react-router-dom';
import { GROUP_ICONS, GROUP_LABELS, GROUP_ORDER } from '../../content/labels';
import type { TopicMastery } from '../../core/mastery-engine/calculate-mastery';
import type { MasteryLevel, Topic } from '../../types';

interface CompetencyMapProps {
  topics: Topic[];
  masteryByTopic: Map<string, TopicMastery | null>;
}

const LEVEL_COLOR: Record<MasteryLevel, string> = {
  'needs-review': '#ff3860',
  improving: '#ffb020',
  mastered: '#39ff88',
};

const LEVEL_LABEL: Record<MasteryLevel, string> = {
  'needs-review': 'Cần ôn lại',
  improving: 'Đang tiến bộ',
  mastered: 'Thành thạo',
};

const NO_DATA_COLOR = '#3f4870';

/** Bản đồ năng lực trực quan theo 6 nhóm chuyên đề (FR-H05). */
export function CompetencyMap({ topics, masteryByTopic }: CompetencyMapProps) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>Bản đồ năng lực</h3>
      <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>
        <span style={{ color: LEVEL_COLOR['needs-review'] }}>●</span> Cần ôn lại &nbsp;
        <span style={{ color: LEVEL_COLOR.improving }}>●</span> Đang tiến bộ &nbsp;
        <span style={{ color: LEVEL_COLOR.mastered }}>●</span> Thành thạo &nbsp;
        <span style={{ color: NO_DATA_COLOR }}>●</span> Chưa có dữ liệu
      </p>
      {GROUP_ORDER.map((group) => {
        const groupTopics = topics.filter((t) => t.group === group);
        if (groupTopics.length === 0) return null;
        return (
          <div key={group} style={{ marginBottom: 10 }}>
            <p style={{ margin: '6px 0', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {GROUP_ICONS[group]} {group} — {GROUP_LABELS[group]}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {groupTopics.map((t) => {
                const mastery = masteryByTopic.get(t.id);
                const color = mastery ? LEVEL_COLOR[mastery.level] : NO_DATA_COLOR;
                const title = mastery
                  ? `${t.id} — ${LEVEL_LABEL[mastery.level]} (${Math.round(mastery.score * 100)}%)`
                  : `${t.id} — Chưa có dữ liệu`;
                return (
                  <button
                    key={t.id}
                    title={title}
                    onClick={() => navigate(`/ly-thuyet/${t.id}`)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      border: 'none',
                      background: color,
                      color: '#001014',
                      fontWeight: 700,
                      fontSize: '0.78em',
                      boxShadow: `0 0 8px ${color}88`,
                    }}
                  >
                    {t.id}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
