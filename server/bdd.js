// Import des modules nécessaires
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import app from './index.js';

app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données MySQL
let connection;

async function initializeDatabase() {
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'userpostgres',
      password: 'userpostgres',
      database: 'userpostgres',
    });
    console.log("Connexion à la base de données réussie");
  } catch (err) {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
}

initializeDatabase();

// Route pour recevoir les données du formulaire
app.post('/submit-annonce', async (req, res) => {
  const { titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine } = req.body;

  const sql = `INSERT INTO annonces (titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine];

  try {
    const [result] = await connection.execute(sql, values);
    console.log('Annonce insérée', result);
    res.send('Annonce ajoutée avec succès');
  } catch (err) {
    console.error("Erreur lors de l'insertion :", err);
    res.status(500).send("Erreur lors de l'ajout de l'annonce");
  }
});
