const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
