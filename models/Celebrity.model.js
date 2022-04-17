const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String,

    },
    { timestamos: true }
)

module.exports = model('Celebrity', celebritySchema)