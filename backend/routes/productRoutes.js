import express from "express";
import {
  getProductsAdmin,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getCategories,
  updateProductRating
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/admin").get(protect, admin, getProductsAdmin);
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/top").get(getTopProducts);
router.route("/kategorien").get(getCategories);
router.route("/:id/rating").put(protect, updateProductRating);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
