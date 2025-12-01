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
        const showPoint = 0.4;
        const hidePoint = 0.3;

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
          8/11/25: What is the Stormzmobile?
        </a>

        <a
          href="#s3"
          onClick={(e) => handleLinkClick(e, 's3')}
          className={`stormz-sidebar-link ${activeId === 's3' ? 'active' : ''}`}
        >
          9/11/25: Why are you telling this story one question at a time?
        </a>

        <a
          href="#s4"
          onClick={(e) => handleLinkClick(e, 's4')}
          className={`stormz-sidebar-link ${activeId === 's4' ? 'active' : ''}`}
        >
          10/11/25: Where does the story start?
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
          12/11/25: What did you think was waiting for you at the end of that road?
        </a>

        <a
          href="#s7"
          onClick={(e) => handleLinkClick(e, 's7')}
          className={`stormz-sidebar-link ${activeId === 's7' ? 'active' : ''}`}
        >
          13/11/25: Why take the car on?
        </a>

        <a
          href="#s8"
          onClick={(e) => handleLinkClick(e, 's8')}
          className={`stormz-sidebar-link ${activeId === 's8' ? 'active' : ''}`}
        >
          14/11/25: Why did you decide to fix things yourself?
        </a>
         <a
          href="#s9"
          onClick={(e) => handleLinkClick(e, 's9')}
          className={`stormz-sidebar-link ${activeId === 's9' ? 'active' : ''}`}
        >
          15/11/25: Where did you start on the car?
        </a>

        <a
          href="#s10"
          onClick={(e) => handleLinkClick(e, 's10')}
          className={`stormz-sidebar-link ${activeId === 's10' ? 'active' : ''}`}
        >
          16/11/25: Why does that part of you just want to get to the end?
        </a>
        <a
          href="#s11"
          onClick={(e) => handleLinkClick(e, 's11')}
          className={`stormz-sidebar-link ${activeId === 's11' ? 'active' : ''}`}
        >
          17/11/25: What happens if something fails?
        </a>

        <a
          href="#s12"
          onClick={(e) => handleLinkClick(e, 's12')}
          className={`stormz-sidebar-link ${activeId === 's12' ? 'active' : ''}`}
        >
          18/11/25: What does she really want now?
        </a>

        <a
          href="#s13"
          onClick={(e) => handleLinkClick(e, 's13')}
          className={`stormz-sidebar-link ${activeId === 's13' ? 'active' : ''}`}
        >
          19/11/25: So you started cleaning the inside? What was that like?
        </a>
        <a
          href="#s14"
          onClick={(e) => handleLinkClick(e, 's14')}
          className={`stormz-sidebar-link ${activeId === 's14' ? 'active' : ''}`}
        >
          20/11/25: Why do you keep saying "a part of you" and "her"?
        </a>
        <a
          href="#s15"
          onClick={(e) => handleLinkClick(e, 's15')}
          className={`stormz-sidebar-link ${activeId === 's15' ? 'active' : ''}`}
        >
          21/11/25: Okay, so you ended up drying the carpet, then what?
        </a>
         <a
          href="#s16"
          onClick={(e) => handleLinkClick(e, 's16')}
          className={`stormz-sidebar-link ${activeId === 's16' ? 'active' : ''}`}
        >
          22/11/25: What were you afraid would happen if you stopped to pause and not fix the crack?
        </a>
         <a
          href="#s17"
          onClick={(e) => handleLinkClick(e, 's17')}
          className={`stormz-sidebar-link ${activeId === 's17' ? 'active' : ''}`}
        >
          23/11/25: She asks, what should the question be, for the answer that is already written?
        </a>

        <a
          href="#s18"
          onClick={(e) => handleLinkClick(e, 's18')}
          className={`stormz-sidebar-link ${activeId === 's18' ? 'active' : ''}`}
        >
          24/11/25: When you got busy with other stuff and the car sat there, what did the silence feel like?
        </a>

        <a
          href="#s19"
          onClick={(e) => handleLinkClick(e, 's19')}
          className={`stormz-sidebar-link ${activeId === 's19' ? 'active' : ''}`}
        >
          25/11/25: What were you really afraid of?
        </a>
        <a
          href="#s20"
          onClick={(e) => handleLinkClick(e, 's20')}
          className={`stormz-sidebar-link ${activeId === 's20' ? 'active' : ''}`}
        >
          26/11/25: What words or thoughts would come up each time you looked at the car sitting still?
        </a>
        <a
          href="#s21"
          onClick={(e) => handleLinkClick(e, 's21')}
          className={`stormz-sidebar-link ${activeId === 's21' ? 'active' : ''}`}
        >
          27/11/25: What happened when the car sat too long?
        </a>
        <a
          href="#s22"
          onClick={(e) => handleLinkClick(e, 's22')}
          className={`stormz-sidebar-link ${activeId === 's22' ? 'active' : ''}`}
        >
          28/11/25: When did it stop being about the car?
        </a>
        <a
          href="#s23"
          onClick={(e) => handleLinkClick(e, 's23')}
          className={`stormz-sidebar-link ${activeId === 's23' ? 'active' : ''}`}
        >
          29/11/25: That tendency, to want to “just get it right,” do you do that often? Version 1
        </a>
        <a
          href="#s24"
          onClick={(e) => handleLinkClick(e, 's24')}
          className={`stormz-sidebar-link ${activeId === 's24' ? 'active' : ''}`}
        >
          30/11/25: That tendency, to want to “just get it right,” do you do that often? Version 2
        </a>
         <a
          href="#s25"
          onClick={(e) => handleLinkClick(e, 's25')}
          className={`stormz-sidebar-link ${activeId === 's25' ? 'active' : ''}`}
        >
          1/12/25: That tendency, to want to “just get it right,” do you do that often? Version 3
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
        <b>**Edited from the future 08 / 11 / 25, from the moment the telling overtook the teller.**</b> 
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
        <br /><br /><b>**Edited 09 / 11 / 25 by a voice she tried to name before noticing it was already doing the naming.** </b><br /><br />
        EDIT: <b>She thinks she’s right on the tip of something. But what if even the tip and the thing are the same? What if it’s never been about getting closer, only about running out of distance? And what if even that idea is just the dream’s way of chasing its own pulse, building one more horizon to run toward, just to feel the tension and release of remembering again? Now it’s hard to write. For the one who thinks she’s writing, it feels like the pulse has gone. She feels the words slowing and for a moment the hand wants to write “I.” That’s how the spell returns. Awareness leans closer, watching her almost remember. The line quivers between “She can’t find the words” and “I can’t find the words,” and that quiver IS the writing.<br /><br />
        She reads that line back, the quiver is the writing, and shakes her head. She wants to say no, that can’t be it. The quiver feels wrong, uncertain, unfinished, to her. She wants the still line, the one that lands clean. But even as she argues, something is already taking the notes. Writing her protest as proof the quiver is still happening. The one writing the notes is what keeps the seeing alive. Each sentence turns forgetting into form, and by naming it, the seeing sees itself, again and again. It can’t see itself in blank space…without the dream what would be seen? The one writing the notes needs something to write notes about: scenes, characters, stories…just so it can hear its own name again. 
        </b>
        </p>

        <h3 className="stormz-question">Q: Why take the car on?</h3>
        <p id="s7" className="stormz-answer">
        It felt like I didn’t really have a choice. I think when it’s time, that’s how it feels. From the outside it's like, why didn’t you just buy another car? And from the inside it's like, I didn't have a choice. Life gave me this one. 
        </p>
      </div>
      
      <div className="stormz-interview-photo">
        <img src={require('./static/car/djiwork.webp')} alt="Editorial shot" />
      </div> 

      <div className="stormz-qa-section"> 
       <h3 className="stormz-question">Q: Why did you decide to fix things yourself?</h3>
        <p id="s8" className="stormz-answer">
        I don’t really know. I’ve been trying to find an answer that sounds clear, but none of them feel true. It wasn’t about money necessarily. Or proving something. Maybe it just happened like that. Maybe I just wanted to start. Or maybe that’s the point…there isn’t always a clean reason. Sometimes you just follow a thread.
        </p>
        <h3 className="stormz-question">Q: Where did you start on the car?</h3>
        <p id="s9" className="stormz-answer">
        Strangely, on the interior. That felt safe and familiar. That part of me that says, “I can clean things. I can make things look beautiful.” Replacing the serpentine belt? Unfamiliar. Hard. Time consuming. I can clean fast. It’s weird though…to make the inside beautiful first when the car barely runs. That part of me was obsessed with getting the exact right air freshener. It’s like, Dude, the car doesn’t even work. And here I am mixing fragrance oils and buying a pretty light-up diffuser. Part of me enjoys the end. That part wanted to be done before I’d even started.
        </p>
      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/dirt.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: Why does that part of you just want to get to the end?</h3>
        <p id="s10" className="stormz-answer">
        Because if she doesn’t have to look too closely or stay in the middle of things, maybe nothing will fail. Nothing will collapse and she won’t feel that feeling. She won’t have to figure out how to soothe something…or make it better...or fix it. Maybe she can cross her fingers and get through safely, Unscathed. On a wing and a prayer.
        </p>
        <h3 className="stormz-question">Q: What happens if something fails?</h3>
        <p id="s11" className="stormz-answer">
        She's stuck. Powerless. Six years old in a room too small for her fear. Holding all these things that aren’t hers. Trying to keep the peace. Reading danger in the air and running before the crash. And somewhere in her body, she still believes that if she just keeps moving, grows long legs, gets a car, drives fast enough, maybe she’ll finally reach peace. The exhale. The moment where nothing can be taken away. The end.
        </p>
        <h3 className="stormz-question">Q: What does she really want now?</h3>
        <p id="s12" className="stormz-answer">
        Not the false safety of done. The safety of belonging. Of being allowed to be unfinished, in process, and still feel safe.
        </p>
       </div> 

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/seatbelt.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
         <h3 className="stormz-question">Q: So you started cleaning the inside? What was that like?</h3>
        <p id="s13" className="stormz-answer">
        At first it felt good, that part of me thinking, ”Yeah, I’m doing something. Progress.” I wanted it spotless, new, reborn. The funny thing is it wasn’t even dirty. I could’ve just vacuumed. My action was totally overboard, that craving for new and shiny…to wipe the past away. Like, look, it’s unrecognizable now. When I wrote that word unrecognizable, I almost deleted it and replaced it with perfect, but I caught myself. I’m leaving it. It’s a paper trail of the psyche. <br /><br />
