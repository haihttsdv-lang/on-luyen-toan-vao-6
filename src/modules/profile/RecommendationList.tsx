import { useNavigate } from 'react-router-dom';
import type { Recommendation } from '../../core/mastery-engine/recommend';

interface RecommendationListProps {
  recommendations: Recommendation[];
}

/** Tối đa 3 hành động tiếp theo, kèm lý do (FR-H06, FR-H09, FR-H10). */
export function RecommendationList({ recommendations }: RecommendationListProps) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>Nên làm gì tiếp theo?</h3>
      {recommendations.length === 0 ? (
        <p>Chưa có gợi ý — hãy bắt đầu học một chuyên đề bất kỳ ở mục Lý thuyết!</p>
      ) : (
        recommendations.map((rec) => (
          <div
            key={rec.id}
            className="topic-row"
            onClick={() => navigate(rec.route)}
            style={{ marginBottom: 8 }}
          >
            <strong>{rec.title}</strong>
            <p style={{ margin: '4px 0 0', fontSize: '0.82em', color: 'var(--text-secondary)' }}>{rec.reason}</p>
          </div>
        ))
      )}
    </div>
  );
}
