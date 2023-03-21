// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { estimatedDocumentCount } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model")
const Movie = require ("../models/Movie.model")

// GET movies form
router.get("/movies/create", (req, res, next) => {

    Celebrity.find()
        .then( celebsArr => {

            const data = {
                celebs: celebsArr
            }

            res.render("movies/new-movie", data);
        })
        .catch(e => {
            console.log("error getting celebrities....", e);
            next(e);
          });
});

// PROCESS movies form
router.post("/movies/create", (req, res, next) => {

    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(movieDetails)
        .then(movieFromDB => {
            res.redirect("/movies");
        })
        .catch(e => {
            console.log("error creating new movie", e);
            next(e);
          });
});

// DISPLAY movies list
router.get("/movies", (req, res, next) => {

    Movie.find()
        .then(moviesArr => {

            const data = {
                movies: moviesArr
            };

            res.render("movies/movies", data);
        });
});

// DISPLAY details for one movie
router.get("/movies/:id", (req, res, next) => {

    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate("cast")
        .then(movieDetails => {
            res.render("movies/movie-details", movieDetails);
        })
        .catch(e => {
            console.log("error getting movie details from DB", e);
            next(e);
          });
});

// DELETE movies
router.post('/movies/:id/delete', (req, res, next) => {
    const movieId = req.params.id;
   
    Movie.findByIdAndDelete(movieId)
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
  });

// EDIT movies (get)
router.get('/movies/:id/edit', (req, res, next) => {

    const movieId = req.params.id;

    let movieDetails;

    Movie.findById(movieId)
        .then(movieFromDB => {
            movieDetails = movieFromDB;
            return Celebrity.find();
        })
        .then(celebsArr => {

            const data = {
                movie: movieDetails,
                celebs: celebsArr
            }

            res.render('movies/edit-movie', data);
        })
        .catch(error => next(error));
});

// EDIT movies (post)
router.post('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
   
    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
      .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`))
      .catch(error => next(error));
  });

module.exports = router;