// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model")
const Movie = require("./../models/Movie.models")
const bcrypt = require("bcrypt");
const { populate } = require("./../models/Celebrity.model");

// all your routes here
router.get("/", (req, res, next) => {
    Movie.find()
    .then((movies) => {
        res.render('movies/movies', {movies} )
        console.log(movies)
    })
    .catch((err) => console.error(err))
  });

router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render("movies/new-movie", {celebrities})
    })
    .catch((err) => console.log(err))
});

router.post("/create", (req, res, next) => {
    const {title, genre, plot, cast, image} = req.body

    Movie.create({title, genre, plot, cast, image})
    .then(() => res.redirect('/movies'))
    .catch((err) => {
        console.log(err)
        res.render('movies/new-movie', {
            errorMessage: 'Try creating the movie again'
        })
    })
})

router.get('/:movieId', (req, res, next) => {
    const idMovie = req.params.movieId

    Movie.findById(idMovie)
        .populate('cast')
        .then((details) => res.render('movies/movie-details', {details}))
        .catch((err) => console.log(err))
})

router.get('/:movieId/delete', (req, res, next) => {
    const idMovie = req.params.movieId

    Movie.findByIdAndRemove(idMovie)
    .then(() => res.render('/movies'))
    .catch((err) => console.log(err))
})




module.exports = router;
