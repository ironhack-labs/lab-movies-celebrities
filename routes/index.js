const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
//router for celebrities
const celebrities = require('./celebrities.routes');
router.use('/', celebrities);

//router for movies
const movies = require('./movies.routes');
router.use('/', movies);

module.exports = router;