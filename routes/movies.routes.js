const { populate } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get("/movies/create", (req, res) => {


    Celebrity.find()
        .then(celebritiesArr => {
            res.render("movies/new-movie", { celebritiesArr });
        })
        .catch((error) => {
            console.log("Error getting celebrities from DB", error);
            next(error);
        })
})

router.post("/movies/create", (req, res) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    };

    Movie.create(movieDetails)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((error) => {
            console.log("Error creating book in the DB", error);
            next(error);
        })
})

router.get("/movies", (req, res, next) => {

    Movie.find()
        .populate('cast')
        .then((moviesFromDB) => {
            const data = {
                moviesArr: moviesFromDB
            };


            res.render("movies/movies", data);
        })

        .catch((error) => {
            console.log("Error getting data from DB", error)
            next(error);
        })
});

router.get("/movies/:id", (req, res) => {
    const id = req.params.id;

    Movie.findById(id)
        .populate('cast')
        .then((movieDetails) => {
            res.render("movies/movie-details", movieDetails);
        })
        .catch((error) => {
            console.log("Error getting book details from DB", error);
            next(error);
        })
});

router.post("/movies/:id/delete", (req, res) => {
    const { id } = req.params;

    Movie.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies');
        })
        .catch((error) => {
            console.log("Error deleting book from DB", error);
            next(error);
        })
});

router.get("/movies/:id/edit", (req, res) => {


    const { id } = req.params;

    Movie.findById(id)
        .populate("cast")
        .then((movieDetails) => {
            res.render("movies/edit-movie", movieDetails);
        })
        .catch((error) => {
            console.log("Error getting book details from DB", error);
            next(error);
        })
});

router.post("/movies/:id/edit", (req, res) => {

    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies");
        })
        .catch((error) => {
            console.log("Error updating book in the DB", error);
            next(error);
        })
});

module.exports = router;