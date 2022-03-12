const express = require("express");
const { protect, restrictTo } = require("../Controller/authController");
const {
  getAllOrders,
  createOrder,
  getOrder,
  getAllOrdersForCanteen,
  acceptOrder,
  completedOrder,
  deliveredOrder,
} = require("../Controller/orderController");
const router = express.Router();

router.route("/").get(protect, restrictTo('admin'), getAllOrders);
router
  .route("/:orderId")
  .get(protect, restrictTo('canteenWorker'), getOrder)
  .patch(protect, restrictTo('canteenWorker'), acceptOrder, completedOrder, deliveredOrder);
router
  .route("/:collegeId/:canteenId")
  .post(protect, createOrder)
  .get(protect, restrictTo('canteenWorker'),getAllOrdersForCanteen);

module.exports = router;
