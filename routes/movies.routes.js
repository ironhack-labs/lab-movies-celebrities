const router = require("express").Router();
const Movie = require("../models/Movie.model");

//GET Movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("movies/movies", { movies });
});

// GET create
router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

// POST create
router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findOne({ title, genre, plot, cast })
    .then((result) => {
      if (!result) {
        Movie.create({ title, genre, plot, cast }).then(() =>
          res.redirect("/movies")
        );
      } else {
        res.render("movies/new-movies", {
          message: "It seems it is already created",
        });
        return;
      }
    })
    .catch((err) => {
      console.log(`Error while creating a new user: ${err}`);
    });
});

module.exports = router;
