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
    console.log(compteClient);
    if (! bcrypt.compare(motdepasse, compteClient.motdepasse)) {
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
    req.session.email = req.body.email; // définir le compte actuellement connecté comme étant le nouveau compte
    nouveauCompte.motdepasse = req.body.motdepasse;
    res.status(201).send(nouveauCompte);
  } catch (err) {
    console.error("Erreur lors de l'ajout du compte :", err);
    res.status(500).send("Erreur lors de l'ajout du compte");
  }
};

// Contrôleur pour mettre à jour un compte
export const updateCompte = async (req, res) => {
  try {
    const compteModifié = await Compte.update(req.body);
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
    const compteSupprimé = await Compte.delete(req.params.id);

    if (!compteSupprimé) {
      return res.status(404).send('Compte non trouvé');
    }

    console.log('Compte supprimé');
    compteSupprimé.motdepasse = req.body.motdepasse;
    res.send(compteSupprimé);
  } catch (err) {
    console.error("Erreur lors de la suppression du compte :", err);
    res.status(500).send("Erreur lors de la suppression du compte");
  }
};

