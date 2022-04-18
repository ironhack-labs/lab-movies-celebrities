// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const { collection } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");

const Movie = require("../models/Movie.model");

// all your routes here

//CREAR MOVIES

router.get("/movies/create", (req, res, next) => {
    Celebrity.find().then((celebrity) => {
        console.log(celebrity);

        res.render("movies/new-movie.hbs", { celebrity });
    });
});

router.post("/movies/create", (req, res, next) => {
    const { tittle, genre, plot, cast } = req.body;

    Movie.create({ tittle, genre, plot, cast })
        .then(() => {
            res.redirect("/movies/create");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/celebrities");
        });
});

//LIST OF MOVIES

router.get("/movies", (req, res, next) => {
    Movie.find()

        .then((movie) => {
            res.render("movies/movies", { movie });
        })
        .catch((err) => {
            console.log(err);
        });
});

//MOVIE DETAILS

router.get("/movies/:id", (req, res, next) => {
    const { id } = req.params;

    console.log(id);

    Movie.findById(id)

        .populate("cast")

        .then((movie) => {
            res.render("movies/movie-details", movie);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/movies/:id/delete", (req, res) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => console.log(err));
});

//MOVIE EDIT

router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;

    let movie;

    Movie.findById(id)
        .then((_movie) => {
            movie = _movie;

            return Celebrity.find();
        })
        .then((celebrity) => {
            res.render("movies/edit-movie", { movie, celebrity });
        })
        .catch((err) => console.log(err));
});

router.post("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;

    const { tittle, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(id, { tittle, genre, plot, cast })
        .then(() => {
            res.redirect(`/movies/${id}`);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
