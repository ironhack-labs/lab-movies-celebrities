const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const movieSchema = new Schema(
    {
        title: {type: String, required: true, unique: true},
        genre: {type: String, required: true},
        plot: {type: String, required: true},
        cast: [{type: Schema.Types.ObjectId, ref : "Celebrity", default: []}]
    }
)

const Movie = model("Movie", movieSchema);
module.exports = Movie;
