import { client } from '../bdd.js';

const Compte = {
  get: async (data) => { 
    const { email, motDePasse } = data;
    const result = await client.query('SELECT * FROM Compte WHERE email = $1 and motdepasse = $2', [email, motDePasse]);
    return result.rows[0]; // Retourne le premier résultat ou undefined si non trouvé
  },
  create: async (data) => {
    const {email, motDePasse} = data;
    const result = await client.query('INSERT INTO Compte (Email, MotDePasse) VALUES ($1, $2) RETURNING *', [email, motDePasse]);
    return result.rows[0];
  },
  update: async (data) => {
    const {idCompte, nom, prenom, email, motDePasse} = data;
    const result = await client.query('UPDATE Compte SET Nom = $1, Prenom = $2, Email = $3, MotDePasse = $4 WHERE idCompte = $5 RETURNING *', 
                                      [nom, prenom, email, motDePasse, idCompte]);
    return result.rows[0];
  },
  delete: async (idCompte) => {
    const result = await client.query('DELETE FROM Compte WHERE idCompte = $1 RETURNING *', [idCompte]);
    return result.rows[0];
  }
};

export default Compte;
