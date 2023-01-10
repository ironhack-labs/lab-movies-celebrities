const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get("/movies/create", (req, res) => {
  console.log(res.render);
  Celebrity.find()
    /* .populate("cast") */
    .then((result) => {
      res.render("movies/new-movie", { result });
    });
});

router.post("/movies/create", (req, res) => {
  console.log(req.body);
  const { title, genre, cast, plot } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error while creating movies:", err);
      res.redirect("/movies/new-movie");
    });
});

module.exports = router;
