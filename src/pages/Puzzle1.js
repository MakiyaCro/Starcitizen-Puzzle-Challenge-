import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Puzzle1({ updateToken }) {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Test API connectivity on component mount
    console.log('Puzzle1 component mounted');
    console.log('Testing API connectivity...');
    fetch('/api/health')
      .then(response => {
        console.log('Health check response:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('✅ API is reachable:', data);
      })
      .catch(error => {
        console.error('❌ API health check failed:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== PUZZLE 1 SUBMIT ===');
    console.log('Answer submitted:', answer);
    console.log('Answer trimmed:', answer.trim());
    
    setLoading(true);
    setMessage('');

    try {
      const requestBody = {
        puzzle_id: 'puzzle1',
        answer: answer.trim(),
      };
      console.log('Request body:', requestBody);

      const response = await fetch('/api/verify-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        console.log('Answer CORRECT!');
        console.log('Next puzzle:', data.next_puzzle);
        console.log('Token received:', data.token ? 'Yes' : 'No');
        setMessage(data.message);
        setIsCorrect(true);
        console.log('isCorrect set to TRUE');
        updateToken(data.next_puzzle, data.token);
        console.log('updateToken called with:', data.next_puzzle, data.token ? 'token exists' : 'no token');
      } else {
        console.log('Answer INCORRECT');
        console.log('Error message:', data.message);
        setMessage(data.message);
        setIsCorrect(false);
      }
    } catch (error) {
      console.error('ERROR submitting answer:', error);
      console.error('Error details:', error.message);
      setMessage('Error submitting answer. Please try again.');
      setIsCorrect(false);
    } finally {
      setLoading(false);
      console.log('=== END SUBMIT ===');
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
        <>
          {console.log('🟢 Rendering next button! isCorrect:', isCorrect)}
          <button 
            type="button"
            className="next-button"
            onClick={handleNext}
          >
            Continue to Next Puzzle →
          </button>
        </>
      )}
    </div>
  );
}

export default Puzzle1;