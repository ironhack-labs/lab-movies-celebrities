const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = new Schema(
    {
    title: String,
    genre: String,
    plot: String,
    // cast: [{type: Schema.Types.ObjectId, ref: "celebrities"}]
},
{
    timestamps: true}
)

const MovieModel = mongoose.model("movies", movieSchema);
module.exports = MovieModel;