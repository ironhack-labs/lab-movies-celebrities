//  Add your code here
// models/User.js

const {Schema, model} = require('mongoose');

const celebritiesSchema = new Schema(
  {
    name: { type: String,
            require: true,
        },
    occupation: String,
    catchPhrase: String,
    }
);

const Celebrities = model('Celebrities', celebritiesSchema);

module.exports = Celebrities;

