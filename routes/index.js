const router = require("express").Router();

console.log(router)

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
