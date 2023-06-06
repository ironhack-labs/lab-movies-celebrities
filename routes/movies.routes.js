// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model")

// CREATE: display form
router.get("/movies/create", (req, res, next) => {
	CelebrityModel.find()
		.then(celebrities => {
			res.render("movies/new-movie", {celebrities})
		})
		.catch(e => next(e))
})

// CREATE: process form
router.post("/movies/create", (req, res, next) => {
	const {title, genre, plot, cast} = req.body
	MovieModel.create({title, genre, plot, cast})
		.then(movie => {
			res.redirect("/movies")
		})
		.catch(e => next(e))
})

// READ: list movies
router.get("/movies/", (req, res, next) => {
	MovieModel.find()
		.then(movies => {
			res.render("movies/movies", {movies})
		})
		.catch(e => next(e))
})

// READ: display details of one movie
router.get("/movies/:id", (req, res, next) => {
	MovieModel.findById(req.params.id)
		.populate("cast")
		.then(movie => {
			res.render("movies/movie-details", movie)
		})
		.catch(e => next(e))
})

// DELETE: process form
router.post("/movies/:id/delete", (req, res, next) => {
	MovieModel.findByIdAndDelete(req.params.id)
		.then(movie => {
			res.redirect("/movies")
		})
		.catch(e => next(e))
})

// UPDATE: display form
router.get("/movies/:id/edit", (req, res, next) => {
	let movie;
	MovieModel.findById(req.params.id)
		.then(movieFromDB => {
			movie = movieFromDB
			return CelebrityModel.find()
		})
		.then(celebritiesFromDB => {
			const celebrities = []
			celebritiesFromDB.forEach(celebrity => {
				const celebrityCopy = {...celebrity}._doc
				if (movie.cast.includes(celebrity._id)) celebrityCopy.selected = "selected"
				else celebrityCopy.selected = ""
				celebrities.push(celebrityCopy)
			})
			console.log(celebrities)
			res.render("movies/edit-movie", {movie, celebrities})
		})
		.catch(e => next(e))
})

// UPDATE: process form
router.post("/movies/:id", (req, res, next) => {
	// const {title, genre, plot, cast} = req.body
	// MovieModel.findByIdAndUpdate(req.params.id, {title, genre, plot, cast}, {new: true})
	MovieModel.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
		.then(movie => {
			res.redirect("/movies/" + req.params.id)
		})
		.catch(e => next(e))
})

module.exports = router;