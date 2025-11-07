import React from 'react';

function FinalPage() {
  return (
    <div className="final-container">
      <h1 className="final-title">Part Six: The Final Puzzle</h1>
      <div className="final-message">
        <p style={{ marginBottom: '2rem' }}>
          Congratulations, Citizen! You've successfully navigated through all the puzzles.
        </p>
        <p style={{ fontSize: '1.2rem', color: '#00d4ff' }}>
          The final puzzle awaits you in-game at the location marked AS-12.
        </p>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
          May your journey through the verse be filled with adventure!
        </p>
      </div>
    </div>
  );
}

export default FinalPage;