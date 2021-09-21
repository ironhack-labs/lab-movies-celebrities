// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const model = require("../models/Movies.model");

// all your routes here
router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

module.exports = router;
