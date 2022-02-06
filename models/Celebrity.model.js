const { Schema, model } = require('mongoose')

const celebSchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    },
    {
        timestamps= true
    }
)

module.exports = model('Celebtrity', celebSchema)