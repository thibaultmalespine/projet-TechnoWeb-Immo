import { client } from '../bdd.js';

// Contrôleur pour récupérer un compte
export const getCompte = async (req, res) => {
  const email = req.query.email;
  const motDePasse = req.query.motDePasse;

  
  try {
    const result = await client.query('SELECT * FROM Compte WHERE email = $1 and motdepasse = $2', [email, motDePasse]);
    
    if (result.rowCount === 0) {
      res.status(404).send('Compte non trouvé');
    }
    else{
      res.json(result.rows[0]);
    }

  } catch (err) {
    console.error("Erreur lors de la récupération du compte :", err);
    res.status(500).send("Erreur lors de la récupération du compte");
  }
};

// Contrôleur pour ajouter un compte
export const createCompte = async (req, res) => {
  const { email, motDePasse } = req.body;
  const request = `INSERT INTO Compte (Email, MotDePasse) 
                   VALUES ($1, $2)`;

  const values = [email, motDePasse];

  try {
    const result = await client.query(request, values);
    console.log('Compte ajouté avec succès');
    res.send('Compte ajouté avec succès');
  } catch (err) {
    console.error("Erreur lors de l'ajout du compte :", err);
    res.status(500).send("Erreur lors de l'ajout du compte");
  }
};

// Contrôleur pour mettre à jour un compte
export const updateCompte = async (req, res) => {
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
};

// Contrôleur pour supprimer un compte par son ID
export const deleteCompte = async (req, res) => {
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
};
