const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.re
  res.render("index");
});


router.use('/movies', require('./movies.routes'))
router.use('/celebrities', require('./celebrities.routes'))

module.exports = router;

