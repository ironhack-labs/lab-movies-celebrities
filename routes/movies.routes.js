// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.js");

const Celebrity = require("../models/Celebrity.model");

// all your routes here

//render new movie form
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebArray) => {
      res.render("movies/new-movie", { celebArray });
    })
    .catch((err) => console.log(err));
});

//post info from form
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      console.log("New film:", newMovie);
      res.redirect(`/movies/${newMovie._id}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/movies/create");
    });
});

//list of all movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movieArray) => {
      console.log("Retrieved movies", movieArray);
      res.render("movies/movies.hbs", { movieArray });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/movies/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
  .populate("cast")
    .then((aMovie) => {
      console.log("a new movie", aMovie);
      res.render("movies/movie-details.hbs", { aMovie });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//update movie
router.get("/movies/:movieId/edit", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((aMovie) => {
      Celebrity.find().then((celebArray) => {
        res.render("movies/edit-movie.hbs", { aMovie, celebArray });
        console.log("a new movie", aMovie);
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/movies/:movieId/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  console.log(cast);
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { title, genre, plot, cast },
    { new: true}
  )
    .then((updatedMovie) => res.redirect(`/movies/${updatedMovie._id}`)) // go to the details page to see the updates
    .catch((error) => next(error));
});

router.post("/movies/:movieId/delete", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
