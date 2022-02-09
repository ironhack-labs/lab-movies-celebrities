const router = require("express").Router();

/* GET celebrities */
router.get("/", (req, res, next) => {
  res.render("celebrities/celebrities");
});

/* GET new celebrity */
router.get("/new-celebrity", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

module.exports = router;