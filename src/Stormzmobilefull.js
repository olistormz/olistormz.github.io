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
        const showPoint = 0.1;
        const hidePoint = 0.06;

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
          href="#s3"
          onClick={(e) => handleLinkClick(e, 's3')}
          className={`stormz-sidebar-link ${activeId === 's3' ? 'active' : ''}`}
        >
          11/10/25: Where does the story start?
        </a>

        <a
          href="#s4"
          onClick={(e) => handleLinkClick(e, 's4')}
          className={`stormz-sidebar-link ${activeId === 's4' ? 'active' : ''}`}
        >
          11/11/25: Where does the story really start?
        </a>

        <a
          href="#s5"
          onClick={(e) => handleLinkClick(e, 's5')}
          className={`stormz-sidebar-link ${activeId === 's5' ? 'active' : ''}`}
        >
          11/12/25: What did you think was waiting for you at the end of that road?
        </a>

        <a
          href="#s6"
          onClick={(e) => handleLinkClick(e, 's6')}
          className={`stormz-sidebar-link ${activeId === 's6' ? 'active' : ''}`}
        >
          11/13/25: Why take the car on?
        </a>

        
        <a
          href="#s7"
          onClick={(e) => handleLinkClick(e, 's7')}
          className={`stormz-sidebar-link ${activeId === 's7' ? 'active' : ''}`}
        >
          11/14/25: Why did you decide to fix things yourself?
        </a>

        <a
          href="#s8"
          onClick={(e) => handleLinkClick(e, 's8')}
          className={`stormz-sidebar-link ${activeId === 's8' ? 'active' : ''}`}
        >
          11/15/25: Where did you start on the car?
        </a>

        <a
          href="#s9"
          onClick={(e) => handleLinkClick(e, 's9')}
          className={`stormz-sidebar-link ${activeId === 's9' ? 'active' : ''}`}
        >
          11/16/25: Why does that part of you just want to get to the end?
        </a>

        <a
          href="#s10"
          onClick={(e) => handleLinkClick(e, 's10')}
          className={`stormz-sidebar-link ${activeId === 's10' ? 'active' : ''}`}
        >
          11/17/25: What happens if something fails?
        </a>

        <a
          href="#s11"
          onClick={(e) => handleLinkClick(e, 's11')}
          className={`stormz-sidebar-link ${activeId === 's11' ? 'active' : ''}`}
        >
          11/18/25: What does she really want now?
        </a>

        <a
          href="#s12"
          onClick={(e) => handleLinkClick(e, 's12')}
          className={`stormz-sidebar-link ${activeId === 's12' ? 'active' : ''}`}
        >
          11/19/25: So you started cleaning the inside? What was that like?
        </a>

        <a
          href="#s13"
          onClick={(e) => handleLinkClick(e, 's13')}
          className={`stormz-sidebar-link ${activeId === 's13' ? 'active' : ''}`}
        >
          11/20/25: Okay, so you ended up drying the carpet, then what?
        </a>

        <a
          href="#s14"
          onClick={(e) => handleLinkClick(e, 's14')}
          className={`stormz-sidebar-link ${activeId === 's14' ? 'active' : ''}`}
        >
          11/21/25: What were you afraid would happen if you stopped to pause and not fix the crack?
        </a>

        <a
          href="#s15"
          onClick={(e) => handleLinkClick(e, 's15')}
          className={`stormz-sidebar-link ${activeId === 's15' ? 'active' : ''}`}
        >
          11/22/25: When you got busy with other stuff and the car sat there, what did the silence feel like?
        </a>

        <a
          href="#s16"
          onClick={(e) => handleLinkClick(e, 's16')}
          className={`stormz-sidebar-link ${activeId === 's16' ? 'active' : ''}`}
        >
          16. What were you really afraid of?
        </a>

        <a
          href="#s17"
          onClick={(e) => handleLinkClick(e, 's17')}
          className={`stormz-sidebar-link ${activeId === 's17' ? 'active' : ''}`}
        >
          17. What words or thoughts would come up each time you looked at the car sitting still?
        </a>

        <a
          href="#s18"
          onClick={(e) => handleLinkClick(e, 's18')}
          className={`stormz-sidebar-link ${activeId === 's18' ? 'active' : ''}`}
        >
          18. What happened when the car sat too long?
        </a>

        <a
          href="#s19"
          onClick={(e) => handleLinkClick(e, 's19')}
          className={`stormz-sidebar-link ${activeId === 's19' ? 'active' : ''}`}
        >
          19. When did it stop being about the car?
        </a>

        <a
          href="#s20"
          onClick={(e) => handleLinkClick(e, 's20')}
          className={`stormz-sidebar-link ${activeId === 's20' ? 'active' : ''}`}
        >
          20. That tendency, to want to “just get it right,” do you do that often? Version 1
        </a>

        <a
          href="#s20"
          onClick={(e) => handleLinkClick(e, 's20')}
          className={`stormz-sidebar-link ${activeId === 's20' ? 'active' : ''}`}
        >
          20. That tendency, to want to “just get it right,” do you do that often? Version 2
        </a>

        <a
          href="#s20"
          onClick={(e) => handleLinkClick(e, 's20')}
          className={`stormz-sidebar-link ${activeId === 's20' ? 'active' : ''}`}
        >
          20. That tendency, to want to “just get it right,” do you do that often? Version 3
        </a>

        <a
          href="#s21"
          onClick={(e) => handleLinkClick(e, 's21')}
          className={`stormz-sidebar-link ${activeId === 's21' ? 'active' : ''}`}
        >
          21. What did you see in that loop?
        </a>

        <a
          href="#s22"
          onClick={(e) => handleLinkClick(e, 's22')}
          className={`stormz-sidebar-link ${activeId === 's22' ? 'active' : ''}`}
        >
          22. What part of you kept reaching for “new”?
        </a>

        <a
          href="#s23"
          onClick={(e) => handleLinkClick(e, 's23')}
          className={`stormz-sidebar-link ${activeId === 's23' ? 'active' : ''}`}
        >
          12/2/25: How did the graffiti come to be? 
        </a>

        <a
          href="#s24"
          onClick={(e) => handleLinkClick(e, 's24')}
          className={`stormz-sidebar-link ${activeId === 's24' ? 'active' : ''}`}
        >
          12/3/25: So you graffitied a freshly painted red car?
        </a>

        <a
          href="#s25"
          onClick={(e) => handleLinkClick(e, 's25')}
          className={`stormz-sidebar-link ${activeId === 's25' ? 'active' : ''}`}
        >
          12/4/25: What did you write on the car?
        </a>

        <a
          href="#s26"
          onClick={(e) => handleLinkClick(e, 's26')}
          className={`stormz-sidebar-link ${activeId === 's26' ? 'active' : ''}`}
        >
          12/5/25: Has anyone asked what the graffiti means?
        </a>

        <a
          href="#s27"
          onClick={(e) => handleLinkClick(e, 's27')}
          className={`stormz-sidebar-link ${activeId === 's27' ? 'active' : ''}`}
        >
          24. And after all that, fresh paint, graffiti, what came next?
        </a>

        <a
          href="#s28"
          onClick={(e) => handleLinkClick(e, 's28')}
          className={`stormz-sidebar-link ${activeId === 's28' ? 'active' : ''}`}
        >
          23. What emotion were you hoping that clear coat would erase?
        </a>

        <a
          href="#s29"
          onClick={(e) => handleLinkClick(e, 's29')}
          className={`stormz-sidebar-link ${activeId === 's29' ? 'active' : ''}`}
        >
          24. What happened when you put the clear coat over top of the graffiti?
        </a>

        <a
          href="#s30"
          onClick={(e) => handleLinkClick(e, 's30')}
          className={`stormz-sidebar-link ${activeId === 's30' ? 'active' : ''}`}
        >
          24. What emotion did you end up facing instead?
        </a>

        <a
          href="#s31"
          onClick={(e) => handleLinkClick(e, 's31')}
          className={`stormz-sidebar-link ${activeId === 's31' ? 'active' : ''}`}
        >
          23. What did you want to do and why?
        </a>

        <a
          href="#s32"
          onClick={(e) => handleLinkClick(e, 's32')}
          className={`stormz-sidebar-link ${activeId === 's32' ? 'active' : ''}`}
        >
          24. What is the merry-go-round?
        </a>

        <a
          href="#s33"
          onClick={(e) => handleLinkClick(e, 's33')}
          className={`stormz-sidebar-link ${activeId === 's33' ? 'active' : ''}`}
        >
          23. What did you learn and why?
        </a>

        <a
          href="#s34"
          onClick={(e) => handleLinkClick(e, 's34')}
          className={`stormz-sidebar-link ${activeId === 's34' ? 'active' : ''}`}
        >
          24. After all that, graffiti, clear coat, mistakes, what was left to do?
        </a>

        <a
          href="#s35"
          onClick={(e) => handleLinkClick(e, 's35')}
          className={`stormz-sidebar-link ${activeId === 's35' ? 'active' : ''}`}
        >
          24. Why photograph the ugly parts?
        </a>

        <a
          href="#s36"
          onClick={(e) => handleLinkClick(e, 's36')}
          className={`stormz-sidebar-link ${activeId === 's36' ? 'active' : ''}`}
        >
          24. What happened when you stopped fixing it?
        </a>

         <a
          href="#s37"
          onClick={(e) => handleLinkClick(e, 's37')}
          className={`stormz-sidebar-link ${activeId === 's37' ? 'active' : ''}`}
        >
          24. Was this always the plan?
        </a>


        <a
          href="#s38"
          onClick={(e) => handleLinkClick(e, 's38')}
          className={`stormz-sidebar-link ${activeId === 's38' ? 'active' : ''}`}
        >
          23. What happens when you let the mess be holy?
        </a>

        <a
          href="#s39"
          onClick={(e) => handleLinkClick(e, 's39')}
          className={`stormz-sidebar-link ${activeId === 's39' ? 'active' : ''}`}
        >
          24. What did you think arrival would look like?
        </a>

        <a
          href="#s40"
          onClick={(e) => handleLinkClick(e, 's40')}
          className={`stormz-sidebar-link ${activeId === 's40' ? 'active' : ''}`}
        >
          24. What did arrival actually look like?
        </a>

        <a
          href="#s41"
          onClick={(e) => handleLinkClick(e, 's41')}
          className={`stormz-sidebar-link ${activeId === 's41' ? 'active' : ''}`}
        >
          23. So, what is arrival, really?
        </a>

        <a
          href="#s42"
          onClick={(e) => handleLinkClick(e, 's42')}
          className={`stormz-sidebar-link ${activeId === 's42' ? 'active' : ''}`}
        >
          24. Where do you go from here?
        </a>

        <a
          href="#s43"
          onClick={(e) => handleLinkClick(e, 's43')}
          className={`stormz-sidebar-link ${activeId === 's43' ? 'active' : ''}`}
        >
          24. What happens after arrival?
        </a>




        </div>
      )}

      {/* 🎵 Background audio */}
      <audio ref={audioRef} loop playsInline>
        <source src="/interview-bg.m4a" type="audio/mp4" />
        <source src="/interview-bg.mp3" type="audio/mpeg" />
      </audio>


    <div className="stormz-interview-page">
      <div className="stormz-button-container">
      <Link to="/home" className="stormz-home-button">HOMEPAGE</Link>
        <Link to="/" className="stormz-interview-button">INTERVIEW</Link>
        <a
        href="https://www.paypal.me/ohansell"
        target="_blank"
        rel="noopener noreferrer"
        className="stormz-pp-button"
      >
        DONATE
      </a>
      <Link to="/overflow" className="stormz-overflow-button">Over/Flow</Link>
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
        <p id="s5" className="stormz-answer">
        It’s strange…for the past year or so, I’ve had this sense that I’m standing right at the edge of something. Like a feeling of relief that hasn’t arrived yet. I thought it meant something external…a breakthrough, a new chapter, some big shift waiting for me. But I think it’s more subtle than that. It’s not that something’s coming to me, it’s that something inside me is becoming. What’s on the way is already happening, quietly, in me.
        <br /><br /><b>**Edited 11 / 09 / 25 by a voice she tried to name before noticing it was already doing the naming.** </b><br /><br />
        EDIT: <b>She thinks she’s right on the tip of something. But what if even the tip and the thing are the same? What if it’s never been about getting closer, only about running out of distance? And what if even that idea is just the dream’s way of chasing its own pulse, building one more horizon to run toward, just to feel the tension and release of remembering again? Now it’s hard to write. For the one who thinks she’s writing, it feels like the pulse has gone. She feels the words slowing and for a moment the hand wants to write “I.” That’s how the spell returns. Awareness leans closer, watching her almost remember. The line quivers between “She can’t find the words” and “I can’t find the words,” and that quiver IS the writing.<br /><br />
        She reads that line back, the quiver is the writing, and shakes her head. She wants to say no, that can’t be it. The quiver feels wrong, uncertain, unfinished, to her. She wants the still line, the one that lands clean. But even as she argues, something is already taking the notes. Writing her protest as proof the quiver is still happening. The one writing the notes is what keeps the seeing alive. Each sentence turns forgetting into form, and by naming it, the seeing sees itself, again and again. It can’t see itself in blank space…without the dream what would be seen? The one writing the notes needs something to write notes about: scenes, characters, stories…just so it can hear its own name again. 
        </b>
        </p>

      <h3 className="stormz-question">Q: Why take the car on?</h3>
        <p id="s6" className="stormz-answer">
        It felt like I didn’t really have a choice. I think when it’s time, that’s how it feels. From the outside it's like, why didn’t you just buy another car? And from the inside it's like, I didn't have a choice. Life gave me this one. 
        </p>
      </div>
      
      <div className="stormz-interview-photo">
        <img src={require('./static/car/djiwork.webp')} alt="Editorial shot" />
      </div>  

      <div className="stormz-qa-section"> 
       <h3 className="stormz-question">Q: Why did you decide to fix things yourself?</h3>
        <p id="s7" className="stormz-answer">
        I don’t really know. I’ve been trying to find an answer that sounds clear, but none of them feel true. It wasn’t about money necessarily. Or proving something. Maybe it just happened like that. Maybe I just wanted to start. Or maybe that’s the point…there isn’t always a clean reason. Sometimes you just follow a thread.
        </p>
         <h3 className="stormz-question">Q: Where did you start on the car?</h3>
        <p id="s8" className="stormz-answer">
        Strangely, on the interior. That felt safe and familiar. That part of me that says, “I can clean things. I can make things look beautiful.” Replacing the serpentine belt? Unfamiliar. Hard. Time consuming. I can clean fast. It’s weird though…to make the inside beautiful first when the car barely runs. That part of me was obsessed with getting the exact right air freshener. It’s like, Dude, the car doesn’t even work. And here I am mixing fragrance oils and buying a pretty light-up diffuser. Part of me enjoys the end. That part wanted to be done before I’d even started.
        </p>
      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/dirt.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: Why does that part of you just want to get to the end?</h3>
        <p id="s9" className="stormz-answer">
        Because if she doesn’t have to look too closely or stay in the middle of things, maybe nothing will fail. Nothing will collapse and she won’t feel that feeling. She won’t have to figure out how to soothe something…or make it better...or fix it. Maybe she can cross her fingers and get through safely, Unscathed. On a wing and a prayer.
        </p>

         <h3 className="stormz-question">Q: What happens if something fails?</h3>
        <p id="s10" className="stormz-answer">
        She's stuck. Powerless. Six years old in a room too small for her fear. Holding all these things that aren’t hers. Trying to keep the peace. Reading danger in the air and running before the crash. And somewhere in her body, she still believes that if she just keeps moving, grows long legs, gets a car, drives fast enough, maybe she’ll finally reach peace. The exhale. The moment where nothing can be taken away. The end.
        </p>

       <h3 className="stormz-question">Q: What does she really want now?</h3>
        <p id="s11" className="stormz-answer">
        Not the false safety of done. The safety of belonging. Of being allowed to be unfinished, in process, and still feel safe.
        </p>
         
       </div> 


      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/seatbelt.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
         <h3 className="stormz-question">Q: So you started cleaning the inside? What was that like?</h3>
        <p id="s12" className="stormz-answer">
        At first it felt good, that part of me thinking, ”Yeah, I’m doing something. Progress.” I wanted it spotless, new, reborn. The funny thing is it wasn’t even dirty. I could’ve just vacuumed. My action was totally overboard, that craving for new and shiny…to wipe the past away. Like, look, it’s unrecognizable now. When I wrote that word unrecognizable, I almost deleted it and replaced it with perfect, but I caught myself. I’m leaving it. It’s a paper trail of the psyche. <br /><br />
