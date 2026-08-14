import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ERROR_LOG_PRIORITY_THRESHOLD, MASTERY_CONFIG, MAX_RECOMMENDATIONS } from '../../config/thresholds';
import { buildRecommendations } from '../../core/mastery-engine/recommend';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { LearnerProfile } from '../../types';
import { BadgeCabinet } from '../curriculum/BadgeCabinet';
import { useRewards } from '../curriculum/useRewards';
import { CompetencyMap } from './CompetencyMap';
import { RecommendationList } from './RecommendationList';
import { useMasteryData } from './useMasteryData';

export function ProfileHome() {
  const navigate = useNavigate();
  const data = useMasteryData();
  const rewards = useRewards();
  const [profile, setProfile] = useState<LearnerProfile | null | undefined>(undefined);
  const [aliasInput, setAliasInput] = useState('');

  useEffect(() => {
    localProgressStore.getProfile().then((p) => setProfile(p ?? null));
  }, []);

  async function saveAlias() {
    const alias = aliasInput.trim();
    if (!alias) return;
    const newProfile: LearnerProfile = { alias, createdAt: new Date().toISOString() };
    await localProgressStore.saveProfile(newProfile);
    setProfile(newProfile);
  }

  if (profile === undefined || data.loading) {
    return <div className="card">Đang tải...</div>;
  }

  if (profile === null) {
    return (
      <div className="card">
        <h2>Chào mừng!</h2>
        <p>Đặt một biệt danh để bắt đầu (không cần tên thật — ứng dụng không thu thập thông tin cá nhân).</p>
        <input
          type="text"
          value={aliasInput}
          onChange={(e) => setAliasInput(e.target.value)}
          placeholder="Biệt danh của bạn..."
          style={{ marginRight: 8 }}
        />
        <button className="btn btn-primary" onClick={saveAlias} disabled={aliasInput.trim().length === 0}>
          Bắt đầu
        </button>
      </div>
    );
  }

  const totalAttempts = [...data.attemptsByTopic.values()].reduce((sum, list) => sum + list.length, 0);
  const hasDoneDiagnostic = totalAttempts > 0;

  const recommendations = buildRecommendations({
    topics: data.topics,
    attemptsByTopic: data.attemptsByTopic,
    topicStatus: data.topicStatus,
    errorLogCount: data.errorLogCount,
    config: {
      windowSize: MASTERY_CONFIG.windowSize,
      errorLogPriorityThreshold: ERROR_LOG_PRIORITY_THRESHOLD,
      maxRecommendations: MAX_RECOMMENDATIONS,
    },
  });

  return (
    <div>
      <div className="card">
        <h2>Hồ sơ của {profile.alias}</h2>
        {!hasDoneDiagnostic && (
          <div>
            <p>
              Bạn chưa làm bài kiểm tra đầu vào. Làm một bài ~30 câu phủ đều 6 nhóm chuyên đề để ứng dụng biết trình
              độ hiện tại và đề xuất lộ trình phù hợp hơn (FR-H01).
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/ho-so/kiem-tra-dau-vao')}>
              Làm bài kiểm tra đầu vào
            </button>
          </div>
        )}
        <p style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => navigate('/ho-so/phu-huynh')}>
            Xem tổng quan dành cho phụ huynh
          </button>
        </p>
      </div>

      <RecommendationList recommendations={recommendations} />
      {!rewards.loading && <BadgeCabinet badges={rewards.badges} streak={rewards.streak} />}
      <CompetencyMap topics={data.topics} masteryByTopic={data.masteryByTopic} />
    </div>
  );
}
