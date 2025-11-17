import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import Puzzle1 from './pages/Puzzle1';
import Puzzle2 from './pages/Puzzle2';
import Puzzle3 from './pages/Puzzle3';
import Puzzle4 from './pages/Puzzle4';
import Puzzle5 from './pages/Puzzle5';
import Puzzle6 from './pages/Puzzle6';
import FinalPage from './pages/FinalPage';
import './App.css';

function App() {
  const [tokens, setTokens] = useState({});

  // Load tokens from sessionStorage on mount
  useEffect(() => {
    const savedTokens = sessionStorage.getItem('puzzle_tokens');
    if (savedTokens) {
      setTokens(JSON.parse(savedTokens));
    }
  }, []);

  // Save tokens to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('puzzle_tokens', JSON.stringify(tokens));
  }, [tokens]);

  const updateToken = (puzzleNumber, token) => {
    setTokens(prev => ({
      ...prev,
      [puzzleNumber]: token
    }));
  };

  const ProtectedRoute = ({ children, requiredPuzzle }) => {
    const hasToken = tokens[requiredPuzzle];
    
    if (!hasToken && requiredPuzzle !== 1) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SplashPage updateToken={updateToken} />} />
          <Route 
            path="/puzzle1" 
            element={
              <ProtectedRoute requiredPuzzle={1}>
                <Puzzle1 token={tokens[1]} updateToken={updateToken} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/puzzle2" 
            element={
              <ProtectedRoute requiredPuzzle={2}>
                <Puzzle2 token={tokens[2]} updateToken={updateToken} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/puzzle3" 
            element={
              <ProtectedRoute requiredPuzzle={3}>
                <Puzzle3 token={tokens[3]} updateToken={updateToken} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/puzzle4" 
            element={
              <ProtectedRoute requiredPuzzle={4}>
                <Puzzle4 token={tokens[4]} updateToken={updateToken} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/puzzle5" 
            element={
              <ProtectedRoute requiredPuzzle={5}>
                <Puzzle5 token={tokens[5]} updateToken={updateToken} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/puzzle6" 
            element={
              <ProtectedRoute requiredPuzzle={6}>
                <Puzzle6 token={tokens[6]} updateToken={updateToken} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/final" 
            element={
              <ProtectedRoute requiredPuzzle={7}>
                <FinalPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;