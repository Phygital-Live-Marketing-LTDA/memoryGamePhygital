import React, { createContext, useState, useEffect } from 'react';

export const BackgroundColorContext = createContext();

export const BackgroundColorProvider = ({ children }) => {
    const [color, setColor] = useState('#ffffff');

    useEffect(() => {
        const savedColor = localStorage.getItem('backgroundColor') || '#ffffff';
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
