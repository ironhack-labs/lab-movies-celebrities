const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});


router.use('/movies', require('./movies.routes'))
router.use('/celebrities', require('./celebrities.routes'))


module.exports = router