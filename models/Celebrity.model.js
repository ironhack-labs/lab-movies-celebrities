const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  occupation: { type: String, default: 'unknown' },
  catchPhrase: { type: String, required: true }
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;