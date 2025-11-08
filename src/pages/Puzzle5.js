import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Puzzle5({ updateToken }) {
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
          puzzle_id: 'puzzle5',
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
    navigate('/final');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <h1 className="puzzle-title">BRING WEAPONS</h1>
      </div>
      
      <div className="puzzle-content">
        <div className="cipher-section">
          <div className="puzzle-text" style={{ fontSize: '1.3rem' }}>
            A Private Haunt where there was Money From Nothing{'\n'}
            Go to the bow where credits would print and look for the key.
          </div>
        </div>

        <div className="answer-section">
          <input
            type="text"
            name="answer"
            id="answer-input"
            className="answer-input"
            placeholder="Enter the key..."
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
          Continue to Final Puzzle →
        </button>
      )}
    </div>
  );
}

export default Puzzle5;