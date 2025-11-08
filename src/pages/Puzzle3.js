import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Puzzle3({ updateToken }) {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextData, setNextData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/verify-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          puzzle_id: 'puzzle3',
          answer: answer.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setIsCorrect(true);
        setNextData({ next_puzzle: data.next_puzzle, token: data.token });
      } else {
        setMessage(data.message);
        setIsCorrect(false);
      }
    } catch (error) {
      setMessage('Error submitting answer. Please try again.');
      setIsCorrect(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (nextData) {
      updateToken(nextData.next_puzzle, nextData.token);
    }
    navigate('/puzzle4');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <h1 className="puzzle-title">DARK PLACES</h1>
      </div>
      
      <div className="puzzle-content">
        <div className="cipher-section">
          <div className="cipher-label">Encoded Message:</div>
          <div className="puzzle-text" style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
            P J I G D Y F C M V U I I J Q M K K E N G M M T Y M U F I W I W M A F L L V J I N A B I T S V P W H W K G R Y S R P R A V P G N E E L W J W P G V J I G S X R J S W W W C H Y M Q U F X X P K P I G Z S L L X I O T V Y A K B S I S E W L O F S V V V R Y Y P X Z N I N O T P M W P Y L N S L J K U R T J C Q J C F S X Y W V I G U A Y W V Y L W V V W G U Y T W I W W N O W E K U S F G G E E V W B S E I J Z E L W H X Y W M L F T W K
          </div>
        </div>


        <div className="answer-section">
          <input
            type="text"
            name="answer"
            id="answer-input"
            className="answer-input"
            placeholder="Enter what you found (COLOR and SHAPE)..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={loading || isCorrect}
          />
          
          {!isCorrect && (
            <button 
              type="button"
              className="submit-button"
              disabled={loading || !answer.trim()}
              onClick={handleSubmit}
            >
              {loading ? 'Checking...' : 'Submit Answer'}
            </button>
          )}

          {message && (
            <div className={`message ${isCorrect ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      {isCorrect && (
        <button 
          type="button"
          className="next-button"
          onClick={handleNext}
        >
          Continue to Next Puzzle →
        </button>
      )}
    </div>
  );
}

export default Puzzle3;