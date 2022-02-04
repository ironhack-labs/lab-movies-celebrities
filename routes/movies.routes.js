const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// GET /movies/create
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) =>
      res.render("movies/new-movie.hbs", { allCelebrities })
    )
    .catch((err) => next(err));
});

// POST /movies/create
router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => res.render("movies/new-movie.hbs"));
});

// GET /movies
router.get("/", (req, res, next) => {
  Movie.find()
    .then((allMovies) => res.render("movies/movies.hbs", { allMovies }))
    .catch((err) => next(err));
});

// GET /movies/:id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((oneMovie) => res.render("movies/movie-details.hbs", { oneMovie }))
    .catch((err) => next(err));
});

// GET /movies/:id/edit
router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((oneMovie) => {
      Celebrity.find()
        .then((allCelebrities) => {
          res.render("movies/edit-movie.hbs", { oneMovie, allCelebrities });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// POST /movies/:id/edit
router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect(`/movies/${id}`))
    .catch((err) => next(err));
});

// POST /movies/:id/delete
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

module.exports = router;
