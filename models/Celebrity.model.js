const { Schema, model } = require('mongoose')

const celebritySchema = new Schema({
    name: { required: true, type: String },
    occupation: { required: true, type: String },
    catchPhrase: { required: true, type: String },
},
    { timestamps: true }
)

const Celebrity = model('Celebrity', celebritySchema)
module.exports = Celebrity
