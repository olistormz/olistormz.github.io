import React, { useEffect, useRef, useState } from "react";
import './Stormzmobile.css'; // We'll style it separately
import { Link } from 'react-router-dom';


function Car() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeId, setActiveId] = useState('');
  const [justClicked, setJustClicked] = useState(false); // ✅ defines justClicked
  const audioRef = useRef(null);

  const handleLinkClick = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    setActiveId(id);
    setJustClicked(true);    // ⏸ pause scroll updates briefly
    window.scrollTo({ top: y, behavior: 'smooth' });
    // allow scroll updates again after ~700 ms
    setTimeout(() => setJustClicked(false), 700);
  }
};


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (justClicked) return; // 👈 ignore scroll events right after a click

      const sections = document.querySelectorAll('.stormz-layout .stormz-answer');
      // const sections = document.querySelectorAll('.answer');
      let currentId = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 300 && rect.bottom >=100 ) {
          currentId = section.id;
        }
      });

      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, [justClicked, activeId]);


        // 🎵 Fade-in autoplay when page loads
    // Inside Interview component

      // Inew
    useEffect(() => {
      window.scrollTo(0, 0);
      setActiveId(''); // clears leftover highlight
    }, []);

    useEffect(() => {
      let fade = null; // keep a handle so we can clear it

      const startAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        // don’t stack intervals
        if (fade) { clearInterval(fade); fade = null; }

        // if already playing, bail
        if (!audio.paused) return;

        audio.volume = 0;
        audio.play().then(() => {
          let vol = 0;
          fade = setInterval(() => {
            // clamp to [0,1] every step
            vol = Math.min(1, vol + 0.01);
            audio.volume = vol;

            if (vol >= 1) {
              clearInterval(fade);
              fade = null;
            }
          }, 200); // ~20s fade (0.01 * 200ms * 100 steps)
        }).catch(err => {
          console.log("Audio blocked:", err);
        });

        // remove after first trigger
        document.removeEventListener("click", startAudio);
        document.removeEventListener("touchstart", startAudio);
      };

      document.addEventListener("click", startAudio);
      document.addEventListener("touchstart", startAudio);

      return () => {
        document.removeEventListener("click", startAudio);
        document.removeEventListener("touchstart", startAudio);
        if (fade) clearInterval(fade);
      };
    }, []);



  return (
    <div className={`stormz-interview-layout ${sidebarOpen ? 'stormz-sidebar-open' : 'stormz-sidebar-collapsed'}`}>

      <button className="stormz-sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? '←' : '→'}
      </button>

      {sidebarOpen && (
        <div className="stormz-sidebar-container">

        <a
          href="#s1"
          onClick={(e) => handleLinkClick(e, 's1')}
          className={`stormz-sidebar-link ${activeId === 's1' ? 'active' : ''}`}
        >
          11/8/25: What is the Stormzmobile?
        </a>


        </div>
      )}

      {/* 🎵 Background audio */}
      <audio ref={audioRef} loop playsInline>
        <source src="/interview-bg.m4a" type="audio/mp4" />
        <source src="/interview-bg.mp3" type="audio/mpeg" />
      </audio>


    <div className="stormz-interview-page">
      <div className="stormz-back-button-container">
        <Link to="/" className="stormz-back-button">INTERVIEW</Link><Link to="/home" className="stormz-home-back-button">HOMEPAGE</Link>
      </div>
     
      <h1 className="stormz-interview-title">The Stormzmobile</h1>
      <h2 className="stormz-interview-subtitle">
        A 2006 Honda Civic Si Coupe 
        <br />
        <br />
        that wouldn't leave me alone,
        <br />
        <br />
        until I saw myself
        <br />
        <br />
        in its unfinished paint.
        <br />
        <br />
        <h2 className="stormz-intro-tag">a story caught between amnesia & perfect recall</h2>
      </h2>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/key.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
      <h3 className="stormz-question">Q: What is the Stormzmobile?</h3>
        <p id="s1" className="stormz-answer">
        A chariot? A declaration? A mirror? A 2006 Honda Civic Si Coupe? 
        </p> 
      </div>


    </div>
    </div>

  );
}

export default Car;
