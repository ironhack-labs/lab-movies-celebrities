/** @format */

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");

// all your routes here
router.get("/create", (req, res, next) => {
	res.render("movies/new-movie");
});
router.post("/create", (req, res, next) => {
	const { title, genre, plot, cast } = req.body;

	Movie.create({ title, genre, plot, cast })
		.then((createdMovie) => {
			console.log(createdMovie);
			res.redirect("/movies");
		})
		.catch((error) => {
			console.log("Error creating a new Movie", error);
			res.render("movies/new-movie");
		});
});
module.exports = router;
