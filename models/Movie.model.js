const mongoose = require('mongoose');
const celebModel = require('./Celebrity.model');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
});

const movieModel = mongoose.model("movieModel", movieSchema)
module.exports = movieModel