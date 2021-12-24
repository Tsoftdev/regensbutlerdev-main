import express from "express";
import {
  downloadProducts,
  uploadProducts,
} from "../controllers/settingsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { uploadFile } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin);

router.route("/download").get(protect, admin, downloadProducts);

export default router;
