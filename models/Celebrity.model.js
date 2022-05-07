//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema({
    name: {
        type: String,
        required: true
      },
    occupation: String,
    catchPhrase: String
});

const Celebrity = model('Celebrity', celebritySchema);

module.exports = Celebrity;