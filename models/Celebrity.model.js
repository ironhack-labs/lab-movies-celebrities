const mongoose = require("mongoose")

const Schema = mongoose.Schema

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
  },{versionkey: false, timestamps: true}
)

const Celebrity = mongoose.model("Celebrity", celebritySchema)

module.exports = Celebrity
