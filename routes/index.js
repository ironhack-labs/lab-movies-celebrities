const router = require("express").Router();
//require('./routes/movies.routes')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
