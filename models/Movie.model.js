const { mongoose, Schema, model } = require('mongoose');

const movieSchema = new Schema({
	Title: String,
	Genre: String,
	Plot: String,
	Cast: String,
});

const movie = model('movie', movieSchema);

module.exports = movie;
