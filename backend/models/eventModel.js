import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        dateTime: {
            type: Date,
            required: true,
        },
        totalTickets: {
            type: Number,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        registered: {
            type: [String],
            default: [],
        }, // Array of CNICs or user IDs
        feedbacks: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'userSchema', // Reference to User who gave feedback
                },
                date: {
                    type: Date,
                    default: Date.now, // Default to the current date
                },
                feedbackText: {
                    type: String,
                    required: true,
                },
            },
        ], // List of feedback entries
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

// Create the Event model from the schema
export const Event = mongoose.model('Event', eventSchema);
