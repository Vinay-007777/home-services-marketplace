import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'in-progress', 'completed', 'cancelled'],
        default: 'pending',
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        default: null,
    },
    logs: [
        {
            status: String,
            note: String,
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
