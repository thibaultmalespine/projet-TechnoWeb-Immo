import { client } from '../bdd.js';

// Contrôleur pour récupérer toutes les annonces
export const getAllAnnonces = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM Annonce');
    const annonces = result.rows;
    res.json(annonces);
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des annonces" });
  }
};

// Contrôleur pour récupérer une annonce par son ID
export const getAnnonceById = async (req, res) => {
  const idAnnonce = req.params.id;
  try {
    const result = await client.query('SELECT * FROM Annonce WHERE idAnnonce = $1', [idAnnonce]);
    
    if (result.rowCount === 0) {
      return res.status(404).send('Annonce non trouvée');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de la récupération de l'annonce :", err);
    res.status(500).send("Erreur lors de la récupération de l'annonce");
  }
};

// Contrôleur pour ajouter une annonce
export const createAnnonce = async (req, res) => {

  const { titre, url_annonce, description, type, codep, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine } = req.body;

  const request = `INSERT INTO Annonce (NomAnnonce, URLOriginale, Description, TypeDeBien, CodePostal, NomVille, Prix, M2Habitable, M2Terrains, Meuble, ParticulierPro, Garage, Piscine) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;

  const values = [titre, url_annonce, description, type, codep, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine];

  try {
    const result = await client.query(request, values);
    console.log('Annonce ajoutée avec succès');
    res.redirect('/');
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'annonce :", err);
    res.status(500).send("Erreur lors de l'ajout de l'annonce");
  }
};

// Contrôleur pour mettre à jour une annonce
export const updateAnnonce = async (req, res) => {
  const { titre, url_annonce, description, type, codep, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine } = req.body;
  const idAnnonce = req.params.id;

  const request = `UPDATE Annonce
                   SET NomAnnonce = $1, URLOriginale = $2, Description = $3, TypeDeBien = $4, laVille = $5, Prix = $6, 
                       M2Habitable = $7, M2Terrains = $8, Meuble = $9, ParticulierPro = $10, Garage = $11, Piscine = $12
                   WHERE idAnnonce = $13`;

  const values = [titre, url_annonce, description, type, codep, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine, idAnnonce];

  try {
    const result = await client.query(request, values);

    if (result.rowCount === 0) {
      return res.status(404).send('Annonce non trouvée');
    }

    console.log('Annonce mise à jour');
    res.send('Annonce mise à jour avec succès');
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'annonce :", err);
    res.status(500).send("Erreur lors de la mise à jour de l'annonce");
  }
};

// Contrôleur pour supprimer une annonce par son ID
export const deleteAnnonce = async (req, res) => {
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
    console.error("Erreur lors de la suppression de l'annonce :", err);
    res.status(500).send("Erreur lors de la suppression de l'annonce");
  }
};
