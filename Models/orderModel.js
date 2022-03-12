const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide user data."],
    },
    orderDetail: [
      {
        meal: {
          type: mongoose.Schema.ObjectId,
          required: [true, "Please provide meal data."],
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    canteen: {
      type: mongoose.Schema.ObjectId,
      ref: "Canteen",
      required: [true, "Please provide canteen Id."],
    },
    college: {
      type: mongoose.Schema.ObjectId,
      ref: "college",
      required: [true, "Please provide college id."],
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
      enum: ["cod", "online"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
