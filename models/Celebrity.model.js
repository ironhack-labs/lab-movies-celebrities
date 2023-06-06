//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Celebrities', celebritySchema);
