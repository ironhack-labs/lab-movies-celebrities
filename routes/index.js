const router = require("express").Router();

const routesCelebrities = require("./celebrities.routes")
const routesMovies = require("./movies.routes")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/celebrities", routesCelebrities)
router.use("/movies", routesMovies)

module.exports = router;
