const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("movies/movies");
});

/* GET movie details */
router.get("/movie-details", (req, res, next) => {
  res.render("movies/movie-details");
});

/* GET edit movie */
router.get("/edit-movie", (req, res, next) => {
  res.render("movies/edit-movie");
});

/* GET new movie */
router.get("/new-movie", (req, res, next) => {
  res.render("movies/new-movie");
});

module.exports = router;
