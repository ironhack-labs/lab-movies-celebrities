//  Add your code here
const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [mongoose.Types.ObjectId]
});


const Movie = model("Movie", movieSchema);

module.exports = Movie;