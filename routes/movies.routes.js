const router = require("express").Router()
const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");


router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('movies/new-movie', {
                celebrities
            })
        })
        .catch(error => {
            console.log('errorrrrr list', error);
            res.send("Error list celeb", error);
        })
});


router.post("/movies/create", (req, res, next) => {
    const {
        title,
        genre,
        plot,
        cast,
        ...rest
    } = req.body
    Movie.create({
            title,
            genre,
            plot,
            cast
        })
        .then(() => res.redirect('/movies'))
        .catch(error => {
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
            console.log('errorrrrr list', error);
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
            console.log("errorrrr", error)
            res.send("errorrrr id", error)
        })
})



module.exports = router;