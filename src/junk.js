// email link for iconc on home page

<a href="mailto:management@olistormz.com" aria-label="Email Management">
<img src={require('./static/email.png')} alt="Email" className="social-icon email-icon" />
</a>

 <a href="https://www.tiktok.com/@olistormz" target="_blank" rel="noopener noreferrer">
            <img src={tiktokIcon} alt="TikTok" className="social-icon" />
          </a>


 // INTERVIEW POST IT
    {
      noteText: (
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        [(CLICK ME TO ENTER 🌀 THE SOURCE PORTAL)]
        </Link>
      ),
      isPostIt: true,
      backgroundColor: '#FFEE8C',
      animation: 'float1',
    },


// app.js dec13th

import { Routes, Route } from 'react-router-dom';
import Interview from './Interview';
import HomePage from './HomePage';
import Stormzmobile from './Stormzmobile';
import StormzmobileFull from './Stormzmobilefull';
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
      <Route path="/stormzmobile-preview-777" element={<StormzmobileFull />} /> {/* secret full */}
      <Route path="/interview" element={<Interview />} /> {/* secret full */}
    </Routes>
  </> 
  );
}

export default App;