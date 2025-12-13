// email link for iconc on home page

<a href="mailto:management@olistormz.com" aria-label="Email Management">
<img src={require('./static/email.png')} alt="Email" className="social-icon email-icon" />
</a>

 <a href="https://www.tiktok.com/@olistormz" target="_blank" rel="noopener noreferrer">
            <img src={tiktokIcon} alt="TikTok" className="social-icon" />
          </a>



 // Short Reel

{ label: 'Short', url: 'https://youtube.com/shorts/HJYvrcjHtHU' },


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


import Loading from "./Loading";

function App() {
  return <Loading />;
}

export default App;







// ZERO JS

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
        const showPoint = 0.2;
        const hidePoint = 0.15;

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
          The Tea Was Made
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
        <a
          href="#s21"
          onClick={(e) => handleLinkClick(e, 's21')}
          className={`zero-sidebar-link ${activeId === 's21' ? 'active' : ''}`}
        >
          How Can Life Continue?
        </a>
        <a
          href="#s22"
          onClick={(e) => handleLinkClick(e, 's22')}
          className={`zero-sidebar-link ${activeId === 's22' ? 'active' : ''}`}
        >
          The Movement Of Life
        </a>
        <a
          href="#s23"
          onClick={(e) => handleLinkClick(e, 's23')}
          className={`zero-sidebar-link ${activeId === 's23' ? 'active' : ''}`}
        >
          You Did Not Choose
        </a>
        <a
          href="#s24"
          onClick={(e) => handleLinkClick(e, 's24')}
          className={`zero-sidebar-link ${activeId === 's24' ? 'active' : ''}`}
        >
          Gravity Does Not Explain Itself
        </a>
        <a
          href="#s25"
          onClick={(e) => handleLinkClick(e, 's25')}
          className={`zero-sidebar-link ${activeId === 's25' ? 'active' : ''}`}
        >
          Reflex Of Narration 
        </a>
        <a
          href="#s26"
          onClick={(e) => handleLinkClick(e, 's26')}
          className={`zero-sidebar-link ${activeId === 's26' ? 'active' : ''}`}
        >
          Boundary Dissolved
        </a>
        <a
          href="#s27"
          onClick={(e) => handleLinkClick(e, 's27')}
          className={`zero-sidebar-link ${activeId === 's27' ? 'active' : ''}`}
        >
          All Knowing
        </a>
        <a
          href="#s28"
          onClick={(e) => handleLinkClick(e, 's28')}
          className={`zero-sidebar-link ${activeId === 's28' ? 'active' : ''}`}
        >
          Echoes Repeating
        </a>
        <a
          href="#s29"
          onClick={(e) => handleLinkClick(e, 's29')}
          className={`zero-sidebar-link ${activeId === 's29' ? 'active' : ''}`}
        >
          Nothing To Maintain
        </a>
        <a
          href="#s30"
          onClick={(e) => handleLinkClick(e, 's30')}
          className={`zero-sidebar-link ${activeId === 's30' ? 'active' : ''}`}
        >
          Movement Moved
        </a>
        <a
          href="#s31"
          onClick={(e) => handleLinkClick(e, 's31')}
          className={`zero-sidebar-link ${activeId === 's31' ? 'active' : ''}`}
        >
          Ancestor Summoning
        </a>
        <a
          href="#s32"
          onClick={(e) => handleLinkClick(e, 's32')}
          className={`zero-sidebar-link ${activeId === 's32' ? 'active' : ''}`}
        >
          The Fire Danced Namelessly 
        </a>
        <a
          href="#s33"
          onClick={(e) => handleLinkClick(e, 's33')}
          className={`zero-sidebar-link ${activeId === 's33' ? 'active' : ''}`}
        >
          Inventing Something
        </a>

        <a
          href="#s34"
          onClick={(e) => handleLinkClick(e, 's34')}
          className={`zero-sidebar-link ${activeId === 's34' ? 'active' : ''}`}
        >
          Behind The 'I'
        </a>
        <a
          href="#s35"
          onClick={(e) => handleLinkClick(e, 's35')}
          className={`zero-sidebar-link ${activeId === 's35' ? 'active' : ''}`}
        >
          Before There Was An Anyone
        </a>
        <a
          href="#s36"
          onClick={(e) => handleLinkClick(e, 's36')}
          className={`zero-sidebar-link ${activeId === 's36' ? 'active' : ''}`}
        >
          A River Narrows
        </a>
        <a
          href="#s37"
          onClick={(e) => handleLinkClick(e, 's37')}
          className={`zero-sidebar-link ${activeId === 's37' ? 'active' : ''}`}
        >
          • Sensation • Contraction
        </a>
        <a
          href="#s38"
          onClick={(e) => handleLinkClick(e, 's38')}
          className={`zero-sidebar-link ${activeId === 's38' ? 'active' : ''}`}
        >
          Just Movement
        </a>
        <a
          href="#s39"
          onClick={(e) => handleLinkClick(e, 's39')}
          className={`zero-sidebar-link ${activeId === 's39' ? 'active' : ''}`}
        >
          No Mistakes Made
        </a>
        <a
          href="#s40"
          onClick={(e) => handleLinkClick(e, 's40')}
          className={`zero-sidebar-link ${activeId === 's40' ? 'active' : ''}`}
        >
          TV Broadcasting Schedule
        </a>
        <a
          href="#s41"
          onClick={(e) => handleLinkClick(e, 's41')}
          className={`zero-sidebar-link ${activeId === 's41' ? 'active' : ''}`}
        >
          No Progress. No Regress.
        </a>
        <a
          href="#s42"
          onClick={(e) => handleLinkClick(e, 's42')}
          className={`zero-sidebar-link ${activeId === 's42' ? 'active' : ''}`}
        >
          The Echo Laughs Loudest
        </a>
         <a
          href="#s43"
          onClick={(e) => handleLinkClick(e, 's43')}
          className={`zero-sidebar-link ${activeId === 's43' ? 'active' : ''}`}
        >
          Running Narration 
        </a>
         <a
          href="#s44"
          onClick={(e) => handleLinkClick(e, 's44')}
          className={`zero-sidebar-link ${activeId === 's44' ? 'active' : ''}`}
        >
          An Echo Walks Into An Empty Bar
        </a>
        <a
          href="#s45"
          onClick={(e) => handleLinkClick(e, 's45')}
          className={`zero-sidebar-link ${activeId === 's45' ? 'active' : ''}`}
        >
          Movement Finishes Before Echo Speaks
        </a>
        <a
          href="#s46"
          onClick={(e) => handleLinkClick(e, 's46')}
          className={`zero-sidebar-link ${activeId === 's46' ? 'active' : ''}`}
        >
          Echo Was Never Origin
        </a>
        <a
          href="#s47"
          onClick={(e) => handleLinkClick(e, 's47')}
          className={`zero-sidebar-link ${activeId === 's47' ? 'active' : ''}`}
        >
          Snow Falls
        </a>
        <a
          href="#s48"
          onClick={(e) => handleLinkClick(e, 's48')}
          className={`zero-sidebar-link ${activeId === 's48' ? 'active' : ''}`}
        >
          Events Unfolding Without A Center
        </a>
        <a
          href="#s49"
          onClick={(e) => handleLinkClick(e, 's49')}
          className={`zero-sidebar-link ${activeId === 's49' ? 'active' : ''}`}
        >
          What Moves And What Is Moved
        </a>


        </div>
      )}

      {/* 🎵 Background audio */}
      <audio ref={audioRef} loop playsInline>
        <source src="/zero.m4a" type="audio/mp4" />
        <source src="/zero.mp3" type="audio/mpeg" />
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
        <img src={require('./static/zero/bein.webp')} alt="Oli Stormz" />
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
        <img src={require('./static/zero/mist.webp')} alt="Oli Stormz" />
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
        The person appears. Something has an opinion about its appearance or disappearance. Life continues. It never stopped. It never started.
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
        <h3 className="zero-question">3/12/25: The Tea Was Made</h3>
        <p id="s14" className="zero-answer">
        if the deal is big<br />
        or small<br />
        deal <br />
        or no deal<br />
        if the silence<br />
        was continuous<br />
        or broken<br />
        the kettle boiled<br />
        and the tea was made<br />
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
        An airplane builds itself, takes flight, and a millisecond after liftoff, the person rushes in sweating with a wrench and a clipbpoard, announcing that their name is Captain Awakening, builder of the plane, and for all passengers to please take their seats because they are in for the ride of their life. 
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

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: How Can Life Continue?</h3>
        <p id="s21" className="zero-answer">
        If I am not the doer, how can life continue?
        <br />How it always has. Without you.
        </p> 
        <h3 className="zero-question">3/12/25: The Movement Of Life</h3>
        <p id="s22" className="zero-answer">
        Life is the movement of itself, through itself, as itself, without anyone doing it, and without needing to know how.
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/blob.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: You Did Not Choose</h3>
        <p id="s23" className="zero-answer">
        You did not choose to arrive here. You did not choose the thought that said you did. You only participated in the inevitable movement that preceded you.
        </p> 
        <h3 className="zero-question">3/12/25:  Gravity Does Not Explain Itself</h3>
        <p id="s24" className="zero-answer">
        Gravity does not explain itself. Humans explain gravity. 
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/kiss.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: Reflex Of Narration</h3>
        <p id="s25" className="zero-answer">
        There is no “someone.” Only the reflex of narration annunciating itself.
        </p> 
        <h3 className="zero-question">3/12/25: Boundary Dissolved</h3>
        <p id="s26" className="zero-answer">
        The boundary dissolved and the mask that thought it contained knowing, dissolved too.
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/hill.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: All Knowing</h3>
        <p id="s27" className="zero-answer">
        ‘All-knowing’ is a human label, a human misunderstanding. Whatever is percieved as ‘knowing all’ is knowing having no edge.
        </p>  
        <h3 className="zero-question">3/12/25: Echoes Repeating</h3>
        <p id="s28" className="zero-answer">
        Thinking is like hearing the same thing twice. Speaking is like hearing it three times. Repeating echoes. Of echoes. Of rumors. In a language that was never spoken. 
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/lava.webp')} alt="Oli Stormz" />
      </div>

       <div className="zero-qa-section">
        <h3 className="zero-question">4/12/25: Nothing To Maintain</h3>
        <p id="s29" className="zero-answer">
        No state to preserve, or interpret. Nothing to maintain, evoke, or embody.
        </p> 
        <h3 className="zero-question">4/12/25: Movement Moved</h3>
        <p id="s30" className="zero-answer">
        movement moved, story followed
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/vol.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">4/12/25: Ancestor Summoning</h3>
        <p id="s31" className="zero-answer">
        Ancestor summoning and fires and rituals were just....just......before an "I" spoke. Ancestor summoning and fires and rituals were just....just......after an "I" spoke.
        </p> 
        <h3 className="zero-question">4/12/25: The Fire Danced Namelessly </h3>
        <p id="s32" className="zero-answer">
        Before the person arrived, the fire danced namelessly and undefinably. After the person arrived, the fire danced namelessly and undefinably.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/sun2.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">4/12/25: Inventing Something</h3>
        <p id="s33" className="zero-answer">
        inventing something just to have something to say
        </p> 
        <h3 className="zero-question">4/12/25: Behind The 'I'</h3>
        <p id="s34" className="zero-answer">
        Behind the 'I' calling it frustration, only sensation...no producer, no maker, no it, no just, no no, no yes
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/eye.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">4/12/25: Before There Was An Anyone</h3>
        <p id="s35" className="zero-answer">
        Laughter laughed before there was an anyone to know what was funny.
        </p> 
        <h3 className="zero-question">4/12/25: A River Narrows </h3>
        <p id="s36" className="zero-answer">
        A river narrows in a canyon before widening again. No meaning. No intention. No morality. No goal.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/rver.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">4/12/25: • Sensation • Contraction</h3>
        <p id="s37" className="zero-answer">
        • sensation • stillness • contraction • release • deletion • creation • quiet • expression • sleep • heat • cat • breath • sensation 
        </p> 
        <h3 className="zero-question">4/12/25: Just Movement </h3>
        <p id="s38" className="zero-answer">
        Can’t be broken. Or elevated. Or diluted by talking. Or strengthened by silence.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/mount.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">4/12/25: No Mistakes Made</h3>
        <p id="s39" className="zero-answer">
        Water hits a rock, adjusts direction. River flows through canyon, flow narrows. No one wrong. No mistakes made. 
        </p> 
        <h3 className="zero-question">4/12/25: TV Broadcasting Schedule</h3>
        <p id="s40" className="zero-answer">
        TV broadcasting schedule for tonight and all of eternity: dramas, opinions, jokes, fears, personal histories, spiritual insights.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/burn.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">4/12/25: No Progress. No Regress.</h3>
        <p id="s41" className="zero-answer">
        No good. No bad. No progress. No regress. No correct flavour. No wrong flavour. Just, This movement. This pause. This message. This deletion. This impulse. This breath. This typing. This silence.
        </p> 
        <h3 className="zero-question">4/12/25: The Echo Laughs Loudest</h3>
        <p id="s42" className="zero-answer">
        Laughter laughs. An echo appears and announces: YES, I AM LAUGHING, HILARIOUS, HI, ME, THE ONE EXPERIENCING THIS, HA HA TRULY A GREAT JOKE WOW SIDE SPLITTING 
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/wave.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">4/12/25: Running Narration</h3>
        <p id="s43" className="zero-answer">
        narrating its own narration. narrating that it narrates. narrating that it shouldn’t narrate. narrating silence. narrating the dissolving of narration. narrating the moment of recognising narration. 
        </p> 
        <h3 className="zero-question">4/12/25: An Echo Walks Into An Empty Bar</h3>
        <p id="s44" className="zero-answer">
        An echo walks into an empty bar with a megaphone. It screams the punchline after it had already been told. After Everybody laughed. After Everybody left. After Nobody was ever even there.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/cloud.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">5/12/25: Movement Finishes Before Echo Speaks</h3>
        <p id="s45" className="zero-answer">
        Snow everywhere. Dentist appointment. Hm. Snow shovel. Movement Pick up. Movement Put down. Movement Not pick up again. Echo says, “Hm, not today. I will message dentist.” Dentist has already messaged echo. Echo thinks echo is movement. But echo is echo.
        </p> 
        <h3 className="zero-question">5/12/25: Origin Was Never Echo</h3>
        <p id="s46" className="zero-answer">
        Message already sent before echo arrived. Echo mistakes itself for origin. Origin was never echo. 
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/eyee.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">5/12/25: Snow Falls</h3>
        <p id="s47" className="zero-answer">
        Snow falls, no one causes it. A boundary forms, no one draws it. A snowplough enters, no one drives it. A cat growls, no story behind it. No reason. Just movement.
        </p> 
        <h3 className="zero-question">5/12/25: Events Unfolding Without A Center</h3>
        <p id="s48" className="zero-answer">
        Nothing happening to anyone. Nothing done by anyone. Words appearing without a writer, events unfolding without a center, clarity appearing without a someone becoming clear. Without someone to call it clarity.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/bright.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">5/12/25: What Moves And What Is Moved</h3>
        <p id="s49" className="zero-answer">
        No miracles. No symbols. No special power. Only movement without separation between what moves and what is moved. Without one to say ‘without separation’. 
        </p> 
        <h3 className="zero-question">5/12/25: ?</h3>
        <p id="s50" className="zero-answer">
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/flick.webp')} alt="Oli Stormz" />
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

