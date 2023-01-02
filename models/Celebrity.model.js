const router = require("express").Router();

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const celebritiesSchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
})
module.exports = mongoose.model("Celebrities",celebritiesSchema)

module.exports = router
