
const { populate } = require("../models/Celebrity.model");
const celebrity = require("../models/Celebrity.model");
const movie = require("../models/movie.model");

const router = require("express").Router();

router.get("/movies/create", (req, res, next) => {
    celebrity
    .find()
    .then(celebrityDB => 
    res.render('movies/new-movie', {celebrityDB})
    )
})

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast} = req.body;
    if (title !== "" && genre !== "" && plot !== "" && cast !== [{}]) {
      movie.create({ title, genre, plot, cast })
        .then((newMovie) => {
          res.render("movies/movies", { movie: newMovie });
        })
        .catch((err) => next(err));
    } else {
      res.redirect("movies/create");
    }
  });

  router.get("/movies/movies", (req, res, next) => {
    movie.find()
    .then(movieDB => res.render("movies/movies", {movies:movieDB}))
})


router.get('/movies/:id' , (req,res,next) => {
    const {movieId} = req.params;
    movie
    .findById(movieId)
    .then(movieFound => 
        res.render('movies/movie-details', {movie:movieFound}))
    .catch(err => next(err))
})



module.exports = router;