const catchAsync = require('./../utils/catchAsync');

exports.homeData = catchAsync(async (req, res, next) => {
  console.log(req.user);
  res.status(400).json({
    status: 'success'
  });
});
