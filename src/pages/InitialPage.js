// SplashScreen.js
import React, { useState } from 'react';
import LeadCapture from '../components/LeadCapture/LeadCapture';

function SplashScreen({ onStartGame }) {
    const [showLeadCapture, setShowLeadCapture] = useState(false);

    const handleScreenClick = () => {
        setShowLeadCapture(true); // This will trigger the LeadCapture form to show
    };

    return (
        <div className='bg-black h-screen flex flex-col justify-center items-center' onClick={!showLeadCapture ? handleScreenClick : null}>
            <div className='flex justify-center mb-4'>
                <img src='https://www.figma.com/file/V5EZ6XpHsPav7dULbSlWVX/image/d08184b272a3eefdfa1cbefb0749a75fd33f4b22' alt='logo da empresa Phygital Lab' />
            </div>
            {!showLeadCapture ? (
                <div className='flex items-center justify-center gap-2'>
                    <span className="relative flex h-3 w-3 animate pop delay-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white/80"></span>
                    </span>
                    <p className='text-white font-light animate pop delay-2'>Toque em qualquer área da tela para iniciar</p>
                </div>
            ) : (
                <LeadCapture onStartGame={onStartGame} />
            )}
        </div>
    );
}

export default SplashScreen;
