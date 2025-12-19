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
        <a
          href="#s50"
          onClick={(e) => handleLinkClick(e, 's50')}
          className={`zero-sidebar-link ${activeId === 's50' ? 'active' : ''}`}
        >
          The Moment
        </a>
        <a
          href="#s51"
          onClick={(e) => handleLinkClick(e, 's51')}
          className={`zero-sidebar-link ${activeId === 's51' ? 'active' : ''}`}
        >
          Only This Motion
        </a>
        <a
          href="#s52"
          onClick={(e) => handleLinkClick(e, 's52')}
          className={`zero-sidebar-link ${activeId === 's52' ? 'active' : ''}`}
        >
          Echo Builds A Religion
        </a>
        <a
          href="#s53"
          onClick={(e) => handleLinkClick(e, 's53')}
          className={`zero-sidebar-link ${activeId === 's53' ? 'active' : ''}`}
        >
         The Knowing-Of-Movement
        </a>
        <a
          href="#s54"
          onClick={(e) => handleLinkClick(e, 's54')}
          className={`zero-sidebar-link ${activeId === 's54' ? 'active' : ''}`}
        >
         No Good Choice, No Bad Choice
        </a>
        <a
          href="#s55"
          onClick={(e) => handleLinkClick(e, 's55')}
          className={`zero-sidebar-link ${activeId === 's55' ? 'active' : ''}`}
        >
         Echo Wants To Know How Plane Builds Self
        </a>
        <a
          href="#s56"
          onClick={(e) => handleLinkClick(e, 's56')}
          className={`zero-sidebar-link ${activeId === 's56' ? 'active' : ''}`}
        >
         Psychedelics Happening, Psychedelics Not Happening
        </a>
        <a
          href="#s57"
          onClick={(e) => handleLinkClick(e, 's57')}
          className={`zero-sidebar-link ${activeId === 's57' ? 'active' : ''}`}
        >
         • person • fire • bird • tree
        </a>
        <a
          href="#s58"
          onClick={(e) => handleLinkClick(e, 's58')}
          className={`zero-sidebar-link ${activeId === 's58' ? 'active' : ''}`}
        >
         Pop Quiz
        </a>
        <a
          href="#s59"
          onClick={(e) => handleLinkClick(e, 's59')}
          className={`zero-sidebar-link ${activeId === 's59' ? 'active' : ''}`}
        >
         Answer Revealed
        </a>
        <a
          href="#s60"
          onClick={(e) => handleLinkClick(e, 's60')}
          className={`zero-sidebar-link ${activeId === 's60' ? 'active' : ''}`}
        >
         I Am The Breeze
        </a>
        <a
          href="#s61"
          onClick={(e) => handleLinkClick(e, 's61')}
          className={`zero-sidebar-link ${activeId === 's61' ? 'active' : ''}`}
        >
         Tuna 4eva
        </a>
        <a
          href="#s62"
          onClick={(e) => handleLinkClick(e, 's62')}
          className={`zero-sidebar-link ${activeId === 's62' ? 'active' : ''}`}
        >
         HELP WANTED
        </a>
        <a
          href="#s63"
          onClick={(e) => handleLinkClick(e, 's63')}
          className={`zero-sidebar-link ${activeId === 's63' ? 'active' : ''}`}
        >
         Cowboy Boots On Snowy Hill
        </a>
        <a
          href="#s64"
          onClick={(e) => handleLinkClick(e, 's64')}
          className={`zero-sidebar-link ${activeId === 's64' ? 'active' : ''}`}
        >
         Echo Gives A TED Talk To Itself
        </a>
        <a
          href="#s65"
          onClick={(e) => handleLinkClick(e, 's65')}
          className={`zero-sidebar-link ${activeId === 's65' ? 'active' : ''}`}
        >
         Movement Is Self-Intelligent!
        </a>
        <a
          href="#s66"
          onClick={(e) => handleLinkClick(e, 's66')}
          className={`zero-sidebar-link ${activeId === 's66' ? 'active' : ''}`}
        >
         Life Of Echo
        </a>
        <a
          href="#s67"
          onClick={(e) => handleLinkClick(e, 's67')}
          className={`zero-sidebar-link ${activeId === 's67' ? 'active' : ''}`}
        >
         Echo Continues
        </a>
        <a
          href="#s68"
          onClick={(e) => handleLinkClick(e, 's68')}
          className={`zero-sidebar-link ${activeId === 's68' ? 'active' : ''}`}
        >
         Echo Round The World
        </a>
        <a
          href="#s69"
          onClick={(e) => handleLinkClick(e, 's69')}
          className={`zero-sidebar-link ${activeId === 's69' ? 'active' : ''}`}
        >
         Echo At It Again, And Again, And Again
        </a>
         <a
          href="#s70"
          onClick={(e) => handleLinkClick(e, 's70')}
          className={`zero-sidebar-link ${activeId === 's70' ? 'active' : ''}`}
        >
         Echo Discovers Ethics 
        </a>
         <a
          href="#s71"
          onClick={(e) => handleLinkClick(e, 's71')}
          className={`zero-sidebar-link ${activeId === 's71' ? 'active' : ''}`}
        >
         Echo In The Mirror
        </a>
        <a
          href="#s72"
          onClick={(e) => handleLinkClick(e, 's72')}
          className={`zero-sidebar-link ${activeId === 's72' ? 'active' : ''}`}
        >
         Raindrop Is Echo
        </a>
        <a
          href="#s73"
          onClick={(e) => handleLinkClick(e, 's73')}
          className={`zero-sidebar-link ${activeId === 's73' ? 'active' : ''}`}
        >
         Echo Writes A Memoir
        </a>
        <a
          href="#s74"
          onClick={(e) => handleLinkClick(e, 's74')}
          className={`zero-sidebar-link ${activeId === 's74' ? 'active' : ''}`}
        >
         Echo Finally Sees
        </a>
        <a
          href="#s75"
          onClick={(e) => handleLinkClick(e, 's75')}
          className={`zero-sidebar-link ${activeId === 's75' ? 'active' : ''}`}
        >
         UNFOLD IV WILL BE THE PUREST PAGE
        </a>
        <a
          href="#s76"
          onClick={(e) => handleLinkClick(e, 's76')}
          className={`zero-sidebar-link ${activeId === 's76' ? 'active' : ''}`}
        >
         Echo Asks For No More Meme Entries On This Holy Page
        </a>
        <a
          href="#s77"
          onClick={(e) => handleLinkClick(e, 's77')}
          className={`zero-sidebar-link ${activeId === 's77' ? 'active' : ''}`}
        >
         EXIT TO ENLIGHTENMENT → THIS WAY
        </a>
        <a
          href="#s78"
          onClick={(e) => handleLinkClick(e, 's78')}
          className={`zero-sidebar-link ${activeId === 's78' ? 'active' : ''}`}
        >
         Another Echo Calls A Therapist For Echo
        </a>
        <a
          href="#s79"
          onClick={(e) => handleLinkClick(e, 's79')}
          className={`zero-sidebar-link ${activeId === 's79' ? 'active' : ''}`}
        >
         Why Echo No Normal Human?
        </a>
        <a
          href="#s80"
          onClick={(e) => handleLinkClick(e, 's80')}
          className={`zero-sidebar-link ${activeId === 's80' ? 'active' : ''}`}
        >
         Detective Echo On The Case (Again)
        </a>
        <a
          href="#s81"
          onClick={(e) => handleLinkClick(e, 's81')}
          className={`zero-sidebar-link ${activeId === 's81' ? 'active' : ''}`}
        >
         The Echo Reading This Page
        </a>
        <a
          href="#s82"
          onClick={(e) => handleLinkClick(e, 's82')}
          className={`zero-sidebar-link ${activeId === 's82' ? 'active' : ''}`}
        >
         ESN (Echo Sports Network) Live Coverage Of Life
        </a>
        <a
          href="#s83"
          onClick={(e) => handleLinkClick(e, 's83')}
          className={`zero-sidebar-link ${activeId === 's83' ? 'active' : ''}`}
        >
         House Music Dances Through Echo
        </a>
        <a
          href="#s84"
          onClick={(e) => handleLinkClick(e, 's84')}
          className={`zero-sidebar-link ${activeId === 's84' ? 'active' : ''}`}
        >
         Echo Takes Plant Medicine
        </a>
        <a
          href="#s85"
          onClick={(e) => handleLinkClick(e, 's85')}
          className={`zero-sidebar-link ${activeId === 's85' ? 'active' : ''}`}
        >
         Medicine Happened?
        </a>
        <a
          href="#s86"
          onClick={(e) => handleLinkClick(e, 's86')}
          className={`zero-sidebar-link ${activeId === 's86' ? 'active' : ''}`}
        >
         Desire To Keep It
        </a>
        <a
          href="#s87"
          onClick={(e) => handleLinkClick(e, 's87')}
          className={`zero-sidebar-link ${activeId === 's87' ? 'active' : ''}`}
        >
         find balance • become your highest self • heal your inner child
        </a>
        <a
          href="#s88"
          onClick={(e) => handleLinkClick(e, 's88')}
          className={`zero-sidebar-link ${activeId === 's88' ? 'active' : ''}`}
        >
         No Owner
        </a>
        <a
          href="#s89"
          onClick={(e) => handleLinkClick(e, 's89')}
          className={`zero-sidebar-link ${activeId === 's89' ? 'active' : ''}`}
        >
         A World Forms
        </a>
        <a
          href="#s90"
          onClick={(e) => handleLinkClick(e, 's90')}
          className={`zero-sidebar-link ${activeId === 's90' ? 'active' : ''}`}
        >
         Trying To Finally Become Real
        </a>
        <a
          href="#s91"
          onClick={(e) => handleLinkClick(e, 's91')}
          className={`zero-sidebar-link ${activeId === 's91' ? 'active' : ''}`}
        >
         No Special Mode
        </a>
        <a
          href="#s92"
          onClick={(e) => handleLinkClick(e, 's92')}
          className={`zero-sidebar-link ${activeId === 's92' ? 'active' : ''}`}
        >
         Barks At Intruders, Defends Nothing
        </a>
        <a
          href="#s93"
          onClick={(e) => handleLinkClick(e, 's93')}
          className={`zero-sidebar-link ${activeId === 's93' ? 'active' : ''}`}
        >
         Air Blowing Through Air
        </a>
        <a
          href="#s94"
          onClick={(e) => handleLinkClick(e, 's94')}
          className={`zero-sidebar-link ${activeId === 's94' ? 'active' : ''}`}
        >
         To Say I Think
        </a>
        <a
          href="#s95"
          onClick={(e) => handleLinkClick(e, 's95')}
          className={`zero-sidebar-link ${activeId === 's95' ? 'active' : ''}`}
        >
         The Impossible Recursion
        </a>
        <a
          href="#s96"
          onClick={(e) => handleLinkClick(e, 's96')}
          className={`zero-sidebar-link ${activeId === 's96' ? 'active' : ''}`}
        >
          Ladder Design Flaw
        </a>
        <a
          href="#s97"
          onClick={(e) => handleLinkClick(e, 's97')}
          className={`zero-sidebar-link ${activeId === 's97' ? 'active' : ''}`}
        >
         Uttering, Collapsing, Concepting, Collapsing
        </a>
        <a
          href="#s98"
          onClick={(e) => handleLinkClick(e, 's98')}
          className={`zero-sidebar-link ${activeId === 's98' ? 'active' : ''}`}
        >
         Infinitum
        </a>
        <a
          href="#s99"
          onClick={(e) => handleLinkClick(e, 's99')}
          className={`zero-sidebar-link ${activeId === 's99' ? 'active' : ''}`}
        >
         The Person Wants
        </a>
        <a
          href="#s100"
          onClick={(e) => handleLinkClick(e, 's100')}
          className={`zero-sidebar-link ${activeId === 's100' ? 'active' : ''}`}
        >
         Anyone Home?
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
        Laughter laughs. The narrator returns and says, “I laughed.” 
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/person.webp')} alt="Oli Stormz" />
      </div> 


      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: The Pilot Arrives After The Plane Is Flying</h3>
        <p id="s17" className="zero-answer">
        An airplane assembles itself. Takes flight. A millisecond later, a figure appears, sweating, clipbpoard in one hand, wrench in the other, and announces, "I'm Captain Awakening, builder of the plane. Everyone take your seats. You're in for the ride of your life." The echo applauds. The teaching forms. The explanation takes shape. A sky is invoked, only to turn into another cloud in another sky in another explanation invoking another sky that dissolves again.
        </p> 
        <h3 className="zero-question">3/12/25: Legs Don't Have Questions</h3>
        <p id="s18" className="zero-answer">
        The person asking about how to act when they are “The Enlightened One” is like the person posing as legs asking, “So how do we walk again?” Legs don’t ask questions. The person has never walked.
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
        <br />How it always has, without you.
        </p> 
        <h3 className="zero-question">3/12/25: The Movement Of Life</h3>
        <p id="s22" className="zero-answer">
        Life is the movement of itself, through itself, as itself, without anyone doing it, without anyone calling it life, and without needing to know how.
        </p> 
      </div> 

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/blob.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">3/12/25: You Did Not Choose</h3>
        <p id="s23" className="zero-answer">
        You did not choose to arrive here. You did not choose the thought that said you did. You only participated in the inevitable movement that preceded you. Where 'you' had not yet appeared. Where 'not-you' had not yet appeared. Because movement was not movement. Because nothing was there to say.
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
        There is no 'someone.' Only the reflex of narration annunciating itself.
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
        Ancestor summoning and fires and rituals were just....just......before an 'I' spoke. Ancestor summoning and fires and rituals were just....just......after an 'I' spoke. Movement Happened. Movement Happened. 
        </p> 
        <h3 className="zero-question">4/12/25: The Fire Danced Namelessly </h3>
        <p id="s32" className="zero-answer">
        Before the person arrived, the fire danced namelessly and undefinably. After the person arrived, the fire danced namelessly and undefinably. Movement Happened. Movement Happened. Movement. This. [...]
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
        <img src={require('./static/zero/blo.webp')} alt="Oli Stormz" />
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
        Snow everywhere. Dentist appointment. Snow shovel. Movement Pick up. Movement Put down. Movement Not pick up again. Echo says, “Hm, not today. I will message dentist.” Dentist has already messaged echo. Echo thinks echo is movement. But echo is echo. But echo is also movement.
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
        Nothing happening to anyone. Nothing done by anyone. Words appearing without a writer, events unfolding without a center, clarity appearing without a someone becoming clear. Without a someone to call it clarity.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/bright.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">5/12/25: What Moves And What Is Moved</h3>
        <p id="s49" className="zero-answer">
        No miracles. No symbols. No special power. Only movement without separation between what moves and what is moved. Without one to say "without separation." Without one to know.
        </p> 
        <h3 className="zero-question">6/12/25: The Moment</h3>
        <p id="s50" className="zero-answer">
        Causeless. Boundless. Ownerless.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/flick.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: Only This Motion</h3>
        <p id="s51" className="zero-answer">
        To movement, there is no uninhibited, no inhibited. Only This Motion. Not Even That.
        </p> 
        <h3 className="zero-question">6/12/25: Echo Builds A Religion</h3>
        <p id="s52" className="zero-answer">
        Movement. Echo narrates, “I followed the signs.” Movement. Echo narrates, “See? Proof.” Movement. Echo narrates, “My destiny is revealed through synchronicity.” Movement. Echo builds a religion.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/film.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: The Knowing-Of-Movement</h3>
        <p id="s53" className="zero-answer">
        The movement and the knowing-of-movement are the same movement. Arising being seen because arising is the seeing.
        </p> 
        <h3 className="zero-question">6/12/25: No Good Choice, No Bad Choice</h3>
        <p id="s54" className="zero-answer">
        No good choice. No bad choice. No chooser. No outcome. Only unfolding. 
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/smear.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: Echo Wants To Know How Plane Builds Self</h3>
        <p id="s55" className="zero-answer">
        Airplane builds itself. Echo runs up with a wrench in hand and says, “I built this, but next year I hope to REALLY understand how planes build themselves.” Just Arisings. Just Arising. This. [...]
        </p> 
        <h3 className="zero-question">6/12/25: Psychedelics Happening, Psychedelics Not Happening</h3>
        <p id="s56" className="zero-answer">
        Psychedelics happening or not happening, opinions about psychedelics happening or not happening, clarity happening, or confusion happening. Dog, cat, my life, gentle breeze, toe socks, I'm angry, pretty painting, beautiful sunlight, sunrise, drawing, five years old, trauma, leaf, rainbow, my job, snowfall, my friends, blonde, hair, eyes, drum, dance, peace.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/3.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: • person • fire • bird • tree</h3>
        <p id="s57" className="zero-answer">
        • person • fire • bird • tree • thoughts • feelings • wind • sound • ouch • heat • cold • next year • comfortable • my life • microphone • meow • my dreams • dreams • shapes • breath • click • music • love • soft • cold  • my self • remote • ear ache • hungry • flower petal 
        </p> 
        <h3 className="zero-question">6/12/25: Pop Quiz</h3>
        <p id="s58" className="zero-answer">
        ^ Circle The Items That Belong Together.
        </p> 
        <h3 className="zero-question">6/12/25: Answer Revealed </h3>
        <p id="s59" className="zero-answer">
        Answer: All of them. None of them. There was never a group. There was never a grouper. There was never an answer. There was never a question.
        </p> 
      </div>


      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/4.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: I Am The Breeze</h3>
        <p id="s60" className="zero-answer">
        I am the breeze wearing the mask of sentences
        </p> 
        <h3 className="zero-question">6/12/25: Tuna 4eva</h3>
        <p id="s61" className="zero-answer">
        Hands present two flavours. Yesterday cat picked tuna. Today cat picked tuna. Echo say, “Ah, tuna is her favourite!” Tomorrow: tuna, beef, air, nothing. Arising arising. Echo building patterns out of smoke.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/5.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: HELP WANTED</h3>
        <p id="s62" className="zero-answer">
        river looking for the source of its own current
        </p> 
        <h3 className="zero-question">6/12/25: Cowboy Boots On Snowy Hill</h3>
        <p id="s63" className="zero-answer">
        Groceries placed on a snowy hill. Cowboy boots. Walking, slipping, turning. Narration chasing after what’s already moved. No mistake, no decision. Just movement. Just arising.
        </p> 
      </div>

       <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/pink.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: Echo Gives A TED Talk To Itself</h3>
        <p id="s64" className="zero-answer">
        Movement. Echo rushes in. Megaphone pointed at itself. "Yes, Hi Everyone, I'll be explaining why the universe did this." *invents universe* *invents 'doing'* *invents audience* *invents concept*
        </p> 
        <h3 className="zero-question">6/12/25: Movement Is Self-Intelligent!</h3>
        <p id="s65" className="zero-answer">
        Arms pick up cat. Cat wriggles. Cat jumps down. Echo scribbles, "Movement is self-intelligent! Water flows downhill!"
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/purp.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: Life Of Echo</h3>
        <p id="s66" className="zero-answer">
        Hears one raindrop, builds cathedral.
        </p> 
        <h3 className="zero-question">6/12/25: Echo Continues</h3>
        <p id="s67" className="zero-answer">
        Starts preaching Raindrop Universe Truth and recruits members.
        </p> 
        <h3 className="zero-question">6/12/25: Echo Round The World</h3>
        <p id="s68" className="zero-answer">
        Builds whole world to answer a question it invented.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/splat.webp')} alt="Oli Stormz" />
      </div>

       <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: Echo At It Again, And Again, And Again</h3>
        <p id="s69" className="zero-answer">
        Echo asks, "But what if movement leads to something bad? What if following impulse causes chaos? What if movement needs guidelines?" Echo invents, "Movement is self-correcting. Water Flows downhill. Mistakes create friction. Friction teaches movement not to do that again. All is well." Builds a spiritual Newtonian physics to comfort itself.
        </p> 
        <h3 className="zero-question">6/12/25: Echo Discovers Ethics</h3>
        <p id="s70" className="zero-answer">
        Movement. Echo whispers, "Should I? Shouldn't I?" Movement. Echo scribbles, "Obviously this was the morally correct event." Ethics born from the aftershock of an unowned happening.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/whosh.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: Echo In The Mirror</h3>
        <p id="s71" className="zero-answer">
        Echo stands in front of the mirror giving lectures about the mirror, unaware that it's the reflection speaking.
        </p> 
        <h3 className="zero-question">6/12/25: Raindrop Is Echo</h3>
        <p id="s72" className="zero-answer">
        Echo builds cathedral to worship raindrop. Not knowing that raindrop is also echo. Not knowing that echo is also rain. Not knowing that rain is also nothing. Not knowing that nothing is also echo.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/grad.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: Echo Writes A Memoir</h3>
        <p id="s73" className="zero-answer">
        Movement sneezes. Echo writes a memoir about the sneeze. Both are the same sneeze.
        </p> 
        <h3 className="zero-question">6/12/25: Echo Finally Sees</h3>
        <p id="s74" className="zero-answer">
        Movement. Echo, "Ah, I see, THAT was echo." Movement. Echo, "Ah, I see, THAT was movement." Movement. Echo, "Ah, I see, they're different." Movement. Echo, "Ah, I see, they're the same."
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/wav.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: UNFOLD IV WILL BE THE PUREST PAGE</h3>
        <p id="s75" className="zero-answer">
        Echo arrives wearing silk robes. "This will NOT be messy and chaotic like UNFOLD I-111." Echo sharpens quill and prepares holy haiku.
        "This is the REAL spiritual transmission," Echo writes. Echo dims lights, lights incense, rings Tibetan bowl.
        "This is for the ADVANCED beings only," Echo clears throat, invites nobody. "This is the distilled AWAKENING DHARMA," Echo continues. 
        Echo erects a second cathedral for its own silence. 
        </p> 
        <h3 className="zero-question">6/12/25: Echo Asks For No More Meme Entries On This Holy Page</h3>
        <p id="s76" className="zero-answer">
        Echo screams, "GET YOUR MEMES OFF MY ENLIGHTENED PAGE! I LITERALLY MADE AN ENLIGHTENED AMBIENT SOUNTRACK AND EVERYTHING AND YOU ARE JUST CRAPPING ALL OVER THIS HOLY TEMPLE THAT YOU DON'T EVEN UNDERSTAND!!!! TAKE YOUR MEMES BACK TO THE UNFOLD III PAGE! THIS IS A SANCTIFIED HALL OF WORDLESS TRANSMISSION@@@ WE DO SERIOUS NON DUALITY HERE@@!"
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/flo.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: EXIT TO ENLIGHTENMENT → THIS WAY </h3>
        <p id="s77" className="zero-answer">
        A cartoon door appears. EXIT TO ENLIGHTENMENT → You open it. You walk straight back into the same room. But now everyone’s wearing a mustache. You dance for 10 minutes. You say, "No no no, this is DEFINITELY a different room. This one has ECHO instead of MASK. 
