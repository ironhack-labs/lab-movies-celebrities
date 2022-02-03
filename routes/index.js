const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* Celebrity Routes. All routes will start as '/celebrities/...' */
const celebrityRoutes = require("./celebrities.routes");
router.use("/celebrities", celebrityRoutes);

/* Movie Routes. All routes will start as '/movies/...' */
const movieRoutes = require("./movies.routes");
router.use("/movies", movieRoutes);


module.exports = router;
