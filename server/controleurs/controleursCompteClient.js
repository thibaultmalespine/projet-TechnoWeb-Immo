import bcrypt from 'bcryptjs';
import Compte from '../modeles/modeleCompteClient.js';

// Contrôleur pour authentifier un compte
export const login = async (req, res) => {
  const {motdepasse} = req.body;
  try {
    const compteClient = await Compte.get(req.body);
    if (!compteClient) {
      return res.status(404).send('Email incorrect');
    }    
    if (! await bcrypt.compare(motdepasse, compteClient.motdepasse)) {
      return res.status(404).send('Mot de passe incorrect');
    } 
    req.session.email = req.body.email;
    compteClient.motdepasse = motdepasse;
    res.status(200).send(compteClient);
  } catch (err) {
    console.error("Erreur lors de la récupération du compte :", err);
    res.status(500).send("Erreur lors de la récupération du compte");
  }
};

// Contrôleur pour ajouter un compte
export const createCompte = async (req, res) => {
  try {
    const nouveauCompte = await Compte.create(req.body);
    console.log('Compte ajouté avec succès');
    nouveauCompte.motdepasse = req.body.motdepasse;
    res.status(201).send(nouveauCompte);
  } catch (err) {
    if (err.code === '23505') { // Code d'erreur pour violation de contrainte d'unicité
      console.error('Erreur : Ce email existe déjà');
      res.status(409).send("Ce email existe déjà");

    }
    else{
      console.error("Erreur lors de l'ajout du compte :", err);
      res.status(500).send("Erreur lors de l'ajout du compte");
    }
  }
};

// Contrôleur pour mettre à jour un compte
export const updateCompte = async (req, res) => {
  const id = req.params.id;
  const data = {...req.body, idCompte : id};
  try {
    const compteModifié = await Compte.update(data);
    if (!compteModifié) {
      return res.status(404).send('Compte non trouvé');
    }
    console.log('Compte mis à jour');
    req.session.email = req.body.email; // on change l'email stocké dans l'objet request par la nouvelle email
    compteModifié.motdepasse = req.body.motdepasse;
    res.status(200).send(compteModifié);
  } catch (err) {
    console.error("Erreur lors de la mise à jour du compte :", err);
    res.status(500).send("Erreur lors de la mise à jour du compte");
  }
};

// Contrôleur pour supprimer un compte par son ID
export const deleteCompte = async (req, res) => {
  try {
    const rowCount = await Compte.delete(req.params.id);

    if (rowCount === 0) {
      return res.status(404).send('Compte non trouvé');
    }

    console.log('Compte supprimé');
    res.sendStatus(200);
  } catch (err) {
    console.error("Erreur lors de la suppression du compte :", err);
    res.status(500).send("Erreur lors de la suppression du compte");
  }
};

