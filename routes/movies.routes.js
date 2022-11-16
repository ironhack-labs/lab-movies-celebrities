const router = require("express").Router();

const Movies = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies", (req, res, next) => {
    return Celebrity.find()
    .then((allMovies) => {
        res.render("movies/movies.hbs", { movies: allMovies });
    })
    .catch((error) => {
        console.log("Error while getting the Movies from the DB: ", error);
    });
});

router.get('/movies/create', (req, res) => {
    res.render('movies/new-movie')
});

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, posts } = req.body;

    Celebrity.create({title, genre, plot, posts})
        .then(() => res.redirect("/movies"))
        .catch((error) => res.render("/movies/create"));
});


module.exports = router;