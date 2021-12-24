import express from "express";
import {
    getReviews,
    createReview
} from "../controllers/reviewsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createReview);
router.route("/:userId/:orderId").get(protect, getReviews);

export default router;
