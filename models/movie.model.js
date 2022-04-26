//  Add your code here
const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");
const Movie = require("./movie.model");

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Celebrity"
            }
        ]
    }
)



const movie = model("movie", movieSchema);

module.exports = movie;
