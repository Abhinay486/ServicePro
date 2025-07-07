import express from 'express';
import { getPendingApplications, getAllApplications, approveProfessional, rejectProfessional } from '../controllers/adminController.js';
import auth from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/professionals/pending', auth, checkRole('admin'), getPendingApplications);
router.get('/professionals/applications', auth, checkRole('admin'), getAllApplications);
router.put('/professionals/:id/approve', auth, checkRole('admin'), approveProfessional);
router.delete('/professionals/:id/reject', auth, checkRole('admin'), rejectProfessional);

export default router;
