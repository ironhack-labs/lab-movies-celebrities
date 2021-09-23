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

//CREATE a new Movie

router.post("/create", (req, res, next) => {
	const { title, genre, plot, cast } = req.body;

	Movie.create(req.body)
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

// MOVIE DETAILS PAGE ROUTER

router.get("/:id", (req, res, next) => {
	Movie.findById(req.params.id)
		.populate("cast")
		.then((movieDetail) => {
			res.render("movies/movie-details", { movieDetail });
		})
		.catch((err) => console.log("Error displaying movie details: ", err));
});

// DELETING A MOVIE

router.post("/:id/delete", (req, res) => {
	Movie.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect("/movies");
		})
		.catch((err) => console.log("Error deleting the movie: ", err));
});

// EDITING A MOVIE
// This retrieves wich movie we want to EDIT with a prefilled form.

router.get("/:id/edit", (req, res, next) => {
	Movie.findById(req.params.id)
		.populate("cast")
		.then((movieToEdit) => {
			console.log(movieToEdit);
			res.render("movies/edit-movie", { movie: movieToEdit });
		})
		.catch((error) => next(error));
});

// router.get("/:id/edit", (req, res) => {
// 	Movie.findById(req.params.id)
// 		.populate("cast")
// 		.then((movieFounded) => {
// 			res.render("movies/edit-movie", { movieFound: movieFounded });
// 		});
// });
// router.get("/:id/edit ", (req, res, next) => {
// 	Movie.findById(req.params.id)
// 		.then((movieFounded) => {
// 			Celebrity.find({ name }).then((allCelebs) => {
// 				res.render("movies/edit-movie", {
// 					movieFound: movieFounded,
// 					allCelebs,
// 				});
// 			});
// 		})
// 		.catch((err) => console.log("Error deleting the movie: ", err));
// });

// UPDATE THE MOVIE
// This send the new data form to the DATABASE and UPDATE the old one. It doesn't create a new one, JUST UPDATE.

router.post("/:id/edit", (req, res, next) => {
	// const { id } = req.params;
	const { title, genre, plot, cast } = req.body;

	Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((updatedMovie) => res.redirect(`/movies/${updatedMovie.id}`))
		.catch((error) => next(error));
});

module.exports = router;
