const mongoose = require("mongoose")

const Schema = mongoose.Schema

const celebritySchema = new Schema({

    name: String,
    ocuppation: String,
    catchPhrase: String,
})

const celebrity  = mongoose.model("celebrity", celebritySchema)

module.exports = celebrity