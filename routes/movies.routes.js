// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require ("../models/Movie.model")

// all your routes here
router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie")
})

module.exports = router;