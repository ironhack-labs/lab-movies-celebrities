const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
/* GET home page */
router.get("/", (req, res, next) => {
  Movie.find().then((results) => {
    res.render("movies/movies", { results });
  });
});

router.get("/create", (req, res) => {
  Celebrity.find().then((results) => {
    res.render("movies/new-movie", { results });
  });
});

router.post("/create", (req, res) => {
  Movie.create(req.body)
    .then((results) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("something went wrong adding the movie", err);
      res.render("movies/new-movie");
    });
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((results) => {
      res.render("movies/movie-details", { results });
    })
    .catch((err) => {
      console.log("something went wrong finding the movie", err);
      res.redirect("/movies");
    });
});

router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((results) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("something went wrong when deleting the movie", err);
      res.redirect("/movies/" + req.params.id);
    });
});

router.get("/:id/edit", (req, res) => {
  Movie.findById(req.params.id).then((movie) => {
    Celebrity.find().then((celebs) => {
      res.render("movies/edit-movie", { movie, celebs });
    });
  });
});

router.post("/:id", (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((results) => {
      res.redirect("/movies/" + req.params.id);
    })
    .catch((err) => {
      console.log("something went wrong when updating the movie", err);
      res.redirect("/movies/" + req.params.id + "/edit");
    });
});

module.exports = router;
