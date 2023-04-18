const router = require("express").Router();
//const app = require("express")();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// const celebritiesRoutes = require('./routes/celebrities.routes');
// app.use('/celebrities', celebritiesRoutes);

// const moviesRoutes = require('./routes/movies.routes');
// app.use('/movies', moviesRoutes);

module.exports = router;

