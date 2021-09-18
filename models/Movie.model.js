/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = Schema({
	title: String,
	genre: String,
	plot: String,
	cast: [
		{
			type: mongoose.Schema.Types.Array,
			ref: "Celebrity",
		},
	],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
