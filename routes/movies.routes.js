// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      const data = {
        celebrities: celebritiesFromDB,
      };
      res.render("movies/new-movie.hbs", data);
    })
    .catch((e) => next(e));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(({ title, genre, plot, cast }) => {
      res.redirect("/movies");
    })
    .catch((e) => next(e));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Promise.all([Movie.findById(id), Celebrity.find()])
    .then(([movie, celebrities]) => {
      res.render("movies/edit-movie", {
        movie: movie,
        celebrities: celebrities,
      });
    })
    .catch((e) => next(e));
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then((editedMovie) => {
      res.redirect(`/movies/${editedMovie.id}`);
    })
    .catch((e) => next(e));
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => next(e));
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((allMovies) => {
      res.render("movies/movies.hbs", { movies: allMovies });
    })
    .catch((e) => next(e));
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details.hbs", { movie: movie });
    })
    .catch((e) => next(e));
});

module.exports = router;
