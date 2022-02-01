const router = require("express").Router();

const celebrities = require('./celebrities.routes');
router.use('/celebrities', celebrities);

const movies = require('./movies.routes');
router.use('/movies', movies);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
