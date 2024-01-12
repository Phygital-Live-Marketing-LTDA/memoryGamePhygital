import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GameSettings() {
    const navigate = useNavigate();

    const [turns, setTurns] = useState(10);
    const [color, setColor] = useState('#ffffff');
    const [cardImage, setCardImage] = useState('/img/card1.jpg');

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        if (savedSettings) {
            setTurns(savedSettings.turns);
            setColor(savedSettings.color);
            setCardImage(savedSettings.cardImage);
        }
    }, []);

    const handleSaveSettings = () => {
        const settings = { turns, color, cardImage };
        localStorage.setItem('gameSettings', JSON.stringify(settings));
        console.log('Configurações salvas:', settings); // Verifique se as configurações estão corretas aqui
    };

    return (
        <div className="settings-container">
            <label>
                Número de Turnos:
                <input
                    type="number"
                    value={turns}
                    onChange={(e) => setTurns(e.target.value)}
                />
            </label>
            <label>
                Cor:
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </label>
            <label>
                Imagem da Carta:
                <select value={cardImage} onChange={(e) => setCardImage(e.target.value)}>
                    <option value="/img/card1.jpg">Card 1</option>
                    <option value="/img/card2.jpg">Card 2</option>
                    <option value="/img/card3.jpg">Card 3</option>
                    <option value="/img/card4.jpg">Card 4</option>
                    <option value="/img/card5.jpg">Card 5</option>
                    <option value="/img/card6.jpg">Card 6</option>


                </select>
            </label>
            <button onClick={handleSaveSettings}>Salvar Configurações</button>
        </div>
    );
}

export default GameSettings;
