//  Add your code here
const {Schema, model} = require('mongoose');

const celebritySchema = new Schema(
    {
        name: String,
        surname: String,
        occupation: {

            type: String,
            enum: ['actor', 'singer', 'comedian'],
            default: 'unknown'
        },
        catchPhrase: String

    }
);

module.exports = model('Celebrity',celebritySchema);