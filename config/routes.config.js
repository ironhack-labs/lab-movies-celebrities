const express = require("express")
const router = express.Router()

const celebrities = require('../controllers/celebrities.controllers')
const movies = require('../controllers/movies.controllers')


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;