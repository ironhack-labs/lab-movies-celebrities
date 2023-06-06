// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");

// all your routes here

module.exports = router;

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