//  Add your code here
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const celebritiesSchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String

}, {
    timestamps: true
})

const Celebrity = mongoose.model("Celebrity", celebritiesSchema)

module.exports = Celebrity