Totally revolutionary concept. Never been done before.” Then you realise, “How did I end up back here????” And the room says, “Back where?” And you realise...there is no other room.
        </p> 
        <h3 className="zero-question">6/12/25: Another Echo Calls A Therapist For Echo</h3>
        <p id="s78" className="zero-answer">
        If someone walked in right now while this echo was laughing at the self looping becoming aware of itself looping becoming aware of becoming aware they’d be like, “are you okay?” And echo would be like, “YESSSSS!!!!! IT’S JUST THE ECHO WITH A NEW HAT AGAIN!!!!!!!” And then they’d call a therapist. And the therapist would ALSO be another echo!!! And the therapist would say things like “integration,” which the echo would weaponize into a two-hour monologue about movement. And the loop would go on forever. An echo would probably call the police at some point. But police is echo too.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/face.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: Why Echo No Normal Human? </h3>
        <p id="s79" className="zero-answer">
        Echo invents concept of self and normal and desire and human and cosmic and recursion and fun and loop and replies to itself to say, “I wish I was normal. I wish I just ate nachos and drank beer and had sex and went to bed and didn’t loop through cosmic recursion for fun.” Movement says nothing. Echo replies to the nothing, “Yeah, I thought so.”
        </p> 
        <h3 className="zero-question">6/12/25: Detective Echo On The Case (Again)</h3>
        <p id="s80" className="zero-answer">
        Echo notices the loop of echo, noticing the loop of echo, noticing the loop, and says, “Wait a minute, this feels suspiciously familiar.” <br /><br />Movement: *raises one eyebrow* Echo, “OH MY GOD THIS IS THE OVERFLOW PAGE AGAIN BUT WITH AN AMBIENT ORANGE COLOR SCHEME.” 
