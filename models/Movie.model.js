const mongoose = require("mongoose")

const Schema = mongoose.Schema

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
},{versionkey: false, timestamps: true}
)

const Movie = mongoose.model("Model", movieSchema)

module.exports = Movie