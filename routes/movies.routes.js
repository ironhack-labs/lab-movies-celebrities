const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get("/movies/create", (req, res) => {

    Celebrity
        .find()
        .then(allCelebritiesFromDB => {
            res.render("movies/new-movie.hbs", {celebrity: allCelebritiesFromDB})
        })
})


router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body;

    Movie
        .create({ title, genre, plot, cast})
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/new-movie.hbs'))
})


router.get("/movies", (req, res) => {

    Movie
        .find()
        .then(allMoviesFromDB => {
            res.render("movies/movies.hbs", {movie: allMoviesFromDB})
        })
        .catch(error => {
            console.log('Error while getting movies from the DB: ', error);
            next(error);
          });

});



module.exports = router;