const router = require("express").Router();

/* GET celebrities page */
router.get("/", (req, res, next) => {
  res.render("celebrities/list.hbs");
});

module.exports = router;