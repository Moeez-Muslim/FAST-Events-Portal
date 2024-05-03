import mongoose from "mongoose";

// Define the User schema
const userSchema = mongoose.Schema(
    {
        CNIC: {
            type: String,
            required: true,
            unique: true, // Ensures CNIC is unique across all users
        },
        name: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Email should be unique
        },
        isAdmin: {
            type: Boolean,
            default: false, // Default to non-admin
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

// Create the User model from the schema
export const User = mongoose.model('User', userSchema);
