import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveScoreboardData } from '../../utils/scoreboardUtils';

import './LeadCapture.css'

function LeadCapture({ onStartGame, onCardTurn }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [points] = useState(0);

    // Verifique se os dados do usuário já existem no sessionStorage
    // Usuário com os mesmos dados já existe, inicie o jogo com os dados existentes
    // Usuário não encontrado no sessionStorage, crie um novo registro
    const handleStartGame = () => {
        if (name && email) {
            const lead = { name, email, points };
            onCardTurn(points);

            fetch('http://localhost:3001/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lead),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    onStartGame(lead);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            toast("Preencha todos os campos!");
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
