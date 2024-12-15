import express from 'express';
import {
  createCompte, deleteCompte, login, updateCompte
} from '../controleurs/controleursCompteClient.js';

const router = express.Router();

router.post('/compte/login', login);
router.post('/compte', createCompte);
router.put('/compte/:id', updateCompte);
router.delete('/compte/:id', deleteCompte);

export default router;  

