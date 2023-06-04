const router = require("express").Router();

/* GET Movies page */
router.get("/movies", (req, res, next) => {
  res.render("movies");
});

module.exports = router;