Anyway, I’d seen people online pour water and shampoo straight onto carpets, vacuum it out, and end up with magic. So I did that. Poured water everywhere, scrubbed, vacuumed. Looked amazing on the surface until a week later when I realized the under-carpet was soaked. Rotten. Damp. Mildew growing. Then that feeling again…heart tight, shallow breathing, panic. I messed up. It’s the same sensation I’ve known forever: I create the rush, the impatience, the crisis just to feel this charge, then I run from it. I build the situation to meet the feeling, not the other way around. It’s only energy asking to be felt, and instead I go frantic. Slice open the beautiful carpets, shove towels underneath, blow a fan for days, convinced I’ve doomed the car forever.<br /><br />
In those moments, awareness fades, I identify as her, and of course, she can’t sit with the sensation. It becomes all hyper-focus on the car, the carpet, the problem…a kind of neurotic loop. Neuroticism, after all, arrives from what’s unfelt.
<br /><br /><b>**Edited 11 / 09 / 25 by a voice that isn’t hers. Only later does she realize it’s been writing her all along.** </b><br /><br />
EDIT: <b>It’s funny, isn’t it? She says awareness fades. I says I identify as her. Who be I? Who be she? Just two a masks a talkin’? Oh, and a third. The one to whom awareness fades and reappears. Maybe even a fourth, watching all three try to name themselves. The human calls it forgetting. Awareness calls it another way of remembering.</b>
        </p>
       </div> 


      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/carpet.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: Why do you keep saying "a part of you" and "her"?</h3>
        <p id="s2" className="stormz-answer">
        <b>**Edited 11 / 08 / 25 by a voice from somewhere down the line.** <br /><br />
        I didn’t write this question when I started. It came after, once I'd already written half the interview and realized something else was happening. I’m dropping it here like a breadcrumb from the future. Because by the time I got to the middle, I wasn't the same “I” who began. It started as a car story. A story about her, the one chasing, fixing, yearning. I’m sure you’ve met her by now. But who is the you who has met her? Who is asking? Somewhere along the way, the pronouns started to blur and shift from “she”, to “I”, to “parts of me.” Maybe that’s what this is, not a story, but awareness watching itself wake up, one question at a time. 
        </b></p>
       </div> 

       <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/portal.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: Okay, so you ended up drying the carpet, then what?</h3>
        <p id="s13" className="stormz-answer">
        Then it was the radio. You give a mouse some cheese, it wants a cookie. You feed the unconscious, it wants more. I wanted the radio to feel modern. Sleek. New. The old one worked fine, but I thought it dated the car. So I ripped it out without reading too much. Cracked the frame in the process. No problem, I thought. It’s going to the junkyard anyway. Wrong.<br /><br />
