const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/movies", )
router.use("/celebrities", )

module.exports = router;
