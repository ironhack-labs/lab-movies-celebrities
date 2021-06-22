const router = require("express").Router();
const celebritiesRouter = require("./celebrities.routes")
const moviesRouter = require("./movies.routes")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/celebrities", celebritiesRouter)
router.use("/movies", moviesRouter)

module.exports = router;
