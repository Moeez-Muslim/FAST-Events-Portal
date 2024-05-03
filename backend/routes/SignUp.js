import express from 'express';
import { Credentials } from '../models/CredentialModel.js';
import { User } from '../models/UserModel.js';

const router = express.Router();

// Route for signup (storing new credentials and user information)
router.post('/', async (request, response) => {
    try {
        const {
            CNIC,
            password,
            firstName,
            lastName,
            email,
            phoneNumber,
            dob,
            gender,
        } = request.body;

        // Check if all required fields are provided
        if (!CNIC || !password || !firstName || !lastName || !email || !phoneNumber || !dob || !gender) {
            return response.status(400).send({ message: 'All required fields must be provided' });
        }

        // Check if the user with the same CNIC or email already exists
        const existingUser = await Credentials.findOne({ CNIC });
        const existingEmail = await User.findOne({ email });

        if (existingUser) {
            return response.status(409).send({ message: 'User with this CNIC already exists' });
        }

        if (existingEmail) {
            return response.status(409).send({ message: 'User with this email already exists' });
        }

        // Create and save new credentials
        const newCredentials = new Credentials({
            CNIC,
            password,
        });
        await newCredentials.save();

        // Create and save new user details
        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            dob,
            gender,
        });
        await newUser.save();

        return response.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: 'Internal server error' });
    }
});

export default router;
