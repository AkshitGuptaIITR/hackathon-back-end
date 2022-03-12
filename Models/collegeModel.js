const mongoose = require("mongoose");
const Menu = require('./menuModel');

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of college"],
      unique: [true, "This college is already registered."],
    },
    location: String,
    canteens: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Canteen",
      },
    ],
    topPicks: [
      {
        canteen: {
          type: mongoose.Schema.ObjectId,
          ref: "Canteen",
        },
        menu: {
          name: String,
          price: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

collegeSchema.pre(/^find/, async function(next){
  this.populate({
    path: 'topPicks.canteen topPicks.menu',
    strictPopulate: false,
    select: 'name'
  })
  
  next()
})

const College = mongoose.model("college", collegeSchema);

module.exports = College;
