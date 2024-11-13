import express from "express";
import { client } from './bdd.js';

const router = express.Router();

// Route pour récupérer un compte par son ID
router.get('/compte/get:id', async (req, res) => {
  const idCompte = req.params.id;
  try {
    const result = await client.query('SELECT * FROM Compte WHERE idCompte = $1', [idCompte]);
    
    if (result.rowCount === 0) {
      return res.status(404).send('Compte non trouvé');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de la récupération du compte :", err);
    res.status(500).send("Erreur lors de la récupération du compte");
  }
});

// Route pour ajouter un compte
router.post('/compte/submit', async (req, res) => {
  const { nom, prenom, email, motDePasse } = req.body;

  const request = `INSERT INTO Compte (Nom, Prenom, Email, MotDePasse) 
                   VALUES ($1, $2, $3, $4)`;

  const values = [nom, prenom, email, motDePasse];

  try {
    const result = await client.query(request, values);
    console.log('Compte ajouté avec succès');
    res.send('Compte ajouté avec succès');
  } catch (err) {
    console.error("Erreur lors de l'ajout du compte :", err);
    res.status(500).send("Erreur lors de l'ajout du compte");
  }
});

// Route pour mettre à jour un compte
router.put('/compte/update:id', async (req, res) => {
  const { nom, prenom, email, motDePasse } = req.body;
  const idCompte = req.params.id;

  const request = `UPDATE Compte
                   SET Nom = $1, Prenom = $2, Email = $3, MotDePasse = $4
                   WHERE idCompte = $5`;

  const values = [nom, prenom, email, motDePasse, idCompte];

  try {
    const result = await client.query(request, values);

    if (result.rowCount === 0) {
      return res.status(404).send('Compte non trouvé');
    }

    console.log('Compte mis à jour');
    res.send('Compte mis à jour avec succès');
  } catch (err) {
    console.error("Erreur lors de la mise à jour du compte :", err);
    res.status(500).send("Erreur lors de la mise à jour du compte");
  }
});

// Route pour supprimer un compte par son ID
router.delete('/compte/delete:id', async (req, res) => {
  const idCompte = req.params.id;

  const request = `DELETE FROM Compte WHERE idCompte = $1`;

  try {
    const result = await client.query(request, [idCompte]);

    if (result.rowCount === 0) {
      return res.status(404).send('Compte non trouvé');
    }

    console.log('Compte supprimé');
    res.send('Compte supprimé avec succès');
  } catch (err) {
    console.error("Erreur lors de la suppression du compte :", err);
    res.status(500).send("Erreur lors de la suppression du compte");
  }
});

export default router;
