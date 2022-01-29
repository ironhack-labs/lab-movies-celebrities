const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      // console.log(movies);
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

router.get("/create", (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    // console.log(celebrities);
    res.render("movies/new-movie", { celebrities });
  });
});

router.post("/create", (req, res, next) => {
  if (!Array.isArray(req.body.cast)) {
    Movie.create({
      ...req.body,
      cast: [req.body.cast],
    }).then(() => res.redirect("/movies"));
  } else {
    Movie.create(req.body).then(() => res.redirect("/movies"));
  }
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      // console.log(movie);
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => console.log(err));
});

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((deletedMovie) => {
      console.log(`${deletedMovie} has been deleted`);
    })
    .catch((err) => console.log(err))
    .then(() => {
      res.redirect("/movies");
    });
});

router.get("/:id/edit", (req, res, next) => {
  Promise.all([
    Movie.findById(req.params.id).populate("cast"),
    Celebrity.find(),
  ]).then(([movie, celebrities]) => {
    res.render("movies/edit-movies", {
      movie,
      celebrities,
    });
  });
});

router.post("/:id/edit", (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .catch((err) => console.log(err))
    .then((movie) => {
      console.log(`${movie} has been updated`);
      res.redirect("/movies");
    });
});

module.exports = router;
