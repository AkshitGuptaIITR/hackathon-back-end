const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Please provide price."],
  },
  name: {
    type: String,
    required: [true, "Please enter name of Object."],
    unique: [true, "Please enter unique name."],
  },
  category: {
    type: String,
    enum: ["rolls", "patties", "burger", "chinese", "parathas", "beverages"],
    required: [true, "Please provide category of food."],
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
      required: [true, "Please proide college info"],
    },
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
});

const Canteen = mongoose.model("Canteen", canteenSchema);

module.exports = Canteen;
