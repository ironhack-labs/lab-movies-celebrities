// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDb) => {
      res.render("movies/movies", { moviesFromDb });
    })
    .catch((err) => console.log(`Err while rendering movie list: ${err}`));
});

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      console.log("CELEB in MOVIES", celebritiesFromDb);
      res.render("movies/new-movie", { celebritiesFromDb });
    })
    .catch((err) => console.log(`Err while creating movie: ${err}`));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(`Error while adding new movie to the DB: ${err}`);
      res.redirect("movies/new-movie");
    });
});
module.exports = router;
