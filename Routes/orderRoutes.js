const express = require('express');
const { protect } = require('../Controller/authController');
const { getAllOrders, createOrder, getOrder, getAllOrdersForCanteen, acceptOrder, completedOrder } = require('../Controller/orderController');
const router = express.Router();

router.route('/').get(protect, getAllOrders)
router.route('/:orderId').get(protect, getOrder).patch(protect, acceptOrder, completedOrder)
router.route('/:collegeId/:canteenId').post(protect, createOrder).get(protect, getAllOrdersForCanteen)

module.exports = router;
