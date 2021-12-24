import express from "express";
import {
    getFrequenties,
    createFrequenty,
    deleteFrequenty,
    getPerFrequenties,
    getPerFrequentyDateTime,
    createFrequentyDateTime
} from "../controllers/frequentyController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(protect, createFrequenty)
    .get(protect, getFrequenties)
router
    .route("/:id")
    .get(protect, getPerFrequenties)
    .delete(protect, admin, deleteFrequenty)

router.route("/dateTime")
    .post(protect, createFrequentyDateTime)
router
    .route("/dateTime/:id")
    .get(protect, getPerFrequentyDateTime)

export default router;
