import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    cnic: {
      type: String,
      required: true,
      unique: true,
    }, // New CNIC attribute
    isOrganizer: {
      type: Boolean,
      default: false, // Default to false, indicating the user is not an organizer
    },
    socialMediaLinks: {
      type: [String],
      default: [],
    },
    eventsRegistered: [
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

export const User = mongoose.model('userSchema', userSchema);
