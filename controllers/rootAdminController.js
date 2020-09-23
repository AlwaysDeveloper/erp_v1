const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    empId: req.body.empId,
    accessType: req.body.accessType
  });

  newUser.password = undefined;

  res.status(200).json({
    status: 'success',
    user: newUser
  });
});
