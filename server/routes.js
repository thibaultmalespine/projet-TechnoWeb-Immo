import express from "express";

const router = express.Router();

// Route pour recevoir les données du formulaire
router.post('/submit-annonce', async (req, res) => {
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

  export default router