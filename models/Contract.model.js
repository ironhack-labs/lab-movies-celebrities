const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie is required']
  },
  celebrity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebrity',
    required: [true, 'Celebrity is required']
  },
  amount: {
    type: Number,
    required: true,
    min: [10000, 'Amount must be at least 10000'],
    required: [true, 'Amount is required']
  }
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
