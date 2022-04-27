const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        celebrity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Celebrity"
        },
    }
);


const Movie = model("Movie", movieSchema);

module.exports = Movie;