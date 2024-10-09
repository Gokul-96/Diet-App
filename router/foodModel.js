import foodModel from "../controllers/foodModel.js"
import { Router } from 'express';
import verifyToken from "../middleware/verifyToken.js";

const router = Router();


router.post("/create",foodModel.create)
router.get("/getAllFood",verifyToken,foodModel.getAllFood)
router.delete("/delete/:id",foodModel.deletefood)
router.get("/:name",verifyToken,foodModel.foodname)


export default router