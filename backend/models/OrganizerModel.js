import mongoose from 'mongoose';
import { User } from './UserModel.js'; // Import the User model
import { Event } from './eventModel.js'; // Import the Event model

// Organizer Schema
const organizerSchema = new mongoose.Schema(
    {
        referenceToUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        referenceToListOfEvents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event', // Reference to the Event model
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

export const Organizer = mongoose.model('Organizer', organizerSchema);
