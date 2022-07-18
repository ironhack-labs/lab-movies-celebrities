const router = require("express").Router();

const Celeb = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

router.get("/movies/create", (req, res) => {
	Celeb.find({})
		.then((movies) => {
			res.render("movies/new-movie.hbs", { movies: movies });
		})
		.catch((err) => {
			console.log("something went wrong ====>", err);
		});
});

router.post("/movies/create", (req, res) => {
	const { title, genre, plot, cast } = req.body;

	Movie.create({
		title,
		genre,
		plot,
		cast,
	})
		.then(() => res.redirect("/movies"))
		.catch((err) => console.log("something went wrong ===>", err));
});

router.get("/movies", (req, res) => {
	Movie.find({})
		.then((movies) => {
			res.render("movies/movies.hbs", { movies: movies });
		})
		.catch((err) => console.log("something went wrong ===>", err));
});

router.get("/movies/movie-details/:id", (req, res) => {
	const movieId = req.params.id;

	Movie.findById(movieId)
		.populate("cast")
		.then((movie) => res.render("movies/movie-details.hbs", movie))
		.catch((err) => console.log("something went wrong ===>", err));
});

router.post("/movies/:id/delete", (req, res) => {
	const movieId = req.params.id;

	Movie.findByIdAndRemove(movieId)
		.then(() => res.redirect("/movies"))
		.catch((err) => console.log("something went wrong ===>", err));
});

router.get("/movies/:id/edit", (req, res) => {
	const movieId = req.params.id;

	Movie.findById(movieId).then((movie) => {
		Celeb.find({}).then((celebs) => {
			res.render("movies/edit-movie.hbs", movie, celebs);
		});
	});
});

module.exports = router;
