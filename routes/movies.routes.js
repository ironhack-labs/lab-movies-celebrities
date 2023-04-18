// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/movies.model')

// all your routes here
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render('movies/new-movie', { celebrities })
    })
    .catch(err => next(err))
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } =req.body
    Movie.create({ title, genre, plot, cast })
    .then(createdMovies => {
        console.log(createdMovies)
        res.redirect('/movies')
    })
    .catch(err => {
        console.log(err)
    })
        //res.render('movies/new-movie'))
})

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(moviesFromDB => {
        console.log(moviesFromDB)
        res.render('movies/movies', { movies: moviesFromDB })
    })
    .catch(err => next(err))
})

router.get('/movies/:id', (req, res, next) => {

    const movieId = req.params.id
    
    Movie.findById(movieId)
    .populate('cast')
    .then(moviesFromDB => {
        console.log(moviesFromDB)
        res.render('movies/movie-details', { movies: moviesFromDB })
    })
    .catch(err => next(err))
})

router.post('/movies/:id/delete', (req, res, next) => {
    
    const movieId = req.params.id
    
    Movie.findByIdAndRemove(movieId)
    .then(moviesFromDB => {
        console.log(moviesFromDB)
        res.render('movies/movies', { movies: moviesFromDB })
    })
    .catch(err => next(err))
})


//GOT A TAKE A BREAK

// router.get('/movies/:id/edit', (req, res, next) => {
    
//     const movieId = req.params.id

//     Movie.findById(movieId)
//     .then(res.render(movies/edit-movie))
//     .catch(err => next(err))

//     Celebrity.find('cast')
// })

module.exports = router;