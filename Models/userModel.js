const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Enter Your E-mail id"],
      lowercase: true,
      validate: [validator.isEmail, "Please Enter A valid E-mail"],
    },
    contact: {
      type: Number,
      unique: true,
      required: [true, "Enter your mobile number."],
    },
    password: {
      type: String,
      required: [true, "Enter Your Password"],
      minlength: [8, "password Length must be 8 characters"],
      select: false, // not displaying the password to the user or in the response
    },
    role: {
      type: String,
      enum: ["admin", "canteenWorker", "student"],
      default: "student",
    },
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Orders",
      },
    ],
    branch: String,
    year: Number,
    degree: String,
    favorites: Array,
    active: {
      type: Boolean,
      default: true,
    },
    photo: String,
    college: {
      type: mongoose.Schema.ObjectId,
      ref: "College",
      required: [true, "Please provide your college info."],
    },
    moneylimit: {
      type: Number,
    },
    notification: [
      {
        type: String,
      },
    ],
    canteen: {
      type: mongoose.Schema.ObjectId,
      ref: "Canteen",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "orders canteen",
    select: "-__v",
  });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
