const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
  {
    name: String,
    occupation: Number,
    catchPhrase: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Celebrity', celebritySchema);
