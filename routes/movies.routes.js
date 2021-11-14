// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get('/movies/create', (req, res) => {
    Celebrity.
        find()
        .then(celebrityArray => res.render("movies/new-movie", { celebrities: celebrityArray }))
        .catch(error => console.error('Error connecting to the database', error));
})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast, image } = req.body;
    Movie
        .create({ title, genre, plot, cast, image })
        .then(() => res.redirect("/movies"))
        .catch(() => res.render("movies/new-movie"))
})

router.get('/movies', (req, res) => {
    Movie
        .find()
        .then(moviesArray => res.render("movies/movies", { movies: moviesArray }))
        .catch(error => console.error('Error connecting to the database', error));
})

router.get('/movies/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate("cast")
        .then(foundMovie => res.render("movies/movie-details", { movie: foundMovie }))
        .catch(error => console.error('Error connecting to the database', error));
})

router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndRemove(id)
        .then(foundMovie => res.redirect("/movies"))
        .catch(error => console.error('Error connecting to the database', error));
})

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    const foundCelebrities = Celebrity.find()
    Movie
        .findById(id)
        .populate("cast")
        .then(foundMovie => res.render("movies/edit-movie", { movie: foundMovie, celebrities: foundCelebrities }))
        .catch(error => console.error('Error connecting to the database', error));


})

router.post('/movies/:id', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast, image } = req.body;
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast, image }, { new: true })
        .populate("cast")
        .then((newMovie) => res.redirect("/movies/" + newMovie._id))
        .catch(error => console.error('Error connecting to the database', error));
})



module.exports = router;

