const { Schema, model } = require('mongoose')

const celebritySchema = new Schema ({
    name: String,
    occupation: {
        type: String,
    },
    catchPhrase: String,
}, {
    timestamps: true
})

const Celebrity = model('Celebrity', celebritySchema)
module.exports = Celebrity

