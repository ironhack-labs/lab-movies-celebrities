const router = require("express").Router();

/* GET home page */
router.get("/movies", (req, res, next) => {
  res.render("movies/movies");
});

module.exports = router;