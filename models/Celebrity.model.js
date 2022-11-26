//  Add your code here
const { Schema, model } = require('mongoose');

const celebritiesSchema = new Schema({
  name: String,
  description: String,
  catchPhrase: String
  },
  {
    timestamps: true,
  }
);

module.exports = model(celebritiesSchema);