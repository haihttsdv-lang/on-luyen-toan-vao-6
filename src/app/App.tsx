import { NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { PlaceholderPage } from './PlaceholderPage';
import { PracticeSetup } from '../modules/practice/PracticeSetup';
import { PracticeSession } from '../modules/practice/PracticeSession';
import { ErrorLogView } from '../modules/practice/ErrorLogView';
import { TopicList } from '../modules/theory/TopicList';
import { TopicLesson } from '../modules/theory/TopicLesson';

const NAV_ITEMS = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/ly-thuyet', label: 'Lý thuyết' },
  { to: '/luyen-tap', label: 'Luyện tập' },
  { to: '/thi-thu', label: 'Thi thử' },
  { to: '/ho-so', label: 'Hồ sơ' },
];

export default function App() {
  return (
    <div className="app-shell">
      <nav className="app-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ly-thuyet" element={<TopicList />} />
        <Route path="/ly-thuyet/:topicId" element={<TopicLesson />} />
        <Route path="/luyen-tap" element={<PracticeSetup />} />
        <Route path="/luyen-tap/lam-bai" element={<PracticeSession mode="topics" />} />
        <Route path="/luyen-tap/so-loi" element={<ErrorLogView />} />
        <Route path="/luyen-tap/luyen-lai" element={<PracticeSession mode="error-log" />} />
        <Route
          path="/thi-thu"
          element={<PlaceholderPage title="Thi thử" note="Module Thi thử sẽ được xây ở giai đoạn tiếp theo (GĐ4)." />}
        />
        <Route
          path="/ho-so"
          element={<PlaceholderPage title="Hồ sơ & Lộ trình" note="Module Hồ sơ sẽ được xây ở giai đoạn tiếp theo (GĐ5)." />}
        />
      </Routes>
    </div>
  );
}
