const { Schema, model } = require('mongoose');

const celebritiesSchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    }
)

const Celebrity = model('Celebrity', celebritiesSchema);

module.exports = Celebrity;