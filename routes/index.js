const router = require("express").Router();
const bcrypt = require('bcrypt')
const Celebrity = require("../models/Celebrity.model")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});





module.exports = router;
