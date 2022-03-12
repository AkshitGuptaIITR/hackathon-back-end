const express = require('express');
const { protect } = require('../Controller/authController');
const { getAllOrders, createOrder } = require('../Controller/orderController');
const router = express.Router();

router.route('/').get(protect, getAllOrders)
router.route('/:collegeId/:canteenId').post(protect, createOrder)

module.exports = router;
