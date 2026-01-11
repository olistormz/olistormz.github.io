import { Routes, Route } from 'react-router-dom';
import Interview from './Interview';
import HomePage from './HomePage';
import Stormzmobile from './Stormzmobile';
import Overflow from './Overflow';
import Zero from './Zero';
import Navbar from "./components/Navbar";


function App() {
  return (
  <>
    <Navbar />
    <Routes>
      <Route path="/overflow" element={<Overflow />} />
      <Route path="/" element={<Zero />} />
      <Route path="/music" element={<HomePage />} />
      <Route path="/stormzmobile" element={<Stormzmobile />} />
      <Route path="/interview" element={<Interview />} /> {/* secret full */}
    </Routes>
  </> 
  );
}

export default App;

