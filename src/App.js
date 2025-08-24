import { Routes, Route } from 'react-router-dom';
import Interview from './Interview';
import HomePage from './HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Interview />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;

