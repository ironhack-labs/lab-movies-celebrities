// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//require models
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model');


//GET all movies and render the list
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(allMovies => {
        //console.log('Retrieved movies from DB:', allMovies);
        res.render('movies/movies.hbs', { movies : allMovies});
    })
    .catch(err => {
            console.log('Something went wrong while getting movies from DB =>', err);
        });
});

// all your routes here
//GET route to display form to create a celebrity
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((celebs) => {
        res.render('movies/new-movie.hbs', { celebs });
    })
    .catch(err => {
            res.render('celebrities/new-celebrity');
            console.log('Something went wrong while displaying movie-create view =>', err);
    });
});

//POST get all info about new celeb user submitted from the form. use this to create a new celeb in the database
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({title,genre,plot,cast})
      .then(dbMovie => res.redirect("/movies"))
      .catch((error) => res.render("movies/create"));
});

//GET route to render details about a specific movie
router.get('/movies/:movieId', (req, res, next) => {
    const { movieId } = req.params;
    console.log("This is the movie id =>", movieId);

    Movie.findById(movieId)
      //populate 'cast' its an array to get full data about the movie
      .populate("cast")
      .then((movieDetails) => {
        res.render("movies/movie-details.hbs", { movie : movieDetails });
      })
      .catch((err) => {
        console.log(`Err while getting movie details from the  DB: ${err}`);
        next(err);
      });
});

//GET edit a movie
router.get("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
  .populate("cast")
  .then((movieInfo) => {
      res.render("movies/edit-movie.hbs", { movie, movieInfo })})
  .catch(err => console.log('Error when retrieiving information about movie', err))
    });


//POST edit movie post
router.post("/movies/:movieId/edit", (req, res, next) => {
    const { movieId } = req.params;
    const {title, genre, plot, cast} = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
  .then(
    (movie) => {
      res.redirect("/movies")})
      .catch((e) => {
        console.error('Error when updating movie information: ', e);
      });
    }
  );

//POST to delete a movie
router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies")})
    .catch((e) => {
        console.error(e);
      });
    });


module.exports = router;

