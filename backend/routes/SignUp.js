import express from 'express';
import { User } from '../models/UserModel.js';
import { Credentials } from '../models/CredentialModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      cnic,
      isOrganizer,
      socialMediaLinks,
      password,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !dob || !gender || !cnic || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if email or CNIC already exists
    const existingUser = await User.findOne({ email });
    const existingCredential = await Credentials.findOne({ CNIC: cnic });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    if (existingCredential) {
      return res.status(409).json({ error: 'CNIC already exists' });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      cnic,
      isOrganizer: isOrganizer || false, // Default to false if not provided
      socialMediaLinks: socialMediaLinks || [],
    });

    await newUser.save();

    // Create corresponding credential
    const newCredential = new Credentials({
      CNIC: cnic,
      password,
    });

    await newCredential.save();

    // Return success response
    res.status(201).json({
      message: 'User created successfully',
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
