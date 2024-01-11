import React from 'react';
import SingleCard from '../components/Card/Card';
import VictoryModal from '../components/Modals/VictoryModal';
import DefeatModal from '../components/Modals/DefeatModal';
import '../App.css';

function GameBoard({ cards, handleChoice, victory, defeat, points, handleRestart, handleCloseModal, countingPoints, turns, totalPoints, leadData, rainbowText, flippedIndexes, card }) {
    return (
        <div className="App">
            <div className='flex justify-center mb-4 logo'>
                <img src='https://www.figma.com/file/V5EZ6XpHsPav7dULbSlWVX/image/d08184b272a3eefdfa1cbefb0749a75fd33f4b22' alt='logo da empresa Phygital Lab' />
            </div>
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
                            {cards.map((card, index) => (
                                <SingleCard
                                    key={card.id}
                                    card={card}
                                    handleChoice={() => handleChoice(card, index)} // Passar também o índice
                                    flipped={flippedIndexes.includes(index) || card.matched} // A carta está virada se o índice estiver em flippedIndexes ou se está correspondida
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameBoard;
