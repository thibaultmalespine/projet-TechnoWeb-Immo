import express from 'express';
import {
  createCompte, deleteCompte, login, updateCompte, getCompte
} from '../controleurs/controleursCompteClient.js';

const router = express.Router();

router.get('/compte', getCompte);
router.post('/compte/login', login);
router.post('/compte', createCompte);
router.put('/compte/:id', updateCompte);
router.delete('/compte/:id', deleteCompte);

export default router;  

