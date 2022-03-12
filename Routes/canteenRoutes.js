const express = require("express");
const { restrictTo, protect } = require("../Controller/authController");
const {
  getAllCanteen,
  createCanteen,
  getAllCanteenByCollege,
  addNewItemMenu,
  updateMenu
} = require("../Controller/canteenController");
const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin"), getAllCanteen)
  .post(protect, restrictTo("admin"), createCanteen);

router.route("/:collegeId").get(protect, getAllCanteenByCollege);
router
  .route("/:collegeId/:canteenId")
  .post(protect, restrictTo("canteenWorker"), addNewItemMenu)
  .patch(protect, restrictTo("canteenWorker"), updateMenu);

module.exports = router;