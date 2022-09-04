// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const movieModel = require('../models/movie.model');
const celebrityModel = require('../models/Celebrity.model');


router.get('/movies/create', (req, res, next) => {
    celebrityModel.find()
        .then((allCelebrities) => {
            res.render('movies/new-movie', { allCelebrities })
        })
        .catch((err) => {
            console.error(err);

        })
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    movieModel.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => {
            console.error(err);
        })
})

router.get('/movies', (req, res, next) => {
    movieModel.find()
        .then((movies) => {
            res.render('movies/movies', { movies })
        })
        .catch((err) => {
            console.error(err);

        })
})

router.get('/movies/:id', (req, res, next) => {
    const movieID = req.params.id
    movieModel.findById(movieID)
        .populate("cast", "name occupation catchPhrase -_id")
        .then((movieId) => {
            res.render('movies/movie-detail', movieId)
        })
        .catch((err) => {
            console.error(err);

        })
})





module.exports = router;