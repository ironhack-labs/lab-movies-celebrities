const router = require("express").Router();
const app = require("../app.js")


const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model')

// all your routes here


//create new-movie:
router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie");
});

router.post("/movies/create", (req, res, next) => {

    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };

    Movie.create(newMovie)
        .then((newMovie) => {
            res.redirect("/movies")
        })
        .catch( e => {
            console.log("error creating new celebrity", e);
            next(e);
        });
});

//movies-list:
router.get("/movies", (req, res, next) => {
    Movie.find()
        .then((moviesFromDB) =>{
            console.log(moviesFromDB)
            res.render("movies/movies", {movies: moviesFromDB})
        })
        .catch( e => {
            console.log("error finding celebrities", e);
            next(e);
        });

})

//movie-details:
router.get("/movies/:movieId", (req, res, next) => {
    const id = req.params.movieId;
    console.log(id)
    Movie.findById(id)
        .populate("cast")
        .then(movieFromDB => {
            res.render("movies/movie-details", movieFromDB);
        })
        .catch((e) => {
            console.log("Error getting book details from DB", e);
            next(e);
        })

})

//movie-delete:
router.post("/movies/:movieId/delete", (req, res, next) => {
    const {movieId} = req.params;
    
    Movie.findByIdAndDelete(movieId)
        .then(() => res.redirect("/movies"))
        .catch(error => next(error));
})

module.exports = router;