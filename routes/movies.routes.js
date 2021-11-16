// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/movies", (req, res, next) => {
    res.render("movies/movies-view");
  });

// all your routes here

module.exports = router;