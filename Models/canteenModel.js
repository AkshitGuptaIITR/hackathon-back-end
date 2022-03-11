const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Please provide price."],
  },
  name: {
    type: String,
    required: [true, "Please enter name of Object."],
  },
  photo: String
});

const canteenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name of canteen."],
  },
  menu: [menuSchema],
  location: String,
  averageRating: {
    type: String,
    min: 1,
    max: 5,
  },
  reviews: {
    type: mongoose.Schema.ObjectId,
    ref: "review",
  },
  college: {
    type: mongoose.Schema.ObjectId,
    ref: 'College'
  }
}, {
  timestamps: true
});

const Canteen = mongoose.model("Canteen", canteenSchema);

module.exports = Canteen;
