const mongoose = require("mongoose");
const Schema = mongoose.Schema

const moviesSchema = new Schema({
    name: String
})

const Movies = mongoose.model("Movie", moviesSchema)
module.exports = Movies