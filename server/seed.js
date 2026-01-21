import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Provider from './models/Provider.js';
import connectDB from './config/db.js';

dotenv.config();

const seedProviders = async () => {
    await connectDB();

    // Clear existing providers
    await Provider.deleteMany({});

    const providers = [
        { name: "John", email: "john@example.com", skills: ["Cleaning", "Plumbing"], isAvailable: true },
        { name: "Smith", email: "jane@example.com", skills: ["Electrical", "Repair"], isAvailable: true },
        { name: "Mike", email: "mike@example.com", skills: ["Moving", "Cleaning"], isAvailable: true },
    ];

    await Provider.insertMany(providers);
    console.log('Providers Seeded');
    process.exit();
};

seedProviders();
