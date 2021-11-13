const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/celebrities/new-celebrity", (req, res) => {
  res.render("celebrities/new-celebrity")
})

router.get("/celebrities/celebrities", (req, res, next) => {
  res.render("celebrities/celebrities");
});
router.get("/movies/new-movie", (req, res, next) => {
  res.render("movies/new-movie");
});
// router.get("/celebrities/celebrities", (req, res, next) => {
//   res.render("celebrities/celebrities");
// });

module.exports = router;
