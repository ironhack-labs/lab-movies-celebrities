const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then((celebritiesArr) => {
            const data = {
                celebritiesArr: celebritiesArr
            };
            res.render("movies/new-movie", data)
        })
        .catch((error) => {
            console.log("Error getting movies from DB", error);
            next(error);
        })
})


router.post("/movies/create", (req, res, next) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(movieDetails)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((error) => {
            console.log("Error creating a movie in DB", error);
            next(error);
        })
})



router.get("/movies", (req, res, next) => {
    Movie.find()
        .then((result) => {
            res.render("movies/movies", { result })
        })
        .catch((error) => {
            console.log("Error listing movies from DB", error);
            next(error);
        })
})



router.get("/movies/:id", (req, res, next) => {
    Movie.findById(req.params.id)
        .populate("cast")
        .then((moviesArr) => {
            res.render("movies/movie-details", { moviesArr })
        })
        .catch((error) => {
            console.log("Error getting details for the movie from DB", error);
            next(error);
        });
})


router.post("/movies/:id/delete", (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.redirect("/movies")
        })
        .catch((error) => {
            console.log("Error deleting the movie from DB", error);
            next(error);
        })
})


router.get("/movies/:id/edit", (req, res) => {
    Movie.findById(req.params.id)
        .populate("cast")
        .then((result) => {
            res.render("movies/edit-movie", { result })
        })
        .catch((error) => {
            console.log("Error editing the movie", error);
            next(error);
        })
})

router.post("/movies/:id", (req, res) => {
    const id = req.params.id;
    const newDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.findByIdAndUpdate(id, newDetails)
        .then(() => {
            res.redirect("/movies")
        })
        .catch((error) => {
            console.log("Error updating the movie", error);
            next(error);
        })
})



module.exports = router;