const express = require("express");
const router = express.Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => {
      console.log("Oops", err);
    });
});

router.get("/create", (req, res, next) => {
  console.log("entro");
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
});

router.post("/create", (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
      console.log(`New movie created: ${movie}, req.body`);
      res.redirect("/movies");
    })
    .catch((e) => {
      res.render("movies/new-movie");
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((e) => {
      console.error(e);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id).populate("cast"),
    Celebrity.find().then(([movie, celebrities]) => {
      res.render("movies/edit-movies", {
        movie,
        celebrities,
      });
    });
});

router.post("/:id/edit", (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body).then(() => {
    res.redirect("/movies")
  });
});

router.post("/:id/delete", (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id).then(() => {
    res.redirect("/movies");
  });
});

module.exports = router;
