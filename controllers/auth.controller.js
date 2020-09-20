const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const AuthHelper = require('./../utils/authHelper');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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
