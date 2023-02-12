// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model')

// all your routes here
router.get('/movies', (reeq, res, next) => {
    Movie
        .find()
        .populate('cast')
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))

});

router.get('/movies/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movie => res.redirect('/movies'))
        .catch(err => res.redirect('/movies/new-movie'))
})

router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
});

//NO CONSIGO SACAR ESTA PARTE:

router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params

    Movie
        .findById(id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebrityArray => {
                    res.render('movies/edit-movie', { movie, celebrityArray })
                })
        });
});

router.post('/movies/:id/edit', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .populate('cast', 'name')
        .then(movie => res.render('movies/:id', movie))
        .catch(err => res.redirect('/movies/:id/edit'))
})




module.exports = router;