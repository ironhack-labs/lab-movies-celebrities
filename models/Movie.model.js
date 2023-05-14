//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: true},
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }] // Según entiendo ha de ser un array porque deberíamos poder tener más de una celebrity vinculadas a cada movie
})

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie