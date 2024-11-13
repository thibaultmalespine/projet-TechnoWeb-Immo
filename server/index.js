import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import routerAnnonce from './routesAnnonce.js';
import routerCompteClient from './routesCompteClient.js';
import { initializeDatabase } from './bdd.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// API REST
app.use(routerAnnonce);
app.use(routerCompteClient);

// Middleware pour servir les fichiers statiques
app.use('/static', express.static(path.join(__dirname, '../public/static/')));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route annonce
app.get('/annonce', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/annonce.html'));
});

// Route connexion
app.get('/connexion', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/connexion.html'))
})

// Initialiser la base de données puis lancer le serveur
initializeDatabase().then(() => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Erreur lors de l'initialisation de la base de données :", err);
});





