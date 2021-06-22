const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((e) => console.log(e));
});

router.get("/create", (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
});

router.post("/create", (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(() => {
      res.render("movies/new-movie");
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", movie);
    })
    .catch((e) => console.log(e));
});

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => console.log(e));
});

router.get("/:id/edit", (req, res, next) => {
  Promise.all([Movie.findById(req.params.id), Celebrity.find()])
    .then(([movie, celebrities]) => {
      res.render("movies/edit-movie", { movie, celebrities });
    })
    .catch((e) => console.log(e));
});

router.post("/:id/edit", (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((movie) => {
      res.redirect(`/movies/${req.params.id}`);
    })
    .catch(() => {
      res.redirect(`/movies/${req.params.id}/edit`);
    });
});

module.exports = router;
