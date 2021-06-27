const mongoose = require("mongoose")

const celebritySchema = new mongoose.Schema({
    name: String,
    ocupattion: String,
    catchPhrase: String,

}, {
    timestamps: true
})

const Celebrity = mongoose.model("Celebrity", celebritySchema)

module.exports = Celebrity
