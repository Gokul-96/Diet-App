import express from "express";
import { calculateBMIController } from "../controllers/userController.js";

const router = express.Router();

router.post("/calculate-bmi", calculateBMIController);

export default router;
