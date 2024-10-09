import userModel from "../controllers/userModel.js"
import { Router } from 'express';



const router = Router();

router.post("/register",userModel.create)
router.post("/login",userModel.login)


export default router