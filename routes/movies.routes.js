const router = require("express").Router();
const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movies.model");

router.get("/movies", (req, res, next) => {
    Movies.find()
        .populate("celebrities")
        .then((moviesFromDB) => {
            const data = {
                movies: moviesFromDB,
            };

            res.render("movies/movies.hbs", data);
        })
        .catch((e) => {
            console.log("Error getting list of celebrities from DB", e);
            next(e);
        });
});

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) => {
            const data = {
                celebrities: celebritiesFromDB,
            };
            res.render("movies/new-movie.hbs", data);
        })
        .catch((e) => {
            console.log("Error getting list of authors from DB", e);
            next(e);
        });
});

// CREATE: process form
router.post("/movies/create", (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    };

    Movies.create(newMovie)
        .then((newMovie) => {
            res.redirect("/movies");
        })
        .catch((e) => {
            console.log("error creating new movie", e);
            res.redirect("/movies/new-movie.hbs");
            next(e);
        });
});
// UPDATE: display form
router.get("/movies/:moviesId/edit", async (req, res, next) => {
    const { moviesId } = req.params;

    try {
        const movieDetails = await Movies.findById(moviesId);
        const celebrities = await Celebrity.find();

        const data = {
            movie: movieDetails,
            celebrities: celebrities,
        };

        res.render("movies/edit-movie.hbs", data);
    } catch (error) {
        next(error);
    }
});

// UPDATE: process form
router.post("/movies/:movieId/edit", (req, res, next) => {
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;

    Movies.findByIdAndUpdate(
        movieId,
        { title, genre, plot, cast },
        { new: true }
    )
        .then((updatedMovie) => res.redirect(`/movies/${updatedMovie.id}`)) // go to the details page to see the updates
        .catch((error) => next(error));
});

// DELETE: delete movie
router.post("/movies/:movieId/delete", (req, res, next) => {
    const { movieId } = req.params;
    Movies.findByIdAndDelete(movieId)
        .then(() => res.redirect("/movies"))
        .catch((error) => next(error));
});

// READ: display details of one movie
router.get("/movies/:movieId", (req, res, next) => {
    const id = req.params.bookId;
    Movies.findById(id)
        .then((movieFromDB) => {
            res.render("movies/movie-details", movieFromDB);
        })
        .catch((e) => {
            console.log("Error getting movie details from DB", e);
            next(e);
        });
});

module.exports = router;
