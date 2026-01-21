import Booking from '../models/Booking.js';
import Provider from '../models/Provider.js';

export const createBooking = async (req, res) => {
    try {
        const { service, customerName, customerAddress } = req.body;
        const booking = await Booking.create({
            service,
            customerName,
            customerAddress,
            logs: [{ status: 'pending', note: 'Booking created' }]
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('providerId').sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, note } = req.body;

        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = status;
        booking.logs.push({ status, note: note || `Status updated to ${status}` });

        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const { providerId } = req.body;

        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const provider = await Provider.findById(providerId);
        if (!provider) return res.status(404).json({ message: 'Provider not found' });

        booking.providerId = providerId;
        booking.status = 'assigned';
        booking.logs.push({ status: 'assigned', note: `Assigned to ${provider.name}` });

        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
