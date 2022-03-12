const express = require('express');
const { protect, restrictTo } = require('../Controller/authController');
const { getAllReviews, getAllReviewsForCanteen, getAllReviewsByUser, createReview } = require('../Controller/reviewController');
const router = express.Router();

router.route('/').get(protect, getAllReviews)

router.route('/:canteenId').get(getAllReviewsForCanteen);
router.route('/:userId').get(protect, getAllReviewsByUser)
router.route('/:canteenId/:userId').post(protect, restrictTo('student'), createReview);

module.exports = router;
