const router = require("express").Router();

// Other pages
router.use(require('./celebreties.routes'))
router.use(require('./movies.routes'))
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
module.exports = router;
