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
  role: {
    type: String,
    enum: ['admin', 'sales-admin', 'teach-admin', 'accounts-admin', 'parent', 'emp'],
    default: 'emp'
  },
  password: {
    type: String,
    default: '$2y$12$UfdDo25RmIgo2HVUXAwK1OR09/tEriCKLl/wvjDialhQHact5s2eW',
    select: false
  },
  passwordConfirm: {
    type: String,
    default: '123456789',
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
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
<<<<<<< HEAD

const User = mongoose.model('User', userSchema);

module.exports = User;
=======
>>>>>>> c824acc364d16e15cebec039a9a6798ad1c45740
