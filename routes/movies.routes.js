const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            const data = {
                celebrity: celebritiesFromDB
            }

            res.render("movies/new-movie", data)
        })
        .catch(e => {
            console.log("An error has occured while creating a movie", e)
            next(e)
        })
})

router.post("/movies/create", (req, res, next) => {
    const newMovie = {
        title: req.body.title, 
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(newMovie)
    .then((newMovie) => {
        res.redirect("/movies")
    })
    .catch(e => {
        console.log("An error has occured while creating a movie", e)
        next(e)
    })
})

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then(moviesFromDB => {
        const data = {
            movies: moviesFromDB
        }
        res.render("movies/movies", data)

    })
    .catch(e => {
        console.log("An error has occured while getting the list of movies", e)
        next(e)
    })

})

module.exports = router;