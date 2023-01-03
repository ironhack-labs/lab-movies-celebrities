const router = require("express").Router();

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    }
);
module.exports = mongoose.model("Celebrity", celebritySchema)

//module.exports = router
 