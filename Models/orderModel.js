const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orderDetail: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
        },
      ],
    },
    canteen: {
      type: mongoose.Schema.ObjectId,
      ref: "Canteen",
    },
    college: {
      type: mongoose.Schema.ObjectId,
      ref: "college",
    },
    totalPrice: {
      type: Number,
    },
    comment: String,
    isPaid: {
      type: Boolean,
      default: false,
    },
    modeOfPayment: {
      type: String,
      ennum: ["cod", "online"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
