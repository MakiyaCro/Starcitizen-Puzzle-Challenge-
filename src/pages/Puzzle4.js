import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Puzzle4({ updateToken }) {
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
          puzzle_id: 'puzzle4',
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
    navigate('/puzzle5');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <h1 className="puzzle-title">Part Four: Steganography</h1>
      </div>
      
      <div className="puzzle-content">
        <div className="puzzle-text">
          Hidden within your screenshot from the previous puzzle are coordinates:{'\n'}
          <strong>0.00°, 58.86°, 43.44 GM</strong>
        </div>

        <div className="cipher-section">
          <div className="cipher-label">The Question:</div>
          <div className="puzzle-text" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
            Where Am I?
          </div>
        </div>

        <div className="hint">
          Hint: These coordinates point to a specific location in Star Citizen. What planet or location do they indicate?
        </div>

        <div className="answer-section">
          <input
            type="text"
            name="answer"
            id="answer-input"
            className="answer-input"
            placeholder="Enter the location name..."
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

export default Puzzle4;