const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/celebrities", (req, res, next) => {
  res.render("celebrities");
});


module.exports = router;
