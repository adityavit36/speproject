import React, { useState } from 'react';
import './style.css'; // Make sure to import your CSS file
import { useNavigate } from 'react-router-dom';

function PredictiveAnalysisForm() {
  const navigate = useNavigate();
  const handleExploreClick= () => {
    navigate('./predictive-analysis');
  }
  return (
    <div className="banner">
    <video autoPlay loop muted playsInline>
      <source src={require("./car.mp4")}  type="video/mp4" />
    </video>
    <div className="navbar">
      <img className="logo" src="https://static.vecteezy.com/system/resources/previews/027/585/163/non_2x/yellow-volkswagen-beetle-hot-wheels-sticker-ai-generative-free-png.png" alt="Logo" />
      <ul>
        <li><a href="#" style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Home</a></li>
        <li><a href="#" style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}} >Travel</a></li>
        <li><a href="#" style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Blogs</a></li>
        <li><a href="#" style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Support</a></li>
      </ul>
    </div>
    <div className="content">
      <h1  style={{fontSize:'150px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Wheely Good Value</h1>
      <div>
        <button type="button" onClick={handleExploreClick}  style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold',        borderRadius: '20px'}}>Explore</button>
      </div>
    </div>
  </div>

  );
}

export default PredictiveAnalysisForm;