/* eslint-disable no-unused-vars */
const Subject = require('./../models/subjectModel');
const catchAsync = require('./../utils/catchAsync');

exports.createSubject = catchAsync(async (req, res, next) => {
  const newSubject = await Subject.create(req.body);
  res.status(200).json({
    status: 'success',
    newSubject
  });
});

exports.getSubject = catchAsync(async (req, res, next) => {
  const { subjectCode } = req.query;
  let subject;
  if (!subjectCode) {
    subject = await Subject.find();
  } else {
    subject = await Subject.findById(subjectCode);
  }
  res.status(200).json({
    status: 'success',
    subject
  });
});

exports.deleteSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Subject.deleteOne({ _id: id });
  res.status(200).json({
    status: 'success',
    id
  });
});

exports.updateSubject = catchAsync(async (req, res, next) => {
  req.status(200).json({
    status: 'success'
  });
});
