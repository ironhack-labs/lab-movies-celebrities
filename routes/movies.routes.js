// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model');


// Iteration 6: Create Movies
// GET
router.get("/movies/create", (req,res,next) => {
    Movie.find()
    .then(moviesFromDB => {
        res.render("movies/new-movie", {moviesArr: moviesFromDB}); 
    })
    .catch( e => {
        console.log("error show a form to create a movie",e);
        next(e);
    })
})

// POST
router.post("/movies/create", (req,res,next) => {

const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
};

Movie.create(newMovie)
    .then(() => {
        res.redirect("/movies");
    })
    .catch(e => {
        console.log("error send the data from the form to this route to create the celebrity and save it to the database", e);
        res.render("/movies/new-movie");
        next(e);
    })
})

// Iteration 7: Create Movie List
router.get("/movies", (req, res, next) => {

    Movie.find()
        .then(moviesFromDB => {
            res.render("movies/movies", { moviesFromDB })
        })
        .catch((e) => {
            console.log("error showing all movies", e);
            next(e)
        })
});

// Iteration 8: The Movie Details Page
router.get("/movies/:movieId", (req, res, next) => {
    const id = req.params.movieId;

    Movie.findById(id)
        .populate()
        .then( moviesFromDB => {
            res.render("movies/movie-details", moviesFromDB);
        })
        .catch( e => {
            console.log("error getting movie details from DB", e);
            next(e);
        });
});



module.exports = router;
