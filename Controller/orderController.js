const Order = require("../Models/orderModel");
const User = require("../Models/userModel");
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
    user: req.user.id,
    ...req.body,
  });

  await User.findByIdAndUpdate({
    _id: req.user.id,
  }, {
    $push: {
      orders: orders._id,
    },
  })

  res.status(201).json({
    status: "success",
    data: {
      orders
    }
  })
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const orders = await Order.findById({
    _id: orderId
  })

  res.status(200).json({
    status: "success",
    data: {
      orders
    }
  })
})

exports.getAllOrdersForCanteen = catchAsync(async (req, res, next) => {
  const { collegeId, canteenId } = req.params;

  const orders = await Order.find({ college: collegeId, canteen: canteenId })

  res.status(200).json({
    status: "success",
    data: {
      orders
    }
  })
})

exports.acceptOrder = catchAsync(async (req, res, next) => {
  const { accepted } = req.body;
  const { orderId } = req.params;

  if (accepted) {
    const orders = await Order.findByIdAndUpdate({
      _id: orderId
    }, {
      accepted
    })

    res.status(200).json({
      status: "success",
      data: {
        orders,
      }
    })
  }

  next()
});

exports.completedOrder = catchAsync(async (req, res, next) => {
  const { orderId, isDelivered } = req.params;

  if (!isDelivered) {
    const orders = await Order.findByIdAndUpdate({
      _id: orderId,
    }, {
      isCompleted: true,
      underProcess: false,
      isDelivered: false
    })

    res.status(200).json({
      status: "success",
      data: {
        orders
      }
    })
  }

  next();
})

exports.deliveredOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const orders = await Order.findByIdAndUpdate({
    _id: orderId
  }, {
    isDelivered: true,
  })

  res.status(200).json({
    status: "success",
    data: {
      orders
    }
  })
})
