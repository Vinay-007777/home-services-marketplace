import express from 'express';
import { createBooking, getBookings, updateBookingStatus, assignProvider, getProviders } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.patch('/:id/status', updateBookingStatus);
router.post('/:id/assign', assignProvider);
router.get('/providers', getProviders);

export default router;
