const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const routerCelebrity = require('../routes/celebrities.routes')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
