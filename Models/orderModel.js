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
        menuId: {
          type: mongoose.Schema.ObjectId,
          ref: "menu",
        },
        name: String,
        price: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    underProcess: {
      type: Boolean,
      default: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    timeEstimated: {
      type: Number,
      default: 10,
      // required: [true, "Please provide the estimated time."],
    },
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
      required: [true, "Please provide total price."],
    },
    comment: String,
    isPaid: {
      type: Boolean,
      default: false,
    },
    modeOfPayment: {
      type: String,
      enum: ["cod", "online"],
      required: [true, "Please provide the mode of payment."],
    },
    typeOfOrder: {
      type: String,
      enum: ["delivery", "dinein", "pick-up"],
      required: [true, "Please select type of order."],
    },
    accepted: {
      type: String,
      default: ['accepted', 'declined', 'processing'],
      default: "processing"
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
