import express from "express";
import { Credentials } from "../models/CredentialModel.js";

const router = express.Router();

// Route for signup (storing new credentials)
router.post("/", async (request, response) => {
    try {
        const { CNIC, password } = request.body;

        if (!CNIC || !password) {
            return response.status(400).send({ message: "CNIC and password are required" });
        }

        // Check if the user already exists
        const existingUser = await Credentials.findOne({ CNIC });
        if (existingUser) {
            return response.status(409).send({ message: "User with this CNIC already exists" });
        }

        // Create and save new credentials
        const newUser = new Credentials({
            CNIC,
            password,
        });

        await newUser.save();

        return response.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: "Internal server error" });
    }
});

export default router;
