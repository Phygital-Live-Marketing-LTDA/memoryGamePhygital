import React, { useState, useEffect } from 'react';


const VictoryModal = ({ points, turns, onRestart, totalPoints, onClose }) => {
  const [displayedPoints, setDisplayedPoints] = useState(0);

  useEffect(() => {
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Inicia a contagem dos pontos gradualmente
    const intervalId = setInterval(() => {
      setDisplayedPoints((prevPoints) => {
        const increment = 100;
        const nextPoints = prevPoints + increment;

        // Quando atingir a pontuação real, limpa o intervalo
        if (nextPoints >= points) {
          clearInterval(intervalId);
          return points;
        }

        return nextPoints;
      });
    }, 10);
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [points]);

  const handleClose = () => {
    onClose();
    window.location.reload(); // Recarrega a página
  };

  return (
    <div className="victory-modal-overlay">
      <div className="victory-modal">
        <h1 className='victory-title' >Vitória</h1>
        <div className='victory-text'>
          <p>Você encontrou todas as combinações!</p>
          <p>Pontuação de turnos: {turns * 1000}</p>
          <p>Pontuação Final: {displayedPoints}</p>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
