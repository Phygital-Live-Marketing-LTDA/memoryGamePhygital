import React, { useState, useEffect } from 'react';
import '../App.css';
import SingleCard from '../components/Card/Card';
import LeadCapture from '../components/LeadCapture/LeadCapture';

import { updateUserPointsInScoreboard, updateScoreboard } from './scoreboardUtils';

import { cardImages } from '../components/Card/cardImages';
import VictoryModal from '../components/Modals/VictoryModal';
import DefeatModal from '../components/Modals/DefeatModal';
import GameSettings from '../pages/GameSettings';



function GameLogic({ leadData }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(10);
  const [, setChoices] = useState([]);
  const [points, setPoints] = useState(0);
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [, setDisabled] = useState(false);
  const [sequenceCount, setSequenceCount] = useState(0);
  const [, setAnimatePoints] = useState(false);
  const [countingPoints, setCountingPoints] = useState(false);
  const [totalPoints] = useState(0);
  const [, setShowModal] = useState(true);
  const [rainbowText, setRainbowText] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);



  const handleCloseModal = () => {
    setShowModal(false);
  };

  

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'gameSettings') {
        const newSettings = JSON.parse(e.newValue);
        setTurns(newSettings.turns);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [turns]); // Adicione as configurações como dependências


  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
    if (savedSettings) {
      setTurns(savedSettings.turns);
    }
  }, []);


  const handleChoice = (card) => {
    setHasStarted(true);
    if (!choiceOne || !choiceTwo) {
      // Impede que a mesma carta seja escolhida duas vezes
      if (!choiceOne || (choiceOne && choiceOne.id !== card.id)) {
        setDisabled(true);
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
      }
    }
  }

  useEffect(() => {
    if (leadData) {
      shuffleCards();
      setTurns(10);
      setChoices([]);
      setVictory(false);
      setDefeat(false);
      setPoints(0);
      setSequenceCount(0);
      setAnimatePoints(false);
    }
  }, [leadData]);

  // Embaralha cartas para um novo jogo
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(10);
    setChoices([]);
    setVictory(false);
    setDefeat(false);
    setPoints(0);
    setSequenceCount(0);
    setAnimatePoints(false);
  };

  useEffect(() => {
    if (sequenceCount > 3) {
      setRainbowText(true);

      const timeoutId = setTimeout(() => {
        setRainbowText(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [sequenceCount]);


  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        const sequenceMultiplier = sequenceCount + 1;
        const newPoints = points + 350 * sequenceMultiplier;

        setPoints(newPoints);
        updateUserPointsInScoreboard(leadData.name, newPoints);
        setAnimatePoints(true);

        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        // Adicione o par atual à lista de escolhas
        setChoices((prevChoices) => [...prevChoices, choiceOne.src]);

        // Atualiza a contagem de sequência
        setSequenceCount(sequenceCount + 1);

        resetTurn();
      } else {
        // Se o jogador errar, reinicia a sequência
        setSequenceCount(0);
        setTimeout(() => resetTurn(), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);


  useEffect(() => {
    // Este useEffect deve ser modificado para garantir que o jogo não declare vitória prematuramente
    if (hasStarted) {
      const unmatchedCards = cards.filter((card) => !card.matched);
      if (unmatchedCards.length === 0 && cards.length > 0) {
        // Agora só chamamos handleGameOver se o jogo realmente começou
        handleGameOver(true);
      } else if (turns === 0) {
        handleGameOver(false);
      }
    }
    // Adicionamos hasStarted nas dependências do useEffect
  }, [cards, turns, hasStarted]);


  const handleGameOver = (isWinner) => {
    if (isWinner) {
      setCountingPoints(true);

      setTimeout(() => {
        setVictory(true);
        let accumulatedPoints = points + turns * 1000;
        setPoints(accumulatedPoints);
        setCountingPoints(false);
        if (leadData) {
          updateUserPointsInScoreboard(leadData.name, accumulatedPoints);
        }
      }, 2000);
    } else {
      setDefeat(true);
    }
  };

  const handleRestart = () => {
    setVictory(false);
    setDefeat(false);
    setSequenceCount(0);
    setAnimatePoints(false);
    shuffleCards();
    setHasStarted(false);

  };

  const handleStartGame = (lead) => {
    shuffleCards();
    setSequenceCount(0);
    setPoints(0)

  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);

    if (choiceOne && choiceTwo) {
      if (choiceOne.src !== choiceTwo.src) {
        setTurns((prevTurns) => prevTurns - 1);
      } else {
        updateUserPointsInScoreboard(leadData.name, points);

      }
    }

    setDisabled(false);
  };

  return (
    <div className="App">
      <div className='flex justify-center mb-4 logo'>
        <img src='https://www.figma.com/file/V5EZ6XpHsPav7dULbSlWVX/image/d08184b272a3eefdfa1cbefb0749a75fd33f4b22' alt='logo da empresa Phygital Lab' />
      </div>
      {!leadData ? (
        <LeadCapture
          onCardTurn={setPoints}
          onStartGame={handleStartGame} />
      ) : (
        <div>
          {victory && !countingPoints && (
            <VictoryModal
              points={points}
              onRestart={handleRestart}
              onClose={handleCloseModal}
              countingPoints={countingPoints}
              turns={turns}
              totalPoints={totalPoints} />
          )}
          {defeat && (
            <DefeatModal
              onRestart={handleRestart}
              onClose={handleCloseModal}
            />
          )}

          <div className='player-info'>
            <p className={rainbowText ? 'rainbow-text' : ''} id='score'>{points} <span className='text-sm'>pontos</span></p>
            <div className='player-info-small'>
              <p>{leadData.name}</p>
              <p className='player-turns'>Turnos {turns}</p>
            </div>
          </div>
          <div className='game-container '>
            <div className='right-panel'>
              <div className="card-grid">
                {cards.map((card) => (
                  <SingleCard
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default GameLogic;