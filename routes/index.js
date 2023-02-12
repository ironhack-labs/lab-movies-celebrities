const router = require("express").Router()

//Model
const Celebrities = require('./../models/Celebrities.model')
const Movies = require('./../models/Movies.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
