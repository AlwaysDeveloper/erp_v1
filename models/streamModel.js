const mongoose = require('mongoose');

const streamSchema = mongoose.Schema({
  organization: {
    type: String,
    required: [true]
  },
  name: {
    type: String,
    required: [true]
  },
  code: {
    type: String
  },
  HOD: {
    type: mongoose.Schema.ObjectId
  },
  professors: [
    {
      type: mongoose.Schema.ObjectId
    }
  ]
});

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;
