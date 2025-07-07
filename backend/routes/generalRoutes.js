import express from 'express';
import { getAllProfessionals } from '../controllers/generalController.js';

const router = express.Router();

router.get('/professionals', getAllProfessionals);

export default router;
