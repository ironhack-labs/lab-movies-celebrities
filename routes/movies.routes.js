const router = require("express").Router()
const Movies = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model');

router.get("/movies", (req, res) => {
    Movies
          .find()
          .then(movies => res.render('movies/movies', { movies }))
          .catch(err => console.log(err))

    Celebrity
             .find('cast')
             .then(cast => res.render('celebrities/celebrities', { cast }))
             .catch(err => console.log(err))
})

router.get('/movies/create', (req, res) => {
    res.render('movies/new-movie') 
});

router.post('/movies/create', (req, res) => {
    const { title, genre, plot } = req.body
    Movies
          .create({ title, genre, plot })
          .then(() => res.redirect('/movies'))
          .catch(err => console.log(err))

    const { cast } = req.body
    Celebrity
             .create({ cast })
             .then(() => res.redirect('/movies'))
             .catch(err => console.log(err))
});


router.get('/movies/:id', (req, res) => {
    const { id } = req.params
    Movies
          .findById(id)
          .populate('cast')
          .then(movie => res.render('movies/movie-details', movie))
          .catch(err => console.log(err))
})


router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params
    Movies
          .findByIdAndDelete(id)
          .then(() => res.redirect('/movies'))
          .catch(err => console.log(err))
});


router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    Movies
          .findById(id)
          .then(movies => res.render('movies/edit-movie', movies))
          .catch(err => console.log(err))
});

router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot } = req.body
    Movies
          .findByIdAndUpdate(id, { title, genre, plot }, { new: true })
          .then(() => res.redirect('/movies'))
          .catch(err => console.log(err))
});

module.exports = router