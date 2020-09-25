const mongoose = require('mongoose');

const feeSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  timestamp: Number,
  amount: {
    type: Number,
    enum: [0, 1, 2, 3]
  },
  left: {
    type: Number
  },
  transactionNumber: {
    type: String,
    required: [true]
  }
});

const Fee = mongoose.Schema('Fee', feeSchema);

module.exports = Fee;
