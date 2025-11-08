import { Routes, Route } from 'react-router-dom';
import Interview from './Interview';
import HomePage from './HomePage';
import Stormzmobile from './Stormzmobile';
import StormzmobileFull from './Stormzmobilefull';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Interview />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/stormzmobile" element={<Stormzmobile />} />
      <Route path="/stormzmobile-preview-777" element={<StormzmobileFull />} /> {/* secret full */}
    </Routes>
  );
}

export default App;

