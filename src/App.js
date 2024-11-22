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
import './App.css';



// BACKGROUND
import backgroundVideo from './static/background-video.mp4';
// ALBUM COVERS
import image1 from './static/image-1.webp';
import image2 from './static/image-2.webp';
import image3 from './static/image-3.webp';
import image4 from './static/image-4.webp';
import image5 from './static/image-5.webp';
import image6 from './static/image-6.webp';
import image7 from './static/image-7.webp';
import image8 from './static/image-8.webp';
// IMAGES
import noclickimage1 from './static/noclickimage-1.png';
import noclickimage2 from './static/noclickimage-2.png';
import noclickimage3 from './static/noclickimage-3.png';
import noclickimage4 from './static/noclickimage-4.png';
// HEADER
import headerImage from './static/header.png'; // Import the header image
// SOCIAL MEDIA ICONS
import instagramIcon from './static/instagram.png'; // Import Instagram icon
import tiktokIcon from './static/tiktok.png';       // Import TikTok icon
import youtubeIcon from './static/youtube.png';     // Import YouTube icon
import spotifyIcon from './static/spotify.png';     // Import Spotify icon
import pushpin from './static/pushpin.png'; // Import the pushpin image

// Lazy load FloatingElement
const FloatingElement = lazy(() => import('./FloatingElement')); // Lazy-loaded component