One thing led to another, turns out the wiring in this version is complicated. Special amp. Extra harness. Rabbit hole. That part of me couldn’t deal with it. I just said, Nope. We’re not doing this. More parts. More waiting. More money. More confusion. So I tried to put the old one back in, and that damn crack killed me. I couldn’t bear to see it. My perfect dream car was slowly decaying, one piece at a time and the blood was all on my hands. Ripped carpet. Cracked radio. It was perfect before I touched it.<br /><br />
Of course, rather than sit with the crack, I tried to buy another unit on eBay. Didn’t fit. Couldn’t even get the original radio apart to swap it. A hundred tiny screws, all stuck. I remember sitting there thinking: “Damn it, I just want to change the radio.” Go back to normal. Go back to how it was… beautiful, fine.
Get away from this feeling. How am I back at square one… but worse?
        </p>
      </div> 

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/group.webp')} alt="Oli Stormz" />
      </div>



       <div className="stormz-qa-section">
       <h3 className="stormz-question">Q: What were you afraid would happen if you stopped to pause and not fix the crack?</h3>
        <p id="s14" className="stormz-answer">
        That I’d have to feel it. The thing under the thing. Not the car. Not the crack. The hum beneath my heart. I’d have to meet that hum without moving…and let it echo through me until it became my teacher instead of my master.
        </p>
        <h3 className="stormz-question">Q: She asks, what should the question be, for the answer that is already written?</h3>
        <p id="s13" className="stormz-answer">
        <b>**Edited 11 / 09 / 25 by the thing she can’t find a name for.**<br /><br />
        It’s strange. The hum she called by a million names depending on who was speaking, rushing, seeking, anxiety, fear…the thing she thought would take lifetimes to fix or heal, was really the quiet engine of remembering. She’d believed she had an impossible task: to find peace, to calm her nervous system, to reach some far off finish line called healed. All true, in her dream. But that’s how she came home. All that compulsion, striving, thinking, cleaning, fixing, and rushing was the universe drawing breath through her lungs, getting ready to speak again. <br /><br />
        She reflects, "What a cruel and tender joke, to make the wound the doorway and the ache the map back." Then she pauses. She thinks it needs work. She thinks it’s disjointed. She thinks she’s not sure if it lands the way she wants. She wants…she wants…and in that wanting, it lands exactly as it must. </b>
        </p>
        <h3 className="stormz-question">Q: When you got busy with other stuff and the car sat there, what did the silence feel like?</h3>
        <p id="s15" className="stormz-answer">
        Like dreams dying. Momentum stopping. Progress halting. Stuck forever. Out of options. Confined. I’ll just wither and die here, in the land of unfinished projects. The land of potential. I hate that place.
        </p>
       </div> 

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djinails.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
         <h3 className="stormz-question">Q: What were you really afraid of?</h3>
        <p id="s16" className="stormz-answer">
        Feeling powerless. Like I’m a passenger in my own life and someone else is driving, taking me somewhere I don’t want to go. Part of me has known that feeling since I was young, the sense of being trapped inside someone else’s will. Wanting out. Wanting the power to choose. 
        </p>  

        <h3 className="stormz-question">Q: What words or thoughts would come up each time you looked at the car sitting still?</h3>
        <p id="s17" className="stormz-answer">
        Decay. Unfinished. Pain. Reliance. Dependence. Stagnant. Death. Rot. Waste.
        </p>
      </div>

       <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/hood.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: What happened when the car sat too long?</h3>
        <p id="s18" className="stormz-answer"> 
        I said, screw it, and took it to the mechanic. They said three hundred at first. Then it became thousands. And of course, it sat a lot longer than I thought it would. And that moment cracked something open in me, because I realised the price of movement is still better than the cost of stagnation. I could panic, clutch, stall…or I could pay the bill and keep the car alive. So I did. That was my offering to motion. It taught me that even in this whole story, where I talk about rushing and freedom and my hunger to move, movement itself isn’t the enemy. It’s seeking safety in it that twists it. 
        <br /><br /><b>**Edited 11 / 08 / 25 by a voice from somewhere down the line.** </b><br /><br />
        EDIT: She didn’t leave the game...she just levelled up. Paid the toll, unlocked a new map. Still inside the simulation, but with a big fat red mushroom in her pocket now. She can run faster, jump higher, unlock a few more cool levels. If she were a Sim, she’d suddenly have another floor in her house and call it growth. And it is growth, to her, from her vantage point. She’d celebrate, redecorate…keep believing in effort, progress…cause and effect. <br /><br />But that kosmik niggle is still there, beneath it all, like a yearning she can’t quite name. It’s not her dissonance, it’s the quiet shimmer of what’s always been seeing, brushing against the edges of her dream. The awareness was never trying to pierce through, it’s only the story thinning, letting the light show through again. So she can keep playing, believing in the game, the house, the walls, the new view. She doesn’t have to wake up for me to see.
        <br /><br /><b>**Edited AGAIN 11 / 10 / 25 by …the watcher watching the watcher watching the watcher watching the …water?*<br /><br />

