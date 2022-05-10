const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
// all your routes here

router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then((moviesList) => {
      res.render("movies/movies", { movies: moviesList });
    })
    .catch((err) => console.log(err));
});

router.get("/movies/create", (req, res, next) => {
  Celebrity.find({})
    .then((celebs) => {
      res.render("movies/new-movie", { celebs });
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("movies/new-movie"));
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id).then((movie) => {
    Celebrity.find()
      .then((celebrity) => {
        res.render("movies/edit-movie", {
          infomovie: movie,
          infoceleb: celebrity,
        });
      })
      .catch((err) => console.log(err));
  });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/:{{id}}`);
    })

    .catch((err) => console.log(err));
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movieInfo) => {
      res.render("movies/movie-details", { movieInfo });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
