const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      const data = {
        movies: moviesFromDB,
      };
      res.render("movies/movies", data);
    })
    .catch((e) => {
      console.log("Error getting list of movies from DB", e);
      next(e);
    });
});

// displays a form
router.get("/movies/create", (req, res) =>
  Celebrity.find()
    .then((celebritiesFromDB) => {
      const data = {
        celebrities: celebritiesFromDB,
      };
      res.render("movies/new-movie", data);
    })
    .catch((e) => {
      console.log("Error getting list of movies from DB", e);
    })
);

router.post("/movies/create", (req, res, next) => {
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
    .catch((e) => {
      console.log("Error creating movie", e);
      res.render("movies/new-movie");
      next(e);
    });
});

router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieDetails) => {
      res.render("movies/movie-details", movieDetails);
    })
    .catch((e) => {
      console.log("Error creating movie", e);
      next(e);
    });
});

router.post("/movies/:id", (req, res, next) => {
  const movieID = req.params.id;
  Movie.findByIdAndDelete(movieID)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log("Error creating movie", e);
      next(e);
    });
});

router.post("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;

  const movieToEdit = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.findByIdAndUpdate(movieId, movieToEdit, { new: true })
    .then((updatedMovie) => res.redirect("movies/movies"))
    .catch((e) => {
      res.redirect(`/movies/${movieId}/edit`);
    });
});

router.get("/movies/:id/edit", async (req, res, next) => {
  const movieID = req.params.id;
  try {
    const movie = await Movie.findById(movieID);
    const cast = await Celebrity.find();
    const data = {
      movie,
      cast,
    };

    res.render("movies/edit-movie", data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
