const express = require("express");
const { protect, restrictTo } = require("../Controller/authController");
const {
  getAllCollege,
  createCollege,
  getAllCollegeNames,
} = require("../Controller/collegeController");
const router = express.Router();

router
  .route("/")
  .get(protect, getAllCollege)
  .post(protect, restrictTo("admin"), createCollege);

router.route("/name").get(getAllCollegeNames);

module.exports = router;
