const { format } = require('morgan');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const router = require('express').Router();


// Movies List

router.get('', (req, res) => {
    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})

// Movies Form

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrityInfo => res.render('movies/new-movie', { celebrityInfo }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(celebrity => res.redirect(`/movies`))
        .catch(err => console.log(err))
})

// Movie details

router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(selectedMovie => {
            res.render('movies/movie-details', selectedMovie)
        })
        .catch(err => console.log(err))
})

// Movie delete

router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})





module.exports = router;