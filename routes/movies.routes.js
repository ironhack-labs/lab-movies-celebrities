// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')
// all your routes here

router.get('/create-movie/', (req, res, next) =>{
    Celebrity.find()
    .then(allCeleb => {
        res.render('movies/new-movie', { allCeleb } )
    })

})

router.post("/create-movie", (req, res, next) =>{
    const { title, genre, plot, cast } = req.body
    Movie.create({title, genre, plot, cast})
    .then(() => res.redirect('/movies'))
    .catch((error) => next(error))
})

router.get("/movies/", (req, res, next) => {
    Movie.find()
    .populate('_id')
    .then(allMovies => {
        res.render("../views/movies/movies.hbs", {movie: allMovies})
    })
   
})

router.get("/movies/:id", (req, res, next) => {
    const { movieId } = req.params
    Movie.findById(movieId).then(movie => {
        res.render('../views/movies/movie-details.hbs', {movie: movie})
    })
})

module.exports = router;