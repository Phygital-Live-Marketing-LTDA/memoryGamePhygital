// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameLogic from './utils/GameLogic';
import InitialPage from './pages/InitialPage';
import GameSettings from './pages/GameSettings';
import { BackgroundColorProvider } from './utils/BackgroundColorContext';


function App() {
  const [leadData, setLeadData] = useState(null);

  const handleStartGame = (lead) => {
    setLeadData(lead);
  };
  useEffect(() => {
    // This effect runs once when the component mounts
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--background-color', savedColor);
    }
  }, []);

  return (
    <BackgroundColorProvider>

      <Router>
        <Routes>
          <Route path="/" element={!leadData ? <InitialPage onStartGame={handleStartGame} /> : <GameLogic leadData={leadData} />} />
          <Route path="/config" element={<GameSettings />} />
        </Routes>
      </Router>
    </BackgroundColorProvider>
  );
}

export default App;
