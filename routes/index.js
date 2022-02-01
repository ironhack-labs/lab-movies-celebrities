const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebritiesRoutes = require('./celebrities.routes')
router.use('/', celebritiesRoutes)

const moviesRoutes = require('./movies.routes')
router.use('/', moviesRoutes)

module.exports = router;
