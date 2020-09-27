const User = require('./../models/studentModel');
const Emp = require('./../models/empModel');
const catchAsync = require('./../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  let newUser;
  if (req.query.accountType === 3 || req.query.accountType === 4) {
    newUser = await Emp.create({
      name: req.body.name,
      empId: req.body.id,
      accessType: req.body.accessType,
      photo: req.body.photo
    });
  } else {
    newUser = await User.create({
      name: req.body.name,
      studentId: req.body.id,
      accessType: req.body.accessType,
      photo: req.body.photo
    });
  }

  newUser.password = undefined;

  res.status(200).json({
    status: 'success',
    user: newUser
  });
});
