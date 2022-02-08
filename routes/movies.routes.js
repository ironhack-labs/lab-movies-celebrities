const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/", (req, res) => {
    Movie.find()
    .then((allMoviesInDB) => {
        res.render("movies/movies", {movies: allMoviesInDB});
    })
    .catch((err) => {
        console.log("Error getting Movies from DB: ", err);
    });
});

router.get("/create", (req, res) => {
    Celebrity.find()
    .then((allCelebsArr) => {
        res.render("movies/new-movie", {celebrities: allCelebsArr});
    })
    .catch((err) => {
        console.log("Error getting Celebrities from DB: ", err);
    });
});

router.post("/create", (req, res) => {
    const {title, genre, plot, cast : castNames} = req.body;
    Celebrity.find({"name": {$in: castNames}})
    .then((castInfoArr) => {
        const cast = castInfoArr.map(star => star._id);
        return Movie.create({title, genre, plot, cast});
    })
    .then(() => res.redirect("/movies"))
    .catch((err) => {
        console.log("Error adding Movie to DB: ", err);
    })
});

router.get("/:movieId/details", (req, res) => {
    Movie.findById(req.params.movieId).populate("cast")
    .then((movieFromDB) => {
        res.render("movies/movie-details", {movie: movieFromDB});
    })
    .catch((err) => {
        console.log("Error getting movie details from DB: ", err);
    });
});

router.post("/:movieId/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
        res.redirect("/movies");
    })
    .catch((err) => {
        console.log("Error deleting movie from db: ", err);
    });
});

module.exports = router;