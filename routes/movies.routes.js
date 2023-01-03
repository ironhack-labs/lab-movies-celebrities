const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

//CREATE: display form
router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then((celebrityArr) => {
            res.render("movies/new-movie", {celebrityArr});
        })
        .catch(err => {
            console.log("error getting celebrities in DB", err);
            next();
        })   
})

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
    const moviedetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(moviedetails)
        .then(moviedetails => {
            res.redirect("/movies");
        })
        .catch(err => {
            console.log("error creating new movie in DB", err);
            next();
        })
})

//READ: List all the movies
router.get("/movies", (req, res, next) => {
    Movie.find()
        .then(moviesFromDB => {
            res.render("movies/movies", { movies: moviesFromDB})
        })
        .catch(err => {
            console.log("error creating new movie in DB", err);
            next();
        })
})

//READ: Movie details
router.get("/movies/:id", (req, res, next) => {
    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate("cast")
        .then( movieDetails => {
            console.log(movieDetails);
            res.render("movies/movie-details", movieDetails)
        })
        .catch(err => {
            console.log("error creating movie details in DB", err);
            next();
        })
})

//UPDATE: display form
router.get("/movies/:id/edit", (req, res, next) => {

    let celebritiesArr;

    Celebrity.find()
        .then( (celebritiesFromDB) => {
            celebritiesArr = celebritiesFromDB;
            return Movie.findById(req.params.id)
        })
        .then((movieDetails) => {
            const data = {
                movieDetails: movieDetails,
                celebritiesArr: celebritiesArr
            }

            res.render("movies/edit-movie", data);
        })
        .catch(err => {
            console.log("Error getting movie details from DB...", err);
            next();
        });
});


//UPDATE: process form
router.post("/movies/:id/edit", (req, res, next) => {
    const movieId = req.params.id;

    const newDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.findByIdAndUpdate(movieId, newDetails)
        .then(() => {
            res.redirect(`/movies/${movieId}`);
        })
        .catch(err => {
            console.log("Error updating movie...", err);
            next();
        });
});

//DELETE
router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch(err => {
            console.log("Error deleting movie...", err);
            next();
        });

});
module.exports = router;