const router = require("express").Router();

/* GET home pagee */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
