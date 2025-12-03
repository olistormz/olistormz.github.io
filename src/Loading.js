import React, { useEffect, useRef, useState } from "react";
import './Loading.css'; // We'll style it separately
import { Link } from 'react-router-dom';

function Loading() {
  return (
    <div className="loading-interview-layout">
      <div className="loading-interview-page">
        <h1 className="loading-interview-title">In Unfolding</h1>
      </div>
    </div>
  );
}

export default Loading;
