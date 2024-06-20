const router = require("express").Router();

const celebritiesRoutes = require('./celebrities.routes');
router.use('/celebrities', celebritiesRoutes);

const moviesRoutes = require('./movies.routes');
router.use('/movies', moviesRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
