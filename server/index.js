import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './bdd.js';
import routerAnnonce from './routes/routesAnnonce.js';
import routerCompteClient from './routes/routesCompteClient.js';
import routerSharingToken from './routes/routesPartageAnnonce.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// MIDDLEWARE 
app.use(bodyParser.urlencoded({ extended: true })); // Midlleware pour récupérer les données issues d'un formulaire
app.use(express.json()); // Middleware json, très important pour utiliser fetch et envoyer du json au body
app.use(session({ // Middleware pour utiliser l'objet session, ce qui permet de stocker le compte client connecté
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
})); 
app.use((req, res, next) => { // Vérifie que l'utilisateur est connecté pour l'accès au page html, renvoie un 403 acces denied sinon
  // Autoriser l'accès à index.html et creationCompte.html
  const allowedPages = ['index.html', 'creationCompte.html'];

  if (
    !req.session.email && 
    req.originalUrl.endsWith(".html") && 
    !allowedPages.some(page => req.originalUrl.includes(page))
  ) {
    return res.sendStatus(403); // Accès interdit
  }
  
  next();
});
app.use(express.static(path.join(__dirname, '..','public'))); // Middleware pour servir les fichiers statiques

// API REST
app.use(routerAnnonce);
app.use(routerCompteClient);

// PARTAGE D'ANNONCES
app.use(routerSharingToken);

// 404 mauvaise adresse
app.get("/*", (req, res ) => {
  res.sendStatus(404);
})

// Initialiser la base de données puis lancer le serveur
initializeDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Erreur lors de l'initialisation de la base de données :", err);
});


export default app