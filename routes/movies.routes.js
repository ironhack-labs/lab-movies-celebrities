// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model')

// all your routes here

//GET route to show a form to create a movie
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then(celebrityFromDB => {
            res.render('movies/new-movie', {celebrityFromDB})
        })
        .catch(err => {
            console.log('Error passing celebrities on movies create form: ', err)
        })
})

//POST Send data from the form to this route to create the movie and save it to the database
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({title, genre, plot, cast})
        .then(movieFromDB => {
            console.log(`New movie created: ${movieFromDB}`)
            res.redirect('/movies')
        })
        .catch(err => {
            console.log('Error creating a movie: ', err)
            res.render('movies/new-movie');
        })
})

//GET route for /movies
router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(allMovies => {
            res.render('movies/movies', { allMovies })
        })
        .catch(err => {
            console.log('Error listing movies: ', err)
            next(err)
        })
})

// GET route to see details of each movie
router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params
    Movie.findById(id).populate('cast')
        .then(movie => {
            console.log('movie from movies/:id route:', movie)
            res.render('movies/movie-details', {movie})
        })
        .catch(err => {
            console.log('Error displaying movie details: ', err)
            next(err)
        })
})

//POST delete a movie
router.post('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Movie.findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => {
            console.log('Error deleting a movie: ', err)
            next(err)
        })
})

//GET route to update a movie
router.get('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Movie.findById(id)
        .then((movie) => {
            Celebrity.find()
                .then((celebrities) => {
                    res.render('movies/edit-movie.hbs', {movie, celebrities})
                })
                .catch(err => console.log(err))
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

//POST route to update a movie
router.post('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params;
    const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(id, {title, genre, plot, cast}, {new:true})
        .then((updatedMovie) => {
            console.log('updated movie: ', updatedMovie)
            res.redirect(`/movies/${updatedMovie._id}`)})
        .catch(err => next(err))
        })


module.exports = router;