const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Celebrity.model");
const router = require("express").Router();



router.get("/movies/create", (req, res, next) => {
    console.log("in")
    Celebrity.find()
        .then(celebrityArray => {
            res.render("movies/new-movie", { celebrity: celebrityArray })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.post("/movies/", (req, res, next) => {
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    })
      .then((results) => {
        res.render("movies/movies")
      })
      .catch((err) => {
        res.render("/movies/create");
      });
  });

  router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(movieArray =>{
        res.render('movies/movies.hbs', {movies: movieArray})
    })
    .catch(err=>{
        next(err)
    })
})




module.exports = router