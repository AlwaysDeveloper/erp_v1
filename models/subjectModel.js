const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
  organization: {
    type: String,
    required: [true]
  },
  code: {
    type: String,
    required: [true],
    unique: true
  },
  name: {
    type: String,
    required: [true]
  },
  subjectType: {
    type: Number,
    enum: [0, 1, 2],
    defult: 0
  },
  syllabus: {
    type: String,
    required: [true]
  }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
