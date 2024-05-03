import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10; // Number of salt rounds for hashing

const CredentialSchema = mongoose.Schema(
    {
        CNIC: {
            type: String,
            required: true,
            unique: true, // Ensure unique CNIC for each user
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

// Middleware to hash password before saving
CredentialSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

export const Credentials = mongoose.model("Credentials", CredentialSchema);
