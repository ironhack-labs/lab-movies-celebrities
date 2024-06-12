
const { Schema, model } = require("mongoose")

const celebritySchema = new Schema({
    name: String,
    ocupation: String,
    catchPhrase: String
})
module.exports = model("Celebrity", celebritySchema)
