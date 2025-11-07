import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Puzzle5({ updateToken }) {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        updateToken(data.next_puzzle, data.token);
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
    navigate('/final');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <h1 className="puzzle-title">Part Five: Simple Riddle Treasure Hunt</h1>
      </div>
      
      <div className="puzzle-content">
        <div className="cipher-section">
          <div className="puzzle-text" style={{ fontSize: '1.3rem' }}>
            A Private Haunt where there was Money From Nothing{'\n'}
            Go to the bow where credits would print and look for the key labeled _ _ - _ _.
          </div>
        </div>

        <div className="hint">
          Hint: This riddle refers to a specific ship in Star Citizen that was associated with a credit exploit. Find the key label at the bow!
        </div>

        <form onSubmit={handleSubmit} className="answer-section">
          <input
            type="text"
            name="answer"
            id="answer-input"
            className="answer-input"
            placeholder="Enter the key label (format: XX-XX)..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={loading || isCorrect}
          />
          
          {!isCorrect && (
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !answer.trim()}
            >
              {loading ? 'Checking...' : 'Submit Answer'}
            </button>
          )}

          {message && (
            <div className={`message ${isCorrect ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
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