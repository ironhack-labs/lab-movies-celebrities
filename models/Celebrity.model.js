//  Add your code here
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const celebritySchema = new Schema({
    name: String,
    ocupation: String,
    catchPhrase: String
})

const Celebrity = mongoose.model('Celebrity', celebritySchema)
module.exports = Celebrity