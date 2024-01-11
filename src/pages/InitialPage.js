import React, { useState } from 'react';
import LeadCapture from '../components/LeadCapture/LeadCapture';
import "../App.css"


function InitialPage({ onStartGame }) {
    const [showLeadCapture, setShowLeadCapture] = useState(false);

    const handleStartGameWithLead = (lead) => {
        onStartGame(lead);
    };

    const handleScreenClick = () => {
        setShowLeadCapture(true);
    };

    return (
        <div className='bg-black h-screen flex flex-col justify-center items-center' onClick={!showLeadCapture ? handleScreenClick : null}>
            <div className='flex justify-center mb-4'>
                <img className='animate pop delay' src='https://www.figma.com/file/V5EZ6XpHsPav7dULbSlWVX/image/d08184b272a3eefdfa1cbefb0749a75fd33f4b22' alt='logo da empresa Phygital Lab' />
            </div>
            <div className='flex items-center justify-center gap-2 '>
                <span className="relative flex h-3 w-3 animate pop delay-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white/80"></span>
                </span>

            </div>
            {!showLeadCapture ? (
                <p className='text-white font-light animate pop delay-2 '>Toque aqui para iniciar</p>) : (
                <LeadCapture onStartGame={handleStartGameWithLead} />
            )}
        </div>
    );
}

export default InitialPage;
