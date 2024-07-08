// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here
router.get('/movies/create', async (req, res) => {
    const allCelebrities = await Celebrity.find()
    console.log("all the celebrities", allCelebrities)
    res.render("movies/new-movie", { allCelebrities })
})
router.get('/movies', async (req, res) => {
    const movieList = await Movie.find().populate('cast')
    res.render('movies/movies', { movieList })
})
router.get('/movies/:id', async (req, res) => {
    const movieId = await req.params.id
    const movieDetails = await Movie.findById(movieId).populate('cast')
    res.render('movies/movie-details', { movieDetails })
})
router.post('/movies/create', async (req, res) => {
    const newMovie = await Movie.create(req.body)
    res.redirect('/movies')
    console.log("new movie created", newMovie)
})
module.exports = router;