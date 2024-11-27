const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        res.render("movies/create", {celebritiesArr: celebritiesFromDB});
    })
    .catch(error => {
        console.log("error displaying create movie form", error);
        next(error);
    });
});

router.post("/movies/create", (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    
    Movie.create(newMovie)
    .then((newMovie) => {
        res.redirect("/movies");
    })
    .catch(error => {
        console.log("error creating new movie", error);
        res.render("movies/create")
        next(error)
    });
});


module.exports = router;
