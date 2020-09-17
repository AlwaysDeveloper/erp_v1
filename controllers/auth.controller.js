const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const AuthHelper = require('./../utils/authHelper');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.login = catchAsync( async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(
            new AppError('Please provide email and password!', 400)
        )
    }
} );
