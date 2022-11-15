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

const Celebrity = model('Celebrity', celebritiesSchema);

module.exports = Celebrity;