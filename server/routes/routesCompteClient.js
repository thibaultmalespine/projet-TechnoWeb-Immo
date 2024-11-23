import express from 'express';
import {
  createCompte, deleteCompte, login, updateCompte
} from '../controllers/compteClientControllers.js';

const router = express.Router();

router.post('/compte/login', login);
router.post('/compte/create', createCompte);
router.put('/compte/update:id', updateCompte);
router.delete('/compte/delete:id', deleteCompte);

export default router;

