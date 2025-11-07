import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Puzzle1({ updateToken }) {
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
          puzzle_id: 'puzzle1',
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
    navigate('/puzzle2');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <h1 className="puzzle-title">Part One: Simple Counting</h1>
      </div>
      
      <div className="puzzle-content">
        <div className="puzzle-text">
          A new system joins the verse, another door opens wide,{'\n'}
          How many jump points can we traverse, how many stars to guide?
        </div>

        <form onSubmit={handleSubmit} className="answer-section">
          <input
            type="text"
            className="answer-input"
            placeholder="Enter your answer..."
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

          {isCorrect && (
            <button 
              type="button"
              className="next-button"
              onClick={handleNext}
            >
              Continue to Next Puzzle →
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Puzzle1;