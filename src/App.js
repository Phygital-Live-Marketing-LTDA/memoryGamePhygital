import React, { useState } from 'react';
import './App.css';
import GameLogic from './utils/GameLogic';
import InitialPage from './pages/InitialPage';

function App() {
  const [leadData, setLeadData] = useState(null);

  const handleStartGame = (lead) => {
    setLeadData(lead);
  };

  // Se não temos dados de lead, mostre a InitialPage.
  // Uma vez que os dados são capturados, leadData será atualizado e o GameLogic será renderizado.
  if (!leadData) {
    return <InitialPage onStartGame={handleStartGame} />;
  }

  // Se temos dados de lead, mostre o GameLogic.
  return <GameLogic leadData={leadData} />;
}

export default App;
