import express from "express";
import UserRoutes from "./userModel.js";
import FoodRoutes from "./foodModel.js";
import TrackingRoutes from "./trackingModel.js";
import BMIRoutes from "./userRoutes.js"; 

const router = express.Router();

// Define your routes with prefixes
router.use("/users", UserRoutes); // Handles requests to /users/*
router.use("/foods", FoodRoutes); // Handles requests to /foods/*
router.use("/trackings", TrackingRoutes); // Handles requests to /trackings/*
router.use("/bmi", BMIRoutes); // Handles requests to /bmi/*

export default router;
