import jwt from 'jsonwebtoken';
import Annonce from '../modeles/modeleAnnonce.js';

// Controleur pour générer un lien de partage
export function generateLink (req, res) {
    const {email} = req.session;
    const token = jwt.sign( {email} , 'secret_key', { expiresIn: '1h' }); // Expire en 1 heure
    res.send(`Lien de partage : http://localhost:3000/share/${token}`);
  }

// Controleut pour accéder aux annonces via un lien
export async function getAnnonce (req, res) {
    try {
        const {email} = jwt.verify(req.params.token, 'secret_key');
        const annonces = await Annonce.getByAccount(email);
        res.json(annonces);
    } catch (err) {
        res.status(401).send('Lien invalide ou expiré');
    }
}