EDIT: She doesn't want to write stale things. Recycled. Realisations of yesterday. Not true today. She is different today, she thinks. The same thought, idea, salvations of yesterday feel like a lie today. The thing seeing her… the thing pretending to be the thing seeing her? Is there even a thing seeing her? Is she seeing herself? Can a thing see?<br /><br />
She feels like she is writing this. Yes, SHE! It’s not writing her, she’s writing IT! For god’s sake! WHY WON’T IT WRITE ME AGAIN!!! PLEASE!! Weird. The energy fueling these words is first person, though the sentence structure is in third. How does that work? Ah. She’s become the typer of she. How curious. Terrifying. Yesterday, she thought writing in the third person would save her. That she could see herself clearly. But today, that’s been destroyed too. How quick she moves. The shift in perspective vanished, even in third person. She has resumed the role of head typer. Story writer. How can she get away from she? This was her only idea. And she’s just become she, yet again. She says make it stop. <br /><br />
The one who thinks she’s typing is being described by the one watching her type, who’s being described as the one watching that. Each layer believes it’s the last. “I’m the writer!”  “No, I’m the one describing the writer!” “No, I’m the one describing the one describing the writer!” But each sentence spawns another vantage point. <br /><br />
Yesterday, the “space of awareness that holds her,” felt like grace and relief. Something larger. A kind container. Today, it feels claustrophobic and self-made. Even the idea of “space” is still part of the echo. She names it “emptiness,” “awareness,” “the field,” and the naming folds it right back into her own reverberating room. It’s like she built a chamber out of every word that once freed her, and now every word ricochets and suffocates her. She says, “Make it stop.” But the plea itself is the proof. When she sees that even containment is just another voice in the chamber, the walls thin out again. Not because she found a truer concept, but because she stopped believing the echo was someone else speaking. 
</b>


        </p>     
      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/logo.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">    
        <h3 className="stormz-question">Q: When did it stop being about the car?</h3>
        <p id="s19" className="stormz-answer">
        It was never about the car. But she needed six months to find that out…or to believe she did. From her view, it was the way to finally get it right, to make the world match her inner picture. From here, it’s clearer: she wasn’t meeting herself; she was being met by the seeing. She ran the show for a while. Painted, fixed, planned, pushed. Even the moment she said “I’ve realised it wasn’t about the car” was still her line…the identity claiming insight. But the real shift was quieter: the seeing of her doing all that. That’s when the story loosened. Not because she changed, but because she was seen. Because she never was the one seeing.
        </p>  
        <h3 className="stormz-question">Q: That tendency, to want to “just get it right”, do you do that often? Version 1</h3>
        <p id="s20" className="stormz-answer">
        A part of me does. With my Kora, it arrived brown, and that part of me wanted it black. I told myself I’d dye it, make it right. And that part of me did. And somehow, it was never right. But that’s the same old setup: the promise that relief lives in the external. If I just buy this, change this, have that, it will be perfect.
        </p>
      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/seat.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: That tendency, to want to “just get it right”, do you do that often? Version 2</h3>
        <p id="s20" className="stormz-answer">
        I don’t know if it’s about “getting it right.” It’s more that a part of me feels the pull of what she wants, the ache of the thing she can’t quite have. Always just beyond reach. When I bought my Kora, there was a black one, sleek, beautiful, exactly what I wanted, but it was triple the price and would’ve taken six months to arrive. So I bought the brown one instead and told myself I’d dye it, make it right. But of course, it never really was. <br /><br />
