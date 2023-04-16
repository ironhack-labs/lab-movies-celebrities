// starter code in both routes/movies.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find().populate("celebrity");
    res.render("movies/movies", { movies });
  } catch (error) {
    res.render("error", { error });
  }
});
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((dbCelebrities) => {
      res.render("movies/new-movie", { dbCelebrities });
    })
    .catch((error) => res.render("error", { error }));
});

router.post("/create", async (req, res, next) => {
  const { body } = req;
  try {
    const movie = await Movie.create(body);
    res.redirect("/");
  } catch (error) {
    res.render("error", { error });
  }
});

module.exports = router;
