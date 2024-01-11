import React, { useState } from 'react';
import './App.css';
import LeadCapture from './components/LeadCapture/LeadCapture';
import GameLogic from './utils/GameLogic';
import SplashScreen from './pages/InitialPage';

function App() {
  const [leadData, setLeadData] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [points, setPoints] = useState(0);


  const updatePoints = (newPoints) => {
    setPoints(newPoints);
  };

  const handleStartGame = (lead) => {
    setLeadData(lead);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <SplashScreen onStartGame={() => setGameStarted(true)} />
    );
  }

  if (!leadData) {
    return (
      <LeadCapture
      onStartGame={handleStartGame}
      onCardTurn={updatePoints} // Certifique-se de que esta função está definida corretamente
    />    );
  }

  return (
    <GameLogic leadData={leadData} />
  );
}

export default App