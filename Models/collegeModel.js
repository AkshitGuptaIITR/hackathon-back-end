const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name of college'],
    unique: [true, 'This college is already registered.'],
  },
  location: String,
  canteens: {
    type: [
      { id: mongoose.Schema.ObjectId }
    ],
    ref: 'Canteen'
  }
}, { timestamps: true })

const College = mongoose.model('college', collegeSchema);

module.exports = College;
