const router = require("express").Router();

const celebritiesRouter = require('./celebrities.routes');
router.use('/', celebritiesRouter);

require('./movies.routes')(router)
// const moviesRouter = require('./movies.routes');
// router.use('/', moviesRouter);


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
