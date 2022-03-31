const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/movies", (req, res, next) => {
//   res.render("movies.routes")
// })

// router.get("/celebrities", (req, res, next) => {
//   res.render("celebrities.routes")
// })


module.exports = router;
