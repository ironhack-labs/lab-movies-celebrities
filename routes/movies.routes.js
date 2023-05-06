const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


router.get("/movies", (req, res, next) => {
    Movie.find()
        .then( (moviesFromDB) => {
            const data = {
                movies: moviesFromDB,
            };
            res.render("movies/movies", data)
        })
        .catch( e => console.log("error getting movies from DB", e))
    
})

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then( celbrFromDB => {
            const data = {
                celebs: celbrFromDB,
            }
            res.render("movies/new-movie", data);
        })
        .catch( e => console.log("error finding celebrities", e))
    
})

router.post("/movies/create", (req, res, next) => {

    const data = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }
    Movie.create(data)
        .then( () => {
            res.redirect("/movies")
        })
        .catch( e => console.log("error creating  a movie", e))

})

router.get("/movies/:id", (req, res, next) => {

    Movie.findById(req.params.id)
        .populate()
        .then( (movieFromDB) => {
            console.log(movieFromDB)
        })
        .catch( e => console.log("error finding by id",e))
})
// all your routes here

module.exports = router;