import express from 'express';
import {
  createAnnonce, deleteAnnonce, getAnnonceByAccount, getAnnonceByID, updateAnnonce
} from '../controleurs/controleursAnnonce.js';

const router = express.Router();

router.get('/annonce', getAnnonceByAccount);
router.get('/annonce/:id', getAnnonceByID);
router.post('/annonce', createAnnonce);
router.put('/annonce/:id', updateAnnonce);
router.delete('/annonce/:id', deleteAnnonce);

export default router;
