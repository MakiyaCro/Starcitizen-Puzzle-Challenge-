import React, { useEffect, useState } from 'react';

function FinalPage() {
  const [completionHash, setCompletionHash] = useState('');

  useEffect(() => {
    // Generate a unique completion hash based on timestamp and random data
    const generateHash = async () => {
      const timestamp = Date.now();
      const randomData = Math.random().toString(36).substring(2, 15);
      const data = `STARCITIZEN-PUZZLE-COMPLETE-${timestamp}-${randomData}`;
      
      // Simple hash function (for display purposes)
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Take first 16 characters for a shorter hash
      setCompletionHash(hashHex.substring(0, 16).toUpperCase());
    };

    generateHash();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(completionHash);
    alert('Completion code copied to clipboard!');
  };

  return (
    <div className="final-container">
      <div className="final-content">
        <h1 className="final-title">Congratulations, Citizen!</h1>
        
        <div className="final-message">
          <p>You've successfully navigated through all the puzzles and proven your worth.</p>
          <p>Your journey through the verse has been remarkable.</p>
        </div>

        <div className="completion-section">
          <div className="completion-label">Your Completion Code:</div>
          <div className="completion-hash" onClick={copyToClipboard}>
            {completionHash || 'Generating...'}
          </div>
          <div className="completion-hint">Click to copy • Send this code as proof of completion</div>
        </div>

        <div className="final-stats">
          <div className="stat-item">
            <div className="stat-number">6</div>
            <div className="stat-label">Puzzles Solved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Challenge Complete</div>
          </div>
        </div>

        <div className="final-footer">
          <p>May your adventures in the verse be legendary.</p>
          <p className="signature">— Makcro Drone Works</p>
        </div>
      </div>
    </div>
  );
}

export default FinalPage;