import React, { useState } from 'react';
import LeadCapture from '../components/LeadCapture/LeadCapture';

function InitialPage({ onStartGame }) {
    const [showLeadCapture, setShowLeadCapture] = useState(false);

    // Função para lidar com o início do jogo após o envio bem-sucedido dos dados do lead
    const handleStartGameWithLead = (lead) => {
        // Chama a função onStartGame que foi passada pelo componente pai (App.js) com os dados do lead
        onStartGame(lead);
    };

    const handleScreenClick = () => {
        setShowLeadCapture(true);
    };

    return (
        <div className='bg-black h-screen flex flex-col justify-center items-center' onClick={!showLeadCapture ? handleScreenClick : null}>
            <div className='flex justify-center mb-4'>
                <img src='https://www.figma.com/file/V5EZ6XpHsPav7dULbSlWVX/image/d08184b272a3eefdfa1cbefb0749a75fd33f4b22' alt='logo da empresa Phygital Lab' />
            </div>
            {!showLeadCapture ? (
                <p className='text-white font-light'>Toque em qualquer área da tela para iniciar</p>
            ) : (
                <LeadCapture onStartGame={handleStartGameWithLead} />
            )}
        </div>
    );
}

export default InitialPage;
