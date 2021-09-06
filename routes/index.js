const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
/*
router.get("/new-celebrity", (req, res, next) => {
  res.send("HOLA");
});
*/
module.exports = router;
