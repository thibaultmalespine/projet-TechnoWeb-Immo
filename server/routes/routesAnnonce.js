import express from 'express';
import {
  createAnnonce, deleteAnnonce, getAnnonceByAccount, getAnnonceByID, updateAnnonce
} from '../controleurs/controleursAnnonce.js';

const router = express.Router();

router.get('/annonce/getAnnonceByID:id', getAnnonceByID);
router.get('/annonce/getAnnonceByAccount', getAnnonceByAccount);
router.post('/annonce', createAnnonce);
router.put('/annonce/update', updateAnnonce);
router.delete('/annonce/delete:id', deleteAnnonce);

export default router;
