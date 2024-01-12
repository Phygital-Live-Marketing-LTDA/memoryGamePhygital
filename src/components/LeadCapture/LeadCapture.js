import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './LeadCapture.css'

function LeadCapture({ onStartGame, onCardTurn }) {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [points] = useState(0);

    const handleStartGame = () => {
        if (name && email) {
            const lead = { name, email, points };

            // Salvar lead no localStorage em vez de enviar para o servidor
            try {
                // Gera um ID único para o lead
                const id = Date.now();
                localStorage.setItem(`lead_${id}`, JSON.stringify(lead));

                console.log('Lead saved with id:', id);
                onStartGame(lead); // Esta linha inicia o jogo com os dados do usuário
            } catch (error) {
                console.error('Error saving lead:', error);
                toast.error("Erro ao salvar os dados!");
            }
        } else {
            toast.warn("Preencha todos os campos!");
        }
    };


    return (
        <div className="lead-modal-overlay">
            <div className="lead-modal">
                <h2>Insira seus dados</h2>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(/[^A-Za-z ]/g, ''); // Permite apenas letras e espaços
                            setName(inputValue);
                        }}
                        maxLength={30}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={30}
                    />
                </div>

                <button onClick={handleStartGame}>Iniciar Jogo</button>
            </div>
        </div>
    );
}

export default LeadCapture;
