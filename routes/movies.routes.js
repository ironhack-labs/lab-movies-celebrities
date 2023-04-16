// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/movies", (req, res, next) => {
  res.render("movies.hbs");
});

router.get("/new-movie", (req, res, next) => {
  res.render("new-movie.hbs");
});

router.get("/movie-details", (req, res, next) => {
  res.render("movie-details.hbs");
});

router.get("/edit-movie", (req, res, next) => {
  res.render("edit-movie.hbs");
});

module.exports = router;
