//  Add your code here
const { mongoose, Schema, model } = require('mongoose');

const movieSchema = new Schema({
	title: String,
	genre: String,
	plot: String,
	cast: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Celebrity',
	},
});

const Movie = model('Movies', movieSchema);

module.exports = Movie;
