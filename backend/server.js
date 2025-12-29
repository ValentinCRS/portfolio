const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Mon Portfolio est en ligne !</h1>');
});

app.get('/api/projets', (req, res) => {
    const mesProjets = [
        { id: 1, titre: "Mon Portfolio", techno: "Vite & Node" },
        { id: 2, titre: "Application Météo", techno: "JavaScript" }
    ];
    res.json(mesProjets);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});