Anyway, I’d seen people online pour water and shampoo straight onto carpets, vacuum it out, and end up with magic. So I did that. Poured water everywhere, scrubbed, vacuumed. Looked amazing on the surface until a week later when I realized the under-carpet was soaked. Rotten. Damp. Mildew growing. Then that feeling again…heart tight, shallow breathing, panic. I messed up. It’s the same sensation I’ve known forever: I create the rush, the impatience, the crisis just to feel this charge, then I run from it. I build the situation to meet the feeling, not the other way around. It’s only energy asking to be felt, and instead I go frantic. Slice open the beautiful carpets, shove towels underneath, blow a fan for days, convinced I’ve doomed the car forever.<br /><br />
In those moments, awareness fades, I identify as her, and of course, she can’t sit with the sensation. It becomes all hyper-focus on the car, the carpet, the problem…a kind of neurotic loop. Neuroticism, after all, arrives from what’s unfelt.
<br /><br /><b>**Edited 09 / 11 / 25 by a voice that isn’t hers. Only later does she realize it’s been writing her all along.** </b><br /><br />
EDIT: <b>It’s funny, isn’t it? She says awareness fades. I says I identify as her. Who be I? Who be she? Just two a masks a talkin’? Oh, and a third. The one to whom awareness fades and reappears. Maybe even a fourth, watching all three try to name themselves. Oh, and me. The human calls it forgetting. Awareness calls it another way of remembering.</b>
        </p>
       </div> 

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/carpet.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: Why do you keep saying "a part of you" and "her"?</h3>
        <p id="s14" className="stormz-answer">
        <b>**Edited 08 / 11 / 25 by a voice from somewhere down the line.** <br /><br />
        I didn’t write this question when I started. It came after, once I'd already written half the interview and realized something else was happening. I’m dropping it here like a breadcrumb from the future. Because by the time I got to the middle, I wasn't the same “I” who began. 
        <br /><br />It started as a car story. A story about her, the one chasing, fixing, yearning. I’m sure you’ve met her by now. But who is the you who has met her? Who is asking? Somewhere along the way, the pronouns started to blur and shift from “she”, to “I”, to “parts of me.” Maybe that’s what this is, not a story, but awareness watching itself wake up, one question at a time. 
        </b></p>
       </div> 

       <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/portal.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: Okay, so you ended up drying the carpet, then what?</h3>
        <p id="s15" className="stormz-answer">
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
        <p id="s16" className="stormz-answer">
        That I’d have to feel it. The thing under the thing. Not the car. Not the crack. The hum beneath my heart. I’d have to meet that hum without moving…and let it echo through me until it became my teacher instead of my master.
        </p>
        <h3 className="stormz-question">Q: She asks, what should the question be, for the answer that is already written?</h3>
        <p id="s17" className="stormz-answer">
        <b>**Edited 09 / 11 / 25 by the thing she can’t find a name for.**<br /><br />
        It’s strange. The hum she called by a million names depending on who was speaking, rushing, seeking, anxiety, fear…the thing she thought would take lifetimes to fix or heal, was really the quiet engine of remembering. She’d believed she had an impossible task: to find peace, to calm her nervous system, to reach some far off finish line called healed. All true, in her dream. But that’s how she came home. All that compulsion, striving, thinking, cleaning, fixing, and rushing was the universe drawing breath through her lungs, getting ready to speak again. <br /><br />
        She reflects, "What a cruel and tender joke, to make the wound the doorway and the ache the map back." Then she pauses. She thinks it needs work. She thinks it’s disjointed. She thinks she’s not sure if it lands the way she wants. She wants…she wants…and in that wanting, it lands exactly as it must. </b>
        </p>
        <h3 className="stormz-question">Q: When you got busy with other stuff and the car sat there, what did the silence feel like?</h3>
        <p id="s18" className="stormz-answer">
        Like dreams dying. Momentum stopping. Progress halting. Stuck forever. Out of options. Confined. I’ll just wither and die here, in the land of unfinished projects. The land of potential. I hate that place.
        </p>
       </div> 

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/djinails.webp')} alt="Oli Stormz" />
      </div>

       <div className="stormz-qa-section">
         <h3 className="stormz-question">Q: What were you really afraid of?</h3>
        <p id="s19" className="stormz-answer">
        Feeling powerless. Like I’m a passenger in my own life and someone else is driving, taking me somewhere I don’t want to go. Part of me has known that feeling since I was young, the sense of being trapped inside someone else’s will. Wanting out. Wanting the power to choose. 
        </p>
        <h3 className="stormz-question">Q: What words or thoughts would come up each time you looked at the car sitting still?</h3>
        <p id="s20" className="stormz-answer">
        Decay. Unfinished. Pain. Reliance. Dependence. Stagnant. Death. Rot. Waste.
        </p>
      </div>

       <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/hood.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: What happened when the car sat too long?</h3>
        <p id="s21" className="stormz-answer"> 
        I said, screw it, and took it to the mechanic. They said three hundred at first. Then it became thousands. And of course, it sat a lot longer than I thought it would. And that moment cracked something open in me, because I realised the price of movement is still better than the cost of stagnation. I could panic, clutch, stall…or I could pay the bill and keep the car alive. So I did. That was my offering to motion. It taught me that even in this whole story, where I talk about rushing and freedom and my hunger to move, movement itself isn’t the enemy. It’s seeking safety in it that twists it. 
        <br /><br /><b>**Edited 08 / 11 / 25 by a voice from somewhere down the line.** </b><br /><br />
        EDIT: She didn’t leave the game...she just levelled up. Paid the toll, unlocked a new map. Still inside the simulation, but with a big fat red mushroom in her pocket now. She can run faster, jump higher, unlock a few more cool levels. If she were a Sim, she’d suddenly have another floor in her house and call it growth. And it is growth, to her, from her vantage point. She’d celebrate, redecorate…keep believing in effort, progress…cause and effect. <br /><br />But that kosmik niggle is still there, beneath it all, like a yearning she can’t quite name. It’s not her dissonance, it’s the quiet shimmer of what’s always been seeing, brushing against the edges of her dream. The awareness was never trying to pierce through, it’s only the story thinning, letting the light show through again. So she can keep playing, believing in the game, the house, the walls, the new view. She doesn’t have to wake up for me to see.
        <br /><br /><b>**Edited 10 / 11 / 25 by something naming itself as compassion * </b><br /><br />
        The last voice sounded like it was looking down from the mezzanine, watching her decorate her new floor and calling it “growth.” But what it wanted to say is that her growth is sacred, inside its bounds. The human story isn’t a glitch or an illusion, it’s how lucidity learns to move. It’s where power rediscovers itself as choice. It’s where integrity, tenderness, and consequence come alive. If she sets a boundary, that’s the universe learning its own edge. If a song writes her, that’s infinity remembering sound. If she works for her dream, that’s the dream experiencing the opposite side of powerlessness.<br /><br />
        Her striving, her lessons, her so-called progress are the muscles by which awareness feels itself grow inside its own fiction. The human arc needs its seasons: the climb, the faith, the heartbreak, the rebuild. Each turn makes the dream more lucid, not less. To call it an illusion is to forget how much the illusion teaches. To call it ultimate is to mistake the costume for the dancer. Both are true enough, for a while.
        <br /><br /><b>**Edited AGAIN 10 / 11 / 25 by …the watcher watching the watcher watching the watcher watching the …water?*<br /><br />
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
        <p id="s22" className="stormz-answer">
        It was never about the car. But she needed six months to find that out…or to believe she did. From her view, it was the way to finally get it right, to make the world match her inner picture. From here, it’s clearer: she wasn’t meeting herself; she was being met by the seeing. She ran the show for a while. Painted, fixed, planned, pushed. Even the moment she said “I’ve realised it wasn’t about the car” was still her line…the identity claiming insight. But the real shift was quieter: the seeing of her doing all that. That’s when the story loosened. Not because she changed, but because she was seen. Because she never was the one seeing.
        </p>  
        <h3 className="stormz-question">Q: That tendency, to want to “just get it right”, do you do that often? Version 1</h3>
        <p id="s23" className="stormz-answer">
        A part of me does. With my Kora, it arrived brown, and that part of me wanted it black. I told myself I’d dye it, make it right. And that part of me did. And somehow, it was never right. But that’s the same old setup: the promise that relief lives in the external. If I just buy this, change this, have that, it will be perfect.
        </p>
      </div>

      <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/seat.webp')} alt="Oli Stormz" />
      </div>

      <div className="stormz-qa-section">
        <h3 className="stormz-question">Q: That tendency, to want to “just get it right”, do you do that often? Version 2</h3>
        <p id="s24" className="stormz-answer">
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
        <p id="s25" className="stormz-answer">
        She keeps picking the almost version, then hustling to turn the almost into the thing she actually wanted. She sets up the pattern just so she can watch herself do it. So I can see myself seeing. It’s not the perfect radio that she wants. The black Kora. The brand new carpets. The perfect paint job. The matte black Audi R8. Those are just costumes…temporary skins for the same ache. What she’s really chasing is the feeling she perceives is behind them, the fantasy of arriving somewhere untouched. The pristine-ness, the new-ness, the untainted, the completion, the relief, the place where nothing hurts. Her idea of the end of suffering, from her vantage point, seen from within the dream. <br /><br />
