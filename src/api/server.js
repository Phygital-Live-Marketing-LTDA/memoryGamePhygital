const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


process.env.TZ = 'America/Sao_Paulo';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Depois de todas as rotas da API
// Serve quaisquer arquivos estáticos compilados pelo React
app.use(express.static(path.join(__dirname, 'build')));

// Rota catch-all para suportar o roteamento do lado do cliente do React
// Ele deve retornar o index.html do React para qualquer requisição que não seja para a API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


const db = new sqlite3.Database('../data/leads.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        // Inicialização do banco de dados falhou
    } else {
        db.run(`
        CREATE TABLE IF NOT EXISTS leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          points INTEGER DEFAULT 0,
          started_at TIMESTAMP DEFAULT (datetime('now', 'localtime'))
        )
      `, [], (err) => {
            if (err) {
                console.error('Error creating table', err.message);
                // Criação da tabela falhou
            } else {
                console.log('Table created or already exists');
                // Tabela criada ou já existente
            }
        });
    }
});

// Rota para adicionar um novo lead
app.post('/leads', (req, res) => {
    const { name, email, points } = req.body;

    if (!name || !email) {
        return res.status(400).send('Name and email are required');
    }

    const stmt = db.prepare('INSERT INTO leads (name, email, points) VALUES (?, ?, ?)');
    stmt.run(name, email, points, function (err) {
        if (err) {
            return res.status(500).send('Error inserting lead into database');
        }

        res.status(201).send({ id: this.lastID });
    });
});

// Rota para atualizar pontos de um lead
app.put('/leads', (req, res) => {
    const { name, points } = req.body;

    if (!name || points === undefined) {
        return res.status(400).send('Name and points are required');
    }

    const stmt = db.prepare('UPDATE leads SET points = ? WHERE name = ?');
    stmt.run(points, name, function (err) {
        if (err) {
            return res.status(500).send('Error updating lead in database');
        }

        res.status(200).send({ message: 'Lead updated successfully' });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});