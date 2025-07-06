import express from 'express';
import { register, login, applyProfessional } from '../controllers/authController.js';
import auth from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/professional/apply', auth, checkRole('customer'), applyProfessional);

export default router;
