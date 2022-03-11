const mongoose = require("mongoose");

const userSchema = new mongoose.model({
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
  mobileNumber: {
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
  typeOfUser: {
    type: String,
    enum: ["admin", "canteenWorker", "student"],
    default: "student",
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
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
