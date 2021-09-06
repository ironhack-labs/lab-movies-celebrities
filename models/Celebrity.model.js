//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema (
    {
        name: String,
        occupation: {type: String, default: 'unknown'},
        catchPhrase: {type: String, required: true}
    }
);

module.exports = model('Celebrity', celebritySchema);