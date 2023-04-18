
const router = require("express").Router();
const Movie = require("../models/Movies.model")

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then(moviesFromDb => {
        console.log(moviesFromDb)
    res.render("movies/index", { movies: moviesFromDb})
    })
    .catch(err => next(err))
})

router.get("/movies/new-movie", (req, res, next) => {
    Movie.create()  
    .then(moviesFromDb => {
        console.log(moviesFromDb)
    res.render("movies/new-movie", { movies: moviesFromDb })
    })
})


router.post("/movies/new-celebrity", (req, res, next) => { 
    console.log(req, body)
const { title, genre, plot, cast } = req.body

Movie.create({ title, genre, plot, cast })
        .then(() => {
            console.log("createdMovie")
            res.redirect("/movies") 
        })
        .catch((err) => {
            res.render("movies/new-movie", {
                errorMessage: "Error",
            });
        });
});

module.exports = router;