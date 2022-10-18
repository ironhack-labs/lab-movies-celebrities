const router = require("express").Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const moviesRoutes = require ('./movies.routes.js')
router.use('/movies', moviesRoutes);

const celebritiesRoutes = require ('./celebrities.routes.js')
router.use('/celebrities', celebritiesRoutes);

module.exports = router;
