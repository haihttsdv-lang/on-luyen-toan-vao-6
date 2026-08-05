import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateTest } from '../../core/test-generator/generate-test';
import { shuffle } from '../../core/test-generator/shuffle';
import { localContentStore } from '../../data-access/local/content-store';
import { allTestConfigs } from '../../content/test-configs';
import { GROUP_LABELS, LEVEL_LABELS } from '../../content/labels';
import type { DifficultyLevel, TestConfig, Topic } from '../../types';

/** Trọng số chia đều 6 nhóm — vì ngân hàng đã lọc sẵn theo đúng chuyên đề học sinh chọn,
 * trọng số này chỉ có tác dụng cân bằng giữa các nhóm còn lại trong lựa chọn đó. */
const EQUAL_TOPIC_WEIGHTS = { SH: 1, PS: 1, DH: 1, HH: 1, DL: 1, TD: 1 };

const DEFAULT_RANDOM_COUNT = 6;

/**
 * Sinh đề thi thử tùy chỉnh từ ngân hàng bài luyện tập, theo chuyên đề học sinh tự chọn
 * (hoặc random) — vẫn theo đúng định dạng đề thật (số câu/thời gian/tỉ lệ loại đáp án)
 * đã khảo sát ở Mục 5.2 URD, tái dùng nguyên cấu hình SPRINT/STANDARD/MIXED thay vì tự đặt số câu tùy tiện.
 */
export function TestCustomSetup() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [level, setLevel] = useState<DifficultyLevel | 'all'>('all');
  const [formatId, setFormatId] = useState(allTestConfigs[0]?.id ?? '');
  const [randomCount, setRandomCount] = useState(DEFAULT_RANDOM_COUNT);
  const [availableCount, setAvailableCount] = useState<number | null>(null);

  useEffect(() => {
    localContentStore.listTopics().then(setTopics);
  }, []);

  useEffect(() => {
    let cancelled = false;
    localContentStore
      .listExercises({
        topicIds: selected.size > 0 ? Array.from(selected) : undefined,
        level: level === 'all' ? undefined : level,
      })
      .then((exs) => {
        if (!cancelled) setAvailableCount(exs.length);
      });
    return () => {
      cancelled = true;
    };
  }, [selected, level]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function randomizeTopics() {
    const candidates = topics.filter((t) => level === 'all' || t.level === level);
    const count = Math.min(Math.max(1, randomCount), candidates.length);
    const picked = shuffle(candidates).slice(0, count);
    setSelected(new Set(picked.map((t) => t.id)));
  }

  const selectedFormat = allTestConfigs.find((c) => c.id === formatId) ?? allTestConfigs[0];

  async function start() {
    if (!selectedFormat) return;
    const pool = await localContentStore.listExercises({
      topicIds: selected.size > 0 ? Array.from(selected) : undefined,
      level: level === 'all' ? undefined : level,
    });

    const generated = generateTest({ ...selectedFormat, topicWeights: EQUAL_TOPIC_WEIGHTS }, pool);
    if (generated.exercises.length === 0) return;

    const topicSummary = selected.size > 0 ? `${selected.size} chuyên đề đã chọn` : 'Tổng hợp tất cả chuyên đề';
    const config: TestConfig = {
      ...selectedFormat,
      id: `custom-${Date.now()}`,
      label: `${topicSummary} · ${selectedFormat.label}`,
    };

    sessionStorage.setItem(
      `custom-test:${config.id}`,
      JSON.stringify({ config, exercises: generated.exercises }),
    );
    navigate(`/thi-thu/lam-bai/${config.id}`);
  }

  const canStart = (availableCount ?? 0) > 0;

  return (
    <div>
      <div className="card">
        <h2>Tạo đề tùy chỉnh</h2>
        <p>
          Chọn một hoặc nhiều chuyên đề (hoặc bấm chọn ngẫu nhiên) để tự tạo một đề thi thử mới ngay từ ngân hàng bài
          luyện tập hiện có. Bỏ trống chuyên đề để lấy đề tổng hợp từ tất cả.
        </p>

        <div style={{ marginBottom: 14 }}>
          <p style={{ fontWeight: 700, marginBottom: 6 }}>Định dạng đề (theo cấu trúc đề trường chất lượng cao)</p>
          {allTestConfigs.map((c) => (
            <label key={c.id} style={{ display: 'block', marginBottom: 6 }}>
              <input type="radio" name="format" checked={formatId === c.id} onChange={() => setFormatId(c.id)} />{' '}
              {c.label}
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
          <label>
            Mức độ:{' '}
            <select value={level} onChange={(e) => setLevel(e.target.value as DifficultyLevel | 'all')}>
              <option value="all">Tất cả</option>
              <option value="basic">{LEVEL_LABELS.basic}</option>
              <option value="advanced">{LEVEL_LABELS.advanced}</option>
            </select>
          </label>
          <label>
            Số chuyên đề ngẫu nhiên:{' '}
            <input
              type="number"
              min={1}
              max={topics.length || 1}
              value={randomCount}
              onChange={(e) => setRandomCount(Number(e.target.value) || 1)}
              style={{ width: 60 }}
            />
          </label>
          <button type="button" className="btn" onClick={randomizeTopics}>
            🎲 Chọn ngẫu nhiên chuyên đề
          </button>
          {selected.size > 0 && (
            <button type="button" className="btn" onClick={() => setSelected(new Set())}>
              Bỏ chọn tất cả
            </button>
          )}
        </div>

        <div>
          {topics.map((t) => (
            <label key={t.id} style={{ display: 'block', marginBottom: 6 }}>
              <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggle(t.id)} />{' '}
              <span className="topic-pill">{t.id}</span> {t.title} ({GROUP_LABELS[t.group]})
            </label>
          ))}
        </div>

        <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: 12 }}>
          {availableCount === null
            ? 'Đang tính số bài khả dụng...'
            : selectedFormat && availableCount < selectedFormat.totalQuestions
              ? `Lựa chọn hiện tại chỉ có ${availableCount} bài — đề sẽ ngắn hơn ${selectedFormat.totalQuestions} câu yêu cầu của định dạng này.`
              : `Lựa chọn hiện tại có ${availableCount} bài khả dụng.`}
        </p>

        <button className="btn btn-primary" onClick={start} disabled={!canStart} style={{ marginTop: 8 }}>
          Tạo đề & bắt đầu thi
        </button>
      </div>
    </div>
  );
}
