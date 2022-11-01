const { Schema, model } = require("mongoose")

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{ type: Schema.Types.ObjectId, ref: "Cast" }]
    }
);


const Movie = model("Model", movieSchema)

module.exports = Movie;