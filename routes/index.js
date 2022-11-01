const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebritiesRoutes = require("./celebrities.routes")
router.use("/celebrities", celebritiesRoutes)

const moviesRoutes = require("./movies.routes.js")
router.use("/movies", moviesRoutes)





module.exports = router;
