// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .then(celeb => {
            res.render('movies/new-movie', { celeb })
        })
        .catch(e => console.log(e))
});

router.post('/movies/create', (req, res) => {
    let { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(res.redirect('/movies'))
        .catch(e => console.log(e))

});

router.get('/movies', (req, res) => {

    Movie
        .find()
        .then(movie => res.render('movies/movies', { movie }))
        .catch(e => console.log(e))
});

// MOVIE DETAILS

router.get('/movies/:movie_id', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => {
            console.log(movie)
            res.render('movies/movie-details', movie)
        })
        .catch(e => console.log(e))
});


// EDICIÓN DE MOVIES
router.get('/movies/:movie_id/edit', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebs => {

                    res.render('movies/edit-movie', { movie, celebs })
                })
        })

});

router.post('/movies/:movie_id/edit', (req, res) => {

    const { movie_id } = req.params
    const { title, plot, genre, cast } = req.body

    Movie
        .findByIdAndUpdate(movie_id, { title, plot, genre, cast })
        .then(movie => {
            res.redirect('/movies')
        })
        .catch(e => console.log(e))
});

// DELETE MOVIE

router.post('/movies/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params
    Movie
        .findByIdAndDelete(movie_id)
        .then(res.redirect('/movies'))
        .catch(e => console.log(e))
});

module.exports = router;