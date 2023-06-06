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
})

// READ: list movies
router.get("/movies/", (req, res, next) => {
	MovieModel.find()
		.then(movies => {
			console.log(movies)
			res.render("movies/movies", {movies})
		})
		.catch(e => next(e))
})

module.exports = router;