function App() {
  const elements = [
    // // Dehydrated Making Declarations
    // {
    //   image: image8,
    //   videoUrl: 'https://www.youtube.com/embed/-12uNnxIXgs',
    //   title: 'Dehydrated Making Declarations: Released 1.11.25',
    //   description: '8 minute wordplay. Rapping my psychoanalyis of the world.',
    //   links: [
    //     { label: 'Lyrics', url: 'https://youtu.be/OSMezVjWNwY' },
    //     { label: 'Reel', url: 'https://www.instagram.com/p/DCOorY-tIyr/' },
    //     { label: 'Spotify', url: 'https://open.spotify.com/track/1GHutZBxoHTNtzjVcl9YZG?si=d15ef22f62494bb9' },
    //   ],
    //   animation: 'float4', // Unique animation class
    // },
    // // Post-it Note 1
    // {
    //   noteText: 'leave someone alone too long and they blow thru barriers.',
    //   isPostIt: true,
    //   backgroundColor: '#FFDEAD', // Example pastel color
    //   animation: 'float1', // Unique animation class
    // },
    // // Shango's Decree
    // {
    //   image: image7,
    //   videoUrl: 'https://www.youtube.com/embed/-12uNnxIXgs',
    //   title: 'Shangos Decree: Released 12.12.24',
    //   description: 'UK Drill. Yuh nuh want beef.',
    //   links: [
    //     { label: 'Lyrics', url: 'https://youtu.be/OSMezVjWNwY' },
    //     { label: 'Reel', url: 'https://www.instagram.com/p/DCOorY-tIyr/' },
    //     { label: 'Spotify', url: 'https://open.spotify.com/track/1GHutZBxoHTNtzjVcl9YZG?si=d15ef22f62494bb9' },
    //   ],
    //   animation: 'float2', // Unique animation class
    // },
    // // Non-clickable Image 1
    // {
    //   image: noclickimage1,
    //   isNonClickable: true,
    //   animation: 'float3', // Unique animation class
    // },
    // Diana
    {
      image: image6,
      videoUrl: 'https://www.youtube.com/embed/-12uNnxIXgs',
      title: 'Diana: Released 11.11.24',
      description: 'Melodic afrobeats. An ode to Diana and Athena.',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/OSMezVjWNwY' },
        { label: 'Reel', url: 'https://www.instagram.com/p/DCOorY-tIyr/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/1GHutZBxoHTNtzjVcl9YZG?si=d15ef22f62494bb9' },
      ],
      animation: 'float4', // Unique animation class
    },
    // Post-it Note 2
    {
      noteText: 'I might be mayor of the pueblo, presidente del potato',
      isPostIt: true,
      backgroundColor: '#FFDEAD', // Example pastel color
      animation: 'float1', // Unique animation class
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
    // Non-clickable Image 1
    {
      image: noclickimage1,
      isNonClickable: true,
      animation: 'float3', // Unique animation class
    },
    // Post-it Note 2
    {
      noteText: 'We know leetle...we find mucho...- a guru',
      isPostIt: true,
      backgroundColor: '#B0E0E6', // Example pastel color
      animation: 'float1', // Unique animation class
    },
    // Gun Dutta One
    {
      image: image4,
      videoUrl: 'https://www.youtube.com/embed/C2fdW4BHmx8',
      title: 'Gun Dutta One: Released 9.9.24',
      description: 'Primal strength and powa...techno..tribal..house..',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/gGZ7JyQ2RvM' },
        { label: 'Reel', url: 'https://www.instagram.com/p/C_gC12MtFvz/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/6SLsp7H8oIj0SuNUsywmri?si=7d30fc9da4e94a9a' },
      ],
      animation: 'float3', // Unique animation class
    },
      // Post-it Note 0
    {
      noteText: 'U cannot fly and hold tha hand rails at same time. - My Dad',
      isPostIt: true,
      backgroundColor: '#CCE2CB', // Example pastel color
      animation: 'float4', // Unique animation class
    },
    // Non-clickable Image 2
    {
      image: noclickimage2,
      isNonClickable: true,
      animation: 'float2', // Unique animation class
    },
    // There I Go
    {
      image: image3,
      videoUrl: 'https://www.youtube.com/embed/37le8XBBtPg',
      title: 'There I Go: Released 8.8.24',
      description: 'Light electronic summertime bop. Catch me skating.',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/m9L3wqVAHXQ' },
        { label: 'Reel', url: 'https://www.instagram.com/p/C-Zy5Wzt52u/' },
        { label: 'Spotify', url: 'https://open.spotify.com/track/4mVEPN2cdo0hpJQP7UFQgo?si=3d9eda4486fb4a20' },
      ],
      animation: 'float4', // Unique animation class
    },
    
    // Non-clickable Image 3
    {
      image: noclickimage3,
      isNonClickable: true,
      animation: 'float2', // Unique animation class
    },
      // Post-it Note 0
    {
      noteText: 'me dont even know what tomorrow brings - Me in 2023',
      isPostIt: true,
      backgroundColor: '#F3B0C3', // Example pastel color
      animation: 'float4', // Unique animation class
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
    // What The Officer Said
    {
      image: image1,
      videoUrl: 'https://www.youtube.com/embed/jINjek6prIk',
      title: 'What The Officer Said: Debut 6.6.24',
      description: 'My debut. Improvised in one take...deep meanings to be found?',
      links: [
        { label: 'Lyrics', url: 'https://youtu.be/24jJIePbmMo' },
        { label: 'Reel', url: 'https://www.instagram.com/p/C8ZcOepNlLi/' },
        { label: 'Spotify', url: 'https://open.spotify.com/album/6GLwkFoC9b5yfQlEw7TXKQ' },
      ],
      animation: 'float4', // Unique animation class
    },
       // Post-it Note 0
    {
      noteText: 'have u ever seen an eagle soar?',
      isPostIt: true,
      backgroundColor: '#A8D1D1', // Example pastel color
      animation: 'float1', // Unique animation class
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
        <a href="https://www.instagram.com/olistormz" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="social-icon" />
        </a>
        <a href="https://www.tiktok.com/@olistormz" target="_blank" rel="noopener noreferrer">
          <img src={tiktokIcon} alt="TikTok" className="social-icon" />
        </a>
        <a href="https://www.youtube.com/@olistormz" target="_blank" rel="noopener noreferrer">
          <img src={youtubeIcon} alt="YouTube" className="social-icon" />
        </a>
        <a href="https://open.spotify.com/playlist/1XmO0hptiqx0Cs5ML16iTo?si=E_t9whORQoOW9vwrEEM4zw" target="_blank" rel="noopener noreferrer">
          <img src={spotifyIcon} alt="Spotify" className="social-icon" />
        </a>
      </div>
    </div>
  );
}



export default App;
