// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movies.model")
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then(MoviesFromDB => {
        res.render("movies/movies", {movies: MoviesFromDB});
    })
    .catch(err => next(err))
})

router.get("/movies/create", (req, res, next) => {
	
	Celebrity.find()
		.then(celebritiesFromDB => {
			res.render("movies/new-movie", { cast: celebritiesFromDB})
		})
		.catch(err => next(err))
    })
    
    router.post("/movies/create", (req, res, next) => {
        const {title, genre, plot, cast} = req.body
        
    Movie.create({title, genre, plot, cast})
    .then(createdMovie => {
        res.redirect("/movies")
    })
    .catch(err => next(err))
})

//NOT FINISHED
router.get("/movies/:id", (req, res, next) => {
    const movieId = req.params.id
    
    Movie.findById(movieId)
    .populate("cast")
    .then(MovieFromDB => {
        res.render("movies/movie-details", {movie: MovieFromDB})
    })
    .catch(err => next(err))
})

router.post("/movies/:id/delete", (req, res, next) => {
    const movieId = req.params.id
    Movie.findByIdAndDelete(movieId)
    .then(() => {
        res.redirect("/movies")
    })
    .catch(err => next(err))
})

router.get("/movies/:id/edit", (req, res, next) => {
    const movieId = req.params.id
    Movie.findById(movieId)
    Celebrity.find()
    .then(() => {
        res.render("movies/edit-movie")
    })
})


module.exports = router;