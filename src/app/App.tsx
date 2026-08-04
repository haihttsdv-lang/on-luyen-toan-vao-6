import { NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { PracticeSetup } from '../modules/practice/PracticeSetup';
import { PracticeSession } from '../modules/practice/PracticeSession';
import { ErrorLogView } from '../modules/practice/ErrorLogView';
import { TopicList } from '../modules/theory/TopicList';
import { TopicLesson } from '../modules/theory/TopicLesson';
import { TestSetup } from '../modules/mock-test/TestSetup';
import { TestSession } from '../modules/mock-test/TestSession';
import { TestHistory } from '../modules/mock-test/TestHistory';
import { ProfileHome } from '../modules/profile/ProfileHome';
import { ParentOverview } from '../modules/profile/ParentOverview';

const NAV_ITEMS = [
  { to: '/', label: 'Trang chủ', icon: '🏠', end: true },
  { to: '/ly-thuyet', label: 'Lý thuyết', icon: '📚' },
  { to: '/luyen-tap', label: 'Luyện tập', icon: '⚔️' },
  { to: '/thi-thu', label: 'Thi thử', icon: '🏆' },
  { to: '/ho-so', label: 'Hồ sơ', icon: '👤' },
];

export default function App() {
  return (
    <div className="app-shell">
      <nav className="app-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            <span aria-hidden="true">{item.icon}</span> {item.label}
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
        <Route path="/thi-thu" element={<TestSetup />} />
        <Route path="/thi-thu/lam-bai/:configId" element={<TestSession />} />
        <Route path="/thi-thu/lich-su" element={<TestHistory />} />
        <Route path="/ho-so" element={<ProfileHome />} />
        <Route path="/ho-so/phu-huynh" element={<ParentOverview />} />
        <Route path="/ho-so/kiem-tra-dau-vao" element={<PracticeSession mode="diagnostic" />} />
      </Routes>
    </div>
  );
}
