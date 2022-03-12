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
        name: {
          type: String,
          required: "Please provide Name of the order."
        },
        price: {
          type: Number,
          required: 'Please provide price for orders.'
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
