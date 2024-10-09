import express from "express";
import UserRoutes from "./userModel.js";
import FoodRoutes from "./foodModel.js";
import TrackingRoutes from "./trackingModel.js";
import BMIRoutes from "./userRoutes.js"


const router = express.Router();
router.use("/users", UserRoutes);
router.use("/foods", FoodRoutes);
router.use("/trackings", TrackingRoutes);
router.use("/bmi",BMIRoutes );



export default router;
