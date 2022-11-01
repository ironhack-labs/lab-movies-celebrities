const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* router.get("/test", (req, res, next) => {
  res.render("testview");
});

//* Celebrity Create Route
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
}); */

module.exports = router;
