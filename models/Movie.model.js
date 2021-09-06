const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema({
	title: {
		unique: true,
		type: String,
		trim: true,
	},

	genre: {
		type: String,
	},

	plot: {
		type: String,
	},

	cast: [{
		type: Schema.Types.ObjectId,
		ref: "CelebrityModel",
	}, ],
});

const newMovie = mongoose.model("MovieModel", movieSchema);

module.exports = newMovie;