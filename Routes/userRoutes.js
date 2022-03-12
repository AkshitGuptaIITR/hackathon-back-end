const express = require("express");
const router = express.Router();
const {
  protect,
  restrictTo,
  signup,
  login,
  refreshController,
} = require("../Controller/authController");
const { getAllUser } = require("../Controller/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route('/refresh').get(refreshController);

router.route("/").get(protect, restrictTo("admin"), getAllUser);

module.exports = router;
