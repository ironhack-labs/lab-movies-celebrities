
const { Schema, model } = require('mongoose')

const celebritySchema = new Schema({
    name: {
        type: String,
        unique: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },
    occupation: String,
    catchPhrase: String,

},
    {
        timestamps: true
    }

)
const Celebrity = model('celebrity', celebritySchema)
module.exports = Celebrity