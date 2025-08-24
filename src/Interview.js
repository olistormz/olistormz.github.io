import React, { useEffect, useRef, useState } from "react";
import './Interview.css'; // We'll style it separately
import { Link } from 'react-router-dom';


function Interview() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeId, setActiveId] = useState('');
  const audioRef = useRef(null);

  const handleLinkClick = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveId(id);
  }
};


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.answer');
      let currentId = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 300 && rect.bottom >=100 ) {
          currentId = section.id;
        }
      });
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


        // 🎵 Fade-in autoplay when page loads
    // Inside Interview component
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
    <div className={`interview-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? '←' : '→'}
      </button>

      {sidebarOpen && (
        <div className="sidebar-container">

        <a
          href="#q1"
          onClick={(e) => handleLinkClick(e, 'q1')}
          className={`sidebar-link ${activeId === 'q1' ? 'active' : ''}`}
        >
          1. Who is Oli Stormz?
        </a>

        <a
          href="#q2"
          onClick={(e) => handleLinkClick(e, 'q2')}
          className={`sidebar-link ${activeId === 'q2' ? 'active' : ''}`}
        >
          2. Who are you?
        </a>

        <a
          href="#q3"
          onClick={(e) => handleLinkClick(e, 'q3')}
          className={`sidebar-link ${activeId === 'q3' ? 'active' : ''}`}
        >
          3. Why should anyone care?
        </a>

        <a
          href="#q4"
          onClick={(e) => handleLinkClick(e, 'q4')}
          className={`sidebar-link ${activeId === 'q4' ? 'active' : ''}`}
        >
          4. Why did you decide to interview yourself?
        </a>

        <a
          href="#q5"
          onClick={(e) => handleLinkClick(e, 'q5')}
          className={`sidebar-link ${activeId === 'q5' ? 'active' : ''}`}
        >
          5. How does your music reflect the life you’ve lived?
        </a>

        <a
          href="#q6"
          onClick={(e) => handleLinkClick(e, 'q6')}
          className={`sidebar-link ${activeId === 'q6' ? 'active' : ''}`}
        >
          6. Do you believe in fate, or are you building it brick by brick?
        </a>

        
        <a
          href="#q7"
          onClick={(e) => handleLinkClick(e, 'q7')}
          className={`sidebar-link ${activeId === 'q7' ? 'active' : ''}`}
        >
          7. What’s something people don’t realize about your process or your life?
        </a>

        <a
          href="#q8"
          onClick={(e) => handleLinkClick(e, 'q8')}
          className={`sidebar-link ${activeId === 'q8' ? 'active' : ''}`}
        >
          8. Do you think people mistake what you do for fashion?
        </a>

        <a
          href="#q9"
          onClick={(e) => handleLinkClick(e, 'q9')}
          className={`sidebar-link ${activeId === 'q9' ? 'active' : ''}`}
        >
          9. What’s your take on performative spirituality?
        </a>

        <a
          href="#q10"
          onClick={(e) => handleLinkClick(e, 'q10')}
          className={`sidebar-link ${activeId === 'q10' ? 'active' : ''}`}
        >
          10. What do people misunderstand about power?
        </a>

        <a
          href="#q11"
          onClick={(e) => handleLinkClick(e, 'q11')}
          className={`sidebar-link ${activeId === 'q11' ? 'active' : ''}`}
        >
          11. What’s one assumption people always make about you that’s completely wrong?
        </a>

        <a
          href="#q12"
          onClick={(e) => handleLinkClick(e, 'q12')}
          className={`sidebar-link ${activeId === 'q12' ? 'active' : ''}`}
        >
          12. Do you ever feel like your art knows you better than you know yourself?
        </a>

        <a
          href="#q13"
          onClick={(e) => handleLinkClick(e, 'q13')}
          className={`sidebar-link ${activeId === 'q13' ? 'active' : ''}`}
        >
          13. When did you first feel like you were carrying something bigger than yourself?
        </a>

        <a
          href="#q14"
          onClick={(e) => handleLinkClick(e, 'q14')}
          className={`sidebar-link ${activeId === 'q14' ? 'active' : ''}`}
        >
          14. What’s your actual perspective on life right now? Hopeful, cynical, both?
        </a>

        <a
          href="#q15"
          onClick={(e) => handleLinkClick(e, 'q15')}
          className={`sidebar-link ${activeId === 'q15' ? 'active' : ''}`}
        >
          15. Which single choice changed your trajectory the most?
        </a>

        <a
          href="#q16"
          onClick={(e) => handleLinkClick(e, 'q16')}
          className={`sidebar-link ${activeId === 'q16' ? 'active' : ''}`}
        >
          16. If you could tell the world one sentence, and that’s all they remember of you, what would it be?
        </a>

        <a
          href="#q17"
          onClick={(e) => handleLinkClick(e, 'q17')}
          className={`sidebar-link ${activeId === 'q17' ? 'active' : ''}`}
        >
          17. What’s the scariest thing about being seen? Or not being seen at all?
        </a>

        <a
          href="#q18"
          onClick={(e) => handleLinkClick(e, 'q18')}
          className={`sidebar-link ${activeId === 'q18' ? 'active' : ''}`}
        >
          18. What’s the best gift you’ve ever received?
        </a>

        <a
          href="#q19"
          onClick={(e) => handleLinkClick(e, 'q19')}
          className={`sidebar-link ${activeId === 'q19' ? 'active' : ''}`}
        >
          19. Was there a moment when someone believing in you changed everything?
        </a>

        <a
          href="#q20"
          onClick={(e) => handleLinkClick(e, 'q20')}
          className={`sidebar-link ${activeId === 'q20' ? 'active' : ''}`}
        >
          20. What has been your greatest obsession or passion?
        </a>

        <a
          href="#q21"
          onClick={(e) => handleLinkClick(e, 'q21')}
          className={`sidebar-link ${activeId === 'q21' ? 'active' : ''}`}
        >
          21. Would younger you be shocked at who you’ve become?
        </a>

        <a
          href="#q22"
          onClick={(e) => handleLinkClick(e, 'q22')}
          className={`sidebar-link ${activeId === 'q22' ? 'active' : ''}`}
        >
          22. Which object in your house accidentally explains you better than words?
        </a>

        <a
          href="#q23"
          onClick={(e) => handleLinkClick(e, 'q23')}
          className={`sidebar-link ${activeId === 'q23' ? 'active' : ''}`}
        >
          23. How do you reconcile being fiercely independent with your longing for deep connection?
        </a>

        <a
          href="#q24"
          onClick={(e) => handleLinkClick(e, 'q24')}
          className={`sidebar-link ${activeId === 'q24' ? 'active' : ''}`}
        >
          24. What do you mourn about the version of you that didn’t make it here?
        </a>

        <a
          href="#q25"
          onClick={(e) => handleLinkClick(e, 'q25')}
          className={`sidebar-link ${activeId === 'q25' ? 'active' : ''}`}
        >
          25. Do you think there’s something mystical about the way your path unfolded?
        </a>

        <a
          href="#q26"
          onClick={(e) => handleLinkClick(e, 'q26')}
          className={`sidebar-link ${activeId === 'q26' ? 'active' : ''}`}
        >
          26. What advice would you give, knowing most people will ignore it anyway?
        </a>


        </div>
      )}

      {/* 🎵 Background audio */}
      <audio ref={audioRef} loop playsInline>
        <source src="/interview-bg.m4a" type="audio/mp4" />
        <source src="/interview-bg.mp3" type="audio/mpeg" />
      </audio>



    <div className="interview-page">
      <div className="back-button-container">
        <Link to="/home" className="back-button">HOMEPAGE</Link>
      </div>
     
      <h1 className="interview-title">I Inter-Galactically-Viewed Myself</h1>
      <h2 className="interview-subtitle">
      This isn’t press. It’s prophecy. Press-ophecy. 
      <br />
      <br />
      An Oli Stormz Ophthalmology.
      <br />
      <br />
      Chicken head cuisineology. 
      <br />
      <br />
      Anyone seen P. Sherman? I already checked 42 Wallaby. 
      </h2>

      <div className="interview-photo full-width">
        <img src={require('./static/interview-1.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
        <h3 className="question">Q: Who is Oli Stormz?</h3>
        <p id="q1" className="answer">
          The producer, the artist, the songwriter, the director, the videographer, the editor, the engineer, the weight-lifter, the 3D animator, the car mechanic, the clothes maker, the metal bender, the amulet designer, the computer coder, the clay sculpter, the perfumer, the hair braider, the stock trader, the henna painter...whatever the vision.
        </p>

        <h3 className="question">Q: Who are you?</h3>
        <p id="q2" className="answer">
        The woman behind the curtain, the curtain itself. The puppet dancing on the stage, the floor sweeper that enters from stage left. The light that flickers, the audience watching the play. The man that shows up late, the man that shows up early. The play happening at the same time, at another playhouse down the street. The playhouse, the street. Again, and again, forever, and ever. Nothing. Everything. 
        </p>

        <h3 className="question">Q: Why should anyone care?</h3>
        <p id="q3" className="answer">
        Nobody pays attention to the sky until the thunder cracks. By then, it’s already raining. And when the rain comes, there’s nowhere to hide.
        That’s me. I’m the rain. The quiet storm you don’t see coming…until I'm everywhere. But this isn’t the kind of storm you hide from. This is the kind you grab your multicolored umbrella for…and watch the rainbow split the sky wide open. A global rainbow.
        </p>

      </div>

    

      <div className="interview-photo">
        <img src={require('./static/interview-2.webp')} alt="Editorial shot" />
      </div>

      <div className="qa-section">

      <h3 className="question">Q: Why did you decide to interview yourself?</h3>
        <p id="q4" className="answer">
          Because I was tired of sitting around waiting for someone to ask me what I have to say. 
        </p>

      <h3 className="question">Q: How does your music reflect the life you’ve lived?</h3>
        <p id="q5" className="answer">
        I can’t point to details and say, “This lyric is because of that moment” or “This sound is because I lived there.” It’s deeper than that. My music is only possible because of the life I’ve lived, the inner life, not just the external one. And I never set out to make music, it just… started making me. <br /><br />
The places, the people, the cultures… those are part of it, sure. But the real story is the path: the boundaries I’ve had to set, the truths I’ve had to face, the way I’ve had to choose myself again and again. Living by my values, stripping away what wasn’t real, learning to see clearly.
The music is just the external echo of all that. It’s not about the art itself, it’s about what had to happen inside me for this art to even exist. That’s what you’re hearing.
        </p>

        <h3 className="question">Q: Do you believe in fate, or are you building it brick by brick?</h3>
        <p id="q6" className="answer">
          Maybe it looks like, to the world, I’m building it brick by brick… but fate is lifting the bricks. Lifting my hands. It’s all guided. Where I go. What I do. What I buy. Like Awo in Ifá, it's...unexplainable.
        </p>
      </div>


      <div className="interview-photo full-width">
        <img src={require('./static/interview-3.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
       <h3 className="question">Q: What’s something people don’t realize about your process or your life?</h3>
        <p id="q7" className="answer">
          That I’ve lived through many stages to arrive here. People see me now and think, Oh, there she is, easy. Buy a keyboard, plug it in, make a song. Put on something fashionable, take a photo. Boom.
But what they don’t see is the lifelong obedience to the voice inside me and what it’s asked of me. That voice has brought me to the edge, again and again. It’s asked me to take the hardest steps. To see truths I didn’t want to see. To do what I know I must do.<br /><br />
It’s brutal because once you hear it, there’s no more ignorance. And then it takes over your life. You have to obey it. To trust it. Even when it says: Move there. Stop this. Begin that. Spend all this money on this random thing that you don’t understand why you need it but you will. Or when it whispers: Tell the truth. Sit still. Let it fall apart. Stay in the discomfort.<br /><br />
It’s an all-controlling force… but it’s for your exaltation. For your destiny. For your full blossoming into what you know you came here to be. The ego wants to shortcut that, to bargain, to rationalize. But this path takes everything from the ego, sooner or later.
        </p>
         <h3 className="question">Q: Do you think people mistake what you do for fashion?</h3>
        <p id="q8" className="answer">
Yes. I often get people saying they “love my look” or something like that, but each choice, sound, fabric, object, carries meaning. They’re living forces.
There’s a relationship between them and the wearer… it’s symbiotic. The object permits the wearer, and the wearer consecrates the object. And the objects let you know when they’re ready to co-create with you. To live alongside you. To be shown to the world through you. Through new eyes.
        </p>
      </div>

      <div className="interview-photo full-width">
        <img src={require('./static/interview-4.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
        <h3 className="question">Q: What’s your take on performative spirituality?</h3>
        <p id="q9" className="answer">
        A lot of people think essence can be worn like a jacket. That you can perform enlightenment by buying crystals, putting on a caftan, leading a meditation, burning sage, calling yourself a healer. But expression isn’t the same as identity. We’re in an era where people want the light, but not the process. The gift, but not the purification…because that part already knocked on their door… and they said no thanks, they’ll just stick with the caftan.<br /><br />
But no amount of curated expression can cover up an unintegrated inner life. If your choices, your relationships, your habits don’t match the frequency you’re projecting… it’s hollow. Maybe the outside world won’t see it right away. But you’ll know. And that distortion builds. You’ll feel it. And people will feel it, whether they realize it or not. Especially people who are really walking in it.<br /><br /> 
The vibration on this planet is getting too high for anything fake to survive. You either live in integrity… or eventually, the path will strip you of everything that isn’t true. So…beware the caftan. You might just get more than you bargained for putting that on. You’re calling in the big gunz. POW POW.
        </p>

         <h3 className="question">Q: What do people misunderstand about power?</h3>
        <p id="q10" className="answer">
        People think power is about dominance. But real power is energetic clarity. If you don’t know who you are, someone else will decide for you AND they’ll profit from it. I think the next wave of true leadership will come from people who educate others on that kind of sovereignty. Because too many bright lights have been lost to energetic slavery.<br /><br />People want the sauce without chopping the tomatoes, cutting the onion, the onion burning their eyes, the sauce burning, having to make it again and again. They want the outcome but not the process that forges it. They’re too addicted to the illusion of who they think they are…who they want to be seen as. So instead of going on the journey, they find someone who has. And they try to get it that way. Through the back door. Real sneaky. But they haven’t earned it. Haven’t paid the price.<br /><br />

Sometimes it comes disguised as a gift. Buying you. Friendship. Admiration. Collaboration. But energetically, the contract is the same: give me your sauce, and I’ll pretend I earned it. And if you’re not awake to that, you’ll mistake siphoning for connection.

A lot of people don’t realize they’re even doing it. It’s unconscious. So, if you got the POWA, read between the lines. See the dynamics. Don’t let the 3D world gaslight you. Beware of the friendly. Be open to the real.
        </p>
       </div> 


      <div className="interview-photo full-width">
        <img src={require('./static/interview-11.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
        <h3 className="question">Q: What’s one assumption people always make about you that’s completely wrong?</h3>
        <p id="q11" className="answer">
        That everything is easy for me. That I haven’t been through anything. And also, that I’m a perfectionist. I’ve heard that a few times and I never understand it. I’m actually not detail-oriented at all.
In my work, I don’t let perfection stop me. I release things at “good enough” and move on. But where I am perfectionistic is in what I’m willing to show. I hide my pain well, mostly from myself.<br /><br />
My ego tucks it into my body, into my subconscious, like a secret I’m not ready to find. And you can’t really play hide and seek in the same body. There’s nowhere to go. So it leaks out in other ways.
        </p>

         <h3 className="question">Q: Do you ever feel like your art knows you better than you know yourself?</h3>
        <p id="q12" className="answer">
          Yes… definitely. It always throws me up against the next layer I don’t think I’m ready for yet.
          Like… the next weird rap line that comes out and I’m thinking, “What the hell are people gonna think when they hear this one?”
          It always pushes me beyond the safe stuff. Beyond current societal topics, beyond the judgments, beyond the ways people crucify each other. It forces me to live in the moment… outside of what anyone has to say about it.
        </p>
       </div> 


      <div className="interview-photo full-width">
        <img src={require('./static/interview-5.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
        <h3 className="question">Q: When did you first feel like you were carrying something bigger than yourself?</h3>
        <p id="q13" className="answer">
The moment I realized I was a leader. Not in the traditional sense… no fame, no title. Just the quiet weight of knowing people notice you even when you don’t realize it. That you influence without trying. We all do. Some just choose not to notice… consciously or unconsciously.<br /><br />
When I saw that, I had to make changes. If I was going to influence anyone, even one person, I wanted it to be toward freedom. True freedom. Emotional, psychological, physical, spiritual. And the only way to do that was to live it myself. And I’m always a work in progress.
        </p>

        <h3 className="question">Q: What’s your actual perspective on life right now? Hopeful, cynical, both?</h3>
        <p id="q14" className="answer">
Always hopeful. I’ve never given up. It’s never even crossed my mind. Life is either a daring adventure or nothing at all.        
        </p>
       </div> 

      <div className="interview-photo full-width">
        <img src={require('./static/interview-6.webp')} alt="Oli Stormz" />
      </div>

       <div className="qa-section">
        <h3 className="question">Q: Which single choice changed your trajectory the most?</h3>
        <p id="q15" className="answer">
        Hmm. Probably three, actually: celibacy, no drinking, no substances. Those choices completely rewired how I relate to the world and to myself. They forced me to go against the crowd. To say no. To face the fear of being alone, being misunderstood, being judged.
If I wasn’t chasing some bigger, brighter, louder, more transcendental experience, or looking for a relationship…then what am I? Why am I doing these things? What does my soul have to say about it? Do I do them because everyone else does? What am I seeking?<br /><br />
And well, drinking and substances never made me feel truly good, just good in the moment, and not really that even. And afterward, I always felt like a grey blob. And I knew I was meant for vibrancy. For here-ness. Now-ness. I don’t need any other experience beyond the one I’m having. It’s radical enough.<br /><br />
Celibacy… well, my energy isn’t for the masses. It isn’t for short term flings or one‑night stands or whatever. That’s not my style. It’s the energy of creation…the ultimate source of POWA!
This past year, when I’ve been creating all this stuff, I was laughing because I had sickness symptoms and aching knees. And I knew it’s cuz I was giving birth to something…just not the kind of baby people expect.
        </p>
       </div> 


      <div className="interview-photo full-width">
        <img src={require('./static/interview-7.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
         <h3 className="question">Q: If you could tell the world one sentence, and that’s all they remember of you, what would it be?</h3>
        <p id="q16" className="answer">Let your life be your message.</p>  

        <h3 className="question">Q: What’s the scariest thing about being seen? Or not being seen at all?</h3>
        <p id="q17" className="answer">
        Ha… that’s a funny one. I’ve been on both sides of that coin, very extremely on both sides, so I think I can say something about it. My soul apparently likes extreme sports… from doing the hidden monk thing to the public crucifixion-and-resurrection thing. <br /><br />
In the last chapter, I lived a lot of time in an aware state. There was no desire to be seen because what would be shown? I had seen through a certain level of the illusion, and it would have been inauthentic in that period to do what I do now. It wasn’t just that it would be inauthentic, it’s that I couldn’t. The artistry couldn’t come through that vessel. The vessel had to be earthbound. When you’re that high, you’re beyond concept… beyond connection…beyond feeling. That frequency couldn’t find me because where was the “I” to speak? I disappeared for seven years, no socials, no presence, and said I’d never come online. <br /><br />
But then the next chapter came along. More information came down the phone lines. The painfully aware program got dusty, and a new kind of quality entered. Earthbound. Two feet on the ground. Human story. All that jazz. Me. Identity. Body. Feeling. Sensation. And it was like, oh… interesting. In this chapter, I see that being seen was terrifying because it threatened all my old wounds. Rejection, judgment, loss of control. In the old chapter, not being seen was the spiritually resonant choice. I’ve seen through that. I am not that.<br /><br />
But then that got flipped on its head. And it was like, light and dark. Opinion A and Opinion B. Both truths. Just a big old spectrum. Pick your vantage point. So in this chapter, I see those wounds as the medicine. My soul knows that being fully seen will force me into the deepest embodiment and integration possible in this lifetime. The arc of my life has already been written. I’m just reading my lines.
        </p>
      </div>

       <div className="interview-photo full-width">
        <img src={require('./static/interview-8.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
        <h3 className="question">Q: What’s the best gift you’ve ever received?</h3>
        <p id="q18" className="answer"> Grace that opened my eyes in a way I couldn’t open them myself. You can’t force grace to find you. No drug. No person. No book. No effort. No amount of money. It’s a gift from beyond the veil and once it arrives, it changes everything. The way you see things, people, yourself, cycles, conditioning, reality. It frees you…because for the first time, you can see. It’s like, You don’t know you’re in a terrarium until you see outside it. Until then, you think it’s the whole world.
        </p>     

        <h3 className="question">Q: Was there a moment when someone believing in you changed everything?</h3>
        <p id="q19" className="answer">

Yes. Someone shifted the goalposts for me by celebrating things I thought didn’t even matter, tiny things I dismissed. And in that, they showed me I was already enough, already capable. Sometimes belief isn’t about pushing you toward a standard, it’s about showing you the standard was never real.<br /><br />
Another time, I met these two girls at a spiritual wellness festival who didn’t even know me, and they were like, “Who are you? Girl… you are someone.” And I laughed, like, “Nah, I’m no one.” But they were dead serious. It wasn’t hype or flattery. It was this grounded, genuine seeing. And it hit me… so many people close to you can’t see you clearly. It’s too triggering for them, too close. But strangers? Strangers can sometimes see your soul.
Their words stuck with me. Not because I didn’t already know who I was, but because they reminded me. They reflected it back to me. In that moment, I believed it deeper.
        </p>  
      </div>

      <div className="interview-photo full-width">
        <img src={require('./static/interview-15.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
        <h3 className="question">Q: What has been your greatest obsession or passion?</h3>
        <p id="q20" className="answer">
Fitness has probably been my longest obsession. I started lifting at 17 and it’s been with me through every version of myself. Every country, every up, every down. I trained 6 days a week for years...pulled 130 kg deadlifts and did weighted pull-ups like it was nothing. <br /><br />
At my peak, I thought: If I can control my body, I can control my life. I believed mastery over the body was the key to everything.
But then my body said no more. Chronic pain. Weird symptoms. And eventually, full shutdown. I thought that meant lifting was bad since my body was rejecting it. For almost two years, all I could do was Pilates and walking. <br /><br />
But as soon as this allowing journey began, the first thing my body wanted to do was lift weights again. That’s when I realized, it was never about the weights. The weights got scapegoated. Duality is so funny for the ego… good, bad, right, wrong. So easy to fixate. Adopt new beliefs. Project them onto everything.
But there is no outside world. It’s all inside. Those years taught me a lot. Now I’ve learned not to push so hard… just to listen. I still love being strong. I know I’ll be strong again. But this time… more balanced.    
        </p>

        <h3 className="question">Q: Would younger you be shocked at who you’ve become?</h3>
        <p id="q21" className="answer">
Oh, absolutely. I’ve become her literal fantasy. I remember being seven or eight and meeting these older girls, maybe fifteen, who were just so cool. I don’t even know why but it was something about their energy. I went home and cried all night because I wanted to be their best friend. And now I realize… I am that girl. I’m my own cool best friend. I’m living the life she dreamed of, the one she never thought was possible.
        </p>
      
      </div>

       <div className="interview-photo full-width">
        <img src={require('./static/interview-13.webp')} alt="Oli Stormz" />
      </div>

      <div className="qa-section">
        <h3 className="question">Q: Which object in your house accidentally explains you better than words?</h3>
        <p id="q22" className="answer">
My shrunken heads.
The heads of my enemies.
Don’t cross me.
        </p>


        <h3 className="question">Q: How do you reconcile being fiercely independent with your longing for deep connection?</h3>
        <p id="q23" className="answer">
        Hmm. I’m deeply connected to my purpose so I’m not sure many people can relate to the way I experience connection. My devotion is to my own path, its needs, and its timing. 
Connection can be beautiful, but it’s also weighty. It comes with cords, expectations, and entanglement. People can derail your life without even meaning to. And coming back from repeated hits… it’s draining. I try to make choices that preserve my life force, build it, and protect it. And truthfully, I love my own company.
<br /><br />I’ve studied humans for a long time. Humans love a butterfly, they want to admire it, celebrate it, even worship it… but eventually, they want to hold it. Own it. And the very thing they loved about its freedom becomes the thing they resent. I also see it in myself.
People love independent thinking, until you disagree with them. Honesty until the truth is uncomfortable. Freedom until you’re not available. Contradictions are hard for people to hold. They don’t really want you, just the idea of you. So, I choose the course that keeps my wings big.
        </p> 

      
    
      </div>

      <div className="interview-photo full-width">
          <img src={require('./static/interview-16.webp')} alt="Oli Stormz" />
        </div>

      <div className="qa-section">
      <h3 className="question">Q: What do you mourn about the version of you that didn’t make it here?</h3>
        <p id="q24" className="answer">
          Probably my openness. My always believing in the good in people. This kind of rose‑colored approach to life.
I’m really a realist now. A realist with some hard boundaries. Dangerous combo, ha! But I wouldn’t trade the clear sight I have for rosy glasses. They feel warm and fuzzy… but ultimately, they aren’t real. And sooner or later that ugly head comes to bear.<br /><br />
My discernment hasn’t always been easy to navigate. Most times I cursed it. It let me see too much of the real, so much that I couldn’t even maintain a sliver of illusion. But I’m learning how to navigate it now… how to see deeply without being overcome by what I see.<br /><br />
What’s better is having clear sight and then finding the warm and fuzzy in the realness. Because then it’s really real. Not wishful thinking. Not delusion.
        </p>

        <h3 className="question">Q: Do you think there’s something mystical about the way your path unfolded?</h3>
        <p id="q25" className="answer">
I think life is mystical. And people want to figure it out. But if you just let it be mystical… it will blow your tiny mind.        
        </p>

      </div>

  

        <div className="interview-photo full-width">
          <img src={require('./static/interview-10.webp')} alt="Oli Stormz" />
        </div>

      <div className="qa-section">
        <h3 className="question">Q: What advice would you give, knowing most people will ignore it anyway?</h3>
        <p id="q26" className="answer">
Just… allow. The thoughts, the sensations, the fears. The despair. The grief. The anxiety. The fatigue. The anger. The sickness. The aches. The skin issues. The neck pain. The [fill in the blank]. <br /><br />
Really give it full permission to exist inside you. No conditions. No secret bargaining… I’ll allow it at level 7, but if it goes to level 100, I need to fix it. It’s like handing a kid a paint gun. At first, they’re painting your bedroom. Then they’re painting the whole house. Then the whole neighborhood. Then the whole earth. The whole galaxy. That’s what allowing feels like. Panic. No limit.<br /><br />
Your body is going to do what it needs to do. It’s testing you…Do you really mean what you say? Are you really going to stay with me while I [insert pain/annoyance/health issue here]? Make you unable to digest food? Give you panic attacks… or insomnia… or joints aching? When it’s your heart racing for no reason? Anxious thoughts? Exhaustion so deep you can’t get out of bed? All this pain… are you still going to see me? Not run away? Not abandon me? Look for someone to save you? Or go on weird diets? Not obsessively research new supplements? Not jump into some new 30‑day cleanse or retreat or relationship? Not chase a miracle cure? Not turn me into a “project” to fix? <br /><br />
And it’s hard. Because that means going deeper into the sensation of what you really, really don’t want to happen. The symptoms are emotional charges in physical form. It’s incredible, really. It’s the biggest gift, when you feel terrible. I had seborrheic dermatitis for a long time that was triggered by certain foods. So I just stopped eating those foods. But you know, you can’t outrun. Eventually your world becomes so small. So when this allowing came into my field… I knew it was time. No more running.<br /><br />
I had gone through the carousel… cutting foods, yoga, meditation, positive thoughts, acupuncture, lowering stress, breathing… thinking I was being chosen to be some Pranic God and they were preparing me by making me sick to every food except white rice. Thinking I was becoming purified in some way. No joke… the spiritual side can get dangerous with this stuff. The ego wears so many faces. It’s scary. Some almost imperceptible.<br /><br />

This time I wanted to trigger myself on purpose, from a conscious kind place. I was ready to see the fire. And oh boy… it was gnarly. Not only the physical sensations but the mental fears. I saw it spreading to my face and I was like… oh man… I can’t keep eating these foods and causing this reaction… it’s gonna get so bad, it’s gonna take over my face. I won’t be able to go outside. And it was bad. I was so scared. My whole skin was scabbing everywhere. Worse than I’d ever seen it before.<br /><br />
Normally I would do a kind of subconscious scratching to get this off of me. A kind of interacting with the sensation in this subtle rejection way. But this time I was like… no. I just didn’t touch it. It was so hard to break the cycle. And man, it was so, so bad. It was like… neurotic. The itch. It was nuclear. But I just allowed it. No conditions. If it took over my face… I allow that. And I was like, why am I so scared of this? And sitting with that revealed… it’s not about people judging me. It’s not about looking ugly. It’s deeper… it’s about me abandoning myself. Rejecting myself if I’m not living up to my ego’s ideal of perfection. I reject myself when this sensation arises. It’s never about the world.<br /><br />
So it was like… oh yeah. I get it. I see it now. And of course, with time, on the flipside… in the long term… the body no longer has to do these things. Because the mind body connection has been re-established. So… healing is looking into the void and walking through the fire. Consciously. Not escaping. Not distracting. Not breathing it away. Not meditating it away. Not drinking it away. Feeling it. All of it. Because it’s going to exist either way. Even when you think you’re exiling it… it just goes deeper inside you. So better to give it a pillow and a bed. Let your arm hurt. Really meet that hurt in your body. Let it take up space.<br /><br />
We live in this age of spirituality and health… meditation, beet juice, brain rewiring, positive thinking, breathwork, frequencies, shaking releases, good foods, bad foods. Trust me, I know. I’ve been President of this club since its inception. I’m allowed to say these things. But your body knows what to do. It’s been around a long time. There’s nothing wrong with you. You don’t need to do anything. You just need to allow. No weird diets. No intense training. No cutting out foods. No blast offs into parallel realms. No expensive therapies. <br /><br />
Just… allow. I can’t believe it took so long… to finally just begin to get that. 

        </p>
      </div>

      <div className="interview-photo full-width">
        <img src={require('./static/interview-14.webp')} alt="Oli Stormz" />
      </div>

      <h2 className="interview-subtitle">
      Good Golly Molly. Ms. Jackson, I'm sorry.<br /><br />I ate the cookies in the cookie jar and now I'm Tip Tallin.<br /><br />This isn't content, it's Odyssey.<br /><br />1 subconscious lobotomy.<br /><br />When a venus fly trap snaps,<br /><br />There's no going back to the lobby...<br /><br />Mother of Pearl, I've lost it.<br /><br />Debating with the Sock Heads.<br /><br />Don’t count me out,<br /><br />I’m right on time,<br /><br />Why, I’m just getting started.<br /><br />An Oli Stormz Industriez Producshun. [TM]
      </h2>
      <h2 className="website-tag"> um and yeah my single Every Time U Come Around drops September 12th </h2>

    </div>
    </div>

  );
}

export default Interview;
