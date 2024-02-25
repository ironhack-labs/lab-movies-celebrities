const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Celebrity = require("../models/celebrity.model");

const movieSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minLength: [2, "Title needs at least 2 chars"]
        },
        genre: {
            type: String,
            required: [true, "Genre is required"],
            minLength: [2, "Genre needs at least 2 chars"]
        },
        plot: {
            type: String
        },
        cast: {
            type: [Celebrity.id]
        }
    },
    { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;