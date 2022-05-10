// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const { populate } = require("../models/movie.model");
const Movie = require("../models/movie.model");

router.get("/movies/create", (req, res, next) =>
    Celebrity.find().then((celebrities) =>
        res.render("movies/new-movie", { celebrities })
    )
);
router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => res.redirect("/movies/create"));
});
router.get("/movies", (rq, res, next) => {
    Movie.find({})
        .then((dbMovies) => {
            res.render("movies/movies", { dbMovies });
        })
        .catch((err) => next(err));
});
router.get("/movies/:id", (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
        .populate("cast")
        .then((movieDetail) => res.render("movies/movie-details", movieDetail))
        .catch((err) => next(err));
});
router.post("/movies/:id/delete", (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
        .then(() => res.redirect("/movies"))
        .catch((err) => next(err));
});
router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
        .then((movie) => {
            res.render("movies/edit-movie", movie);
        })
        .catch((err) => next(err));
});
router.post("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;
    const { name, occupation, catchPhrase } = req.body;

    Movie.findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then((movie) => res.redirect(`/movies/${movie._id}`))
        .catch((err) => res.redirect("/movies/:id"));
});

module.exports = router;