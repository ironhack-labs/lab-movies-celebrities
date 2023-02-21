// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res) => {
  Celebrity.find() // check if the celebrity exists
    .then((dbMovie) => {
      res.render("movies/new-movie", { dbMovie });
    })
    .catch((err) =>
      console.log(`Err while displaying movie input page: ${err}`)
    );
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  // 'cast' represents the ID of the celebrity document

  Movie.create({ title, genre, plot, cast })
    .then((dbMovie) => {
      // when the new movie is created, the cast needs to be found and its movies updated with the
      // ID of newly created movie
      return Celebrity.findByIdAndUpdate(cast, {
        $push: { movies: dbMovie._id },
      });
    })
    .then(() => res.redirect("/movies")) // if everything is fine, redirect to list of movies
    .catch((err) => {
      console.log(`Err while creating the movie in the DB: ${err}`);
      next(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((dbMovie) => {
      console.log(dbMovie);
      res.render("movies/movies", { dbMovie }); //show all movies
    })
    .catch((err) =>
      console.log(`Err while displaying movie list page: ${err}`)
    );
});

router.post("/movies/:movieId/delete", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect("/movies"))
    .catch((error) => next(error));
});

// get route to display the form to update a specific movie
router.get("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((foundMovie) => {
      Celebrity.find().then((allCast) => {
        res.render("movies/edit-movie", {
          movieToEdit: foundMovie,
          castToEdit: allCast,
        });
      });
    })
    .catch((err) => {
      console.log(
        `Err while getting a single movie and its cast from the  DB: ${err}`
      );
      next(err);
    });
});

router.post("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => {
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch((err) =>
      console.log(`Err while displaying movie to edit page: ${err}`)
    );
});

//show details from each movie
router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => res.render("movies/movie-details", foundMovie))
    .catch((err) => {
      console.log(`Err while getting a single movie from the  DB: ${err}`);
      next(err);
    });
});

module.exports = router;
