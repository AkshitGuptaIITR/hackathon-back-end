const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please provide review."],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide user details."],
    },
    canteen: {
      type: mongoose.Schema.ObjectId,
      ref: "Canteen",
      required: [true, "Please provide user details."],
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "User",
    select: "name photo",
  });

  next();
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
