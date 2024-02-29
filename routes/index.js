const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log('home')
  res.render("index");
});

module.exports = router;
