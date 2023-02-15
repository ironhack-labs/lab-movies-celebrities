
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    quotes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Celebrity', celebritySchema);
