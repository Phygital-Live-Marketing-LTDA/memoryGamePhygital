import React, { createContext, useState, useEffect } from 'react';

export const BackgroundColorContext = createContext();

export const BackgroundColorProvider = ({ children }) => {
    const [color, setColor] = useState('#000');

    useEffect(() => {
        const savedColor = localStorage.getItem('backgroundColor') || '#000';
        setColor(savedColor);
        document.documentElement.style.setProperty('--background-color', savedColor);
    }, []);

    const changeColor = (newColor) => {
        setColor(newColor);
        localStorage.setItem('backgroundColor', newColor);
        document.documentElement.style.setProperty('--background-color', newColor);
    };

    return (
        <BackgroundColorContext.Provider value={{ color, changeColor }}>
            {children}
        </BackgroundColorContext.Provider>
    );
};
