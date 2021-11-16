const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const celebritySchema = new Schema ({
    name: { type: String },
    occupation: { type: String },
    cathcPhrase: { type: String } 
})

module.exports = mongoose.model("Celebrity", celebritySchema)