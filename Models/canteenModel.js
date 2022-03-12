const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  image: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide price."],
  },
  name: {
    type: String,
    required: [true, "Please enter name of Object."],
  },
  category: {
    type: String,
    enum: [
      "rolls",
      "patties",
      "burger",
      "chinese",
      "parathas",
      "beverages",
      "sandwich",
    ],
    required: [true, "Please provide category of food."],
  },
  timeEstimated: {
    type: Number,
    required: [true, "Please provide the estimated time."],
  },
  photo: String,
});

const canteenSchema = new mongoose.Schema(
  {
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
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "review",
      },
    ],
    college: {
      type: mongoose.Schema.ObjectId,
      ref: "college",
      required: [true, "Please provide college info"],
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

canteenSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "college",
    select: "name",
  });

  next();
});

const Canteen = mongoose.model("Canteen", canteenSchema);

module.exports = { Canteen, menuSchema };
