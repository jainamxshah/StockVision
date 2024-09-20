import React from 'react';
import './Banner.css'; 
import landingPage from '../../assets/business-plan-concept-3d-rendering.jpg';

const Banner = () => {
  return (
    <div className="landing-container">
      <img src={landingPage} alt="Landing" className="landing-image" />
      <div className="landing-content">
        <h1>STOCK VISION</h1>
        <p>Unlock insights and make smarter stock investments.</p>

        
      </div>

    </div>
    
  );
};

export default Banner;
