import React, { useEffect, useRef, useState } from "react";
import './Zero.css'; // We'll style it separately
import { Link } from 'react-router-dom';


function Zero() {
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

      const sections = document.querySelectorAll('.zero-layout .zero-answer');
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

    const [showFloatingHeart, setShowFloatingHeart] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // how far down the page the user is (0 to 1)
        const scrollPercent = (scrollY + windowHeight) / docHeight;

        // fade in around 40%–70% down the total document height
        const showPoint = 0.3;
        const hidePoint = 0.2;

        if (!showFloatingHeart && scrollPercent > showPoint) {
          setShowFloatingHeart(true);
        } else if (showFloatingHeart && scrollPercent < hidePoint) {
          setShowFloatingHeart(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [showFloatingHeart]);




  return (
    <div className={`zero-interview-layout ${sidebarOpen ? 'zero-sidebar-open' : 'zero-sidebar-collapsed'}`}>

      <button className="zero-sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? '←' : '→'}
      </button>

      {sidebarOpen && (
        <div className="zero-sidebar-container">

        <a
          href="#s1"
          onClick={(e) => handleLinkClick(e, 's1')}
          className={`zero-sidebar-link ${activeId === 's1' ? 'active' : ''}`}
        >
          Nothing Required For Life To Happen 
        </a>

        <a
          href="#s2"
          onClick={(e) => handleLinkClick(e, 's2')}
          className={`zero-sidebar-link ${activeId === 's2' ? 'active' : ''}`}
        >
          Laughter Laughed
        </a>
        <a
          href="#s3"
          onClick={(e) => handleLinkClick(e, 's3')}
          className={`zero-sidebar-link ${activeId === 's3' ? 'active' : ''}`}
        >
          Jokeless Joke
        </a>

      <a
          href="#s4"
          onClick={(e) => handleLinkClick(e, 's4')}
          className={`zero-sidebar-link ${activeId === 's4' ? 'active' : ''}`}
        >
          Motionless Oceanless Moving
        </a>

        <a
          href="#s5"
          onClick={(e) => handleLinkClick(e, 's5')}
          className={`zero-sidebar-link ${activeId === 's5' ? 'active' : ''}`}
        >
          Sleep Unannounced
        </a>

        <a
          href="#s6"
          onClick={(e) => handleLinkClick(e, 's6')}
          className={`zero-sidebar-link ${activeId === 's6' ? 'active' : ''}`}
        >
          Freedom
        </a>
        <a
          href="#s7"
          onClick={(e) => handleLinkClick(e, 's7')}
          className={`zero-sidebar-link ${activeId === 's7' ? 'active' : ''}`}
        >
          Primordial Giggles
        </a>
        <a
          href="#s8"
          onClick={(e) => handleLinkClick(e, 's8')}
          className={`zero-sidebar-link ${activeId === 's8' ? 'active' : ''}`}
        >
          Life Continues
        </a>
        <a
          href="#s9"
          onClick={(e) => handleLinkClick(e, 's9')}
          className={`zero-sidebar-link ${activeId === 's9' ? 'active' : ''}`}
        >
          The Body Doesn't Wake For A You
        </a>
        <a
          href="#s10"
          onClick={(e) => handleLinkClick(e, 's10')}
          className={`zero-sidebar-link ${activeId === 's10' ? 'active' : ''}`}
        >
        The Rush To Write It
        </a>
        <a
          href="#s11"
          onClick={(e) => handleLinkClick(e, 's11')}
          className={`zero-sidebar-link ${activeId === 's11' ? 'active' : ''}`}
        >
          The Rainmaker Dances
        </a>
        <a
          href="#s12"
          onClick={(e) => handleLinkClick(e, 's12')}
          className={`zero-sidebar-link ${activeId === 's12' ? 'active' : ''}`}
        >
          Her Heart
        </a>
        <a
          href="#s13"
          onClick={(e) => handleLinkClick(e, 's13')}
          className={`zero-sidebar-link ${activeId === 's13' ? 'active' : ''}`}
        >
          Winter Coats
        </a>

        <a
          href="#s14"
          onClick={(e) => handleLinkClick(e, 's14')}
          className={`zero-sidebar-link ${activeId === 's14' ? 'active' : ''}`}
        >
          She Made A Tea
        </a>
        <a
          href="#s15"
          onClick={(e) => handleLinkClick(e, 's15')}
          className={`zero-sidebar-link ${activeId === 's15' ? 'active' : ''}`}
        >
           Decapitated Wasp
        </a>
        <a
          href="#s16"
          onClick={(e) => handleLinkClick(e, 's16')}
          className={`zero-sidebar-link ${activeId === 's16' ? 'active' : ''}`}
        >
          Narrator Too Late
        </a>
        <a
          href="#s17"
          onClick={(e) => handleLinkClick(e, 's17')}
          className={`zero-sidebar-link ${activeId === 's17' ? 'active' : ''}`}
        >
          The Pilot Arrives After The Plane Is Flying
        </a>
        <a
          href="#s18"
          onClick={(e) => handleLinkClick(e, 's18')}
          className={`zero-sidebar-link ${activeId === 's18' ? 'active' : ''}`}
        >
          Legs Don't Have Questions
        </a>
        <a
          href="#s19"
          onClick={(e) => handleLinkClick(e, 's19')}
          className={`zero-sidebar-link ${activeId === 's19' ? 'active' : ''}`}
        >
          But But Wait I Have A Question
        </a>
        <a
          href="#s20"
          onClick={(e) => handleLinkClick(e, 's20')}
          className={`zero-sidebar-link ${activeId === 's20' ? 'active' : ''}`}
        >
          No Joker, Still Joke
        </a>

        </div>
      )}

      {/* 🎵 Background audio */}
      <audio ref={audioRef} loop playsInline>
        <source src="/interview-bg.m4a" type="audio/mp4" />
        <source src="/interview-bg.mp3" type="audio/mpeg" />
      </audio>


    <div className="zero-interview-page">
      <h1 className="zero-interview-title">?</h1>
      <h2 className="zero-log">Log Opened: December 2, 2025</h2>  
      <h2 className="zero-interview-subtitle">
        <i>Life is happening.</i>
        <br />
        <br />
        Person is narrating life happening,
        <br />
        <br />
        imagining that their narration 
        <br />
        <br />
        is the cause.
      </h2>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/red.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
      <h3 className="zero-question">2/12/25: Nothing Required For Life To Happen</h3>
        <p id="s1" className="zero-answer">
        Body breathes. No breather required. Contractions happen. Pusher not required. Insight happens. Seeker or no seeker.
        Laughter happens. No reason. Release happens. Candle ritual or not. Awakening happens. Awakener not required.
        Art happens. Without an artist.<br /><br />
        Cat grooms itself. No need to understand grooming.
        </p> 
       </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/orange.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
       <h3 className="zero-question">2/12/25: Laughter Laughed</h3>
        <p id="s2" className="zero-answer">
        Laughter laughed despite no one understanding.
        </p> 

        <h3 className="zero-question">2/12/25: Jokeless Joke</h3>
        <p id="s3" className="zero-answer">
        The joke is that there was no joke and no one to get it. Laughter arose. The body doubled over. Tears poured.
        </p>  
       </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/bein.webp')} alt="Oli Stormz" />
      </div> 

      <div className="zero-qa-section">
       <h3 className="zero-question">2/12/25: Motionless Oceanless Moving</h3>
        <p id="s4" className="zero-answer">
        The motion of the ocean sways this body without interference. 
        </p> 

        <h3 className="zero-question">2/12/25: Sleep Unannounced</h3>
        <p id="s5" className="zero-answer">
        The body falls asleep without any announcement that it is tiredness.
        </p>  
       </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/sun.webp')} alt="Oli Stormz" />
      </div> 


    <div className="zero-qa-section">
        <h3 className="zero-question">2/12/25: Freedom</h3>
        <p id="s6" className="zero-answer">
        To laugh without understanding the punchline is freedom
        </p>  

        <h3 className="zero-question">2/12/25: Primordial Giggles</h3>
        <p id="s7" className="zero-answer">
        primordial giggles precede ideas of life 
        </p>  
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/blur.webp')} alt="Oli Stormz" />
      </div>  

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: Life Continues</h3>
        <p id="s8" className="zero-answer">
        The person appears. Something has an opinion about its appearance or disappearance. Life continues its course.
        </p>  

        <h3 className="zero-question">3/12/25: The Body Doesn't Wake For A You</h3>
        <p id="s9" className="zero-answer">
        The body doesn’t wait for a you to wake up in the morning before it begins.
        </p>  
      </div> 


      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/eye.webp')} alt="Oli Stormz" />
      </div>  

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: The Rush To Write It</h3>
        <p id="s10" className="zero-answer">
        The rush to write it down is only the swiftness of life in that moment.
        </p>  

        <h3 className="zero-question">3/12/25: The Rainmaker Dances</h3>
        <p id="s11" className="zero-answer">
        The rainmaker dances. The rain falls without them making anything.
        </p>   
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/gull.webp')} alt="Oli Stormz" />
      </div>  

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: Her Heart</h3>
        <p id="s12" className="zero-answer">
        Her heart...it is not “her” heart.
        </p> 
        <h3 className="zero-question">3/12/25: Winter Coats</h3>
        <p id="s13" className="zero-answer">
        Winter coats not needed when spring appears.
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/jump.webp')} alt="Oli Stormz" />
      </div>  

       <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: She Made A Tea</h3>
        <p id="s14" className="zero-answer">
        if the deal is big<br />
        or small<br />
        deal <br />
        or no deal<br />
        if the silence<br />
        was continuous<br />
        or broken<br />
        the kettle boiled<br />
        and she made a tea<br />
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/fly.webp')} alt="Oli Stormz" />
      </div> 

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: A Decapitated Wasp</h3>
        <p id="s15" className="zero-answer">
        the wasp head, severed from its body, blinked its eyes and moved its tongue for 30 minutes, until it finally got the memo. 
        </p> 
        <h3 className="zero-question">3/12/25: A Narrator Too Late</h3>
        <p id="s16" className="zero-answer">
        Laughter laughs. The narrator returns and says: “I laughed.” 
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/person.webp')} alt="Oli Stormz" />
      </div> 


      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: The Pilot Arrives After The Plane Is Flying</h3>
        <p id="s17" className="zero-answer">
        An airplane builds itself and takes flight. A millisecond after liftoff, a person rushes in sweating with a wrench and a clipbpoard announcing that their name is Captain Awakening, they built the plane, and for all passengers to please take their seats because they are in for the ride of their life. 
        </p> 
        <h3 className="zero-question">3/12/25: Legs Don't Have Questions</h3>
        <p id="s18" className="zero-answer">
        The person asking about how to act when they are “The Enlightened One” is like the person posing as legs asking, “so how do we walk again?” Legs don’t ask questions. The person has never walked.
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/move.webp')} alt="Oli Stormz" />
      </div> 

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: But But Wait I Have A Question</h3>
        <p id="s19" className="zero-answer">
        “but how will I do the thing I don’t do?” - the person
        <br />“but how will I speak?” - silence
        </p> 
        <h3 className="zero-question">3/12/25: No Joker, Still Joke</h3>
        <p id="s20" className="zero-answer">
        the joke is the absence of a joker
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/person1.webp')} alt="Oli Stormz" />
      </div> 





      <h2 className="zero-interview-subtitle">
      no one behind this<br /><br /> 
      no point<br /><br />
     </h2>


    </div>

    {showFloatingHeart && (
      <a
        href="https://www.paypal.me/olistormz"
        target="_blank"
        rel="noopener noreferrer"
        className="zero-pp-fade-button visible"
        aria-label="donate"
      >
      🧡
      </a>
    )}

    {/* 🆕 Scroll-to-top arrow */}
    <button
      className="zero-scroll-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      ↑
    </button>


    </div>

  );
}

export default Zero;
