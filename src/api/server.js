const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

process.env.TZ = 'America/Sao_Paulo';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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
    const { name, email } = req.body;
    console.log('Received lead:', req.body);


    if (!name || !email) {
        return res.status(400).send('Name and email are required');
    }

    const stmt = db.prepare('INSERT INTO leads (name, email) VALUES (?, ?)');
    stmt.run(name, email, function (err) {
        if (err) {
            return res.status(500).send('Error inserting lead into database');
        }

        res.status(201).send({ id: this.lastID });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});