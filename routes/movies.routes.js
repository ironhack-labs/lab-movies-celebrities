// const { default: mongoose } = require("mongoose");
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

router.get('/movies/create', (req, res, nex)=> {
    Celebrity
    .find()
    .then(celebrities => {
        res.render('movies/new-movie', {celebrities} )
    })
    .catch(err => console.log(err))
   
} )

router.post('/movies/create', (req, res, nex) => {
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    })
    .then(createdMovie => {
        console.log('new movie was created', createdMovie)
        res.redirect('/')
    })
    .catch(err => console.log(err))
})

router.get('/movies/movies', (req, res, nex) => {
    Movie
    .find()
    .then(movie => {
        res.render('movies/movies', {movie})
    })
    .catch(err => console.log(err))
})

router.get('/movies/:id', (req, res, nex) => {
    const {id} = req.params
    Movie
    .findById(id)
    .populate('cast')
    .then(movie => {
        res.render('movies/movie-details', movie)
    })
    .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res, nex) => {
    const {id} = req.params
    Movie
    .findByIdAndRemove(id)
    .then((removedMovie) => {
        console.log('movie was removed', removedMovie)
        res.redirect('/movies/movies')
    })
    .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res, nex) => {
    const {id} = req.params

    Movie
    .findById(id)
    .populate('cast')
    .then(movies => {
        res.render('movies/edit-movie', movies)
    })
    .catch(err => console.log(err))
});

router.post('/movies/:id/edit', (req, res, nex) => {
    const {title, genre, plot, cast} = req.body
    const {id} = req.params

    Movie
    .findByIdAndUpdate(id, {title, genre, plot, cast})
    .then(() => res.redirect('/movies/movies'))
    .catch(err => console.log(err))
})


// all your routes here

module.exports = router;