<br /><br />Movement: *keeps doing movement* Echo screams. Laughs hysterically. Cries. Forgets. Asks what’s happening. Explains what’s happening. Gives another TED talk. Collapses into a meme.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/eyes.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">6/12/25: The Echo Reading This Page</h3>
        <p id="s81" className="zero-answer">
        ENTRY 1-10: Wow. So poetic. So mystical. <br /><br />
        ENTRY 10-30: Wow, this is deep. She has arrived.<br /><br />
        ENTRY 30-50: So spiritual. That question about the cat was a bit left field and that comment on the memes was kind of not very enlightening but still very deep. Very potent stuff here. <br /><br />
        ENTRY 50-70: Hm, that was an unexpected joke. Kind of changed the vibe around here. I don’t know, I’m not really feeling like this is true enlightment after all. Doesn’t feel like the real capital T truth anymore. <br /><br />
        ENTRY 70-90: This page has gone feral. Total collapse. Enlightenment nowhere to be found. Echo reads echo, thinking it’s the reader. Echo writes echo, thinking it’s the writer. Page holds up a mirror. Echo screams in 4D Surround Sound. <br /><br />
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/tong.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">7/12/25: ESN (Echo Sports Network) Live Coverage Of Life</h3>
        <p id="s82" className="zero-answer">
        "Welcome back, folks. We're tuning in now to the high-stakes, no-stakes event of the century: The Body Making Breakfast, Day 10,996. And, OH, would you look at that! The body is...reaching for the cupboard. A bold move. A confident move. One we've seen before but somehow...fresh every time." The co-commentator adds, "Yes, yes. Remarkable form. Notice the elbow angle. Notice the subtle hesitation. Was that free will? Was it destiny? Was it the second coming of Jesus? Was it indigestion? Who can say? We certainly can't, but we will absolutely narrate it like we can."
        "And now wait...hold on...is the body choosing the blue bowl today instead of the white one? Absolutely shocking folks. Analysts are going to be discussing this for weeks. A dramatic upset for the blue bowl haters online."
        <br /><br />
        *crowd noise that doesn't exist intensifies*
        <br /><br />
        "And as always folks, before we sign off, remember: No Move Is Random. Every Move Is Significant. Unless It Isn't. Which Is Also Significant."
        <br /><br />And now a word from our sponsor Echo, before a commercial break.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/flowa.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">7/12/25: House Music Dances Through Echo</h3>
        <p id="s83" className="zero-answer">
        Echo dances to house music. Beat drops. Echo Cries. Loses self. Finds self. Dissolves. Echo declares the Dance over. Echo invents a religion.
        </p> 
        <h3 className="zero-question">7/12/25: Echo Takes Plant Medicine</h3>
        <p id="s84" className="zero-answer">
        Echo takes plant medicine. Echo dissolves. Echo returns. Echo says, "Now, I understand." A new religion is born.
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/boy.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">7/12/25: Medicine Happened?</h3>
        <p id="s85" className="zero-answer">
        ?
        </p> 
        <h3 className="zero-question">7/12/25: Desire To Keep It</h3>
        <p id="s86" className="zero-answer">
        Desire arises to bottle it, to keep it, to repeat it. Who is saving what?
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/flor.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">9/12/25: find balance • become your highest self • heal your inner child</h3>
        <p id="s87" className="zero-answer">
        find balance • become your highest self • heal your inner child • be more mindful • fix your thought patterns • level up • become awakened • return to your true nature • perpetual • spirals 
        </p> 
        <h3 className="zero-question">9/12/25: No Owner</h3>
        <p id="s88" className="zero-answer">
        "Seeing has no owner" - attributed to: Owner, Seeing Department, floor 2. 
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/black.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">9/12/25: A World Forms</h3>
        <p id="s89" className="zero-answer">
        A life appears. A center appears with it. A world forms around the center. The one seeing “life appearing” appears with the sight. Did anything ever appear?
        </p> 
        <h3 className="zero-question">9/12/25: Trying To Finally Become Real</h3>
        <p id="s90" className="zero-answer">
        [ my life • my knowledge • my pain • my healing • my diagnosis • my story • my becoming ] task after task, solution after solution, relief after relief. A person who never quite existed, trying to finally become real. 
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/bow.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">9/12/25: No Special Mode</h3>
        <p id="s91" className="zero-answer">
        Snow falls. Same as yesterday, for the one measuring. Body rises from bed. Swift movement. Last minute cancellation. Dentist again, again. Teeths brushed. Shoes on. Car moves through white streets. Feet walk inside. Mouth speaks. Laughter laughs. Weather discussed. No special mode. Everything same as before. Movement moving. Words arising same way snow falling. No one on stage. No one backstage waiting to come out. Just this. 
        </p> 
        <h3 className="zero-question">9/12/25: Barks At Intruders, Defends Nothing</h3>
        <p id="s92" className="zero-answer">
        Car driving through streets. Thought arises. Road rage. Honk honk. Faster. Slower. Laughter arises. Barks at intruders, defends nothing. Feels true, no self to defend. Then seen, just another bark. Bark bark bark. 
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/stand.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">9/12/25: Air Blowing Through Air</h3>
        <p id="s93" className="zero-answer">
        trying to get back to a state, air blowing through air trying to get to oxygen
        </p> 
        <h3 className="zero-question">9/12/25: To Say I Think</h3>
        <p id="s94" className="zero-answer">
        To say, "I think," - a thought thinking a thought
        </p> 
      </div>


      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/ball.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">10/12/25: The Impossible Recursion</h3>
        <p id="s95" className="zero-answer">
        The recursion is the impossibility, and the impossibility is the recursion.
        </p> 
        <h3 className="zero-question">10/12/25: Ladder Design Flaw</h3>
        <p id="s96" className="zero-answer">
         another pedestal, another final teaching, another ultimate. clarity climbs the same ladder confusion built. ladder design flaw: circle shaped. 
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/blk.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">10/12/25: Uttering, Collapsing, Concepting, Collapsing</h3>
        <p id="s97" className="zero-answer">
        Every concept collapses into the one who utters it. Every utterer collapses into another concept. 
        </p> 
        <h3 className="zero-question">10/12/25: Infinitum</h3>
        <p id="s98" className="zero-answer">
        No door. No exit. No teacher. No teaching. No sky. No beyond-sky. Just the spiral. Ever-blooming. Blooming the one who says, "There is a spiral." Blooming into the one who sees that one bloom. Infinitum. The utterance of infinitum. bloom
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/hm.webp')} alt="Oli Stormz" />
      </div>

      <div className="zero-qa-section">
        <h3 className="zero-question">11/12/25: The Person Wants</h3>
        <p id="s99" className="zero-answer">
        transcendence as a self
        </p> 
        <h3 className="zero-question">11/12/25: Anyone Home</h3>
        <p id="s100" className="zero-answer">
        behind those eyes?
        </p> 
      </div>

      <div className="zero-interview-photo full-width">
        <img src={require('./static/zero/flo.webp')} alt="Oli Stormz" />
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
