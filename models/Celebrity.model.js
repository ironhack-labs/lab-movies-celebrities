const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema ({
  name: {type: String},
  occupation: {type: String},
  catchPhrase: {type: String}
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('Celebrity', celebritySchema);