// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model")

// all your routes here

//READ: List all movies
router.get("/movies", (req, res, next) => {
    Movie.find()
      .populate("cast")
      .then( moviesFromDB => {
          res.render("movies/movies", {movies: moviesFromDB})
      })
      .catch( err => {
        console.log("error getting books from DB", err);
        next(err);
      })
  });


//READ: Movie details
router.get("/movies/:movieId", (req, res, next) => {
    const id = req.params.movieId;
  
    Movie.findById(id)
      .populate("cast")
      .then((movieDetails) => {
        res.render("movies/movie-details", movieDetails);
      })
      .catch((err) => {
        console.log("error getting movie details from DB", err);
        next(err);
      });
  });

//CREATE: display form
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then(( celebritiesArr ) => {
      res.render("movies/new-movie", { celebritiesArr });
    })
    .catch((err) => {
      console.log("error getting celebrities from DB", err);
      next(err);
    });
});

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
  const movieDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(movieDetails)
    .then((movieDetails) => {
        console.log(movieDetails);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error creating new movie in DB", err);
      next(err);
    });
});

//DELETE
router.post("/movies/:movieId/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        console.log("Error deleting movie...", err);
        next();
      });
  });


//Edit: display form
router.get("/movies/:movieId/edit", (req, res, next) => {
    const { id } = req.params.movieId;
    let movieInfo;
    Movie
    .findById(req.params.movieId)
    .then(movieDetails => {
        console.log(movieDetails);
        movieInfo = movieDetails
        return Celebrity.find()
    })
    .then(allCelebs => {
        res.render("movies/edit-movie", {movieInfo: movieInfo, allCelebs: allCelebs})
    })
    .catch(err => console.log(err))
});

//Edit: process form
router.post("/movies/:movieId/edit", (req, res, next) => {
    const  id  = req.params.movieId

    const updatedMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie
    .findByIdAndUpdate(id, updatedMovie, { new : true })
    .then(() => {
        res.redirect(`/movies/${id}`);
      })
      .catch((err) => {
        console.log("Error updating movie...", err);
        next();
      });
});

module.exports = router;