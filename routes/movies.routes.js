const router = require("express").Router()
const Movie = require("../models/Movie.model.js")
const Celebrity = require("../models/Celebrity.model.js")

router.get("/movies/create", (req, res) => {
	Celebrity.find().then((allCelebrities) => {
		res.render("movies/new-movie", { celebrities: allCelebrities })
	})
})

router.post("/movies/create", (req, res) => {
	const { title, genre, plot, cast } = req.body

	Movie.create({ title, genre, plot, cast })
		.then(() => {
			res.redirect("/movies")
		})
		.catch((error) => {
			console.log(error)
		})
})

router.get("/movies", (req, res) => {
	Movie.find()
		.then((allMovies) => {
			// res.send(allMovies)
			res.render("movies/movies.hbs", { movies: allMovies })
		})
		.catch((error) => {
			console.log(error)
		})
})

router.get("/movies/:id", (req, res) => {
	const { id } = req.params

	Movie.findById(id)
		.populate("cast")
		.then((thisMovie) => {
			// res.send(thisMovie)
			res.render("movies/movie-details", thisMovie)
		})
		.catch((error) => {
			console.log(error)
		})
})

router.post("/movies/:id/delete", (req, res) => {
	Movie.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect("/movies")
		})

		.catch((error) => {
			console.log(error)
		})
})

module.exports = router
