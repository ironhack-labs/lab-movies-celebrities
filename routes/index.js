const router = require("express").Router();

const moviesRoutes = require("../routes/movies.routes");
router.use("/", moviesRoutes);

const celebritiesRoutes = require("../routes/celebrities.routes");
router.use("/", celebritiesRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
