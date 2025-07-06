import express from 'express';
import { getBookings, getPendingBookings, acceptBooking, rejectBooking, getProfile } from '../controllers/professionalController.js';
import auth from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/:id/bookings', auth, checkRole('professional'), getBookings);
router.get('/:id/pending-bookings', auth, checkRole('professional'), getPendingBookings);
router.patch('/bookings/:bookingId/accept', auth, checkRole('professional'), acceptBooking);
router.patch('/bookings/:bookingId/reject', auth, checkRole('professional'), rejectBooking);
router.get('/:id/profile', auth, checkRole('professional'), getProfile);

export default router;
