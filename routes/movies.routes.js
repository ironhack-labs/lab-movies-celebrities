const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  Celebrity.find().then(cast => {
    res.render("movies/new-movie", { cast });
  });
});

router.post("/create", (req, res, next) => {
  const { body } = req;
  Movie.create(body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(error => {
      console.error(error);
      res.render("movies/new-movie");
    });
});

module.exports = router;
