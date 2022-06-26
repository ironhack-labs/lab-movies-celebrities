const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use('/celebrities', require('./celebrities.routes'))                     //check later to only have one nested in the other
router.use('/movies', require('./movies.routes'))

module.exports = router;
