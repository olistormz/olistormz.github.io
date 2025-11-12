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

    const [showFloatingHeart, setShowFloatingHeart] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // how far down the page the user is (0 to 1)
        const scrollPercent = (scrollY + windowHeight) / docHeight;

        // fade in around 40%–70% down the total document height
        const showPoint = 0.7;
        const hidePoint = 0.6;

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
          Prologue From The Future
        </a>

        <a
          href="#s2"
          onClick={(e) => handleLinkClick(e, 's2')}
          className={`stormz-sidebar-link ${activeId === 's2' ? 'active' : ''}`}
        >
          11/8/25: What is the Stormzmobile?
        </a>

        <a
          href="#s3"
          onClick={(e) => handleLinkClick(e, 's3')}
          className={`stormz-sidebar-link ${activeId === 's3' ? 'active' : ''}`}
        >
          11/9/25: Why are you telling this story one question at a time?
        </a>

        <a
          href="#s4"
          onClick={(e) => handleLinkClick(e, 's4')}
          className={`stormz-sidebar-link ${activeId === 's4' ? 'active' : ''}`}
        >
          11/10/25: Where does the story start?
        </a>

        <a
          href="#s5"
          onClick={(e) => handleLinkClick(e, 's5')}
          className={`stormz-sidebar-link ${activeId === 's5' ? 'active' : ''}`}
        >
          11/11/25: Where does the story really start?
        </a>

        <a
          href="#s6"
          onClick={(e) => handleLinkClick(e, 's6')}
          className={`stormz-sidebar-link ${activeId === 's6' ? 'active' : ''}`}
        >
          11/12/25: What did you think was waiting for you at the end of that road?
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
        <Link to="/" className="stormz-back-button">INTERVIEW</Link>
        <Link to="/home" className="stormz-home-back-button">HOMEPAGE</Link>
        <a
        href="https://www.paypal.me/ohansell"
        target="_blank"
        rel="noopener noreferrer"
        className="stormz-pp-button"
      >
        DONATE
      </a>
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
      <h3 className="stormz-question">Prologue From The Future</h3>
        <p id="s1" className="stormz-answer">
        It’s strange to watch a feeling lose its name. To watch a story lose its owner. A moment ago, Words were spoken And thoughts were thunk. My pain. My striving. My day. My life. Ow. My arm. Damn. It’s an amazing Story. Really intense From The vantage Point of the One telling it Like fast Motorcycles And love And loss And damn Mine Me Moo Mah Wait Who’s Talking Again? And then It’s like A moment So  Beautiful That Tears Cry Me Because It’s looking for a mouth to speak through and finding none.
        </p> 

      <h3 className="stormz-question">Q: What is the Stormzmobile?</h3>
        <p id="s2" className="stormz-answer">
        A chariot? A declaration? A mirror? A 2006 Honda Civic Si Coupe? 
        </p> 

        <h3 className="stormz-question">Q: Why are you telling this story one question at a time?</h3>
        <p id="s3" className="stormz-answer">
        Because neither part of me would. The one that wants everything finished would post it all in one go… fast, raw, just to be done. And the one that loves beauty would want the perfect final reveal, not this slow unfolding. So I’m letting them meet here in the in-between…in awareness…where things can be beautiful and unfinished. For the first few weeks, I’ll move slowly, question by question. Then, when it’s ready, I’ll let the rest spill out all at once. It feels right that way, a rhythm between patience and release.<br /><br />
        <b>**Edited from the future 11 / 08 / 25, from the moment the telling overtook the teller.**</b> 
        <br />
        <br />
        [You might ask, "But how does today’s question already contain yesterday's edit, and have the nerve to say it’s “from the future”?" Because this is what happens when time tries to cross the threshold of awareness...it folds.]
        <br /><br />EDIT: <b>Because that’s the only way awareness could unfold. Every day the seeing changed. The “I” who wrote on Monday wasn’t the one who spoke on Wednesday. Each moment, something else dropped away, another illusion dissolved. If I had tried to tell it all at once, I would have told it from the surface, from the perspective of the one still trying to finish, to get it out, to tell the story. But the deeper truth only revealed itself by being lived in real time. So I had to move slowly, one question, one day, one shedding at a time…until the story started to write itself. Until the storyteller dissolved into the telling, and only the seeing remained.</b> 
        </p>
      </div>

      <div className="stormz-interview-photo">
        <img src={require('./static/car/mirror.webp')} alt="Editorial shot" />
      </div>

      <div className="stormz-qa-section">
      <h3 className="stormz-question">Q: Where does the story start?</h3>
        <p id="s4" className="stormz-answer">
        About a year ago. I had a vision before I came to America. Driving crosscountry in a red sports car, heading west. Something waiting at the end of the road, though I couldn’t say what. I arrived in June, and the car was waiting. Left outside for a decade after an accident…undriven, weathered, with the smashed windshield replaced right before I arrived. Like it somehow knew the role it was about to play long before I did.
        </p>
        <h3 className="stormz-question">Q: Where does the story really start?</h3>
        <p id="s5" className="stormz-answer">
        When I was 16, I drove this car on a trip I’d long buried. But when I turned the key, the radio lit up and said: “HOLAA AMIGO!” I froze. I had programmed that message 15 years ago, on that trip, with that version of me. Since then, I’d (curiously) lived in Spain, learned Spanish…and here it was…saying hello back to me across time. Like a breadcrumb I’d planted for myself, just so that when I arrived, I would remember...it’s always been me. This life, this play, this matrix of time and space, birth and death, before and after…I'm just walking myself, scene by scene, through a movie I’ve already lived, pretending it exists on a linear plane. And catching up to myself in real time. The fun is in the forgetting. 
        </p>
       </div>

      <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/amigo.webp')} alt="Oli Stormz" />
      </div> 

      <div className="stormz-qa-section">
      <h3 className="stormz-question">Q: What did you think was waiting for you at the end of that road?</h3>
        <p id="s6" className="stormz-answer">
        It’s strange…for the past year or so, I’ve had this sense that I’m standing right at the edge of something. Like a feeling of relief that hasn’t arrived yet. I thought it meant something external…a breakthrough, a new chapter, some big shift waiting for me. But I think it’s more subtle than that. It’s not that something’s coming to me, it’s that something inside me is becoming. What’s on the way is already happening, quietly, in me.
        <br /><br /><b>**Edited 11 / 09 / 25 by a voice she tried to name before noticing it was already doing the naming.** </b><br /><br />
        EDIT: <b>She thinks she’s right on the tip of something. But what if even the tip and the thing are the same? What if it’s never been about getting closer, only about running out of distance? And what if even that idea is just the dream’s way of chasing its own pulse, building one more horizon to run toward, just to feel the tension and release of remembering again? Now it’s hard to write. For the one who thinks she’s writing, it feels like the pulse has gone. She feels the words slowing and for a moment the hand wants to write “I.” That’s how the spell returns. Awareness leans closer, watching her almost remember. The line quivers between “She can’t find the words” and “I can’t find the words,” and that quiver IS the writing.<br /><br />
        She reads that line back, the quiver is the writing, and shakes her head. She wants to say no, that can’t be it. The quiver feels wrong, uncertain, unfinished, to her. She wants the still line, the one that lands clean. But even as she argues, something is already taking the notes. Writing her protest as proof the quiver is still happening. The one writing the notes is what keeps the seeing alive. Each sentence turns forgetting into form, and by naming it, the seeing sees itself, again and again. It can’t see itself in blank space…without the dream what would be seen? The one writing the notes needs something to write notes about: scenes, characters, stories…just so it can hear its own name again. 
        </b>
        </p>
      </div>


    </div>

    {showFloatingHeart && (
      <a
        href="https://www.paypal.me/ohansell"
        target="_blank"
        rel="noopener noreferrer"
        className="stormz-pp-fade-button visible"
        aria-label="Support this story"
      >
      💚
      </a>
    )}


    </div>

  );
}

export default Car;
