const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model');
const { populate } = require('../models/Movie.model');


router.get('/movies/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log(err))

});

router.post('/movies/create', (req, res, next) => {
    // console.log(req.body)
    const { title, genre, plot, cast } = req.body
    console.log(req.body)
    const celeb = [cast]
    Movie

        .create({ title, genre, plot, cast: celeb })
        .then(() => {
            res.redirect(`/movies`)
        })
        .catch(err => console.log(err))

})

router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .populate('cast')
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
});

module.exports = router;

router.get('/movies', (req, res) => {

    Movie
        .find()
        .then(moviesFromDB => {
            console.log({ movies: moviesFromDB })
            res.render('movies', { movies: moviesFromDB })
        })
        .catch(err => console.log(err))
})


router.get('/movies/movie-details/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })

        .catch(err => console.log(err))
})

router.post('/movies/:movie_id/delete', (req, res, next) => {
    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
});

router.get('/movies/:movie_id/edit', (req, res, next) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => {
            res.render('movies/edit-movie', movie)
        })
        .catch(err => console.log(err))
});

router.post('/movies/:movie_id/edit', (req, res, next) => {

    const { title, genre, plot, cast: celeb } = req.body
    const { movie_id } = req.params

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast: celeb })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
});


module.exports = router;




