import express from "express";

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  resetUserPw,
  changeUserPw,
  resendMail,
  updateUserRegister,
  userValidate,
  validatePassword,
  updateUserTobonus
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/validatePassword").post(protect, validatePassword);
router.route("/resendMail").post(resendMail);
router.route("/updateUserRegister").post(updateUserRegister);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

router.route("/user-validate").post(userValidate);
router.route("/forgot-pw").post(resetUserPw);
router.route("/reset-password").post(changeUserPw);
router.route("/:id/bonus").post(protect, admin, updateUserTobonus);

export default router;
