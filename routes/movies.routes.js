// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")


// Movie related routes


// Render movie creation form
router.get('/movies/create', (req, res) => {
    
    Celebrity
        .find()
        .then(theCelebrities => res.render('./movies/new-movie', {celebrities: theCelebrities}))
        .catch(err => console.log(err))
})

// Create movie & redirect to movie list
router.post('/movies/create', (req, res) => {

    const {title, genre, plot, cast} = req.body

    Movie
    .create({title, genre, plot, cast})
    .then(theMovie => res.redirect('/movies'))
    .catch(err => console.log(err))
})

// Render movie list
router.get('/movies', (req, res) => {

    Movie
    .find()
    .populate('cast')
    .then(theMovies => res.render('./movies/movies', {movies: theMovies}))
    .catch(err => console.log(err))
})


// Render movie details
router.get('/movies/id/:id', (req, res) => {

    const {id} = req.params

    Movie
    .findById(id)
    .populate('cast')
    .then(theMovie => res.render('movies/movie-details', theMovie))
    .catch(err => console.log(err))
})


// Delete movies
router.post('/movies/id/:id/delete', (req, res) => {

    const {id} = req.params

    Movie
    .findByIdAndDelete(id)
    .then(res.redirect('/movies'))
    .catch(err => console.log(err))
})

// Edit movies
router.get('/movies/id/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
    .findById(id)
    .populate('cast')
    .then(theMovie => res.render('./movies/edit-movie', theMovie))
    .catch(err => console.log(err))

})

router.post('/movies/id/:id', (req, res) => {

    const {id, title, genre, plot, cast} = req.body

    Movie
    .findByIdAndUpdate(id, {title, genre, plot, cast})
    .then(res.redirect('/movies'))
})

module.exports = router;
