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
            G U I L I V Y Y F V W V L I K F Z J G Z L A F W V F G Y Z J I V F V Y D M V I V Z F R U W G I{'\n'}
            N V J J Z L Y V G W F G F I N L E G Y Z J X V G W V I V R G F Y J G J W V Y T M P R G Y F{'\n'}
            Z E J F L L Z L P Z Z L D V I M F V M G Z L Y V M P Y T I V T Y V V G Z F N V Z D V F N V F{'\n'}
            V Z E L P I V G I V U F E U F Y T Z M V I L L U D M V I V Z M I V V W G A V J I V J Z D M G Z{'\n'}
            W L F L I G Y T J M G X V J M G I V J Z M V F I Y V J Z
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