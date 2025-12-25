import { Link } from 'react-router-dom';

// App.js
import React, { useState, lazy, Suspense } from 'react';
import Dialog from '@mui/material/Dialog';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './HomePage.css';



// BACKGROUND
import backgroundVideo from './static/background-video.mp4';
// ALBUM COVERS
import image1 from './static/music/image-1.webp';
import image2 from './static/music/image-2.webp';
import image3 from './static/music/image-3.webp';
import image4 from './static/music/image-4.webp';
import image5 from './static/music/image-5.webp';
import image6 from './static/music/image-6.webp';
import image7 from './static/music/image-7.webp';
import image8 from './static/music/image-8.webp';
import image9 from './static/music/image-9.webp';
import image10 from './static/music/image-10.webp';
import image11 from './static/music/image-11.webp';
import image12 from './static/music/image-12.webp';
import image13 from './static/music/image-13.webp';
import image15 from './static/music/image-15.webp';
import image16 from './static/music/image-16.webp';
import image17 from './static/music/image-17.webp';

// IMAGES
import noclickimage1 from './static/music/noclickimage-1.webp';
import noclickimage2 from './static/music/noclickimage-2.webp';
import noclickimage3 from './static/music/noclickimage-3.webp';
import noclickimage4 from './static/music/noclickimage-4.webp';
// HEADER
import headerImage from './static/music/header.png'; // Import the header image
// SOCIAL MEDIA ICONS
import instagramIcon from './static/logo/instagram.png'; // Import Instagram icon
import tiktokIcon from './static/logo/tiktok.png';       // Import TikTok icon
import youtubeIcon from './static/logo/youtube.png';     // Import YouTube icon
import spotifyIcon from './static/logo/spotify.png';     // Import Spotify icon
import pushpin from './static/logo/pushpin.png'; // Import the pushpin image


// Lazy load FloatingElement
const FloatingElement = lazy(() => import('./FloatingElement')); // Lazy-loaded component

