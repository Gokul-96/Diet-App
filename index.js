import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression"; // Corrected the import style
import AppRouter from "./router/index.js"; 
import Tracking from './models/trackingModel.js'; 
import User from './models/userModel.js'; 

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize Express app

const PORT = process.env.PORT || 8000; // Fallback to 8000 if PORT is not defined
const DB_URL = process.env.DB_URL; // Database URL from .env

console.log(DB_URL); // For debugging, ensure DB_URL is being printed correctly

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression()); // Use compression for better performance

// Logging middleware to capture requests
app.use((req, res, next) => {
  console.log(`${req.method} request made to: ${req.url}`);
  next();
});

// Define a new endpoint for tracking data
app.get('/trackings/track/:userId/:date', async (req, res) => {
  try {
    const { userId, date } = req.params;

    // Optionally, fetch the user to ensure it exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch and populate foodId
    const trackedItems = await Tracking.find({ userId })
      .populate('foodId', 'name') // Populate only the 'name' field of foodId
      .exec();

    res.status(200).json(trackedItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tracked items", error });
  }
});

// Connect to MongoDB without deprecated options
mongoose.connect(DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Use router
app.use(AppRouter); // Use the defined router

// Base endpoint
app.get("/", (req, res) => {
  res.send("Server running");
});

// Start the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
