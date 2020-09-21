const crypto = require('crypto');
const bcrypt = require('bcrypt');

const AuthHelper = require('./../utils/authHelper');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const User = require('./../models/user.model');

const authHelper = new AuthHelper();

exports.login = catchAsync(async (req, res, next) => {
  const { empId, password } = req.body;

  if (!empId || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ empId }).select(['+password', '-passwordConfirm']);

  if (!user || !authHelper.passwordCheck(password, user.password)) {
    return next(new AppError('Incorrect email or password', 400));
  }

  user.password = undefined;

  const token = authHelper.signToken(user._id);

  res.cookie('jwt', token, authHelper.cookieOptions);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please login to get access', 401));
  }

  const decoded = await authHelper.decodeToken(token);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('The user belonging to this token does not longer exist.', 401));
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrict = (...accessCodes) => {
  return (req, res, next) => {
    // eslint-disable-next-line radix
    if (!accessCodes.includes(parseInt(req.user.accessType))) {
      return next(new AppError('You do not have the permission to perform this action'), 403);
    }
    next();
  };
};
