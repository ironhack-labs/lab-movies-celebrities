const router = require("express").Router();

const celebrities = require('./celebrities-routes')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const movies = require('./movies.routes')

module.exports = router;
