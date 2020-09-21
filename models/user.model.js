const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

const { codes } = require('./../bin/accessControlAndCodes');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, codes.error_name]
  },
  empId: {
    type: String,
    required: [true, codes.empId],
    unique: true,
    lowercase: true
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  accessType: {
    type: String,
    enum: [0, 1, 2, 3, 4, 5],
    default: 5
  },
  password: {
    type: String,
    default: process.env.DEFAULT_PASSWORD,
    select: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre(/^find/, function(next) {
  this.find({
    active: { $ne: false }
  });
  next();
});

userSchema.methods.passwordCheck = async function(onCall, trueCall) {
  return await bcrypt.compare(onCall, trueCall);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
