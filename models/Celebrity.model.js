const { Schema, model } = require('mongoose')

const celebSchema = new Schema(
    {
        name: String,
        occupation: Number,
        catchPhrase: String
    },
    {
        timestamps: true
    }
)

module.exports = model('Celebrity', celebSchema)