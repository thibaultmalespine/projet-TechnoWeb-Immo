import express from "express";
import { client } from './bdd.js';

const router = express.Router();

// Contrôleur pour récupérer les annonces
router.get('/annonce', async (req, res) => {
  try {
      // Récupérer les annonces depuis la base de données
      const result = await db.query('SELECT * FROM Annonce');
      const annonces = result.rows; // Utilisation de `.rows` si vous utilisez pg pour PostgreSQL

      // Rendre la vue avec les annonces récupérées
      res.render('annonce', { annonces });
  } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error);
      res.status(500).send("Erreur lors de la récupération des annonces");
  }
});





// Route pour recevoir les données du formulaire
router.post('/submit-annonce', async (req, res) => {
  const { titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine } = req.body;

  const sql = `INSERT INTO Annonce (NomAnnonce, URLOriginale, Description, TypeDeBien, laVille, Prix, M2Habitable, M2Terrains, Meuble, ParticulierPro, Garage, Piscine) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

  const values = [titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine];
    console.log(values);
  try {
    const result = await client.query(sql, values);
    console.log('Annonce insérée', result);
    res.send('Annonce ajoutée avec succès');
  } catch (err) {
    console.error("Erreur lors de l'insertion :", err);
    res.status(500).send("Erreur lors de l'ajout de l'annonce");
  }
});

export default router;



