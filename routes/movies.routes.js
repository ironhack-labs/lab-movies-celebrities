const router = require("express").Router();

const Movie = require("./../models/Movie.model");
const Celebrity = require("./../models/Celebrity.model");

// Movies list
router.get("/", (req, res) => {
	Movie.find()
		.populate("cast")
		.then((movies) => {
			res.render("movies/movies", { movies });
		})
		.catch((err) => console.log(err));
});

// Movies creation
router.get("/create", (req, res) => {
	Celebrity.find()
		.then((celebrities) => {
			res.render("movies/new-movie", { celebrities });
		})
		.catch((err) => console.log(err));
});

router.post("/create", (req, res) => {
	const { title, genre, plot, cast } = req.body;

	Movie.create({ title, genre, plot, cast })
		.then(() => {
			res.redirect("/movies");
		})
		.catch((err) => console.log(err));
});

// Movies details
router.get("/:movie_id", (req, res) => {
	const { movie_id } = req.params;

	Movie.findById(movie_id)
		.populate("cast")
		.then((movie) => {
			res.render("movies/movie-details", movie);
		})
		.catch((err) => console.log(err));
});

// Movies deletion
router.post("/:movie_id/delete", (req, res) => {
	const { movie_id } = req.params;

	Movie.findByIdAndRemove(movie_id)
		.then(() => res.redirect("/movies"))
		.catch((err) => console.log(err));
});

// Movies edit
router.get("/:movie_id/edit", (req, res) => {
	const { movie_id } = req.params;

	let movieToEdit;
	let celebFromMovie;
	let filteredCelebs;

	Movie.findById(movie_id)
		.populate("cast")
		.then((movie) => {
			movieToEdit = movie;
			// console.log(movieToEdit);
			return Celebrity.find().select({ name: 1 });
		})
		.then((celebrities) => {
			celebFromMovie = celebrities;
			res.render("movies/edit-movie", { movieToEdit, celebFromMovie });
			// console.log(celebFromMovie);
		})
		.catch((err) => console.log(err));

	/* Movie.findById(movie_id)
		.then((movie) => {
			Celebrity.find()
				.then((celebrities) => {
					res.render("movies/edit-movie", { movie, celebrities });
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err)); */
});

router.post("/:movie_id/edit", (req, res) => {
	const { movie_id } = req.params;
	const { title, genre, plot, cast } = req.body;

	Movie.findByIdAndUpdate(movie_id, { title, genre, plot, cast })
		.then(() => {
			res.redirect("/movies");
		})
		.catch((err) => console.log(err));
});

module.exports = router;
