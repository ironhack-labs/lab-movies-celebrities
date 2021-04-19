const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: {type: Array, default: [
        {name: 'Will Smith', occupation: 'actor', catchPhrase: 'Aliquam est velit.'}, 
        {name: 'Jessica Alba', occupation: 'actress', catchPhrase: 'Lorem ipsum dolor sit.'}
    ]},
  },
  {
    version: false,
    timestamps: true,
  }
);

module.exports = model("Movie", movieSchema);
