
const Celebrity = require('../models/Celebrity.model');
const { Schema, model } = require("mongoose");


const MoviesSchema = new Schema (
  {
    title: {
      type: String,
    },
    genre: {
      type: String,
    }, 
    plot: {
        type: String, 
    }, 
    cast: [{
        type: Schema.Types.ObjectId, 
        ref: "Celebrity", 
    }]
  });

const Movie = model("Movie", MoviesSchema );

module.exports = Movie; 