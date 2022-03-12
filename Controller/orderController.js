const Order = require("../Models/orderModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    data: {
      orders
    }
  })
})

exports.createOrder = catchAsync(async (req, res, next) => {
  const { collegeId, canteenId } = req.params;

  const orders = await Order.create({
    college: collegeId,
    canteen: canteenId,
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      orders
    }
  })
});
