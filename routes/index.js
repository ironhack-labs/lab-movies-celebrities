const router = require("express").Router();

const celebritiesRouter = require("./celebrity.routes");
const moviesRouter = require("./movie.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/celebrities", celebritiesRouter);
router.use("/movies", moviesRouter);

module.exports = router;
