const Canteen = require('../Models/canteenModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllCanteen = catchAsync(async (req, res, next) => {
  const canteen = await Canteen.find();

  res.status(200).json({
    status: 'success',
    data: {
      canteen
    }
  })
});

exports.createCanteen = catchAsync(async (req, res, next) => {
  const canteen = await Canteen.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      canteen
    }
  })
})
