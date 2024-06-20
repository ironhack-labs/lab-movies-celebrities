const router = require("express").Router();
const movieModel = require("../models/Movie.model")
const celebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");


router.get("/movies", (req, res, next) => {
    
    movieModel.find()
    .then((movies) => {
        res.render("movies/movies", {moviesArr: movies})
    })
    .catch( e => {
        console.log("error creating new movie", e);
        next(e);
    });
})

router.get("/movies/create", (req, res, next) => {
    celebrityModel.find()
        .then((celebritiesFromDB) => {
        res.render("movies/new-movie", {celebritiesArr: celebritiesFromDB})
    })
    .catch( e => {
        console.log("error creating new movie", e);
        next(e);
    });
})

router.post("/movies/create", (req, res, next) => {
    
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };
    MovieModel.create(newMovie)
    .then( (newMovie) => {
        res.redirect("/movies");
    })
    .catch( e => {
        console.log("error creating new movie", e);
        next(e);
    });
});

router.get("/movies/:id", (req, res, next) => {
    const id = req.params.id;

    movieModel.findById(id)
    .populate("cast")
    .then((moviesFromDB) => {
        const dataMovie = {
            moviesArr: moviesFromDB
        }
        console.log(moviesArr, _id)
        res.render("movies/movie-details", dataMovie)
    })
    .catch((e) => {
        console.log("error getting movie details from DB", e);
        next(e);
      });
  });
  

module.exports = router;
