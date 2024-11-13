import express from 'express';
import {
  getAllAnnonces,
  getAnnonceById,
  createAnnonce,
  updateAnnonce,
  deleteAnnonce
} from '../controllers/annonceControleurs.js';

const router = express.Router();

router.get('/annonce/getAll', getAllAnnonces);
router.get('/annonce/get:id', getAnnonceById);
router.post('/annonce/submit', createAnnonce);
router.put('/annonce/update:id', updateAnnonce);
router.delete('/annonce/delete:id', deleteAnnonce);

export default router;
