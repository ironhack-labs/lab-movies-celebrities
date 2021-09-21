/** @format */

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res, next) => {
	Celebrity.find()
		.then((celebritiesFromDB) => {
			res.render("movies/new-movie", { celebritiesFromDB });
		})
		.catch((err) =>
			console.log("Error displaying the form to create a movie.", err),
		);
});
router.post("/create", (req, res, next) => {
	const { title, genre, plot, cast } = req.body;

	Movie.create({ title, genre, plot, cast })
		.then(() => {
			res.redirect("/movies");
		})
		.catch((err) => {
			console.log("Error creating a new Movie", err);
			res.render("movies/new-movie");
		});
});

router.get("/", (req, res, next) => {
	Movie.find()
		.then((allmovies) => {
			console.log(allmovies);
			res.render("movies/movies", { movies: allmovies });
		})
		.catch((err) => {
			console.log(" Cannot read a movie", err);
		});
});

module.exports = router;
