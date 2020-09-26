const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

const { codes } = require('./../bin/accessControlAndCodes');

const empSchema = new mongoose.Schema({
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
    type: Number,
    enum: [2, 3, 4],
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

empSchema.pre(/^find/, function(next) {
  this.find({
    active: { $ne: false }
  });
  next();
});

empSchema.methods.passwordCheck = async function(onCall, trueCall) {
  return await bcrypt.compare(onCall, trueCall);
};

const Emp = mongoose.model('Emp', empSchema);

module.exports = Emp;
