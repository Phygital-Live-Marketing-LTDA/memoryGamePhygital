import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LeadForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ name, email });
        navigate('/game')
        
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 flex flex-col w-full max-w-md">
            <label htmlFor="name" className="text-gray-700 text-sm font-bold mb-2">Nome</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />

            <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2">E-mail</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />

            <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-opacity-90">
                INICIAR
            </button>
        </form>
    );
}

export default LeadForm;
