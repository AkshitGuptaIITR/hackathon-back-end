const { Canteen } = require("../Models/canteenModel");
const College = require("../Models/collegeModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllCanteen = catchAsync(async (req, res, next) => {
  const canteen = await Canteen.find();

  res.status(200).json({
    status: "success",
    data: {
      canteen,
    },
  });
});

exports.createCanteen = catchAsync(async (req, res, next) => {
  const { collegeId } = req.params;

  const canteen = await Canteen.create({ ...req.body, college: collegeId });

  await College.findByIdAndUpdate(
    {
      _id: collegeId,
    },
    {
      $push: {
        canteens: canteen._id,
      },
    }
  );

  res.status(201).json({
    status: "success",
    data: {
      canteen,
    },
  });
});

exports.getAllCanteenByCollege = catchAsync(async (req, res, next) => {
  const { collegeId } = req.params;

  const canteen = await Canteen.find({
    college: collegeId,
  });

  res.status(200).json({
    status: "success",
    data: {
      canteen,
    },
  });
});

exports.addNewItemMenu = catchAsync(async (req, res, next) => {
  const { canteenId } = req.params;

  const canteen = await Canteen.findByIdAndUpdate(
    { _id: canteenId },
    {
      $push: {
        menu: req.body,
      },
    },
    { runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      canteen,
    },
  });
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const { canteenId } = req.params;

  const { menuId } = req.query;

  if (!menuId) {
    return next(new AppError("Please provide menu id", 400));
  }

  const canteen = await Canteen.findByIdAndUpdate(
    {
      _id: canteenId,
      "menu._id": menuId,
    },
    {
      $set: {
        "menu.$": req.body,
      },
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      canteen,
    },
  });
});

exports.getMenuForCanteen = catchAsync(async (req, res, next) => {
  const { canteenId } = req.params;

  const canteen = await Canteen.findOne({ _id: canteenId });

  const menu = {
    rolls: [],
    patties: [],
    burger: [],
    chinese: [],
    parathas: [],
    beverages: [],
    sandwich: [],
  };

  canteen.menu.map((data) => {
    if(data.category === 'rolls'){
      menu.rolls.push(data)
    }else if(data.category === 'patties'){
      menu.patties.push(data)
    }else if(data.category === 'burger'){
      menu.burger.push(data)
    } else if(data.category === 'chinese'){
      menu.chinese.push(data)
    }else if(data.category === 'parathas'){
      menu.parathas.push(data)
    }else if(data.category === 'beverages'){
      menu.beverages.push(data)
    }else if(data.category === 'sandwich'){
      menu.sandwich.push(data)
    }

    return data;
  })


  res.status(200).json({
    status: "success",
    data: {
      canteen,
      menu
    },
  });
});
