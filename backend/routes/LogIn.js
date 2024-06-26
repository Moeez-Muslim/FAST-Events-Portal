import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Credentials} from "../models/CredentialModel.js"
import { User } from "../models/UserModel.js";
import { JWT_SECRET_KEY } from "../config.js"; // The secret key used for signing JWT tokens

const router = express.Router();

// Route for login
router.post("/", async (request, response) => {
    try {
        const { CNIC, password } = request.body;
        console.log(CNIC)

        if (!CNIC || !password) {
            return response.status(400).send({ message: "CNIC and password are required" });
        }

        // Find user by CNIC
        const user = await Credentials.findOne({ CNIC });
        

        if (!user) {
            return response.status(401).send({ message: "Invalid CNIC or password" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return response.status(401).send({ message: "Invalid CNIC or password" });
        }

        // Find user by CNIC
        const cnic = CNIC;
        const user_userlist = await User.findOne({ cnic });
        console.log(user_userlist._id)
        // Create a JWT token
        const token = jwt.sign(
            {
                userId: user_userlist._id,
                CNIC: user_userlist.cnic,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h", // Set token expiration time
            }
        );

        return response.status(200).send({ token, message: "Login successful" });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: "Internal server error" });
    }
});

export default router;
