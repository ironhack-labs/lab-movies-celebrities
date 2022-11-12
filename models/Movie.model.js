const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");
const movieSchema = new mongoose.Schema([
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        plot: {
            type: String,
            required: true
        },
        /*   cast: [{
              type: mongoose.Types.ObjectId,
              ref: 'Celebrity',
              required: true
          }] */
    }
])
const Movie = model("movie", movieSchema);

module.exports = Movie;
