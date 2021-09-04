// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")


// all your routes here

router.get('/movies/create', (req, res) => {
    
    Celebrity
        .find()
        .then(theCelebrities => res.render('./movies/new-movie', {celebrities: theCelebrities}))
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {

    const {title, genre, plot, cast} = req.body

    Movie
    .create({title, genre, plot, cast})
    .then(theMovie => res.redirect('/movies'))
    .catch(err => console.log(err))
})


router.get('/movies', (req, res) => {

    Movie
    .find()
    .populate('cast')
    .then(theMovies => res.render('./movies/movies', {movies: theMovies}))
    .catch(err => console.log(err))
})

module.exports = router;
