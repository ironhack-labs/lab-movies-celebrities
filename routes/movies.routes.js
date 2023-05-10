// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require celebrity Model
const Movie = require("../models/Movie.model.js");

// all your routes here

// GET route to display the form to create movie
router.get("/movies/create", (req, res) => {
	res.render("movies/new-movie.hbs");
});

// POST route to save a new movie to the database
router.post("/movies/create", (req, res) => {
	console.log(req.body); // direct connection between client and server

	// destructuring the req.body object
	const { title, genre, plot, cast } = req.body;

	async function createMovieInDb() {
		try {
			// creating the movie in Db
			let createdMovie = await Movie.create({
				title,
				genre,
				plot,
                cast,
			});

			// feedback regarding the movie created in Db
			console.log(`New movie created: ${createdMovie.name}`);

			// redirects to movies page once book is created
			res.redirect("/movies");
		} catch (error) {
			console.log(error);
            res.redirect("movies/new-movie.hbs")
		}
	}
	createMovieInDb();
});

// GET route to retrieve and display all the movies
router.get("/movies", (req, res) => {
	async function findAllMoviesFromDb() {
		try {
			// Find all the celebrities inside the collection
			let allMovies = await Movie.find();

			// Feedback regarding to found books
			console.log("Retrieved movies from DB:", allMovies);

			// Render all books from DB with HBS view
			res.render("movies/movies.hbs", { movies: allMovies });
		} catch (error) {
			console.log(error);
		}
	}
	findAllMoviesFromDb();
});

// GET route to retrieve and display details of a specific movie
router.get("/movies/:movieId", (req, res) => {
	// destructuring the req.params.bookId
	const { movieId } = req.params;

	// feedback regarding to req.params.movieId
	console.log("The Id from the URL is:", movieId);

	async function findMovieFromDb() {
		try {
			// finding the movie by the id
			let foundMovie = await Movie.findById(movieId);

			await foundMovie.populate("cast");

			// feedback regarding the found movie
			console.log(foundMovie);

			// render into movie-details hbs page
			res.render("movies/movie-details.hbs", { movie: foundMovie });
		} catch (error) {
			console.log(error);
		}
	}
	findMovieFromDb();
});

router.post("/movies/:movieId/delete", (req, res) => {
    // :id is refering to review's id
      const { movieId } = req.params;

      async function deleteAMovieFromDb() {
		try {
			let deletedMovie = await Movie.findByIdAndRemove(movieId);
			res.redirect("/movies");
		} catch (error) {
			console.log(error);
		}
	}
	deleteAMovieFromDb();
});

// GET route to display the form to update a specific movie
router.get("/movies/:movieId/edit", (req, res) => {
	// destructuring the req.params.bookId object
	const { movieId } = req.params;

	// feedback regarding req.params.bookId
	console.log(movieId);

	async function findInfoFromMovie() {
		try {
			// get info of the movie we want to edit
			let movieToEdit = await Movie.findById(movieId);

			// render
			res.render("movies/edit-movie.hbs", { movie: movieToEdit });
		} catch (error) {
			console.log(error);
		}
	}
	findInfoFromMovie();
});

// POST route to actually make updates
router.post("movies/movieId/edit", (req, res) => {
	// destructuring the req.params.movieId
	const { movieId } = req.params;

	const { title, genre, plot, cast } = req.body;

	async function updateMovieFromDb() {
		try {
			let updatedMovie = await Movie.findByIdAndUpdate(
				movieId,
				{ title, genre, plot, cast },
				{ new: true }
			);
			// new retrieves updated version of object
			res.redirect(`/movies/${updatedMovie._id}`);
		} catch (error) {
			console.log(error);
		}
	}
	updateMovieFromDb();
});


module.exports = router;