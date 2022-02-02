// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrities = require('../models/Celebrity.model')

router.get('/create', (req, res, next) => {
   Celebrities.find()
    .then((celebrities) => {
        res.render('movies/new-movie', {celebrities})
    })
    .catch((e)=> next(e))
})

router.post('/create', (req, res, next) => {
    Movie.create(req.body)
        .then((movies) => res.redirect('/movies'))
})

router.get('/', (req, res, next) => {
    Movie.find()
        
        .then((movies) => {
            res.render('movies/movies', { movies })
        })
        .catch((e) => next(e))
})

router.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then((movie) => {
            console.log(movie)
            res.render('movies/movie-details', { movie })
        }).catch((e) => next(e))
})

module.exports = router;