import express from 'express';
import { bookService, getBookings } from '../controllers/customerController.js';
import auth from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/:id/bookings', auth, checkRole('customer'), bookService);
router.get('/:id/bookings', auth, checkRole('customer'), getBookings);

export default router;
