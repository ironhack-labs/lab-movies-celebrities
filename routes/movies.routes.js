// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");



// all your routes here

//display all movies 
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies/movies", { movies: allMovies });
    })
    .catch((err) => {
      console.log("error displaying movies", err).next(err);
    });
});

//display movie Details
router.get("/movies/:id", (req, res) => {
Movie.findById(req.params.id)
.populate("cast")
.then((movieDetails) => {
res.render("movies/movie-details", movieDetails);
})
.catch((err) => {console.log("error getting movie details", err)})
})


//add new movie - render form
router.get("/movies/create", (req, res) => {
  Celebrity.find().then((allCelebrities) => {
    res.render("movies/new-movie", { celebrities: allCelebrities });
  });
});

//add new movie - process form
router.post("/movies/create", (req, res) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
  };

  Movie.create(newMovie)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error creating movie", err);
      res.render("movies/new-movie");
    });
});

//delete a movie
router.post("/movies/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect("/movies")
  })
})

module.exports = router;
