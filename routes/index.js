const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Celebrities
router.use('/celebrities', require('./celebrities.routes'))

//Movies
router.use('/movies', require('./movies.routes'))

module.exports = router;
