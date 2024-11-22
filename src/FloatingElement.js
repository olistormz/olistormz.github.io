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


function FloatingElement({ data, animationClass }) {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation(); // Prevent the event from propagating
    console.log('Opening modal'); // Debugging log
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent the event from propagating
    console.log('Closing modal'); // Debugging log
    setOpen(false);
  };

  return (
    <div className={`floating-element ${animationClass}`} onClick={handleOpen}>
      <img src={data.image} alt={data.title} className="element-image" />

      <Modal
        open={open}
        onClose={handleClose} // Closes the modal when clicking outside
      >

        <Card className="modal-card">
          <iframe
            width="100%"
            height="315"
            src={data.videoUrl}
            title={data.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <CardContent>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <div className="button-group">
              {data.links.map((link, index) => (
                <Button key={index} variant="contained" href={link.url}>
                  {link.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}


export default FloatingElement;
