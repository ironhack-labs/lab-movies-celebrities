const router = require("express").Router();
const movieRoutes = require("./movies.routes");
const celebritiesRoutes = require("./celebrities.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/celebrities", celebritiesRoutes)
router.use("/movies", movieRoutes)

module.exports = router;