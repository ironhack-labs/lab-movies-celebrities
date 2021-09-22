const router = require("express").Router()

//const controller    = require("./../controllers/")


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;

