import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    skills: [String],
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Provider = mongoose.model('Provider', providerSchema);

export default Provider;
