const router = require("express").Router();

const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get('/create', async(req, res)=>{
    const celebrities = await Celebrity.find()
    res.render("movies/new-movie", {celebrities})
})

router.post('/create', async(req, res)=>{
    const newMovie = req.body
    await Movie.create(newMovie)
    res.redirect("/movies/movies")
})

router.get('/movies', async(req, res)=>{
    const movies = await Movie.find()
    res.render('movies/movies', {movies})
})

router.get('/:movieId', async(req, res)=>{
    const movieId = req.params.movieId
    const movie = await Movie.findById(movieId).populate("cast")
    res.render("movies/movie-details", {movie})
})

router.post('/:movieId/delete', async(req, res)=>{
    const movieId = req.params.movieId
    await Movie.findByIdAndDelete(movieId)
    res.redirect("/movies/movies")
})


router.get('/:movieId/edit', async(req, res)=>{
    const movieId = req.params.movieId
    
    const movie = await Movie.findById(movieId).populate("cast")
    const celebrities = await Celebrity.find()   
    res.render('movies/edit-movie', {movie, celebrities})
})

router.post('/:movieId/edit', async(req, res)=>{
    const movieId = req.params.movieId
    const updatedMovieDetails = req.body
    await Movie.findByIdAndUpdate(movieId, updatedMovieDetails)
    
    res.redirect(`/movies/${movieId}`)
    
})

module.exports = router;