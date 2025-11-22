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
        I didn’t write this question when I started. It came after, once I'd already written half the interview and realized something else was happening. I’m dropping it here like a breadcrumb from the future. Because by the time I got to the middle, I wasn't the same “I” who began. It started as a car story. A story about her, the one chasing, fixing, yearning. I’m sure you’ve met her by now. But who is the you who has met her? Who is asking? Somewhere along the way, the pronouns started to blur and shift from “she”, to “I”, to “parts of me.” Maybe that’s what this is, not a story, but awareness watching itself wake up, one question at a time. 
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
