const router = require("express").Router();
const { application } = require("express");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
