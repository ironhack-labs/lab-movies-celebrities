const router = require('express').Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
        .then(allCelebrities => {
            res.render('movies/new-movie', { celebrities: allCelebrities })
        })
        .catch(error => console.log('Error while retrieving the celebrities from the DB: ', error))
})

router.post('/movies/create', (req, res, next) => {
    Movie.create(req.body)
        .then(() => res.redirect('/movies'))
        .catch(error => console.log('Error while creating new movie: ', error))
})

router.get('/movies', (req, res, next) => {
    Movie.find()
        .populate('cast')
        .then(allMovies => {
            res.render('movies/movies', { movies: allMovies })
        })
        .catch(error => console.log('Error while retrieving the movies', error))
})  

router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then(movieFound => {
            res.render('movies/movie-details', { movie: movieFound })
        })
        .catch(error => console.log('Error while retrieving the movie: ', error))
})

router.get('/movies/:id/edit', (req, res, next) => {
    Celebrity.find()
        .then(allCelebrities => {
            Movie.findById(req.params.id)
                .then(movieFound => {
                    res.render('movies/edit-movie', { celebrities: allCelebrities, movie: movieFound })
                })
                .catch(error => console.log('Error while retrieving the movie: ', error))  
        })
        .catch(error => console.log('Error while retrieving the celebs: ', error))
})

router.post('/movies/:id/edit', (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect('/movies'))
    .catch(error => console.log('Error while updating the movie: ', error))
})

router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(res.redirect('movies/movies'))
        .catch(error => console.log('Error while deleting the movie: ', error))
})

module.exports = router