//  Add your code here
const { Schema, model } = require('mongoose')
const celebSchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String,
        photo: String
    },
    {
        timestamps: true
    }
)

module.exports = model('Celebrity', celebSchema)
