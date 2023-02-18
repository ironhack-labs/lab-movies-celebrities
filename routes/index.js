const router = require("express").Router();
const celebritiesRoutes = require("./celebrities.routes.js")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/celebrities", celebritiesRoutes)

module.exports = router;
