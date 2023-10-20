const router = require("express").Router();

const celebritiesRoutes = require('./celebrities.routes');
const moviesRoutes = require('./movies.routes');


router.use('/celebrities', celebritiesRoutes);
router.use('/movies', moviesRoutes);


router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
