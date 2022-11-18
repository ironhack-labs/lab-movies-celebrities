//  Add your code here
const { Schema, model } = require('mongoose');

const celebritiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
        type: String,
    },
    catchPhrase: {
        type: String,
        required: true,
     }
  },
);

module.exports = model('Celebrity', celebritiesSchema);