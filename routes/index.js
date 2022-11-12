const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// toca ponerle .js 

const moviesRoutes = require('./movies.routes.js')
router.use('/movies', moviesRoutes)
// /movies como empieza la url de todas las rutas que coja d ese archivo 

const celebritiesRoutes = require('./celebrities.routes.js')
router.use('/celebrities', celebritiesRoutes)

module.exports = router;


