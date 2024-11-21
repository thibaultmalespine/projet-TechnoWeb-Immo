import express from 'express';
import {
  createCompte, deleteCompte, getCompte, updateCompte
} from '../controllers/compteClientControllers.js';

const router = express.Router();

router.get('/compte/login', getCompte);
router.post('/compte/submit', createCompte);
router.put('/compte/update:id', updateCompte);
router.delete('/compte/delete:id', deleteCompte);

export default router;