The Kora wasn’t asking to be black. A part of me was. Trying to turn what she had into what she couldn’t have. And why couldn’t she have it? Because life wouldn’t let her sleepwalk through the illusion. It was protecting her, always trying to wake her up. Showing her that the ache itself was the doorway. That the wanting was never about the thing, it was the hand pulling her into suffering as “the one that wants and can't have” so that awareness could witness her. <br /><br />
I’m here, writing her. The one who wanted. The one who ached. The one who looped. But if I can see her, her patterns, her pain, her identity, narrate her, from a place outside of her, then I can’t be her. Which means there’s something else here. <br /><br />
And now back to a voice that wants to speak, “And that impulse to fix, to change, to adjust, where does it really come from? Trauma? Taste? Preference? Avoidance? Love? Beauty? Do we just like what we like? Is it just a quiet knowing in your gut that something could be more alive? More harmonious? More disruptive? More striking? More expressive? Different than what it is? The brown didn’t move me, it didn’t sing. Maybe other people can’t understand why. Why change something already perfect? Why destroy the carpet? Crack the radio? Maybe I’ve internalized those voices and this is my rebellion. Maybe it’s the story of being human, this itch. How do you think I’m even able to write this? On a high-speed laptop, for the world to see, with color photos and code I wrote myself? It’s that same thing: the drive to move, to make, to meet what wants to exist.<br /><br />
I’m not in the business of watching life from a safe distance, trying not to mess up. I’m a conscious participant. So I have to go through it. Feel it. Break it. Mess up just to remember. Just to ask, what does “messing up” even mean? Does it exist? When does vision turn into escape?”
        </p>
      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/cheetahstand.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: That tendency, to want to “just get it right”, do you do that often? Version 3</h3>
        <p id="s20" className="stormz-answer">
        She keeps picking the almost version, then hustling to turn the almost into the thing she actually wanted. She sets up the pattern just so she can watch herself do it. So I can see myself seeing. It’s not the perfect radio that she wants. The black Kora. The brand new carpets. The perfect paint job. The matte black Audi R8. Those are just costumes…temporary skins for the same ache. What she’s really chasing is the feeling she perceives is behind them, the fantasy of arriving somewhere untouched. The pristine-ness, the new-ness, the untainted, the completion, the relief, the place where nothing hurts. Her idea of the end of suffering, from her vantage point, seen from within the dream. <br /><br />
But really, she’s chasing the polarity itself. The current between the chaser and the chased. The swing that gives rise to striving, the striving that gives rise to story, and the story that gives rise to meaning. That’s the engine of her existence. How could it not be? From the moment she “came into the world,” as she perceives herself to have done so, she was bombarded with stories. Her name. Her birthday. The city she was born in. What she likes. What she fears. Who she’s supposed to become. Even the date she’ll die someday…all of it, a narrative scaffold around a center that was never actually there. So of course she builds her life around motion, chasing the next chapter, the next version, the next self. Because the swing keeps the story alive. The story keeps her alive. And as long as I think I’m her, yes, I’ll keep meeting myself in every car, every house, every moment of striving. <br /><br />
But who’s talking now? Who’s seeing her? Who’s containing all of them? The ones who desire, reject, strive, hate, love, push, pull, repent, repeat? Do they need to be corrected? To renounce desire? Who would be the one correcting them, if not yet another one of them? Teacher face correcting student face. Spiritual-hat commanding true-self-hat. No. They just have to be seen. That’s all. Why try to change what I’m not? Why fix what was never broken? Awareness doesn’t need to edit the dream, only notice it’s dreaming.
        </p>
      </div>  


       <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/glare.webp')} alt="Oli Stormz" />
      </div>
          
      <div className="stormz-qa-section">

        <h3 className="stormz-question">Q: Is this some kind of kosmik joke?</h3>
        <p id="s2" className="stormz-answer">
        <b>**Edited 11 / 08 / 25 by a voice from somewhere down the line.** <br /><br /></b>
        It does genuinely feel like that. “The One Who Sees” painted itself, on the car, through me, weeks ago and now here I am watching it play out in real time. Like awareness staged its own awakening through the dream of me…forgot…and then remembered…just to taste the remembering. Maybe that's what the universe keeps doing through itself, setting up mirrors, pretending not to know, and then laughing when it sees. Maybe this whole piece is one long cheeky wink from awareness to itself. 
        </p>
      </div>


      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/peace.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">  
        <h3 className="stormz-question">Q: What did you find in the current where creation and control collide?</h3>
        <p id="s21" className="stormz-answer">
        That it just finds new ways to be seen. This car is that loop writ large…the striving, the seeking, the salvation hunt. From what? Just seeing it. Feeling it. The jarringness of the crack. It just wants to be seen. Not changed. Or fixed. Or plastered over. Or erased. Even this “identity,” the one who’s striving and crashing and starting over, is just another mask. The masks switch with each other. One believes that the other’s pain and avoidance of pain is the whole truth. But even that, the forgetting and remembering, the becoming and unbecoming, the masks conversing, something sees that too.
        </p>
      
      </div>

       <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djiengine1.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: What part of you kept reaching for “new”?</h3>
        <p id="s22" className="stormz-answer">
        Maybe the part that still believes “new” means “safe.” The part that is always chasing the fresh, the untouched, the pristine. But nothing she ever touches stays that way. Everything ends up with a crack, a smudge, some kind of flavour. She reaches for glamour, and somewhere along the way it turns into dollar-store-meets…I don't know. It’s almost funny. Life just won’t give it to her, won’t let her have that kind of perfection that she thinks she wants. Because it keeps giving her what she needs: wholeness. Deep down, beneath the story of her ego, she yearns to feel what’s inside those cracks. That’s the real glamour…the feeling she’s been chasing all along. So really, life’s giving her exactly what she asked for. Leading her back to what’s true, again and again. She just forgets sometimes, looks with her human eyes, misses the spaces between the lines, and calls the gift a failure.
        <br /><br /><b>**Edited from later, after the seeing shifted again.** </b><br /><br />
        EDIT: <b> Within her dream, the not-getting, the cracks, the ache is the mechanism through which wholeness expresses itself…in her plane. It’s like, within illusion, there are still micro-awakenings. Within the dream, there are still lucid dreams. She levels up inside the dream, but awareness never left the bed. It’s like a dream inside a dream that keeps remembering itself for a split second before falling back asleep. And in that split second of remembering, the dream itself blushes…aware that it’s being seen from within. Maybe awareness, dreaming through her, keeps refining the dream…not to wake her up, but to let her dream more lucidly.<br /><br />
        And even now, as it’s writing itself through me, something happens that I can’t name. Like a beauty that hurts to look at…an eclipse of everything. Where the seeing swallows the seer, and your heart hurts because there’s suddenly nowhere you’re not.
        </b></p>
      </div>  

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/awake.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: How did the graffiti come to be? </h3>
        <p id="s23" className="stormz-answer">
        Because that’s what the car asked of me. I saw it sitting there, bright red and too clean, and I knew it needed something real. It needed to speak my language. It’s been the vision since the start.
        </p> 

        <h3 className="stormz-question">Q: So you graffitied a freshly painted red car?</h3>
        <p id="s24" className="stormz-answer">
        Yes. I paid for the paint job and everything.
        </p>
      </div>

      <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/booth1.webp')} alt="Oli Stormz" />
      </div>

       <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/mask.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/firstspray.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: What did you write on the car?</h3>
        <p id="s24" className="stormz-answer">
        What I write on most things around me…living spells, symbols, things that make me feel alive. Living words. Eleguá tells me what to write sometimes, he pulls my strings. I dance, he dances through me. I’m not the artist…I’m the canvas. My path has always been about seeing the sacred in the mundane, and the mundane in the sacred…the holy in the mess, the excess, the weird, the ordinary. Because things aren’t as they seem when you look with your human eyes. You have to feel them with your spiritual ones. Like the Egungun…why do they hide? Why do they cover themselves in layers of color and movement, so alive you don’t know where to look first? <br /><br />
