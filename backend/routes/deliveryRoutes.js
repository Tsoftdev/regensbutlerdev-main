import express from "express";
import {
    getDeliverySchedule,
    createDeliverySchedule,
    deleteDeliverySchedule,
    getDates,
    createDate,
    deleteDateItem
} from "../controllers/deliveryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(protect, admin, createDeliverySchedule)
    .get(protect, getDeliverySchedule);
router
    .route("/:id")
    .delete(protect, admin, deleteDeliverySchedule)

router.route("/date")
    .post(protect, admin, createDate)
    .get(protect, getDates);
router
    .route("/date/:id")
    .delete(protect, admin, deleteDateItem)

export default router;
