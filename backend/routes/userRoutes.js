import express from "express";
import {User} from "../models/UserModel.js";

const router = express.Router();

// Create a new user
router.post('/', async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      isOrganizer,
      socialMediaLinks
    } = request.body;

    if (!firstName || !lastName || !email || !phoneNumber || !dob || !gender) {
      return response.status(400).send({ message: "Send all required fields" });
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      isOrganizer: isOrganizer || false,
      socialMediaLinks: socialMediaLinks || []
    };

    const user = await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all users
router.get('/', async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json({ count: users.length, data: users });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update a user
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      request.body,
      { new: true }
    );

    if (!updatedUser) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).send({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a user
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
