import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
import LeadForm from '../components/LeadForm';
import MemoryGame from '../components/Game/MemoryGame';
import '../App.css';

function InitialPage() {
const [showForm, setShowForm] = useState(false);
const [gameStarted, setGameStarted] = useState(false);

const handleClick = () => {
setShowForm(true);
};

const handleLeadSubmit = async ({ name, email }) => {
const leadData = { name, email };
try {
const response = await fetch('http://localhost:3001/leads', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(leadData),
});

  if (response.ok) {
    console.log('Lead saved');
    setGameStarted(true); // Indica que o jogo deve ser iniciado
  } else {
    console.error('Failed to save lead');
  }
} catch (error) {
  console.error('Error:', error);
}
};

if (gameStarted) {
return <MemoryGame />
}

return (
<div className='bg-black h-screen flex flex-col justify-center items-center' onClick={handleClick}>
{!showForm && (
<>
<div className='flex justify-center mb-4'>
<img className='animate pop delay' src='https://www.figma.com/file/V5EZ6XpHsPav7dULbSlWVX/image/d08184b272a3eefdfa1cbefb0749a75fd33f4b22' alt='logo da empresa Phygital Lab' />
</div>
<div className='flex items-center justify-center gap-2 '>
<span className="relative flex h-3 w-3 animate pop delay-1">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
<span className="relative inline-flex rounded-full h-3 w-3 bg-white/80"></span>
</span>
<p className='text-white font-light animate pop delay-2 '>Toque em qualquer área da tela para iniciar</p>
</div>
</>
)}
{showForm && (
<LeadForm onSubmit={handleLeadSubmit} />
)}
</div>
);
}

export default InitialPage;
>>>>>>> 3178bd4a122e4652e62273dbaa923b3703e74ddd
