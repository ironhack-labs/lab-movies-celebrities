// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")
// all your routes here

router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie")
});

router.post("/movies/create", (req, res, next) => {
    const { title, genre, post, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(newMovie => res.redirect("/movies"))
        .catch(err => console.log(err))
});

router.get("/movies", (req, res, next) => {
    let counter = 1;
    Movie
        .find()
        .then(movies => {
            movies.forEach(movie => {
                movie.counter = counter++;
            });
            console.log('holaaaa', movies)
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
});
module.exports = router;