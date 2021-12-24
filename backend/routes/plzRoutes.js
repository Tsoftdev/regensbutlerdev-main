import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    getLiefergebiete,
    checkExist
} from "../controllers/plzController.js"
const router = express.Router();

router.route("/").get(getLiefergebiete);
router.route("/checkExist").post(checkExist);

export default router;