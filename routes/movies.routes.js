// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res) => {
  Movie.find().then((movies) => {
    res.render("./movies/movies", { movies: movies });
  });
});

router.get("/create", (req, res) => {
  Celebrity.find().then((data) => {
    res.render("./movies/new-movie", { casts: data });
  });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log("Celebrities", cast);
  Movie.create({ title: title, genre: genre, plot: plot, cast: cast })
    .then(() => {
      console.log("Saved to Db");
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
      res.render("./movies/new-movie");
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate({ path: "cast", model: "Celebrity" })
    .then((data) => {
      res.render("./movies/movie-details", { data: data });
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => {
      console.log("Movie Deleted");
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
