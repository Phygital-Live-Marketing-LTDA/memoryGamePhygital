// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameLogic from './utils/GameLogic';
import InitialPage from './pages/InitialPage';
import GameSettings from './pages/GameSettings';

function App() {
  const [leadData, setLeadData] = useState(null);

  const handleStartGame = (lead) => {
    setLeadData(lead);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!leadData ? <InitialPage onStartGame={handleStartGame} /> : <GameLogic leadData={leadData} />} />
        <Route path="/config" element={<GameSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
