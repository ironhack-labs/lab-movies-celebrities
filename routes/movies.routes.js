const router = require("express").Router();

router.get("/movie", (req, res) => {
  res.render("movies/edit-movie");
});

module.exports = router;
