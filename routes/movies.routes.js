const express =require('express');

const movieRouter = express.Router();

const movie= require('../models/movies.model');
const Celebrity = require("../models/Celebrity.model");

movieRouter.get("/new", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie", { celebritiesFromDB });
    })
    .catch((err) => console.log("Error while displaying a form to create a movie: ", err));
});

movieRouter.post("/", (req, res, next) => {
  Movie.create(req.body)
    .then((newMovie) => {
      // console.log("New movie: ", newMovie);

      // res.redirect ALWAYS has '/' because it is the URL
      res.redirect("/movies");
    })
    .catch((err) => console.log("Error while creating a movie: ", err));
});

movieRouter.get("/", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render("movies/movies", { moviesFromDB });
    })
    .catch((err) => console.log("Error while displaying all the movies: ", err));
});

movieRouter.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => console.log("Error while deleting a movie: ", err));
});

movieRouter.get("/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((foundMovie) => {
      Celebrity.find().then((allCelebs) => {
        allCelebs.forEach((oneCeleb) => {
          foundMovie.cast.forEach((oneCastMember) => {
            // console.log("what is this: ", oneCastMember);
            if (oneCeleb._id.equals(oneCastMember)) {
              oneCeleb.isInCast = true;
            }
          });
        });
        res.render("movies/edit-movie", { movie: foundMovie, allCelebs });
      });
    })
    .catch((err) => console.log("Error while getting the movie for the edit form: ", err));
});

movieRouter.post("/:movieId/update", (req, res, next) => {
  // we can use 'req.body' since we used the same names as in our MOVIE model
  Movie.findByIdAndUpdate(req.params.movieId, req.body)
    .then((updatedMovie) => {
      // if everything is fine, take me back to the details page so we can see the changes we made
      res.redirect(`/movies/${req.params.movieId}`);
    })
    .catch((err) => console.log("Error while getting updating the movie: ", err));
});

movieRouter.get("/:movieId", (req, res, next) => {
  // cast is the array of IDs and we need full object so we need to use
  // .populate('cast) and pass the "cast" in the method because we are populating that specific field
  Movie.findById(req.params.movieId)
    .populate("cast")
    .then((foundMovieFromDB) => {
      res.render("movies/movie-details", { foundMovieFromDB });
    })
    .catch((err) => console.log("Error while displaying movie details: ", err));
});


module.exports = movieRouter;