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
        <div className=' h-screen flex flex-col justify-center items-center' onClick={!showLeadCapture ? handleScreenClick : null}>
            { !showLeadCapture && (
                <>
                    <img className='animate pop delay' src='https://www.figma.com/file/V5EZ6XpHsPav7dULbSlWVX/image/d08184b272a3eefdfa1cbefb0749a75fd33f4b22' alt='logo da empresa Phygital Lab' />
                    <p className='text-white 
                    font-light mt-5 animate pop delay-2 '>Clique em qualquer lugar da tela!</p>
                </>
            )}
            { showLeadCapture && <LeadCapture onStartGame={handleStartGameWithLead} /> }
        </div>
    );
}

export default InitialPage;
