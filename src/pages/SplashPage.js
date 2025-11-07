import React from 'react';
import { useNavigate } from 'react-router-dom';

function SplashPage({ updateToken }) {
  const navigate = useNavigate();

  const handleEnter = async () => {
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        updateToken(1, data.token);
        navigate('/puzzle1');
      }
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  return (
    <div className="splash-container">
      <div className="logo">STAR CITIZEN</div>
      <button className="enter-button" onClick={handleEnter}>
        ENTER
      </button>
    </div>
  );
}

export default SplashPage;