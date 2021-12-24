import express from "express";
import {
    handlecreate,
    handlecancel,
    handleexecute,
    createAgreement,
    processAgreement
} from "../controllers/recurringpaymentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/handlecreate")
    .post(protect, handlecreate)
router.route("/handlecancel")
    .get(protect, handlecancel)
router.route("/success")
    .get(protect, handleexecute)
router.route("/createagreement")
    .post(protect, createAgreement)
router.route("/processagreement")
    .get(protect, processAgreement)

export default router;
