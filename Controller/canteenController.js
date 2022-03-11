const Canteen = require('../Models/canteenModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUser = catchAsync(async (req, res, next) => {
  const canteen = await Canteen.find();

  res.status(200).json({
    status: 'success',
    data: {
      canteen
    }
  })
})
