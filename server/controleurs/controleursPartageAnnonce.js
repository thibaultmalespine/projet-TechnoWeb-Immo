import jwt from 'jsonwebtoken';
import { client } from '../bdd.js';

export function generateLink (req, res) {
    const {email} = req.session;
    const token = jwt.sign( {email} , 'secret_key', { expiresIn: '1h' }); // Expire en 1 heure
    res.send(`Lien de partage : http://localhost:3000/share/${token}`);
  }

export async function getAnnonce (req, res) {
    try {
        const {email} = jwt.verify(req.params.token, 'secret_key');
        const result = await client.query('SELECT * FROM Annonce WHERE lecompte = $1', [email]);
        res.json(result.rows);
    } catch (err) {
        res.status(401).send('Lien invalide ou expiré');
    }
}