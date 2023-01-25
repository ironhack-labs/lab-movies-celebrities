const router = require("express").Router();
const moviesController = require('../controllers/movies.controller')

/* GET movies page */
router.get("/", (req, res, next) => {
  res.render("movies/movies.hbs");
});

module.exports = router;