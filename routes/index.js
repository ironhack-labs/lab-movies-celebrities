const router = require("express").Router();

const celebritiesRoutes = require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRoutes)

const moviesRoutes = require("./movies.routes.js")
router.use("/movies", moviesRoutes)

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});





module.exports = router;
