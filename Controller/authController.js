const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createAndSendToken = async (user, statusCode, res, req) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  req.session.token = token;

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  req.body.role = undefined;
  req.body.email = req.body.email.toLowerCase();

  if (!confirmPassword) {
    return next(
      new AppError("Please enter password and password Confirm."),
      400
    );
  }

  if (confirmPassword !== password) {
    return next(
      new AppError("Password and Password confirm doesnot match", 400)
    );
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;

  email = email.toLowerCase();

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createAndSendToken(user, 200, res, req);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access", 401)
    );
  }

  // if (token !== req.session.token) {
  //   return next(new AppError("Invalid Login", 403));
  // }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user doesnot exists", 401));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.refreshController = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError("Please login", 400));
  }

  token = req.headers.authorization.split(" ")[1];

  if (!token || !req.session.token) {
    return next(new AppError("Please login", 400));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findOne(decoded.data);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError("Please login", 400));
  }

  token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(new AppError("Please login", 400));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
