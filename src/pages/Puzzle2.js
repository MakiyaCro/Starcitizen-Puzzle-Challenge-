import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Puzzle2({ updateToken }) {
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
          puzzle_id: 'puzzle2',
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
    navigate('/puzzle3');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <h1 className="puzzle-title">Part Two: Caesar Riddle</h1>
      </div>
      
      <div className="puzzle-content">
        <div className="cipher-section">
          <div className="cipher-label">Shift: 3</div>
        </div>

        <div className="cipher-section">
          <div className="cipher-label">Encoded Message:</div>
          <div className="puzzle-text" style={{ fontFamily: 'monospace', fontSize: '1rem' }}>
            LQ DQFLHQW VNLHV D KHUR VODBHG WKH VHUSHQW KDLUHG EHDVW KLV{'\n'}
            QDPHVDNH QRZ SDWUROV ZKHUH ODZOHVV PLQHUV IHDVW ERUQ IURP IRUJHV{'\n'}
            ZKHUH WKH QRUWK VWDUV VKHOO LV FDVW L KXQW WKH URFN ELWWHQ WKLHYHV{'\n'}
            ZKR WKLQN WKHLU VKLHOGV ODVW
          </div>
        </div>

        <div className="cipher-section">
          <div className="cipher-label">Decoded Message:</div>
          <div className="puzzle-text">
            In ancient skies, a hero slayed the serpent-haired beast,{'\n'}
            His namesake now patrols where lawless miners feast.{'\n'}
            Born from forges where the North Star's shell is cast,{'\n'}
            I hunt the rock-bitten thieves who think their shields will last.
          </div>
        </div>

        <div className="hint">
          Hint: The answer is the name of the hero's ship or the hero himself.
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

export default Puzzle2;