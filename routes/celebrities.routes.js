const router = require("express").Router();
const celebritiesController = require('../controllers/celebrities.controller')

/* GET celebrities page */
router.get("/", (req, res, next) => {
  res.render("celebrities/celebrities.hbs");
});

module.exports = router;