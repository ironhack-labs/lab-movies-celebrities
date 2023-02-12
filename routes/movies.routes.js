const express = require('express');
const router = express.Router();
const Movies = require('../models/Movie.model')
const Celebrities = require('../models/Celebrity.model');

require('../db/index')


router.get('/movies/create', (req, res) => {

    Celebrities
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log(err))


});
router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movies
        .create({ title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => {
            console.log(err)
            res.render('movies/new-movie')
        })
})


router.get('/movies', (req, res, next) => {

    Movies
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
});



router.get('/movies/details/:id', (req, res, next) => {

    const { id } = req.params

    Movies
        .findById(id)
        .populate('cast')
        //.then(movies => res.send(movies))
        .then(movies => res.render('movies/movie-details', movies))
        .catch(err => console.log(err))
})



router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params


    Movies
        .findById(id)
        .then(movies => {
            Celebrities
                .find()
                .then(celebrities => res.render('movies/edit-movie', { movies, celebrities }))
                .catch(err => console.log(err))
        })
})
router.post('/movies/edit', (req, res) => {

    const { title, genre, plot, cast, id } = req.body

    Movies
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(movies => res.redirect('/movies'))
        .catch(err => console.log(err))
})
router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movies
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})


module.exports = router;

