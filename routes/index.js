const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/celebrities/celebrities", (req, res, next) => {
  res.render("celebrities");
});

router.get("/celebrities/new-celebrity", (req, res, next) => {
  res.render("new-celebrity");
});

module.exports = router;
