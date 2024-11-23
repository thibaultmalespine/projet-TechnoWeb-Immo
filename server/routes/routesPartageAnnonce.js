import express from 'express';
import { generateLink, getAnnonce } from '../controleurs/controleursPartageAnnonce.js';

const router = express.Router();

// Route pour générer un lien de partage
router.post('/share', generateLink);

// Route pour accéder aux annonces via le lien
router.get('/share/:token', getAnnonce);

export default router;
