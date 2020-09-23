const ClassAttendence = require('../models/classModel');

const catchAsync = require('../utils/catchAsync');

exports.makeAttendence = catchAsync(async (req, res, next) => {
  let id;

  await ClassAttendence.create(req.body).then(result => {
    id = result._id;
  });

  const attendence = await ClassAttendence.findById(id).populate([
    { path: 'teacher', select: ['-empId', '-photo', '-__v'] },
    { path: 'attendence', select: ['-empId', '-photo', '-__v'] }
  ]);

  res.status(200).json({
    status: 'success',
    attendence
  });
});

exports.updateAttendence = catchAsync(async (req, res, next) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success'
  });
});
