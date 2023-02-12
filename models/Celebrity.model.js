const { Schema, model } = require('mongoose')


const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    },
    {
        timesstamps: true
    }
)



module.exports = model('celebrity', celebritySchema)