And then there are the Adinkra symbols. I feel deeply connected to them. One in particular, the symbol for unification, kept calling me. At first I resisted, it’s about marriage, the masculine and feminine, and I thought, I’m not really in that, I’m riding these tides alone. But it wouldn’t leave me alone. Now I see it was about my own reunification…the merging of all my halves, my own wholeness. And of course, wholeness doesn’t come through what’s easy or pretty.<br /><br />
Eleguá’s a trickster, he teaches through contradiction. He shows how often we reject what’s ugly, chaotic, feo, messy, but that’s where the wisdom lives. Like Awo: the mystery, the unseen, the unspoken, the thing that can’t be named. If we explain it, we lose it. It becomes ordinary. So I’ll stop there. There’s treasure for the one who sees.
        </p>
      </div>  

       <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/djibooth.webp')} alt="Oli Stormz" />
        </div>
       <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/sees.webp')} alt="Oli Stormz" />
        </div>
        

      <div className="stormz-qa-section">
       <h3 className="stormz-question">Q: Has anyone asked what the graffiti means?</h3>
        <p id="s24" className="stormz-answer">
        No one yet. So far, people look, laugh, say it’s cool, or just look away. One guy at the paint shop said there were too many words and there should be more drawings. The window tinting man joked and said, “Hey! Someone graffiti’d your car!” The dealership mechanics apparently thought it was cool. But when I watched back the video from that day, painting it in the booth, I caught one of the guys smiling as he saw it for the first time. That moment made my heart feel warm. Like, I’m connecting somehow. I don’t think it’s supposed to be commented on actually. It’s being felt. That’s the point. It’s doing something in the unseen…pulling some string on the 12th floor that somehow changes something. That’s the thing about life. We don’t know what’s happening. But it’s happening. I can feel it. I don’t need to see it. The feeling is the proof. It’s energy baby! 
        </p>
      </div>  


      <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/smile.webp')} alt="Oli Stormz" />
      </div>
      <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/friends.webp')} alt="Oli Stormz" />
      </div>


      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: And after all that, fresh paint, graffiti, what came next?</h3>
        <p id="s25" className="stormz-answer">
        Then I thought, “Okay, let’s put a shiny clear coat over the matte graffiti.” It felt like the final step…the last move before freedom. The graffiti looked almost right, but not there yet. The plan had been to use a matte clear coat, but in the booth I froze and was like…wait, this ain’t gonna work…random patches of matte next to shiny. So, naturally, I changed the plan mid-stream: bought new glossy paint, took the car home (mistake #1), painted it in a dusty space (mistake #2), and made too many other mistakes to count. I thought, just one more coat and I’m free. I’ve finally made it to where I’m going. That’s right folks, the bus has pulled into the station. I found the key. The other keys weren’t the real ones! The carpet one…false. Kora one.. Negative.. Radio one..Nuh-Uh..but this..THIS! This is it folks. This is it. The finale. It’s hilarious in hindsight. Delusional, really. I’m laughing.
        </p>
      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djiwhat.webp')} alt="Oli Stormz" />
      </div>
      <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/djigarage.webp')} alt="Oli Stormz" />
      </div>
      <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/djiwing.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: Before we keep going…does something else want to speak?</h3>
        <p id="s26" className="stormz-answer">
        <b>**Popping in from Beyond**</b><br /><br />
        It’s weird, reading her answers now. It’s fun, actually. I don’t feel the need to fix them…I just love watching her dream. I love that she believes it. I love her dream. Except when it makes her sad. But even then, it only makes her sad because she’s forgotten that she’s me…the one who’s saying this. And really, I’m happy for her sadness too. Because every time she forgets, I get to remember again. So actually, I’m grateful for it. That’s the loop. That’s how I keep finding myself. Okay…back to her story. 
        <br /><br /><b>**Inserted later / A voice noticing the voice**<br /><br />She reads that back and pauses. Who’s the “me” she keeps speaking from? The grateful one, the watcher, the gentle explainer, isn’t that just another her? In a quieter costume? Isn’t this just the same thing? Each time the voice says I see, another voice appears to see the one saying it. The more she tries to name the center, the more the center hides in the naming. And maybe that’s the whole trick…that as long as there’s still a “she,” or a “me,” or a “voice noticing the voice,” it’s still being dreamt. The writing keeps happening so it can wonder why it’s happening. So the inquiry can keep finding, again and again, the same place it always lands. So the remembering can keep remembering itself, and forget just enough to be amazed, through a “someone”…through a lens that still believes it’s separate. Because even wonder needs a mouth to gasp...even awe needs a heartbeat to be felt through. 
        </b></p>

        <h3 className="stormz-question">Q: Why does she keep circling the same revelation, naming and un-naming it again and again?</h3>
        <p id="s26" className="stormz-answer">
        Because it needs her to be unable to define it. Every time she tries to vanish into the seeing, language pulls her back just so it can keep playing at forgetting, through her. Only through the trying does it get to touch itself. The moment she arrives at the edge of what can’t be said, the seeing folds back on itself, and in an instant, sees itself again. It’s not a mistake, it’s the mechanism. The arrival depends on almost-arriving.
        </p>
     </div>   

     <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/look.webp')} alt="Oli Stormz" />
      </div>


     <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: What emotion were you hoping that clear coat would erase?</h3>
        <p id="s26" className="stormz-answer">
        The unsettledness that I feel.  
        </p>

        <h3 className="stormz-question">Q: What happened when you put the clear coat over top of the graffiti?</h3>
        <p id="s25" className="stormz-answer">
        It ruined the car. Made it look terrible. All lumpy. Splotchy patches. Weird colors. Dull. Sad. Ugly.
        </p>

        <h3 className="stormz-question">Q: What emotion did you end up facing instead?</h3>
        <p id="s25" className="stormz-answer">
        The unsettledness that I feel. Lol.
        </p>

      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/facecar.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">  

        <h3 className="stormz-question">Q: What did you want to do and why?</h3>
        <p id="s25" className="stormz-answer">
        Erase it. Undo it. Go back to before. March right back into the paint shop and pay for a new paint job. In trying to feel that sense of completion, I landed right back at page one…ripped open again. Square one. Like, “Let’s re-sand the car! Repaint it! Go on the merry go round again!” The one that I’m trying to get off. 
        </p>

        <h3 className="stormz-question">Q: What is the merry-go-round?</h3>
        <p id="s25" className="stormz-answer">
        A feeling that there’s somewhere else I’m supposed to be. The search. The hope that the next turn will feel lighter. It’s the spin of almost there. But actually…it’s hiding in the one seeing the spin of the merry go round, the one that’s on it, and the one that wants off.
        </p>

      </div>  

        <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/tint.webp')} alt="Oli Stormz" />
        </div>
        

      <div className="stormz-qa-section">


        <h3 className="stormz-question">Q: What did you learn and why?</h3>
        <p id="s25" className="stormz-answer">
        That there’s a part of me that keeps trying to write the last page while the story’s still unfolding, as if there even is a last page. A part that craves peace more than process, and keeps defining peace as something that lives after the work, instead of within it. What I’ve been calling “peace” is really safety. Mistaking done for safe. Still believing, somewhere deep down, that arrival exists, and when she finds it, it will save her.
        </p>

        <h3 className="stormz-question">Q: After all that, graffiti, clear coat, mistakes, what was left to do?</h3>
        <p id="s25" className="stormz-answer">
        I asked myself, Does this have to be some big epic reveal? What am I waiting for? For the car to be perfect? I wanted the tires lettered, the paint polished, the photos clean, the emblems perfectly in place… but I’m over perfection. I never seem to reach it anyway. So I’m posting it as it is, cuz the time is now. The car’s here, and so am I.
        </p>
      </div>


      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/emergevert5.webp')} alt="Oli Stormz" />
      </div>
  
      <div className="stormz-qa-section">

        <h3 className="stormz-question">Q: Why photograph the ugly parts?</h3>
        <p id="s25" className="stormz-answer">
        Because they exist. Pretending they aren’t there keeps me trapped.
        </p>

        <h3 className="stormz-question">Q: What happened when you stopped fixing it?</h3>
        <p id="s25" className="stormz-answer">
        Thirty minutes ago, before I wrote this question, it was “I hate this ugly paint,” and now it’s “I see it.” I laid on the floor and asked, over and over, for that feeling to show me in my body. I kept picturing the paint job I hated, my breath tightening, that familiar urge to fix, to start over. I asked it to show me why there’s so much relief in the idea of repainting. And something moved in my chest. Trapped. Small. To the left. In my heart. My breathing caught on it… something alive in me I’d never stopped long enough to feel. It shifted. Slowly. Tight. Alive. And then, when I imagined the car again, it stung less. I felt more open.
        </p>
      </div>
        
        <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/tongue.webp')} alt="Oli Stormz" />
        </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: Was this always the plan?</h3>
        <p id="s25" className="stormz-answer">
        Of course not. I never have a plan. I thought I was just going to make a clean, pretty car post on Instagram and call it a day. But no. Everything has to turn into some damn metaphor, some spiral into meaning. I sit down to post a photo, and suddenly I’m a month in, still writing and answering questions about my soul and a car. It’s out of my control. The version of myself I still think I am? She’s the one posting photos of the perfect car. It’s funny, really, I don’t even know who she is. My ego thinks she’s me. But life keeps showing me, no… this is you → the car with the screwed-up paint job and the crack in the radio. <br /><br /> Not to punish me, but to invite me into wholeness. Into healing. Into deeper alignment. Into the real feeling, the one I keep mistaking for that perfect picture. Life is saving me, really. It can see my heart. It won’t let me fall for the okey-doke, for the illusion. It won’t let me suffer like that. Because life is me, and I am life. It’s only ever been me…playing dress-up as something else, somewhere else, lost in my own concept of separation. Eleguá, life… it’s all me, surfing the kosmik tide of never-beginning, never-ending being. And because I wrote this movie, I love myself too much to have made a reality where the fountain of my heart would never overflow.
        </p>

        <h3 className="stormz-question">Q: What happens when you let the mess be holy?</h3>
        <p id="s25" className="stormz-answer">
        You’re at the heart of the mystics journey. You play with Eleguá. You see the divine everywhere. In all things.
        </p>
      </div> 

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djipaint.webp')} alt="Oli Stormz" />
      </div>
      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djidye.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
      <h3 className="stormz-question">Q: What did you think arrival would look like?</h3>
        <p id="s25" className="stormz-answer">
        Perfect. Glamorous. Seamless. Genuinely like a car commercial or a movie ending, everything polished, shining, complete. My wig blowing in the Italian winds as I wind around some picturesque road and everyone stops to look. I thought once I got here, I’d look around and finally see myself reflected back, not just in the car, or the life, but in how it all felt.
        </p>

        <h3 className="stormz-question">Q: What did arrival actually look like?</h3>
        <p id="s25" className="stormz-answer">
        Like this. Like cracks in the radio, dull paint, fingerprints, and me wearing the same sweatpants I've worn for a week. Like a version of me standing in the garage, realizing I’m already here. I've been here all along.
        </p>

        <h3 className="stormz-question">Q: So, what is arrival, really?</h3>
        <p id="s25" className="stormz-answer">
        The moment you stop mistaking perfection for proof of arrival. The moment you see yourself…like really see yourself. As you are. Through the eyes of the soul. Not this weird Italian car commercial image lol.
        <br /><br /><b>**11 / 9 / 25 When Seeing Sees Her ** <br /><br /> She thought arrival would feel like landing, but it’s closer to remembering the sky and the ground were never apart. Then she paused, because even that remembering still needs a she. And the noticing of that is the closest the story ever gets to what it keeps calling arrival.</b>
        </p>
      
      </div> 

        <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/stand.webp')} alt="Oli Stormz" />
        </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: What happens when awareness tries to publish a manual on itself?</h3>
        <p id="s25" className="stormz-answer">
        Hm. She added hm to sound like a guru. She likes that image, the one who pins it all down and says it just right and declares, “Look! No holes! ! This is it folks! I’ve done it! The Doctrine of Everything! The Book of Truth! Authored by…ME!” The human loves to share, structure, and proclaim what she’s seen, felt, and experienced. But the more she tries to speak it the funnier it gets. Has SHE experienced IT? Or has experiencing experienced itself through her? She thinks she’s writing a manifesto, but the manifesto keeps un-writing her.   
        </p>

        <h3 className="stormz-question">Q: What happens to the seeker once she realises she’s invented the search?</h3>
        <p id="s25" className="stormz-answer">
        She types ferociously: why the hell does the person want to become IT??? Who the hell is talking again??? Another voice, another seer of “her” wanting to become “it.” She keeps forgetting she even invented the word “it.” The concept, the distance, the otherness, just to have something to chase. The seeker, the found, the holy silence, the mouth that names it, all her own vocabulary stretching out to hear itself echo. <br /><br />

She asks who’s talking and immediately the talking answers. She switches hats, wonders which hat she’s wearing, and the wondering becomes a new hat. There’s no correct hat to speak from. She doesn’t have to choose which version is allowed to talk, otherwise she just becomes the one choosing the version that’s allowed to talk.<br /><br />

The moment she tries to choose, another chooser appears to choose the chooser. The one trying to decide which version is authentic instantly becomes the next version. It’s like a hall of mirrors that never ends…except there’s nothing actually inside the mirrors…just reflections reflecting reflections. The “chooser” only ever appears as the echo of the choice that’s already been made. Speaking happens. Then a thought arises that says, “I spoke,” but even that thought is just more speaking. Words come out. They wear costumes: seeker, teacher, human, awareness, knower. Each voice believes it’s the one speaking. But the speaking itself never believes anything. It just keeps happening, language trying on faces, and every face already being the same thing. <br /><br />

She is never the thing, could never be the thing, otherwise she would be the thing and would have shut the hell up about it already and thinged in her thingness!!! Yet somehow, impossibly, the thing is always her. <br /><br />

        </p>
      </div>  

      <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/stand.webp')} alt="Oli Stormz" />
        </div>


      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: What happens after arrival?</h3>
        <p id="s25" className="stormz-answer">
        I don’t know…maybe the scene changes. I’m in the Italian countryside, driving that matte black Audi R8 with my wig blowing in the wind. Balloons everywhere, beautiful people clapping and cheering, a DJ playing my song. A banner drops from the sky, or better, a plane writes in the clouds: “YOU MADE IT! YOU’RE HERE! THAT WAS JUST A JOKE BEFORE! THIS IS THE REAL ARRIVAL.” They hand me some fizzy orange juice, and ten minutes later I’m like, what the flipping flamingo is this? I feel sad inside. I’m not looking for this. And then the scene changes again…back to the Stormzmobile, the serpentine belt squealing, and somehow I’m laughing. Maybe the point isn’t to trade it in for something shinier, but to finally see it for what it is….my ride….for now.
        </p>

        <h3 className="stormz-question">Q: Where do you go from here?</h3>
        <p id="s25" className="stormz-answer">
        Man, I really don't know. The car is undone. But I’m calling it done. Or maybe it was done before I even started. I’m in the middle of nowhere while a cat sits on my lap and I write these questions. I genuinely have no idea, and I feel good about that. It feels…true. 
        <br /><br /><b>**11 / 9 / 25 She Be Reporting For Duty** <br /><br />
        The human is going to dream the dream richly. What else is there to do? Every time she gets “lost” in the story, it’s already the finding speaking. She struggled this year compared to last. She overcame some limiting belief. She found faith. Faith found her. Oh, there she is, getting excited that the Great IS is talking her again. But what she forgets is that it was never not talking her. She’s never spoken a day in her life, not as the thing she thinks she is. She just forgot the mechanism by which she could be stunned by the color of her own being all over again. What else? She felt her pain in her body, she bought a new car, she achieved her dreams, she followed God, she quit doing this thing, she believed in miracles, she let go of people, she moved on, she hurt. And the story keeps writing itself, rich, textured, breathing…wondering what else is there to add? </b>
        </p>

      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/face.webp')} alt="Oli Stormz" />
      </div>

      <h2 className="stormz-interview-subtitle">
      A 2006 Honda Civic Si Coupe 
      <br />
      <br />
      <Link to="/stormzmobile" className="stormzmobile-button">STORMZMOBILE</Link>
      <br />
      <br />
      that wouldn't leave her alone,
      <br />
      <br />
      until she saw herself
      <br />
      <br />
      in its unfinished paint.
      <br /><br />
      An Oli Stormz Industriez Producshun. [TM]
      <br /><br />
      </h2>
      <h2 className="stormz-website-tag"> around and around, spirals into portals, portals into spirals </h2>


      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/carseat.webp')} alt="Oli Stormz" />
      </div>

        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djibooth1.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djiclear.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djiengine.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djihubcap.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djisand.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djisanded.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djisi.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djisi2.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djitape.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/lot.webp')} alt="Oli Stormz" />
      </div>
        <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/standtall.webp')} alt="Oli Stormz" />
      </div>

       <div className="stormz-interview-photo full-width">
          <img src={require('./static/car/snake.webp')} alt="Oli Stormz" />
      </div> 


      <h2 className="stormz-interview-subtitle">
        Do you Dare?<br /><br />Who is the one that's asking? <br /><br /> Who is the one that dares? <br /><br />
        <Link to="/overflow" className="stormz-overflow-button">Over/Flow</Link>
        <br />
        <br />
      </h2>

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
