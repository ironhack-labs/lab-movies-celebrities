const router = require("express").Router();
const Celebritie = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res, next) => {
  Celebritie.find().then((allCelebrities) => {
    res.render("new-movie", { allCelebrities });
  });
});
router.post("/create", (req, res) => {
  Movie.create(req.body);
  res.redirect("/movie");
});

router.get("/", (req, res) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies", { allMovies });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/:id", (req, res) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieDetail) => {
      res.render("movie-detail", { movieDetail });
    })
    .catch((err) => console.log(err));
});

router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((movieRemoved) => {
      res.redirect("/movie");
    })
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then((findedMovie) => {
      Celebritie.find().then((allCelebrities) => {
        console.log(allCelebrities);
        res.render("edit-movie", { findedMovie, allCelebrities });
      });
    })
    .catch((err) => console.log(err));
});

router.post("/:id/edit", (req, res) => {
  const movieRoute = "/movie/" + req.params.id;
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(res.redirect(movieRoute))
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
