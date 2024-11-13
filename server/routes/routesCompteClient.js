import express from 'express';
import {
  getCompteById,
  createCompte,
  updateCompte,
  deleteCompte
} from '../controllers/compteClientControllers.js';

const router = express.Router();

router.get('/compte/get:id', getCompteById);
router.post('/compte/submit', createCompte);
router.put('/compte/update:id', updateCompte);
router.delete('/compte/delete:id', deleteCompte);

export default router;

