const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  subjectCode: {
    type: String,
    required: [true]
  },
  date: {
    type: Date,
    required: [true],
    unique: true
  },
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subject',
    required: [true]
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  attendence: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

const Class = mongoose.model('ClassAttendence', classSchema);

module.exports = Class;
