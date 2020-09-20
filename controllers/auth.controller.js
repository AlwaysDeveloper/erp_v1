const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const AuthHelper = require('./../utils/authHelper');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

<<<<<<< HEAD
const User = require('./../models/user.model');

exports.login = catchAsync( async (req, res, next) => {
    const { empId, password } = req.body;

    if(!empId || !password){
        return next(
            new AppError('Please provide email and password!', 400)
        )
    }

    const user = await User.find({ empId: 'mukul.gupta.021' });

    console.log(user);

    res.status(200).json(
        {
            status: 'success'
        }
    )
} );
=======
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
});
>>>>>>> c824acc364d16e15cebec039a9a6798ad1c45740
