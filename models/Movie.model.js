const { Schema, model } = require("mongoose");
require("../models/Movie.model")

const movieSchema = new Schema({
        title: String, 
        genre: String, 
        plot: String,
        cast : {
        ref: "celebrity",
        type: [Schema.Types.ObjectId]
    }
});
const MovieModel = model("movie", movieSchema);

module.exports = MovieModel;