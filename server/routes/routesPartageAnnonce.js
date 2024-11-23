import express from 'express';
import { generateLink, getAnnonce } from '../controleurs/controleursPartageAnnonce.js';

const router = express.Router();

router.post('/share', generateLink);
router.get('/share/:token', getAnnonce);

export default router;
