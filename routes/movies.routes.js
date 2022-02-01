// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celebritiesDB) => {
      res.render("movies/new-movie", { celebritiesDB });
    })
    .catch((err) =>
      console.log(`Err while displaying post input page: ${err}`)
    );
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  // 'author' represents the ID of the user document

  Movie.create({ title, genre, plot, cast })
    .then((dbPost) => {
      // ID of newly created post
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(`Err while creating the post in the DB: ${err}`);
      next(err);
    });
});

router.get("/movies", (req, res) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies/movies", { movies: moviesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((foundMovie) => {
      console.log(foundMovie);
      res.render("movies/movie-details", foundMovie);
    })
    .catch((err) => {
      console.log(`Err while getting a single post from the  DB: ${err}`);
      next(err);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch((error) => next(error));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movieToEdit) => {
      console.log(movieToEdit);
      res.render("movies/edit-movie", { movie: movieToEdit });
    })
    .catch((error) => next(error));
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => {
      console.log(`Movie ${updatedMovie.name} was updated`);
      res.redirect(`/movies`);
    })
    .catch((error) => next(error));
});

module.exports = router;
