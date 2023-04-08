const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/celebrities", (req, res, next) => {
  res.render("celebreties.routes");
});

router.get("/movies", (req, res, next) => {
  res.render("movies.routes");
});

module.exports = router;
