const mongoose = require("mongoose")
const Schema = mongoose.Schema

const { Schema, model } = require("mongoose")
const movieSchema = new Schema({
  title: String,
    unique: true,
  genre: String,
  plot: String,
  cast: [String]
  
  
 }) 

timestamps: true

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie