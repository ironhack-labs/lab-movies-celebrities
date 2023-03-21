// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res, next) => {
  Celebrity.find({}).then((celebrityArr) => {
    const data = { actors: celebrityArr };
    res.render("movies/new-movie", data);
  });
});

module.exports = router;
