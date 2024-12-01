import Annonce from "../modeles/modeleAnnonce.js";

// Contrôleur pour récupérer un compte ?
export const getAllAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.getAll();
    res.json(annonces);
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des annonces" });
  }
};


// Contrôleur pour récupérer une annonce par son ID
export const getAnnonceByID = async (req, res) => {
  try {
    const annonce = await Annonce.getByID(req.params.id);
    res.status(200).json(annonce);
  } catch (err) {
    console.error("Erreur lors de la récupération de l'annonce :", err);
    res.status(500).send("Erreur lors de la récupération de l'annonce");    
  }
}

// Contrôleur pour récupérer les annonces associées au compte connecté
export const getAnnonceByAccount = async (req, res) => {
  try {
    const annonces = await Annonce.getByAccount(req.session.email);
    res.status(200).json(annonces);
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces :", err);
    res.status(500).send("Erreur lors de la récupération des annonces");
  }
};

// Contrôleur pour ajouter une annonce
export const createAnnonce = async (req, res) => {
   // TEMPORAIRE //
   let {lecompte} = req.body;
   if (lecompte === undefined) {
   lecompte = req.session.email;
   }
   const data = {...req.body, "lecompte" : lecompte};
   // TEMPORAIRE //

  try {
    const nouvelleAnnonce = await Annonce.create(data);
    console.log('Annonce ajoutée avec succès');
    res.status(201).send(nouvelleAnnonce)
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'annonce :", err);
    res.status(500).send("Erreur lors de l'ajout de l'annonce");
  }
};

// Contrôleur pour mettre à jour une annonce
export const updateAnnonce = async (req, res) => {

  try {
    const annonceModifiée = await Annonce.update(req.body);

    if (! annonceModifiée) {
      return res.status(404).send('Annonce non trouvée');
    }

    console.log('Annonce mise à jour');
    res.send(annonceModifiée);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'annonce :", err);
    res.status(500).send("Erreur lors de la mise à jour de l'annonce");
  }
};

// Contrôleur pour supprimer une annonce par son ID
export const deleteAnnonce = async (req, res) => {

  try {
    const annonceSupprimée = await Annonce.delete(req.params.id)

    if (! annonceSupprimée) {
      return res.status(404).send('Annonce non trouvée');
    }

    console.log('Annonce supprimée');
    res.status(200).send(annonceSupprimée);
  } catch (err) {
    console.error("Erreur lors de la suppression de l'annonce :", err);
    res.status(500).send("Erreur lors de la suppression de l'annonce");
  }
};
