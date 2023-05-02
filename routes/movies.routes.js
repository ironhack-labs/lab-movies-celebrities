// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

//render for create a movie en el que se pasan datos de allCelebrities
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get("/movies/create", (req, res) => {
    Celebrity.find()
        .then(allCelebrities => res.render('movies/new-movie', { allCelebrities }))
        .catch(err => console.log(err));
});


router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot } = req.body;
    Movie.create({ title, genre, plot })
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => {
            next(err);
        });
});


//Mostrar todas las movies
router.get('/movies', (req, res) => {
    Movie.find()
        .then(allMovies => res.render('movies/movies', { allMovies }))
        .catch(err => console.log(err));
});


//route for movie details
router.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then(theMovie => res.render('movies/movie-details', { theMovie }))
        .catch(err => console.log(err));
});


//route for delete movie
router.post('/movies/:id/delete', (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err));
});

//route for edit movie
router.get('/movies/:id/edit', (req, res) => {
    Movie.findById(req.params.id)
        .then(theMovie => res.render('movies/edit-movie', { theMovie }))
        .catch(err => console.log(err));
});







module.exports = router;