const router = require("express").Router();
const movies = require("./movies.routes")
const celebrities = require("./celebrities.routes")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
