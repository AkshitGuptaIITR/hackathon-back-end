const College = require("../Models/collegeModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllCollege = catchAsync(async (req, res, next) => {
  const college = await College.find();

  res.status(200).json({
    status: "success",
    data: {
      college
    }
  })
})

exports.createCollege = catchAsync(async (req, res, next) => {
  const college = await College.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      college
    }
  })
})

exports.getAllCollegeNames = catchAsync(async (req, res, next) => {
  const college = await College.find().select('name');

  res.status(200).json({
    status: "success",
    data: {
      college
    }
  })
})
