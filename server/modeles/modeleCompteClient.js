import bcrypt from 'bcryptjs';
import { client } from '../bdd.js';

const Compte = {
  get: async (data) => { 
    const { email } = data;
    const result = await client.query('SELECT * FROM Compte WHERE email = $1', [email]);
    return result.rows[0]; // Retourne le premier résultat ou undefined si non trouvé
  },
  create: async (data) => {
    const {prenom, nom, email, motdepasse} = data;
    const mot_de_passe_crypté = await bcrypt.hash(motdepasse, 10);
    const result = await client.query('INSERT INTO Compte (Prenom, Nom, Email, motdepasse) VALUES ($1, $2, $3, $4) RETURNING *', [prenom, nom, email, mot_de_passe_crypté]);
    return result.rows[0];
  },
  update: async (data) => {
    const {idCompte, nom, prenom, email, motdepasse} = data;
    const mot_de_passe_crypté = await bcrypt.hash(motdepasse, 10);
    const result = await client.query('UPDATE Compte SET Nom = $1, Prenom = $2, Email = $3, motdepasse = $4 WHERE idCompte = $5 RETURNING *', 
                                      [nom, prenom, email, mot_de_passe_crypté, idCompte]);
    return result.rows[0];
  },
  delete: async (idCompte) => {
    const result = await client.query('DELETE FROM Compte WHERE idCompte = $1 RETURNING *', [idCompte]);
    return result.rowCount;
  }
};

export default Compte;
