import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Puzzle1({ updateToken }) {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log('Submit clicked, answer:', answer);
    setLoading(true);
    setMessage('');

    try {
      console.log('Sending request...');
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

      console.log('Response received:', response.status);
      const data = await response.json();
      console.log('Data:', data);

      if (data.success) {
        console.log('Setting isCorrect to true');
        setMessage(data.message);
        setIsCorrect(true);
        updateToken(data.next_puzzle, data.token);
      } else {
        setMessage(data.message);
        setIsCorrect(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error submitting answer. Please try again.');
      setIsCorrect(false);
    } finally {
      setLoading(false);
      console.log('Submit complete');
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

        <div className="answer-section">
          <input
            type="text"
            name="answer"
            id="answer-input"
            className="answer-input"
            placeholder="Enter your answer..."
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

export default Puzzle1;