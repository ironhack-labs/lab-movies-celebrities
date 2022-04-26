const router = require("express").Router();
const Movies = require("../models/movie.model");



// all your routes here

router.get("/movies", (req,res,next) =>{
    Movies.find()
        .then((moviesArr) => {
            res.render("movies/movies", {movies: moviesArr})
        })
        .catch(err => console.log("error displaying movies on first route", err))
})



router.get("/movies/create", (req,res,next) => {
    Movies.create()
        .then((moviesArr) => {
            res.render("movies/new-movie",{movies: moviesArr})
        })
        .catch(err => console.log("error while making a movie", err))

})

router.post("/movies/create", (req,res,next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movies.create(newMovie)
        .then(() => {res.redirect("/movies")})
        .catch(err => console.log("Error creating a movie in POST route", err))
})

module.exports = router;