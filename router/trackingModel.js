import trackingModel from "../controllers/trackingModel.js"
import { Router } from 'express';
import verifyToken from "../middleware/verifyToken.js";
const router = Router();

router.post("/track",verifyToken,trackingModel.track)
router.get("/track/:userid/:date",verifyToken,trackingModel.foodeaten)



export default router