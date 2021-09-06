const router = require("express").Router();

const celebritiesRoutes = require('./celebrities.routes');
router.use('/', celebritiesRoutes);

const moviesRoutes = require('./movies.routes');
router.use('/', moviesRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
   res.render("index");
});

module.exports = router;
