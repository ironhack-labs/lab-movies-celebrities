const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.use('/celebrities', require('./celebrities.routes'))
router.use('/movies', require('./movies.routes'))

module.exports = router;
