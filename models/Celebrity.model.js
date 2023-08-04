//  Add your code here

const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    occupation: String,
    catchPhrase: String,
  }
);

module.exports = model('Celebrity', celebritySchema)
