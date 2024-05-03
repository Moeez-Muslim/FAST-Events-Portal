import express from "express";
import { PORT, mongoDBurl } from "./config.js";
import mongoose from "mongoose";
import eventRoute from "./routes/eventRoutes.js";
import loginRoute from "./routes/LogIn.js"
import signupRoute from "./routes/SignUp.js";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file


const app = express();

app.use(express.json());

// CORS middleware to handle outside requests
app.use(cors());

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('My first backend server')
})

app.use('/events', eventRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

mongoose.connect(mongoDBurl)
.then(()=>{
    console.log("App connected to MongoDB database")

    app.listen(PORT, () => {
        console.log("Listening on PORT: ", PORT)
    })
    
})
.catch((console.error()));