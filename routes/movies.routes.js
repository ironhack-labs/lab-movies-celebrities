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
    cast: req.body.cast,
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

//display movie Details
router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movieDetails) => {
      res.render("movies/movie-details", movieDetails);
    })
    .catch((err) => {
      console.log("error getting movie details", err);
    });
});

//edit movie - render form
router.get("/movies/:id/edit", (req, res) => {
  console.log("user clicked to edit movie");
  const id = req.params.id;
  let movieToEdit;
  Movie.findById(id)
    .then((movieDetails) => {
      movieToEdit = movieDetails;
      return Celebrity.find();
    })
    .then((celebritiesArray) => {
      res.render("movies/edit-movie", {
        movie: movieToEdit,
        celebrities: celebritiesArray,
      });
    })
    .catch((err) => console.log("Error rendering movie edit form", err));
});

//edit movie - process form
router.post("/movies/:id/edit", (req, res) => {
  const updatedMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.findByIdAndUpdate(req.params.id, updatedMovie)
    .then((updatedMovie) => {
      console.log("The following movie has been updated", updatedMovie);
      res.redirect("/movies");
    })
    .catch((err) => console.log("There was an error updating the movie", err));
});

//delete a movie
router.post("/movies/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id).then(() => {
    res.redirect("/movies");
  });
});

module.exports = router;
