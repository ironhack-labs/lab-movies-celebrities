const express = require("express");
const router = express.Router();

const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");

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
    Celebrity.find()
    .then((celebritiesFromDb) => {
        res.render("movies/new-movie.hbs", { celebritiesFromDb });
        // console.log(`thissssssss=============${celebritiesFromDb.name}`);
    })

    .catch((err) => console.log(`Error while displaying the form to create a new movie: ${err}`));
});

// POST route to save the book inside the movies collection in the DB
router.post("/movies", (req, res, next) => {
    // console.log("new movie: ", req.body);

    Movie.create(req.body)
    .then((savedMovie) => {
        console.log(`----------------------------${savedMovie}`);
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
    .then((foundMovie) => {

    Celebrity.find()
    .then((allCelebs) => {

    allCelebs.forEach((oneCeleb) => {

    foundMovie.cast.forEach((oneCastMember) => {

        if (oneCeleb._id.equals(oneCastMember)) {
            oneCeleb.isInCast = true;
        }
        });
    });
    res.render("movies/edit-movie", { movie: foundMovie, allCelebs });
    });
    })
    .catch((err) => console.log("Error while getting the movie for the edit form: ", err));
});

router.post("/movies/:id/update", (req, res, next) => {
    // const { title, genre, plot, cast } = req.body;
    // console.log("this------------:", req.body.cast);

    Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedMovie) => {
        // console.log("this------------:", cast);

        res.redirect(`/movies/${req.params.id}`);
    })
    .catch((err) => console.log(`Error while saving the updates on a specific movie: ${err}`));
});

router.get("/movies/:id", (req, res, next) => {
    // console.log("ID: ", req.params.id);
    Movie.findById(req.params.id)
    .populate("cast")
    .then((foundMovie) => {
        // console.log(foundBook);

        res.render("movies/movie-details.hbs", { foundMovie });
    })
    .catch((err) => console.log(`Error while getting the movie details from DB: ${err}`));
});


module.exports = router;