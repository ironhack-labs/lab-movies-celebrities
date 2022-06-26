const router = require("express").Router();

router.use(require('./celebrities.routes'))
router.use(require('./movies.routes'))

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