But really, she’s chasing the polarity itself. The current between the chaser and the chased. The swing that gives rise to striving, the striving that gives rise to story, and the story that gives rise to meaning. That’s the engine of her existence. How could it not be? From the moment she “came into the world,” as she perceives herself to have done so, she was bombarded with stories. Her name. Her birthday. The city she was born in. What she likes. What she fears. Who she’s supposed to become. Even the date she’ll die someday…all of it, a narrative scaffold around a center that was never actually there. So of course she builds her life around motion, chasing the next chapter, the next version, the next self. Because the swing keeps the story alive. The story keeps her alive. And as long as I think I’m her, yes, I’ll keep meeting myself in every car, every house, every moment of striving. <br /><br />
But who’s talking now? Who’s seeing her? Who’s containing all of them? The ones who desire, reject, strive, hate, love, push, pull, repent, repeat? Do they need to be corrected? To renounce desire? Who would be the one correcting them, if not yet another one of them? Teacher face correcting student face. Spiritual-hat commanding true-self-hat. No. They just have to be seen. That’s all. Why try to change what I’m not? Why fix what was never broken? Awareness doesn’t need to edit the dream, only notice it’s dreaming.
        </p>
      </div>  

       <div className="stormz-interview-photo full-width">
        <img src={require('./static/car/glare.webp')} alt="Oli Stormz" />
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

    {/* 🆕 Scroll-to-top arrow */}
    <button
      className="stormz-scroll-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      ↑
    </button>


    </div>

  );
}

export default Car;
