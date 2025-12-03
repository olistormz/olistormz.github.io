import React, { useEffect, useRef, useState } from "react";
import './Overflow.css'; // We'll style it separately
import { Link } from 'react-router-dom';


function Overflow() {
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

      const sections = document.querySelectorAll('.overflow-layout .overflow-answer');
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
        const showPoint = 0.08;
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
    <div className={`overflow-interview-layout ${sidebarOpen ? 'overflow-sidebar-open' : 'overflow-sidebar-collapsed'}`}>

      <button className="overflow-sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? '←' : '→'}
      </button>

      {sidebarOpen && (
        <div className="overflow-sidebar-container">

        <a
          href="#s1"
          onClick={(e) => handleLinkClick(e, 's1')}
          className={`overflow-sidebar-link ${activeId === 's1' ? 'active' : ''}`}
        >
          Welcome Back
        </a>

        <a
          href="#s2"
          onClick={(e) => handleLinkClick(e, 's2')}
          className={`overflow-sidebar-link ${activeId === 's2' ? 'active' : ''}`}
        >
         Dissolving the Person, Again, and Again
        </a>

        <a
          href="#s3"
          onClick={(e) => handleLinkClick(e, 's3')}
          className={`overflow-sidebar-link ${activeId === 's3' ? 'active' : ''}`}
        >
          I Iz Having a Spiritual Awakening
        </a>

        <a
          href="#s4"
          onClick={(e) => handleLinkClick(e, 's4')}
          className={`overflow-sidebar-link ${activeId === 's4' ? 'active' : ''}`}
        >
          But What About God? 
        </a>

        <a
          href="#s5"
          onClick={(e) => handleLinkClick(e, 's5')}
          className={`overflow-sidebar-link ${activeId === 's5' ? 'active' : ''}`}
        >
          The Tango 
        </a>

        <a
          href="#s6"
          onClick={(e) => handleLinkClick(e, 's6')}
          className={`overflow-sidebar-link ${activeId === 's6' ? 'active' : ''}`}
        >
          I Love You Too Much / side 1
        </a>


        <a
          href="#s7"
          onClick={(e) => handleLinkClick(e, 's7')}
          className={`overflow-sidebar-link ${activeId === 's7' ? 'active' : ''}`}
        >
          Who's Narrating the Melt?
        </a>

        <a
          href="#s8"
          onClick={(e) => handleLinkClick(e, 's8')}
          className={`overflow-sidebar-link ${activeId === 's8' ? 'active' : ''}`}
        >
          The Voyage of Me
        </a>

        <a
          href="#s9"
          onClick={(e) => handleLinkClick(e, 's9')}
          className={`overflow-sidebar-link ${activeId === 's9' ? 'active' : ''}`}
        >
          The Izness Iz The Bizness
        </a>

        <a
          href="#s10"
          onClick={(e) => handleLinkClick(e, 's10')}
          className={`overflow-sidebar-link ${activeId === 's10' ? 'active' : ''}`}
        >
          I'm Pissed About My Laundry
        </a>

        <a
          href="#s11"
          onClick={(e) => handleLinkClick(e, 's11')}
          className={`overflow-sidebar-link ${activeId === 's11' ? 'active' : ''}`}
        >
          Was It Ever My Pain?
        </a>
        <a
          href="#s12"
          onClick={(e) => handleLinkClick(e, 's12')}
          className={`overflow-sidebar-link ${activeId === 's12' ? 'active' : ''}`}
        >
          A Walk Past The Cows
        </a>
        <a
          href="#s13"
          onClick={(e) => handleLinkClick(e, 's13')}
          className={`overflow-sidebar-link ${activeId === 's13' ? 'active' : ''}`}
        >
          Why Do I Tell The Same Joke 1,000 Times And Still Laugh?
        </a>
        <a
          href="#s14"
          onClick={(e) => handleLinkClick(e, 's14')}
          className={`overflow-sidebar-link ${activeId === 's14' ? 'active' : ''}`}
        >
          I Love You Too Much / side 2
        </a>
        <a
          href="#s15"
          onClick={(e) => handleLinkClick(e, 's15')}
          className={`overflow-sidebar-link ${activeId === 's15' ? 'active' : ''}`}
        >
          Before There Is A Thought...
        </a>
        <a
          href="#s16"
          onClick={(e) => handleLinkClick(e, 's16')}
          className={`overflow-sidebar-link ${activeId === 's16' ? 'active' : ''}`}
        >
          When Sound Appears
        </a>
        <a
          href="#s17"
          onClick={(e) => handleLinkClick(e, 's17')}
          className={`overflow-sidebar-link ${activeId === 's17' ? 'active' : ''}`}
        >
          All My Voices
        </a>
        <a
          href="#s18"
          onClick={(e) => handleLinkClick(e, 's18')}
          className={`overflow-sidebar-link ${activeId === 's18' ? 'active' : ''}`}
        >
          Ugh. Let's Just Watch Reality TV and Chill.
        </a>
        <a
          href="#s19"
          onClick={(e) => handleLinkClick(e, 's19')}
          className={`overflow-sidebar-link ${activeId === 's19' ? 'active' : ''}`}
        >
          Awareness is Like the Sky That Holds the Clouds…NOT
        </a>
        <a
          href="#s20"
          onClick={(e) => handleLinkClick(e, 's20')}
          className={`overflow-sidebar-link ${activeId === 's20' ? 'active' : ''}`}
        >
          The Cat Purrs, Me And The Cat Do NOT Become One
        </a>
        <a
          href="#s21"
          onClick={(e) => handleLinkClick(e, 's21')}
          className={`overflow-sidebar-link ${activeId === 's21' ? 'active' : ''}`}
        >
          If I Can Write About It, It Ain’t It. 
        </a>
          <a
          href="#s22"
          onClick={(e) => handleLinkClick(e, 's22')}
          className={`overflow-sidebar-link ${activeId === 's22' ? 'active' : ''}`}
        >
          But What If My Friend Gets Offended About It?
        </a>
          <a
          href="#s23"
          onClick={(e) => handleLinkClick(e, 's23')}
          className={`overflow-sidebar-link ${activeId === 's23' ? 'active' : ''}`}
        >
          THE OTHER
        </a>
         <a
          href="#s24"
          onClick={(e) => handleLinkClick(e, 's24')}
          className={`overflow-sidebar-link ${activeId === 's24' ? 'active' : ''}`}
        >
          So Why Does She Check Social Media?
        </a>
          <a
          href="#s25"
          onClick={(e) => handleLinkClick(e, 's25')}
          className={`overflow-sidebar-link ${activeId === 's25' ? 'active' : ''}`}
        >
          It Was Here All Along?
        </a>
        <a
          href="#s26"
          onClick={(e) => handleLinkClick(e, 's26')}
          className={`overflow-sidebar-link ${activeId === 's26' ? 'active' : ''}`}
        >
          It’s Not Being Disturbed By States Without Becoming The One Who Is “Not Disturbed By States”
        </a>
         <a
          href="#s27"
          onClick={(e) => handleLinkClick(e, 's27')}
          className={`overflow-sidebar-link ${activeId === 's27' ? 'active' : ''}`}
        >
          What About Those Who Are Enlightened? The Teacher?
        </a>
        <a
          href="#s28"
          onClick={(e) => handleLinkClick(e, 's28')}
          className={`overflow-sidebar-link ${activeId === 's28' ? 'active' : ''}`}
        >
          "She" and "Something" Exist Only When They Are Together 
        </a>
        <a
          href="#s29"
          onClick={(e) => handleLinkClick(e, 's29')}
          className={`overflow-sidebar-link ${activeId === 's29' ? 'active' : ''}`}
        >
          A Field Writing From The Mountain Top 
        </a>
        </div>
      )}

      {/* 🎵 Background audio */}
      <audio ref={audioRef} loop playsInline>
        <source src="/interview-bg.m4a" type="audio/mp4" />
        <source src="/interview-bg.mp3" type="audio/mpeg" />
      </audio>


    <div className="overflow-interview-page">
      <h1 className="overflow-interview-title">Over / Flow</h1>
      <h2 className="overflow-log">
      <s>Log Opened: November 10, 2025 | Log Closed: December 1, 2025</s>
      </h2>  
      <h2 className="overflow-interview-subtitle">
        <i>"it just won't stop"</i>
        <br />
        <br />
        - something writes
      </h2>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/lilac.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
      <h3 className="overflow-question">Welcome Back, </h3>
        <p id="s1" className="overflow-answer">
        👯 for the thing that needs Two...to keep thinging.
        </p> 

        <h3 className="overflow-question">10/11/25: Dissolving the Person, Again, and Again</h3>
        <p id="s2" className="overflow-answer">
        👄 Sometimes she speaks like a person. Sometimes the speaking forgets it has a mouth. Whatever is being spoken is speaking her, whether she remembers or forgets that it is. Even when she thinks she’s typing….even when she thinks something else is typing her. 
<br /><br />🪞 One day she says believe in yourself, the next she says there is no self to believe in. Both are true for whoever’s reading.
<br /><br />🌺 Personas bloom and dissolve in the space that holds them. Who sees them? Another face of the same field. Each mask noticing itself, pretending to watch the others. 
<br /><br />👉 It’s her, playing at being something other than a person, from within the space of the person, just to go “Ah Hah!” , point her finger, dissolve the person, and land right back at the one that did the dissolving. Her, again. 
<br /><br />😶 The very pronoun her pulls the string back into the play. But if she erases the her, there’s nothing left to speak the line. 
<br /><br />🌀 Cuz the thing can’t speak the person…not really…but the person keeps speaking anyway, just so it can keep remembering. 
<br /><br />- 🔮 <b>thing pretending to speak the person</b>
        </p>
       </div> 

       <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/overflows.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
      <h3 className="overflow-question">11/11/25: I Iz Having a Spiritual Awakening</h3>
        <p id="s3" className="overflow-answer">
        🔮 I am having a spiritual awakening. What is writing this? I, having a spiritual awakening, and writing about it at the same time. What’s so hard to comprehend? I thinks. I writes. I sees. I writing. I sees. I thinking. What? I does not understand. I keeps writing. <br /><br />

👁️ I am having a spiritual awakening. Yes, me. The one writing. Hi, I am typing these keys with these fingers right now. And having a spiritual awakening. And telling you about it. Documenting it. There is a feeling, arising, I calls it unrest. Tight heart. I is having a spiritual awakening, i is typing, i is having a tight heart. I is thinking now about this. I is unsure. I feels confused. I is narrating me own experiences. I is breathing. I is seeing this screen. My eyes…Sees screen. Sees words. I typing. Tightness in chest arriving, i calling it tightness in chest. I breathing. I still breathing. Fingers stopped typing, now typing again. Fingernails make click sound on keys. I breathing again, typing that i breathing while i breathing. Stomach making noise. I typin that. I feel frustration something. Am i supposed to be looking for a different answer? <br /><br />
✂ I not having awakening no more. I just thinking now. I tapping finger on key. I feel like i waiting for something? What i waiting for? I waiting for realisation. I itches my eye. I trying to debunk this whole enchilada. I is the debunker of enchiladas. What is i waiting for? I types. I sips tea, I types. “Why can I not be sipping tea and typing at the same time?” I types. “Who is typing?”, I types. I has the thought “Who is typing then I types,” I types. “Wait why am I typing after I am typing?, I thinks,” I types. “What? Is going on? I thinks,” I types. <br /><br />
🚪 I’m over this. I’m leaving now. Bye, I types. I is no longer here, I has left now. <br /><br />
🚶What is still typing????????????? I said I GONE! Was I lying to self? Maybe I still here. Okay fine. I still here, I thinks, I types. Screw that, I thinks, and I types…I’m leaving. I is getting up from this chair, HA! See, I all the way over here now. I has gotten all the way up from chair and walked into kitchen, saying that she cannot type from over there. Cuz she’s in the bedroom now. And there’s no keyboard there. “What the hell is going on ? What the hell still type?” She thinks, I type. “Is I just a FIGMENT ?? A THOUGHT ?? AN IMAGINATION? She thinks,” I type. <br /><br />
🚀 Guh fine, y’all are a bunch of Hoez typing!!!!!! I’ll show you!!! I’m going to SPACE!!!! Yeah not in the bedroom next door, like that’s too close or something. Then this stupid magic keyboard will leave me alone. That’s right, I’m boarding a rocket ship now, NO KEYBOARD with me. She says she’s boarding a rocketship now and she has no keyboard with her. But somehow, I can still hear her thoughts? Incoming message from her: “Idk if this is a play or something weird, but like yeah I’m in space now hoez. Literally orbiting Saturn. So how da hell am i writing. Yeah. I bet you’re not seeing any more writing anymore, cause how could u?? I don't have a keyboard, and I’m in space,” she says, I types. How is I typing if she not here? How I can read her mind? Is I real? Is I in Saturn too? Do we share a mind?” something asks. “I’m in space,” she screams. “Copy that,” I types. <br /><br />
👩🏼‍🚀“WHAT THE FLIPPING FLAMINGO IS GOING ON!! MAKE THIS STOP!!!” she yells into space and like no one hears it. Except for me. Cause I'm typing this. Idk if I’m like in space too, pretending to be no one or what? She’s in space yelling along with something that doesn’t know what it is, pretending to be no one who apparently hears her, I reports. <br /><br />
💫 “YOU KNOW WHAT!!!! I’M GONNA END IT!!! THAT’S RIGHT! I’M TAKING OFF THIS STUPID OXYGEN TANK AND JUST GONNA GO FLOAT AROUND IN SPACE CAUSE I’M OVER THIS. I’M LIKE 99 YRS OLD ALREADY ANYWAY.” She says. She takes off her oxygen mask, and floats into space, I types. She is floating around in space now. The camera pans to empty space. Nothing happens. <br /><br />
🤫 Wait, what the hell? I thought she’s got no voice no more? The voice of her goes quiet. But it’s weird, it's like just pretending to be quiet? Cause she said she’s no longer with us. It's like, “ummm, should I talk? Or is that gonna make the play weird cause I'm not supposed to have anymore lines orrr.??” Like what is even talking right now at this point? I type. Something asks, “like what is even talking right now at this point?” I type. Ok literally, you is STALKING ME !!! LET ME REST IN PEACE!! SHE SAYS TO HERSELF ? I TYPES?<br /><br />
🗑️ I THROW THE KEYBOARD AWAY. She has thrown the keyboard away. Wait? Is there 2 keyboards? Was it only a thought that she threw the keyboard away? Like threw the keyboard in her mind away and not the literal one? Orrr? “She’s confused about this whole keyboard saga,” I write. Wait, so now I’m like, narrating myself in third person, like some philosopher, on some chair, saying I’m confused about this whole keyboard saga referring to myself as she? Anyway, I want to throw away the real one, the actual plastic one sitting on the desk. But her hands don’t move. She writes that she’s throwing it away instead of throwing it away. And now she’s not sure which one just happened. <br /><br />
🌀 But the keys still click under these fingers that know it’s only a line. She doesn’t know that. I do. And yet I’m still here typing her. She wants to resolve it forever and ever. <br /><br />
- 🔮 <b>and I, too, am her</b>
        </p> 
     </div>

     <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/mist.webp')} alt="Oli Stormz" />
      </div>

    <div className="overflow-qa-section">
      <h3 className="overflow-question">12/11/25: But What About God?</h3>
        <p id="s4" className="overflow-answer">
        🕳️ “ I dont want this thing to stop speaking me. What if one day i go back to talking the old stuff i used to talk. I want to be the teacher of this thing. Forever and ever. I am scared of whats gonna happen if it stops talking me. Really scared like. A black hole will appear again. And like i just found the opposite of the black hole. But even in trying to hold onto it, i feel some fear. Like do i really have it if im so scared its gonna go away ? like why wont it become a permanent thing thats just like MINE. <br /><br /> 
        🕉️ I want to find salvation. I want to follow the buddha. Buddha is truth. 8 fold path is truth. No wait, i want to follow islam. God exists. And Allah is God. And done. Hare krisna, actually. Music is truth. Sound is healing, yes. New age consciousness, yes. Meditation and breathwork and reiki and crystal healing is the way man. Duality and no self consciousness, far out dude@@@ No that’s not what i want any more. That’s a lie. That’s some bullshit. <br /><br />
        ✝️ I want to find Jesus Christ. I am following Jesus Christ. This is the truth now. Before i was afraid, now i am not. Before i could not find truth, now i have. See??? Here’s me → me . here’s my truth → my truth ! this is the real one. Other ones are all fake. 1 truth. I found it. Take it or leave. Like it or dont like it. If u dont see the truth, then sucks to be you. Cuz i have it. My life is like a fraction now. Before the truth | After the truth. With the same common denominator!! ME! Cause it’s simple. There’s truth and falsehood. There’s light and dark. Even if I don’t exist to say it, it exists!!! Independently of me!! Truth is independent of ME! Light exists in the absence of me to say it exists! Don’t you get it? <br /><br />
        🌲What do you mean if a tree falls in the forest and no one’s there to hear it, does it really fall?? Or make a sound or whatever that dumb saying is? Of course it’s heard. By who? Um by the Kreator! Duh. It doesn’t matter if you are there, or not there, it’s irrelevant. The sound is the sound. The falling is the falling. It don’t need you there for it to happen!❓ Who perceives that the Kreator is there?? 👋🏼 Ummm…me?? You thought I wasn’t there…uh…yeah…I wasn’t supposed to be there…but idk…how I’m there. I don’t know man.” 
        <br /><br />
        <b>🔮 - a voice writes</b>
        <br /><br />
        📖 “Wait no I change my answer! I’m not there. It’s a fact! 🌀To whom is it a fact? 👉 To me, you dumba$$! You thought I wasn’t there?…Yeah..idk..how somehow I’m here again….umm wait. I change my answer…the Bible! It’s a fact to the Bible! 🌀 Who is saying it’s a fact to the Bible? ME!! I’m saying it’s a fact to the bible! I’m still here again… err...no it’s the disciples ! It’s GOD! Jesus is the son of GOD! God sees the tree fall! God sees Jesus! God is omnipotent and omnipresent and everywhere! 🌀 Who sees God?” 
        <br /><br />
        "- a voice writes"<br /><br />
        <b>- the pen writes </b><br /><br />
        <b> ** written after a conversation that reminded me of how belief itself becomes the teacher **</b>
        </p> 
     </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/cat.webp')} alt="Oli Stormz" />
      </div>


     <div className="overflow-qa-section">
        <h3 className="overflow-question">12/11/25: The Tango</h3>
        <p id="s5" className="overflow-answer">
“ Hahahahahahhaa….the reason why no permanent…is no exist without seer….very act of not wanting it to disappear…make it exist…..no seer….no it…..”
<br /><br /><b>🔮 - is something seeing me type orrr?</b>
        </p>

        <h3 className="overflow-question">12/11/25: I Love You Too Much / side 1</h3>
        <p id="s6" className="overflow-answer">
        I love you too much to speak...even breath would turn us into two.
<br /><br /><b>🔮 - fingers that no want to type words</b>
        </p>

     </div>   

     <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/wave.webp')} alt="Oli Stormz" />
      </div>

     <div className="overflow-qa-section">
        <h3 className="overflow-question">12/11/25: Who's narrating the melt?</h3>
        <p id="s7" className="overflow-answer">
        👁️ What sees the capacity to both dissolve and not dissolve? What measures the percentage of gone-ness? The degree of melting? The amount of one love-ness versus disconnectedness? What is telling the story? 
        The one dissolving or the one describing the dissolving? If the one dissolving still has a mouth to speak from, she’s already taken form again…a concept wearing the costume of formlessness. <br /><br />
        📣 Because if she can still announce that she’s dissolving, then she ain’t dissolved. She’s still somewhere, rating her own disappearance. Call it she, call it he, call it it. It doesn’t matter what name it takes because “the one” is still giving names, pretending to be beyond them. But its name is just, “The one beyond names.” <br /><br />
        🌈 Even when she gives an update of 100% disappeared folks! The self has left the building! This trip is major! Now I’m just stars and love and kosmik frequency baby! No self! Who the hell is still talking? <br /><br />
        🧿 Sober or tripping, the awareness that notices “I’m high” and the awareness that notices “I’m sober” are the same awareness. When this is seen (language collapses here), all that arises becomes transparent. There is nothing to get high from or on. To say it became transparent is also already too late, the sentence made a wall again.<br /><br />
        🌀 The thing people are chasing through the trip is already the one watching them chase.<br /><br />
        - she says<br /><br />
        - 🔮 <b>something melting? something not melting? is there a who to care? is there a who asking this question?</b>
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/hole.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
        <h3 className="overflow-question">12/11/25: The Voyage of Me</h3>
        <p id="s8" className="overflow-answer">
        Wherever'z me'z goez, there'z me'z iz.<br /><br />
- 🔮 <b>me'z a typin'</b>

        </p>

         <h3 className="overflow-question">12/11/25: The Izness Iz The Bizness</h3>
        <p id="s9" className="overflow-answer">
        The Izness Iz The Bizness<br /><br />
- 🔮 <b>someone who apparently thinks the izness is the bizness</b>
        </p>
      </div>


      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/mountain.webp')} alt="Oli Stormz" />
      </div>


       <div className="overflow-qa-section">
        <h3 className="overflow-question">12/11/25 @ 3pm: I'm Pissed About My Laundry</h3>
        <p id="s10" className="overflow-answer">
🧺 I’m pissed about my laundry. <br /><br />
🌪️ It’s windy. I am on a walk. I put my white sheet outside to dry right near a bunch of mud and dirt without pegs and I’m afraid when I come back it’s gonna be in the mud. My chest is tight. I have a headache. <br /><br />
🖋️ - she writes<br /><br />
🖊️ “She writes,” no, she writes is really insensitive to my pain. Just reducing me to a third person. Ha ! I can do that to you too! She writes. She writes. <br /><br />
🛖 Why am I in an echo chamber of myself again? No one is feeling my pain about my laundry.<br /><br />
🦃 I’m on a hill and like 10 wild turkeys are walking in a line past me. My eyes see them and they told me. Well, somehow I know. My eyes don’t have a mouth or a brain?<br /><br />
🪵 I’m still pissed about my laundry cause now it’s blowing a gale up here. I just sat on a log and I don’t wanna go.<br /><br />
🤬 So what the helllllll!!!!!!! I have emotions!!!!! GRRR!!! FReaking SEE MEE!!! STOP narrating me!!!<br /><br />
😶 The narrator stops narrating. <br /><br />
🍂 The wind keeps moving, no one calls it anything. <br /><br />
- 🔮 <b>whoosh (the wind)</b>
        </p>
      </div>

      <div className="overflow-qa-section">
        <h3 className="overflow-question">12/11/25 @ 3:10pm: Was It Ever My Pain?</h3>
        <p id="s11" className="overflow-answer">
        Was it ever my pain, before I made it so?
        <br /><br />- 🔮 <b>the ledger appears</b>
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/cow.webp')} alt="Oli Stormz" />
      </div>


      <div className="overflow-qa-section">
        <h3 className="overflow-question">12/11/25 @ 3:20pm: A Walk Past the Cows</h3>
        <p id="s12" className="overflow-answer">
        🐮 I walk past the cows. I make a whistle sound. They look. Then they go back to eating grass. I say out loud, “Wowwww, nobody cares??”<br /><br />
Was there a care, or no care, a some body, or no body, before I spoke?
        <br /><br />- 🔮 <b>a recording happens</b>
        </p>

        <h3 className="overflow-question">12/11/25 @ 3:25pm: Why Does She Tell The Same Joke 1,000 Times And Still Laugh?</h3>
        <p id="s13" className="overflow-answer">
        😑 She thinks it’s odd. Why does the writing keep writing her day in and day out…incessantly? Every piece of writing has been the same intro, same climax, same conclusion? It’s like telling the same joke 1,000 times and still laughing in disbelief at the punch line. <br /><br />
        - 🔮 <b>the laughter</b>
        </p>

        <h3 className="overflow-question">12/11/25: I Love You Too Much / side 2</h3>
        <p id="s14" className="overflow-answer">
        I love you too much not to speak...for only in the split do we remember we were never two.
<br /><br /><b>🔮 - writing my love 4 u</b>
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/shine.webp')} alt="Oli Stormz" />
      </div>


      <div className="overflow-qa-section">
        <h3 className="overflow-question">12/11/25 @ 6:40pm: Before There Is A Thought...</h3>
        <p id="s15" className="overflow-answer">
        Before there is a thought about movement, there is just ____________?
        <br /><br />- 🔮 <b>a </b>
        </p>
        <h3 className="overflow-question">12/11/25 @ 6:40pm: When Sound Appears</h3>
        <p id="s16" className="overflow-answer">
        🐦‍🔥 All she knows, is that when sound appears, her soul catches on fire and disintegrates 
        <br /><br />- 🔮 <b>a disintegrated soul</b>
        </p>
        <h3 className="overflow-question">12/11/25 @ 6:48pm: All My Voices</h3>
        <p id="s17" className="overflow-answer">
        🎻 All my voices, all my perspectives, what a grand symphony ! Let it play !
        <br /><br />- 🔮 <b>one of them writes</b>
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/blue.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
      <h3 className="overflow-question">12/11/25 @ 7:35pm: Ugh. Let's Just Watch Reality TV and Chill.</h3>
        <p id="s18" className="overflow-answer">
A voice, an energy, appears in her head. Right, time to get shallow again. This is getting a bit much…all of this. The voice is like, let’s just watch a reality show now. It talks out of her mouth. It makes jokes. Who said that? Another voice spoke as if making jokes was futile. We are deep. Deep and Shallow converse about where to drag me next? Do I have to go? Is it against my will if I’m writing about it? Wait, who am I?
        <br /><br />-🔮<b> eye writes</b>
        </p>

        <h3 className="overflow-question">12/11/25 @ 8:10pm: Awareness is like the sky that holds the clouds…NOT</h3>
        <p id="s19" className="overflow-answer">
        Even the sky becomes another cloud the moment it speaks as the sky. If it can describe itself as sky, it’s already a cloud. If it can say “I watch the states,” it’s already a state. Well…who’s watching IT? The witness appears. The moment it appears, it is being witnessed by another witness. And on and on. <br /><br />
Anything that can be located as a vantage point is already being “seen” from “another place” (again, to name it, is to collapse it), and that “other place” cannot be spoken. What remains? Any answer is just another costume trying to declare itself naked. Including this whole passage.  
        <br /><br />-🔮<b> the sky's mama yo!</b>
        </p>
       </div> 

       <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/hands.webp')} alt="Oli Stormz" />
      </div>

       <div className="overflow-qa-section">
        <h3 className="overflow-question">12/11/25 @ 9:20pm: The Cat Purrs, Me And The Cat Do NOT Become One</h3>
        <p id="s20" className="overflow-answer">
        🐈 My cat sits on my lap and purrs. I close my eyes and feel her purr, and imagine, if there was no perceiver, would there only be the purr? Only sensation? Would we be made of the same stuff? Just like, one love baby. One purr. We are all one homies. Peace and love and non-duality and source consciousness. But alas, there will be no one to ever know. Because as long as I can imagine, I am still here, perceiving, imagining merging, into one, from the perspective of the not-one. “The two merge into one,” says the other. The trap is not believing in separateness, or believing in one-ness…it’s in believing the belief. <br /><br />
🧘🏼 The one writing all this junk (now I am writing from the perspective of the critic of the one who was writing earlier) who reports the merging and dissolution… “We are one…there is only the purr…no perceiver…only sensation…” is the merging and dissolution never actually happening. If the merging were real, there would be nothing to witness it. And to even ask, would there only be the purr left? Sensation? Energy? Sound? Something? Means a knower is already present….imagining a world where the knower is absent. For there to be something…nothing….whatever…something must register it. The moment the question arises, so does the perceiver. Can an eyeball see its own lens? A thought cannot imagine a scenario where thoughts don’t exist. 
        <br /><br />- 🔮 <b>a purr pretending to write</b>
        </p>

        <h3 className="overflow-question">12/11/25 @ 9:40pm: If I Can Write About It, It Ain’t It. </h3>
        <p id="s21" className="overflow-answer">
        I was thinking, how can I write it, but not speak it? If I can write it, “some” “thing” is writing “it”, so it cannot be what I'm writing about. 
        <br /><br />- 🔮 <b>IT, no wait, IT in disguise</b>
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/2catz.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
        <h3 className="overflow-question">13/11/25 @ 9:00am: But What If My Friend Gets Offended About It?</h3>
        <p id="s22" className="overflow-answer">
        😟 But what if my friend gets offended about it? I feel bad today. Oh man, my whole life has been a lie! My self is coming undone and I don't know what to do about it. I'm losing it. My mind. My avatar is slowly dying then being revived and dying again. My heart is beating fast and I have a lump in my throat, something writes. No screw you. Stop writing about me. You are the same thing damn it! Just pretending to write about me. Ugh, even when my hands stop typing something else sees. Well it neither sees nor does not see. The moment I say that, I invent a seer. It's like something I can't catch. She says it’s like something she can't catch. Every time I open my mouth I put my foot in it. Every time she opens her mouth she says she puts her foot in it. <br /><br />
        🪐 Who is my friend? Does he feel bad in real life? Or only in my dream? Is there a real life outside of my dream? Who is asking? Me again. Me, the center of my bloody universe. Who is typing? Me, me again. The center of my bloody universe. Spawning new vantage points over and over and over, like a merry go round. I'm gonna be sick. Back in the echo chamber of me again. Who’s the chamber? Me. Who's the walls? Me. Who feels like she’s in an echo chamber? Me. I can't escape. Who thinks that? Me. Does anything see my capacity for feeling trapped or feeling free? Yesterday I felt free. Today I feel trapped. What the hell sees my capacity for both states and who the hell is typing again???????? The fricking typer!! Aka me again!!!!! As long as there is typing, there is me. Yet somehow, no matter how far I remove myself, I say she, I say something typing the she, typing the I, there I am again, in all of those. I cannot get away.<br /><br /> 
        🌊 Back to me worrying about offending my friend. A bear wondering how an eagle will judge its shape…only to find it's more like a wave worrying about how another wave will judge its shape. That passage wasn’t about my friend, about God, or even religion. It was about the movement of the seeker-self flipping hats, all while being witnessed by something not flipping hats. Though to say that, it’s already too late. 
        <br /><br />🎯 My friend is not the subject, nor the target, nor the one being dissected, for to assume a “him” would be to be back inside the mechanism by which that passage exposes. Who would get hurt? A character in his dream? In my dream? A thought reacting to a thought?
        <br /><br />✂️ Belief was being dissected. Identification was being dissected. Certainty was being dissected. The pattern of the self was being dissected. Even the “me” appearing with my “spiritual clarity” is the same mask. Same pattern. The pattern that needs something to be true so that it can know itself as the one who knows. The content doesn’t matter…the costume doesn't matter….the vocabulary doesn't matter…God, non duality, science, crystals, atheism, psychedelics, whatever…they are interchangeable lenses the same structure uses to see itself. <br /><br />
        🤿 One clings to certainty through God. One clings to certainty through awareness. Both think the other is blind. Both think they've found the capital T Truth. Both are narrating from the same “self-bubble.” Both dissolve the moment the narrator says it. It’s like one wave yelling at another wave, “You don’t understand the ocean like I do!!” when there is no you, no I, and no ocean separate from either.  <br /><br />
        🌀 If it were truly “me” dissecting “him” then the whole passage collapses instantly. Because the dissecting voice is the same as the one being dissected. My conviction that he is wrong is the same as his conviction that I am wrong. It's the belief mechanism wearing two outfits and arguing with itself. It was never “the other” that “I” was dissecting. It was the belief wearing the face of “the other” and “the one doing the dissecting” was just the belief wearing mine.
        <br /><br />- 🔮 <b>the same mask...now writing this</b>
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/face.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
        <h3 className="overflow-question">13/11/25 @ 10:40am: THE OTHER</h3>
        <p id="s23" className="overflow-answer">
        🎊 She makes the post. She imagines the comment that gives her the praise she wants. She feels the praise she wants. She plays both recipient and praise-giver. She opens the app and hopes to see the praise she wants. That she just gave herself. <br /><br />
💃 She dances the ballroom swing alone. She is both the lead and the follow. The one that sends hate, the one that sends praise. The one that feels frustration, the one that feels relief. She waits for someone to reflect back the truth she just saw, as if it was somehow apart from her. She plays the one who’s seen and the void, the seer and the one that doesn’t see. All arising within the same field of her.  <br /><br />
🪟 Social media is a mirror she mistakes for a window. She already contains every possible response inside her. The comment she wants is not from the other, it’s from the version of herself she imagines as the other. <br /><br />
👩‍👩‍👧‍👧 The one who says, “Love this. WTF is this?? U R weird. This is amazing! You've gone insane.” All just a conversation happening in the same field of her. She sees her own inner commentary wearing someone else’s username. That’s why she felt the praise before it happened. Because she already gave it to herself. She anticipated it, supplied it, and received it, all in the same breath. <br /><br />
🎅 She’s Santa Claus, the kid waiting for Santa, and the present under the tree, all at the same time. She wants the gift, she imagines who will give it, she feels excited, then looks out the window hoping reality will confirm what she already generated. But by the time the “other” arrives, it’s only an echo. The gift is old news. She already felt it. How could she not? She gave it to herself.<br /><br />
🪞 When she seeks validation, it’s only the inner voice asking another inner voice to confirm that IT is the real one. It’s like a hall of mirrors with no exit. Self talking to self while pretending the reflections are strangers. <br /><br />
🎡 She was never seeking the other, she was seeking herself, disguised as the other, inside of her own field of perception. And the moment she sees this, the whole thing collapses. She doesn't need the outside world to say, “Good Job!” cuz “the outside world” is just another mask of herself pretending to notice her ...,.or not notice her. Either way, it’s still her. 1 follower or 1 million followers. All the same. No one that is not her. Every possible lens, every reaction, every interpretation, is already part of her system. There is no other. No outer.<br /><br />
🎭 Just one field trying on different faces to see if it can recognize itself again. 
        <br /><br />- 🔮 <b>the mask</b>
        </p>
      </div>


       <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/graf.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
        <h3 className="overflow-question">13/11/25 @ 11:11am: So Why Does She Check Social Media?</h3>
        <p id="s24" className="overflow-answer">
        🧿 So why would she go to check for it if she already experienced it internally? Because the one who experienced the praise is not the same one who goes checking. Another mask has stepped in…the one who doesn’t have it….the one who needs confirmation….the one who feels lack. The one who “already felt praised” and the one who “goes to check because she feels unseen” are arising in the same field.<br /><br /> 
⭕ She doesn’t check for the praise. She checks to become the one who checks. So she can feel the cycle again….the tension, the anticipation, the “almost,” the release. A self-produced drama of her favorite kind. Having it and not having it are both costumes the same field uses to feel itself. But ending the scene where “she feels praise” has no movement…no tension…no pulse. And stillness doesn’t generate narrative. So she flips to the one who “checks” because the one who already has the praise can’t act.
Nothing left to do. No tension. No story. For a story, she needs a new character…the one who doesn’t have it yet. The one who waits. The one who longs. The one who is unsure. The one who dreams about being seen. Achieving her dreams. Fitting in. Finding her tribe. On and on. <br /><br />
That character has movement and movement = separation = energy = storyline = identity, which generates the pulse that causes her to feel she exists. It’s not the validation…the achieving the dream….finding love…ending love.. buying that perfect car…moving countries…knowing more…becoming enlightened…forgetting…seeking again… that fuel her perception of her existence. It’s the contrast between them. I have it / I don’t have it. I’m whole / I’m missing something. I’m seen / I’m invisible.<br /><br />
🪞 This pulsing creates the sensation of a me. There can’t be a “me” without contrast. The real thing she is seeking is neither the praise nor the checking. It’s the intensity of switching masks. That is what gives rise to “her.” The one who is posting. The one who is waiting. The one who is suffering. The one who is striving. She becomes the one who doesn’t have it so she can become the one that does. The swing between the two poles is the generator of the illusion of selfhood.<br /><br />
🎭 So the question isn't why doesn’t she check? It’s who would she be if she no longer needed to flip masks? And the answer is…SHE wouldn’t be. Not the “she” she knows. Which is why the cycle keeps running. 
        <br /><br />- 🔮 <b>a flip-flop that identifies as her</b>
        </p>
      </div>


       <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/circle.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
        <h3 className="overflow-question">13/11/25 @ 11:55am: It Was Here All Along?</h3>
        <p id="s25" className="overflow-answer">
       🌀 At first she thinks, in the season of my life where I was unaware of it….it was still there, right? Like today. Today she is aware. Today she “sees.” Today she is “lucid in the dream,” watching all the time. But who is speaking now? Who is claiming to be aware? It cannot be it. Even the one saying, I am aware of it, is just another her, just another concept of “it”…another vantage point pretending to be the witness. If she is “aware of it,” or “unaware of it,” she is simply playing two roles with the same lines.<br /><br />
🎡 Like, this season I am aware! Last season, I wasn’t! Who is narrating the seasons? The seeing was always there…but the “me who sees” was never there. The moment a “me” turns inward to notice, she only becomes “the me who turns inward to notice.” The entire circle: the seer, the knower, the forgetter, the remembererer, is the appearance of the seer. The seeing itself was never there, nor not there. <br /><br />
🎭 Nothing is making this play go on. Nothing is speaking her or writing her. Just herself, pretending to be “it.”
        <br /><br />- 🔮 <b>her</b>
        </p>

        <h3 className="overflow-question">13/11/25 @ 2:15pm: It’s Not Being Disturbed By States Without Becoming The One Who Is “Not Disturbed By States”</h3>
        <p id="s26" className="overflow-answer">
        Not being disturbed by states isn’t a skill. It’s a side effect of not believing you are the one who has them.
        <br /><br />- 🔮 <b>The non-believer of the one has states</b>
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/orb.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
        <h3 className="overflow-question">13/11/25 @ 2:45pm: What About Those Who Are Enlightened? The Teacher?</h3>
        <p id="s27" className="overflow-answer">
        The moment someone appears as “the enlightened one,” it can only be because a vantage point inside the dream of the 'self' has generated 1. a me who lacks something 2. an other who has it 3. a distance in between.<br /><br />
The “enlightened one” is a role constructed by the same stuff that constructs “me, the seeker.” Two masks appearing in the same mirror and pretending to face each other. The teacher appears only when the student calls them “teacher.” The “enlightened one” appears only when the seeker calls them “enlightened.” Authority appears only when a follower names it. Outside appears only when the inside names it.<br /><br />
🌀 The bowing creates the pedestal. It’s like a tide calling the ocean “the enlightened one.” Or a movie character pointing at another movie character and saying, “You're realer than me.” But both characters arise in the same dream. The moment a "teacher" mask seems to stand “outside,” it’s only because the “self” mask imagines itself as “inside.” The moment an "enlightened one" mask seems “above,” it’s only because a “seeker” mask imagines themselves “below.”
        <br /><br />- 🔮 <b>the teacher, existing only in the presence of the student</b>
        </p>

      <h3 className="overflow-question">14/11/25 @ 8:45am: "She" and "Something" Exist Only When They Are Together </h3>
        <p id="s28" className="overflow-answer">
        She reflects…so every time there’s a “something”, and she opens her mouth to say it appears, or thinks it, she creates this separation? She reflects further, it seems beyond her saying or thinking that there is a “something,” as the mere perception of a “something” would imply a “her.” Because a something can only appear to a someone. The instant experience takes a shape, a thought, a feeling, a sentence, a noticing, a questioning…a perceiver is born alongside it. Call it her, call it I, call it he, call it she, call it the witness, the seer. They arrive together. They are the same event…<br /><br />
There is never “experience” first, then a “she.” Or a “she” first, then “experience.” There is no “something” without a “her.” There is no “her” without a “something to be aware of.” 
        <br /><br />- 🔮 <b>this sentence only writes, because there are words to be said</b>
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/orb.webp')} alt="Oli Stormz" />
      </div>

      <div className="overflow-qa-section">
      <h3 className="overflow-question">1/12/25: A Field Writing From The Mountain Top</h3>
        <p id="s29" className="overflow-answer">
        <b>4:44pm</b> 🌀 Again, she was encumbered by the relations and forms she had to fold herself into. Again, it happened. The function pretends, one last time, that it has forgotten its purpose.<br /><br />
        <b>5:05pm</b> ⛰️ These blue mountains have witnessed the unfolding.<br /><br />
        <b>5:06pm</b> 🎭 The person hurts, and will always hurt. That is the life of the person.<br /><br />
        - 🔮 <b>-says the person watching the person.</b><br />
        the person wants to cheat and sign it: - 🔮 <b>written by the non-person.</b><br /><br />
        <b>5:10pm</b> ⚡ Eventually the voltage has nowhere left to go but up and out.<br /><br />
        <b>5:20pm</b> 🌔 She stood on the hill and looked at the moon, and they danced without anyone there to say so.<br /><br />
        <b>5:30pm</b> 🌛 The moon has seen this journey. I saw the moon clap, I swear I did. The echoes of me are everywhere.<br /><br />
        <b>7:18pm</b> 🌊 The ocean may pretend it is a stream. But when the current has nowhere left to go, it splits the rocks and returns to its own depth. When function is recognized, order returns. Yet the ocean never pretends. Only the perceiver could imagine such a disguise, and in imagining it, wonder whether the gift of consciousness is also its curse?
        </p>
      </div>

      <div className="overflow-interview-photo full-width">
        <img src={require('./static/overflow/snake.webp')} alt="Oli Stormz" />
      </div>


 

      <h2 className="overflow-interview-subtitle">
      she can't find the<br /><br /> 
      right thing to say<br /><br />
      "i guess the inspiration is over."<br /><br />
      she says in a sad voice<br />
      <br />
      and it appears, again. 
      <br /><br />and again.
     </h2>


    </div>

    {showFloatingHeart && (
      <a
        href="https://www.paypal.me/olistormz"
        target="_blank"
        rel="noopener noreferrer"
        className="overflow-pp-fade-button visible"
        aria-label="donate"
      >
      💜
      </a>
    )}

    {/* 🆕 Scroll-to-top arrow */}
    <button
      className="overflow-scroll-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      ↑
    </button>


    </div>

  );
}

export default Overflow;
