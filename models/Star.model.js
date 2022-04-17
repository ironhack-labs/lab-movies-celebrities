const { Schema, model } = require('mongoose');

const starSchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    },
    { timestamps: true }
)

module.exports = model('Star', starSchema)