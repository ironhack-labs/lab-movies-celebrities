const mongoose = require('mongoose')

const Schema = mongoose.Schema

const celebritySchema = new Schema({
    name: { required: true, type: String },
    occupation: { required: true, type: String },
    catchPhrase: { required: true, type: String },
},
    { timestamps: true }
)

const Celebrity = mongoose.model('Celebrity', celebritySchema)

module.exports = Celebrity
