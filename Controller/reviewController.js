const Review = require("../Models/reviewModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = Review.find();

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.getAllReviewsForCanteen = catchAsync(async (req, res, next) => {
  const { canteenId } = req.params;

  const reviews = Review.find({
    canteen: canteenId,
  });

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.getAllReviewsByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.user;

  const reviews = Review.find({
    user: userId,
  });

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

