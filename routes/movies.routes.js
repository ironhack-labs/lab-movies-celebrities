const express = require("express");
const router = express.Router();

const Movie = require("../models/movie.model");
// const Author = require("../models/Author.model");

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then((moviesFromDB) => {
    console.log("movies:", moviesFromDB);

    res.render("movies/movies.hbs", { moviesFromDB });
    })
    .catch((err) => console.log(`Error while getting all the movies from DB: ${err}`));
});

router.get("/movies/new", (req, res, next) => {
    Movie.find()
    .then((moviesFromDb) => res.render("movies/new-movie.hbs", { moviesFromDb }))
    .catch((err) => console.log(`Error while displaying the form to create a new movie: ${err}`));
});

// POST route to save the book inside the movies collection in the DB
router.post("/movies/create", (req, res, next) => {
    // console.log("new movie: ", req.body);

    const { title, genre, plot } = req.body;

    Movie.create({ title, genre, plot  })
    .then((savedMovie) => {
        // console.log(savedMovie);
        res.redirect("/movies");
    })
    .catch((err) => console.log(`Error while saving a new movie to DB: ${err}`));
});

router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(`Error while deleting the movie from DB: ${err}`));
});

// GET route to render the book we want to update
router.get("/movies/:id/edit", (req, res, next) => {
    Movie.findById(req.params.id)
    // .populate("author")
    .then((foundMovie) => {
        // console.log("found movie: ", foundMovie);

        res.render("movies/edit-movie.hbs", { foundMovie });
    })
    .catch((err) => console.log(`Error while getting the movie from DB for editing: ${err}`));
});

router.post("/movies/:id/update", (req, res, next) => {
    const { title, genre, plot } = req.body;

    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot }, { new: true })
    .then((updatedMovie) => {
        // console.log("updated:", updatedMovie);

        res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch((err) => console.log(`Error while saving the updates on a specific movie: ${err}`));
});

router.get("/movies/:id", (req, res, next) => {
    // console.log("ID: ", req.params.id);
    Movie.findById(req.params.id)
    // .populate("author")
    .then((foundMovie) => {
        // console.log(foundBook);
        res.render("movies/movie-details.hbs", { foundMovie });
    })
    .catch((err) => console.log(`Error while getting the movie details from DB: ${err}`));
});


module.exports = router;