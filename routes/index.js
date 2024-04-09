const router = require("express").Router();
const celebrities = require("./celebrities.routes");
const movies = require("./movies.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.use('/', celebrities);
router.use('/', movies);

module.exports = router;
