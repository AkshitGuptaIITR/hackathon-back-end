const mongoose = require("mongoose");
const { menuSchema } = require("./canteenModel");

const Menu = mongoose.model("menu", menuSchema);

module.exports = Menu;