function HomePage() {
  const elements = [
    // IN YA FACE
    {
      image: image17,
      videoUrl: 'https://www.youtube.com/embed/wcrwA5YcxoA?si=6Bp43FNJzt7EfeRf',
      title: 'IN YA FACE: Released 12.13.25',
      description: 'Transmission delivered. Timelines updated.',
      links: [
        // { label: 'Short', url: 'https://youtube.com/shorts/HJYvrcjHtHU' },
        { label: 'Reel', url: 'https://www.instagram.com/reel/DSNIhoYAIpc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
        { label: 'Spotify', url: 'https://open.spotify.com/album/72SCgtRTpNOxLeFlTMQszN' },
      ],
      animation: 'float3', // Unique animation class
    },
    // Post-it Note 2
    {
      noteText: 'The art happens without an artist.',
      isPostIt: true,
      backgroundColor: '#FFEE8C', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // BIG FIN
    {
      image: image16,
      videoUrl: 'https://www.youtube.com/embed/2PvPM2fOVxs?si=eCRiUmsMnGEd7C_F',
      title: 'Big Fin: Released 11.28.25',
      description: 'I invented the game, of course I win.',
      links: [
        // { label: 'Short', url: 'https://youtube.com/shorts/HJYvrcjHtHU' },
        { label: 'Reel', url: 'https://www.instagram.com/p/DRe7cmrjYML/' },
        { label: 'Spotify', url: 'https://open.spotify.com/album/0Kfq6ONYChymGZqm1sU8rE?si=9isQUuDTTli7hKDhdcMZPw' },
      ],
      animation: 'float3', // Unique animation class
    },
    // Post-it Note 2
    {
      noteText: 'These blue mountains have witnessed the unfolding',
      isPostIt: true,
      backgroundColor: '#FFDEAD', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // SHEKADI
    {
      image: image15,
      videoUrl: 'https://www.youtube.com/embed/e8MQzUMtIow?si=pL1726XStbMfrJ0h',
      title: 'Shekadi: Released 10.31.25',
      description: 'Rhythm Moves Itself',
      links: [
        // { label: 'Short', url: 'https://www.youtube.com/shorts/XlXiFbN1D9Y' },
        { label: 'Reel', url: 'https://www.instagram.com/p/DQZQNEXgHs_/' },
        { label: 'Spotify', url: 'https://open.spotify.com/album/55CKtiQiZi6To0x52QAAxc' },
      ],
      animation: 'float3', // Unique animation class
    },
    // Post-it Note 2
    {
      noteText: 'Alignment is what your field says before you speak.',
      isPostIt: true,
      backgroundColor: '#B0E0E6', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Every Time U Come Around
    {
      image: image13,
      videoUrl: 'https://www.youtube.com/embed/vkE6gU9UoJM?si=S7-6PDAaMc2PMEAp',
      title: 'Every Time U Come Around: Released 9.12.25',
      description: 'Take A Number',
      links: [
        // { label: 'Short', url: 'https://youtube.com/shorts/rcb4VbrIJYU' },
        { label: 'Reel', url: 'https://www.instagram.com/p/DOV_iyyDfwW/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/3hV0vC4MjyjCa6DLE330yZ?si=e91700de24204991' },
      ],
      animation: 'float1', // Unique animation class
    },
       // Post-it Note 0
    {
      noteText: 'Life is as sacred or mundane as you make it',
      isPostIt: true,
      backgroundColor: '#baffc9', // Example pastel color
      animation: 'float4', // Unique animation class
    },
    // Shadow Wrath
    {
      image: image12,
      videoUrl: 'https://www.youtube.com/embed/5Q8fgIkwGlM?si=6A40StWFpGaAXWrO',
      title: 'Shadow Wrath: Released 5.5.25',
      description: 'No Way Out',
      links: [
        // { label: 'Short', url: 'https://youtube.com/shorts/nwaaJqhi07o' },
        { label: 'Reel', url: 'https://www.instagram.com/p/DIBCamHN5_L/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/4rF7YsKVjJi2v2bLdZWSgo?si=5be7e891622f4185' },
      ],
      animation: 'float2', // Unique animation class
    },
      // Post-it Note 0
    {
      noteText: 'follow the path for the path to unfold',
      isPostIt: true,
      backgroundColor: '#B0E0E6', // Example pastel color
      animation: 'float4', // Unique animation class
    },
    // Ode To Flight
    {
      image: image11,
      videoUrl: 'https://www.youtube.com/embed/poykJzi017M?si=tDrXfYk0iBYcJu2B',
      title: 'Ode To Flight: Released 4.4.25',
      description: 'Stand In the height of your being',
      links: [
        // { label: 'Short', url: 'https://www.youtube.com/shorts/PDFrAAuypgE' },
        { label: 'Reel', url: 'https://www.instagram.com/reel/DJPplDvtBs0/?igsh=MTh2YnpvNXJ1OXBybg==' },
        { label: 'Spotify', url: 'https://open.spotify.com/album/2KRYbExuiGt8knRYtgmSey' },
      ],
      animation: 'float2', // Unique animation class
    },
      // Post-it Note 0
    {
      noteText: 'Living prayers, Living omens, Living water',
      isPostIt: true,
      backgroundColor: '#FFC5D3', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Big Taita
    {
      image: image10,
      videoUrl: 'https://www.youtube.com/embed/j6Z2MS5z7C0?si=kz6OylXRNafg2JLe',
      title: 'Big Taita: Released 3.3.25',
      description: 'Sober and Celibate?',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/qCMr1H2Eets?si=Ge9E0b1CnFWWzKkz' },
        { label: 'Reel', url: 'https://www.instagram.com/p/DGuuYGotAjI/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/64fuWy1a7IV9PrRs45gMC9?si=6f07da3b09494f22' },
      ],
      animation: 'float3', // Unique animation class
    },
      // Post-it Note 0
    {
      noteText: 'grasp the limitless infinity of your potential',
      isPostIt: true,
      backgroundColor: '#e6d7ff', // Example pastel color
      animation: 'float4', // Unique animation class
    },
    // Eye Bring Thunda
    {
      image: image9,
      videoUrl: 'https://www.youtube.com/embed/e9jq6aCSgMw?si=sqOEC-p5i-xFZoDD',
      title: 'Eye Bring Thunda: Released 2.2.25',
      description: 'Why say my peace?',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/33rYjrwgPYE' },
        { label: 'Reel', url: 'https://www.instagram.com/reel/DFkNCx-tCPn/?igsh=MWE4N2d5ODU0cmw0cg==' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/6zi0DpBtakhB6DI1ol73oy?si=4bb23569800e4ea1' },
      ],
      animation: 'float2', // Unique animation class
    },
    {
      noteText: 'Whatever you do, do it with the outmost devotion.',
      isPostIt: true,
      backgroundColor: '#FFDEAD', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Dehydrated Making Declarations
    {
      image: image8,
      videoUrl: 'https://www.youtube.com/embed/SeTMdCWDAqs?si=dbaB8AmJNBG-HWcX',
      title: 'Dedryhated Making Declarations: Released 1.11.25',
      description: 'A psychoanalyis of the world.',
      links: [
        { label: 'Pt. 2', url: 'https://youtu.be/80vIzSej470' },
        { label: 'Reel', url: 'https://www.instagram.com/reel/DER-QVFN_V-/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/5EQIws9lKS0ZRPmqs6GCEx?si=5d40926723644e59' },
      ],
      animation: 'float4', // Unique animation class
    },
    {
      noteText: 'It is beyond happiness..it is beyond joy...',
      isPostIt: true,
      backgroundColor: '#bae1ff', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Shango's Decree
    {
      image: image7,
      videoUrl: 'https://www.youtube.com/embed/CJOKP3AXxbk?si=n6b7Zah94_vR84u8',
      title: 'Shangos Decree: Released 12.12.24',
      description: 'My ancestors dreamed of me.',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/tvlq5_bQwUo' },
        { label: 'Reel', url: 'https://www.instagram.com/reel/DDdFKS0tw87/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/3qCRQyYTUZzD8kh9pzvV26?si=f54c83bbe9db4ae6' },
      ],
      animation: 'float2', // Unique animation class
    },
        // Post-it Note 1
    {
      noteText: 'I am a believer without a trace of doubt in my mind.',
      isPostIt: true,
      backgroundColor: '#baffc9', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // // Non-clickable Image 1
    // {
    //   image: noclickimage1,
    //   isNonClickable: true,
    //   animation: 'float3', // Unique animation class
    // },
    // Diana
    {
      image: image6,
      videoUrl: 'https://www.youtube.com/embed/p_SSrNH27Ms?si=G9wWzU-MliTtL6be',
      title: 'Diana: Released 11.11.24',
      description: 'An ode to Diana and Athena.',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/OSMezVjWNwY' },
        { label: 'Reel', url: 'https://www.instagram.com/p/DCOorY-tIyr/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/1GHutZBxoHTNtzjVcl9YZG?si=d15ef22f62494bb9' },
      ],
      animation: 'float4', // Unique animation class
    },
      // Post-it Note 0
    {
      noteText: 'U cannot fly and hold tha hand rails at same time.',
      isPostIt: true,
      backgroundColor: '#fff3d5', // Example pastel color
      animation: 'float4', // Unique animation class
    },
    // Victorus My Storius
    {
      image: image5,
      videoUrl: 'https://www.youtube.com/embed/2DnsJlDN8vc',
      title: 'Victorus My Storius: Released 10.10.24',
      description: 'I be rapping mayne...I be rapping..',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/W_iXa_Vd5mI' },
        { label: 'Reel', url: 'https://www.instagram.com/p/DAadaV9u-MK/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/2QF4Qzj3mWN6ioMwj4oqQp?si=779ec9bee8ea4bc1' },
      ],
      animation: 'float1', // Unique animation class
    },
    // Post-it Note 2
    {
      noteText: 'We know leetle...we find mucho...- a guru',
      isPostIt: true,
      backgroundColor: '#B0E0E6', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Non-clickable Image 1
    {
      image: noclickimage1,
      isNonClickable: true,
      animation: 'float3', // Unique animation class
    },
     // Post-it Note 2
    {
      noteText: 'Curse of consciousness: We want to win on our own, rather than allow the cosmos to be generous.',
      isPostIt: true,
      backgroundColor: '#FFDEAD', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Gun Dutta One
    {
      image: image4,
      videoUrl: 'https://www.youtube.com/embed/C2fdW4BHmx8',
      title: 'Gun Dutta One: Released 9.9.24',
      description: 'Primal strength and powa',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/gGZ7JyQ2RvM' },
        { label: 'Reel', url: 'https://www.instagram.com/p/C_gC12MtFvz/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/6SLsp7H8oIj0SuNUsywmri?si=7d30fc9da4e94a9a' },
      ],
      animation: 'float3', // Unique animation class
    },
     // Post-it Note 0
    {
      noteText: 'have u ever seen an eagle soar?',
      isPostIt: true,
      backgroundColor: '#d4ffea', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Non-clickable Image 2
    {
      image: noclickimage2,
      isNonClickable: true,
      animation: 'float2', // Unique animation class
    },
      // Post-it Note 0
    {
      noteText: 'An accumulation of choices and actions aimed at peace, tranquility, sustenance, and insight',
      isPostIt: true,
      backgroundColor: '#ffd4e5', // Example pastel color
      animation: 'float4', // Unique animation class
    },
    // There I Go
    {
      image: image3,
      videoUrl: 'https://www.youtube.com/embed/37le8XBBtPg',
      title: 'There I Go: Released 8.8.24',
      description: 'Catch me skating.',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/m9L3wqVAHXQ' },
        { label: 'Reel', url: 'https://www.instagram.com/p/C-Zy5Wzt52u/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/4mVEPN2cdo0hpJQP7UFQgo?si=3d9eda4486fb4a20' },
      ],
      animation: 'float4', // Unique animation class
    },
    // note
    {
      noteText: 'Ha Ha I Remember When Fear Used To Scare Me !',
      isPostIt: true,
      backgroundColor: '#bae1ff', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Driftin
    {
      image: image2,
      videoUrl: 'https://www.youtube.com/embed/cciwq7IxBd4',
      title: 'Driftin: Released 7.7.24',
      description: 'A melancholy electronic dream. My dream at least.',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/rdFQalUYEwk' },
        { label: 'Reel', url: 'https://www.instagram.com/p/C9Hd6A3NkKu/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/4apOH7UZYFmrt5Fyc32Q5J' },
      ],
      animation: 'float4', // Unique animation class
    },
      // Post-it Note 1
    {
      noteText: 'leave someone alone too long and they blow thru barriers.',
      isPostIt: true,
      backgroundColor: '#FFDEAD', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // What The Officer Said
    {
      image: image1,
      videoUrl: 'https://www.youtube.com/embed/jINjek6prIk',
      title: 'What The Officer Said: Debut 6.6.24',
      description: 'The debut. Improvised in one take...deep meanings to be found?',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/24jJIePbmMo' },
        { label: 'Reel', url: 'https://www.instagram.com/p/C8ZcOepNlLi/' },
        { label: 'Spotify', url: 'https://open.spotify.com/album/6GLwkFoC9b5yfQlEw7TXKQ' },
      ],
      animation: 'float4', // Unique animation class
    },
    // Non-clickable Image 3
    {
      image: noclickimage3,
      isNonClickable: true,
      animation: 'float2', // Unique animation class
    },
    // Non-clickable Image 3
    {
      image: noclickimage4,
      isNonClickable: true,
      animation: 'float2', // Unique animation class
    },
  ];

  return (
    <div className="app">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <header className="header">
        <img src={headerImage} alt="Header" className="header-image" />
        <p className="header-sentence">I built a dream, then lived in it.</p>
      </header>
      <Grid container spacing={2} className="floating-grid">
        {elements.map((element, index) => (
          <Grid item key={index} xs={4}>
            {/* Force 3 columns across all screen sizes using xs={4} */}
            {element.isNonClickable ? (
              <div className={`non-clickable-image ${element.animation}`}>
                <img src={pushpin} alt="Pushpin" className="pushpin" /> {/* Pushpin */}
                <img src={element.image} alt="Non-clickable" className="element-image" />
              </div>
            ) : element.isPostIt ? (
              <div
                className={`post-it-note ${element.animation}`}
                style={{ backgroundColor: element.backgroundColor }}
              >
                <img src={pushpin} alt="Pushpin" className="pushpin" /> {/* Pushpin */}
                {element.noteText}
              </div>
            ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <FloatingElement data={element} animationClass={element.animation} />
            </Suspense>  
            )}
          </Grid>
        ))}
      </Grid>

      {/* Social Media Icons */}
      <div className="social-media-icons">
        <div className="social-media-group">
          <a href="https://www.instagram.com/olistormz" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
        </div>
        <div className="social-media-group">
          <a href="https://www.youtube.com/@olistormz" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="YouTube" className="social-icon" />
          </a>
          <a href="https://open.spotify.com/artist/0qLSNquxJm7uXg5SRUlYgj/discography/all" target="_blank" rel="noopener noreferrer">
            <img src={spotifyIcon} alt="Spotify" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}


export default HomePage;
