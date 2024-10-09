import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AppRouter from "./router/index.js";

dotenv.config();  // Load environment variables from .env file

const PORT = process.env.PORT || 8000;  // Fallback to 5000 if PORT is not defined
const DB_URL = process.env.DB_URL;      // Database URL from .env

console.log(DB_URL);  // For debugging, ensure DB_URL is being printed correctly

// Connect to MongoDB without deprecated options
mongoose.connect(`${DB_URL}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
app.use(cors());
app.use(express.json());
app.use(AppRouter);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
