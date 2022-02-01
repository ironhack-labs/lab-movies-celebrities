const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const router = express.Router();

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
  Celebrity.find()
  .then((celebrities) => {
    res.render("movies/new-movie");
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

  router.get("/:id", (req, res, next) => {
   const id = req.params.id;
    Movie.findById(id)
      .populate("cast")
      .then((movie) => {
        res.render("movies/movie-details",  { movie } );
      })
      .catch((e) => {
        console.error(e);
      });
  });

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/movies")
    .catch((e) => {
      console.error(e)
    })
  })
})
});

module.exports = router;
