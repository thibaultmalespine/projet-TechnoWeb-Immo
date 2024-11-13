import express from "express";
import { client } from './bdd.js';

const router = express.Router();

// Contrôleur pour récupérer toutes les annonces
router.get('/annonce/getAll', async (req, res) => {
  try {
      const result = await client.query('SELECT * FROM Annonce');
      const annonces = result.rows; // Assurez-vous que cela correspond à votre méthode de base de données

      // Envoyer les annonces en JSON
      res.json(annonces);
  } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des annonces" });
  }
});

// Route pour récupérer une annonce
router.get('/annonce/get:id', async (req, res)=>{
  const idAnnonce =  req.params.id;
  try {
    const result = await client.query(`SELECT FROM Annonce WHERE id = $1`,[idAnnonce]);
    
  } catch (err) {
    console.error("Erreur lors de la récupération de l'annonce : ",err);
    res.status(500).send("Erreur lors de la récupération de l'annonce")
  }

})

// Route pour ajouter une annonce à partir des données du formulaire
router.post('/annonce/submit', async (req, res) => {
  const { titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine } = req.body;

  const request = `INSERT INTO Annonce (NomAnnonce, URLOriginale, Description, TypeDeBien, laVille, Prix, M2Habitable, M2Terrains, Meuble, ParticulierPro, Garage, Piscine) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

  const values = [titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine];
    console.log(values);
  try {
    const result = await client.query(request, values);
    console.log('Annonce insérée', result);
    res.send('Annonce ajoutée avec succès');
  } catch (err) {
    console.error("Erreur lors de l'insertion :", err);
    res.status(500).send("Erreur lors de l'ajout de l'annonce");
  }
});

// Route pour mettre à jour une annonce
router.put('/annonce/update:id', async (req, res) => {
  const { titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine } = req.body;
  const idAnnonce = req.params.id;

  const request = `UPDATE Annonce
                   SET NomAnnonce = $1, URLOriginale = $2, Description = $3, TypeDeBien = $4, laVille = $5, Prix = $6, 
                       M2Habitable = $7, M2Terrains = $8, Meuble = $9, ParticulierPro = $10, Garage = $11, Piscine = $12
                   WHERE idAnnonce = $13`;

  const values = [titre, url_annonce, description, type, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine, idAnnonce];

  try {
    const result = await client.query(request, values);

    console.log('Annonce mise à jour');
    res.send('Annonce mise à jour avec succès');
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).send("Erreur lors de la mise à jour de l'annonce");
  }
});

// Route pour supprimer une annonce par son ID
router.delete('/annonce/delete:id', async (req, res) => {
  const idAnnonce = req.params.id;

  const request = `DELETE FROM Annonce WHERE idAnnonce = $1`;

  try {
    const result = await client.query(request, [idAnnonce]);

    if (result.rowCount === 0) {
      return res.status(404).send('Annonce non trouvée');
    }

    console.log('Annonce supprimée');
    res.send('Annonce supprimée avec succès');
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).send("Erreur lors de la suppression de l'annonce");
  }
});


export default router;
