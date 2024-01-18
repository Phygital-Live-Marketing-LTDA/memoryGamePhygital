/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// You might need to install these additional packages
import Slider from '@mui/material/Slider';
import { BackgroundColorContext } from '../utils/BackgroundColorContext';



function GameSettings() {
    const navigate = useNavigate();

    const [turns, setTurns] = useState(10);
    const [color, setColor] = useState('#ffffff');
    const [pairs, setPairs] = useState(Array(8).fill(null)); // assuming 8 pairs as maximum
    const [cardBack, setCardBack] = useState(null);
    const { changeColor } = useContext(BackgroundColorContext);

    const handleColorChange = (e) => {
        changeColor(e.target.value);
    };
    
    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        if (savedSettings && Array.isArray(savedSettings.pairs)) {
            setTurns(savedSettings.turns || 10); // Provide default value if not set
            setColor(savedSettings.color || '#fff'); // Provide default value if not set
            setPairs(savedSettings.pairs);
            setCardBack(savedSettings.cardBack);
            document.documentElement.style.setProperty('--background-color', color);

            const savedColor = localStorage.getItem('backgroundColor');
            if (savedColor) {
                document.documentElement.style.setProperty('--background-color', savedColor);
                setColor(savedColor);
            }
        }
    }, []);



    const handleSaveSettings = () => {
        const settings = { turns, color, pairs, cardBack };
        localStorage.setItem('gameSettings', JSON.stringify(settings));
        // Don't forget to save the color independently if needed
        localStorage.setItem('backgroundColor', color);
        console.log('Configurações salvas:', settings);
    };

    return (
        <div className="settings-container">
            <label>
                Número de Turnos:
                <Slider
                    value={typeof turns === 'number' ? turns : 0}
                    onChange={(e, newValue) => setTurns(newValue)}
                    aria-labelledby="input-slider"
                    min={5}
                    max={20}
                />
            </label>
            <label>
                Cor:
                <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                />
            </label>

            <button onClick={handleSaveSettings}>Salvar Configurações</button>
        </div>
    );
}

export default GameSettings;
