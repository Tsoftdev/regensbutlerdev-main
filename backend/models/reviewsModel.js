import mongoose from "mongoose";

const ReviewsSchema = mongoose.Schema({
  ReviewsArray: { type: Array },
});

const REVIEWS = mongoose.model("REVIEWS", ReviewsSchema);

export default REVIEWS;
