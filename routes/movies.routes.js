// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/Celebrity.model");


// all your routes here

router.get("/movies/create", (req,res,next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('/movies/new-movie', {
            celebrities
        })
    })
    .catch(error => {
        console.log('error list', error);
        res.send("Error list", error);
    })
});

router.post("/movies/create", (req, res, next) => {
    const {title, genre, plot, cast, ...rest} = req.body
    Movie.create({title, genre, plot, cast})
    .then(() => res.redirect('/movies'))
    .catch(error =>{
        console.log("error", error)
        res.render("error")
    })
})

router.get("/movies", (req, res, next) => {
    Movie.find()
        .then(movies => {
            res.render("movies/movies", {
                movies
            });
        })
        .catch(error => {
            console.log('error list', error);
            res.send("Error list movies", error);
        });
});


router.get("/movies/:id", (req, res, next) => {
    Movie.findById(req.params.id)
        .populate("cast", "name occupation catchPhrase")
        .then(movie => {
            res.render("movies/movie-details", {
                movie
            })
        })
        .catch(error => {
            console.log("error", error)
            res.send("error id", error)
        })
})

module.exports = router;