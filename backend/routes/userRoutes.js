import express from "express";
import { User } from "../models/UserModel.js";

const router = express.Router();

// Create a new user
router.post("/", async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      cnic, // New required field
      isOrganizer,
      socialMediaLinks,
    } = request.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !dob ||
      !gender ||
      !cnic // Ensure CNIC is also validated
    ) {
      return response.status(400).send({ message: "Please send all required fields" });
    }

    // Create the new user object with CNIC
    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      cnic,
      isOrganizer: isOrganizer || false,
      socialMediaLinks: socialMediaLinks || [],
    };

    const user = await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    if (error.code === 11000) {
      // Handle unique constraint violation (duplicate CNIC or email)
      return response.status(409).send({ message: "CNIC or email already exists" });
    }
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Get all users
router.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json({ count: users.length, data: users });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Get a single user by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Update a user
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updatedData = request.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).send({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Delete a user
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});


export default router;
