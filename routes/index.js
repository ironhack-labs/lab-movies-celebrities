const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/", require("./celebrities.routes"));
router.use("/", require("./movies.routes"));

module.exports = router;
