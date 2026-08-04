import { useEffect, useState } from 'react';
import { ScoreTrendChart } from '../../components/ScoreTrendChart';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { TestResult } from '../../types';

/** Lịch sử thi thử + xu hướng điểm số theo thời gian (FR-T08). */
export function TestHistory() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localProgressStore.getTestResults().then((r) => {
      setResults([...r].sort((a, b) => a.date.localeCompare(b.date)));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="card">Đang tải...</div>;
  }

  return (
    <div className="card">
      <h2>Lịch sử thi thử</h2>
      {results.length === 0 ? (
        <p>Bạn chưa có lần thi thử nào.</p>
      ) : (
        <>
          <ScoreTrendChart
            points={results.map((r) => (r.total > 0 ? r.autoScore / r.total : 0))}
            ariaLabel="Biểu đồ xu hướng điểm thi thử theo thời gian, tính theo phần trăm"
          />
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Ngày</th>
                <th style={{ textAlign: 'left' }}>Cấu hình</th>
                <th style={{ textAlign: 'right' }}>Điểm</th>
                <th style={{ textAlign: 'right' }}>Thời gian dùng</th>
              </tr>
            </thead>
            <tbody>
              {[...results].reverse().map((r, i) => (
                <tr key={i}>
                  <td>{new Date(r.date).toLocaleString('vi-VN')}</td>
                  <td>{r.configId}</td>
                  <td style={{ textAlign: 'right' }}>
                    {r.autoScore}/{r.total}
                  </td>
                  <td style={{ textAlign: 'right' }}>{Math.floor(r.durationUsedSeconds / 60)} phút</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
