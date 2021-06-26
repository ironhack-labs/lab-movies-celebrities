const router = require("express").Router();

// celebritie routes
const celebritiesRouter = require('./celebrities.routes');
router.use('/celebrities', celebritiesRouter);

// movies routes
const moviesRouter = require('./movies.routes');
router.use('/movies', moviesRouter);


// all the other routes
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
