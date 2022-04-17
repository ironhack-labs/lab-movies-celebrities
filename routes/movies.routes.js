const express = require('express');
const router = express.Router();

const Movie = require('./../models/Movie.model')
const Star = require('./../models/Star.model')


// all your routes here
router.get('/movies/create', (req, res) => {
    Star
        .find()
        .then(stars => {
            res.render('movies/new-movie', { stars })
        })
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
});

router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')                                     // nombre del campo que contiene el/los ObjectIDs
        .then(movies => {
            res.render('movies/movie-details', movies)
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res, next) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

});

router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(movies => {
            Star
                .find()
                .then(stars => {

                    res.render('movies/edit-movie', { movies, stars })
                })
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


module.exports = router;