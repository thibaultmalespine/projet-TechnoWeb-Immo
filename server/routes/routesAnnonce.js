import express from 'express';
import {
  createAnnonce, deleteAnnonce, getAllAnnonces, getAnnonceByAccount, updateAnnonce
} from '../controleurs/controleursAnnonce.js';

const router = express.Router();

router.get('/annonce/getAll', getAllAnnonces);
router.get('/annonce/getAnnonceByAccount', getAnnonceByAccount);
router.post('/annonce/submit', createAnnonce);
router.put('/annonce/update:id', updateAnnonce);
router.delete('/annonce/delete:id', deleteAnnonce);

export default router;
