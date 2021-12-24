import asyncHandler from "express-async-handler";
import ReviewMySQL from "../models/reviewsModelMySQL.js";

// @desc Fetch all Reviews
// @route GET /api/Reviews
// @access Public
const getReviews = asyncHandler(async (req, res) => {
  const existReview = await ReviewMySQL.findOne({
    where: {
      orderId: req.params.orderId,
      userId: req.params.userId
    }
  });

  if (existReview) {
    return res.status(201).json({
      status: true,
      id: existReview.id,
      orderId: existReview.orderId,
      userId: existReview.userId,
      stars: existReview.stars,
      reviewComment: existReview.reviewComment,
      createdAt: existReview.createdAt,
      updatedAt: existReview.updatedAt
    });
  }
  else {
    return res.status(201).json({
      status: false
    });
  }
});

// @desc Create single Review
// @route POST /api/Review
// @access Private/Admin
const createReview = asyncHandler(async (req, res) => {
  const {
    orderId,
    userId,
    stars,
    reviewComment
  } = req.body;

  const existReview = await ReviewMySQL.findOne({
    where: { orderId: orderId, userId: userId }
  });

  if (!existReview) {
    const review = await ReviewMySQL.create({
      orderId: orderId,
      userId: userId,
      stars: stars,
      reviewComment: reviewComment,
    });

    if (review) {
      res.status(201).json(review);
    } else {
      res.status(400);
      throw new Error("Ungültige Bewertungsdaten");
    }
  }
  else {
    const reviewUpdated = await ReviewMySQL.update(
      {
        stars: stars,
        reviewComment: reviewComment
      },
      {
        where: {
          orderId: orderId,
          userId: userId
        }
      }
    );
    if (reviewUpdated) {
      const review = await ReviewMySQL.findOne({
        where: { orderId: orderId, userId: userId }
      });
      return res.json({
        id: review.id,
        orderId: review.orderId,
        userId: review.userId,
        stars: review.stars,
        reviewComment: review.reviewComment,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt
      });
    }
  }
});

export {
  getReviews,
  createReview,
};
